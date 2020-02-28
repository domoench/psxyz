import React, { useState, useLayoutEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styled, { keyframes } from 'styled-components';
import _debounce from 'lodash.debounce';

/* TODO
 * - Implement FLIP Animation?
 * - Cleanup
 */

import {
  colors as themeColors,
  fontSize as fontSizes,
  colorForIdx,
  gridLineColors,
  gridColumnsForBreakpoint,
  deviceSizeForWidth,
  overlayColors,
} from '../theme';
import { hexToRGBA } from '../utils';
import { GlobalDispatchContext, GlobalStateContext } from '../context/GlobalContextProvider';
import SavedSVGIcon from './svg/saved';
import SourceSVGIcon from './svg/source';
import Pill from './reusable/Pill';
import Anchor from './reusable/Anchor';
import { colorsType } from './reusable/types';

const fontScaleForDevice = {
  xs: 0.7,
  sm: 0.8,
  md: 0.9,
  lg: 1.0,
  xl: 1.0,
};

const Grid = styled.div`
  width: 100vw;
  display: block;
  position: relative;
  ${props => `height: ${props.height}px;`}
`;

const RelativeWrapper = styled.div`
  position: relative;
  &:hover .image-overlay {
    opacity: 1.0
  }
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0;
  background: ${props => `linear-gradient(${hexToRGBA(props.color, 1.0)} 0%, 85%, ${hexToRGBA(props.color, 0.3)}) 100%`};
  transition: opacity 0.5s ease 0s;
  color: white;
`;

const OverlayButtons = styled.div`
  display: flex;
  align-items: center;
  padding: 1em;
`;

const OverlayButton = styled.div`
  padding: 0 0.25em;
`;

const isVowel = char => {
  const c = char.toLowerCase();
  return c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u';
};

const OverlayButtonContent = styled.span`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  & svg {
    padding-right: 0.25em;
  }
`;

// TODO: This is very similar to FilterTogglePill. Refactor?
const SavePill = ({
  isSaved,
  clickHandler,
  defaultColors,
  hoverColors,
  deviceSize,
}) => {
  const [hover, setHover] = useState(false);
  const colors = hover ? hoverColors : defaultColors;
  const fontSize = fontSizes.imageGridPill * fontScaleForDevice[deviceSize];

  return (
    <Pill
      borderRadius={20}
      colors={colors}
      fontSize={fontSize}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={clickHandler}
    >
      {isSaved ?
        (
          <OverlayButtonContent>
            <SavedSVGIcon color={colors.color} width={fontSize} />
            REMOVE
          </OverlayButtonContent>
        ) :
        (
          <OverlayButtonContent>
            <SavedSVGIcon color={colors.color} width={fontSize} />
            SAVE
          </OverlayButtonContent>
        )
      }
    </Pill>
  );
};

SavePill.propTypes = {
  isSaved: PropTypes.bool,
  clickHandler: PropTypes.func,
  defaultColors: colorsType,
  hoverColors: colorsType,
  deviceSize: PropTypes.string,
};

const AnchorPill = ({
  href,
  defaultColors,
  hoverColors,
  deviceSize,
}) => {
  // TODO I do this hover management in many components. refactor?
  const [hover, setHover] = useState(false);
  const colors = hover ? hoverColors : defaultColors;
  const fontSize = fontSizes.imageGridPill * fontScaleForDevice[deviceSize];

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Anchor
        href={href}
        altText="imagemaker source url"
        textColor={colors.color}
      >
        <Pill
          borderRadius={20}
          colors={colors}
          fontSize={fontSize}
        >
          <OverlayButtonContent>
            <SourceSVGIcon color={colors.color} width={fontSize} />
            SOURCE
          </OverlayButtonContent>
        </Pill>
      </Anchor>
    </div>
  );
};

AnchorPill.propTypes = {
  href: PropTypes.string.isRequired,
  defaultColors: colorsType.isRequired,
  hoverColors: colorsType.isRequired,
  deviceSize: PropTypes.string.isRequired,
};

const categorySentence = categories => {
  const n = categories.length;
  const parts = categories.map((c, idx) => {
    let article;
    const name = c.practitionerName;
    const startsWithVowel = isVowel(name.charAt(0));

    if (idx === 0) {
      article = startsWithVowel ? ' an ' : ' a ';
    } else if (n > 1 && idx === n - 1) {
      article = startsWithVowel ? ' and an ' : ' and a ';
    }
    return (
      <React.Fragment key={c.id}>
        {`${idx > 0 ? ',' : ''} `}
        {article}
        <CategoryText>{name}</CategoryText>
      </React.Fragment>
    );
  });
  return parts;
};

const Blurb = styled.span`
  padding: 1em;
  font-size: ${({ fontSize }) => fontSize}px;
`;

const CategoryText = styled.span`
  text-decoration: underline;
`;

const ImageMakerBlurb = ({ imageMaker, deviceSize }) => (
  <Blurb fontSize={fontSizes.display2 * fontScaleForDevice[deviceSize]}>
    {`${imageMaker.name} is`}
    {categorySentence(imageMaker.categories)}
    .
  </Blurb>
);

ImageMakerBlurb.propTypes = {
  imageMaker: PropTypes.object.isRequired,
  deviceSize: PropTypes.string.isRequired,
};

const ImageCell = ({
  className,
  imageMaker,
  idx,
  deviceSize,
  style,
}) => {
  const dispatch = useContext(GlobalDispatchContext);
  const state = useContext(GlobalStateContext); // TODO move this up to the grid level?
  const savedImageMakerIdSet = new Set(state.savedImageMakerIds);
  const isSaved = savedImageMakerIdSet.has(imageMaker.id);

  return (
    <div className={className} style={style}>
      <RelativeWrapper>
        <Img fluid={imageMaker.mainImage.fluid} />
        <Overlay className="image-overlay" color={colorForIdx(idx, overlayColors)}>
          <ImageMakerBlurb imageMaker={imageMaker} deviceSize={deviceSize} />
          <OverlayButtons>
            <OverlayButton>
              {!!imageMaker.source && (
                <AnchorPill
                  href={imageMaker.source}
                  deviceSize={deviceSize}
                  defaultColors={{
                    color: themeColors.black,
                    borderColor: themeColors.black,
                    bgColor: themeColors.white,
                  }}
                  hoverColors={{
                    color: themeColors.white,
                    borderColor: themeColors.black,
                    bgColor: themeColors.black,
                  }}
                />
              )}
            </OverlayButton>
            <OverlayButton>
              <SavePill
                isSaved={isSaved}
                deviceSize={deviceSize}
                defaultColors={{
                  color: themeColors.black,
                  borderColor: themeColors.black,
                  bgColor: themeColors.white,
                }}
                hoverColors={{
                  color: themeColors.white,
                  borderColor: themeColors.black,
                  bgColor: themeColors.black,
                }}
                clickHandler={() => dispatch({
                  type: isSaved ? 'DELETE_SAVED_IMAGEMAKER' : 'ADD_SAVED_IMAGEMAKER',
                  value: imageMaker.id,
                })}
              />
            </OverlayButton>
          </OverlayButtons>
        </Overlay>
      </RelativeWrapper>
    </div>
  );
};

ImageCell.propTypes = {
  className: PropTypes.string,
  imageMaker: PropTypes.object,
  idx: PropTypes.number,
  deviceSize: PropTypes.string,
  style: PropTypes.object,
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Styling the positioned cells with styled component classes was pretty expensive.
// Let's try inline styles for the position + dimension attributes
const PositionedImageCell = styled(ImageCell)`
  position: absolute;
  transition: top 2s ease 0s, left 2s ease 0s, width 2s ease 0s, height 2s ease 0s, border-color 0s ease 0s;
  animation: ${fadeIn} ease-in 1;
  animation-duration: 0.5s;
`;

const ImageGridAnimated = ({ imageMakers }) => {
  const gridRef = React.createRef();
  const [width, setWidth] = useState();

  // Measure the browser-rendered dimensions of a DOM element
  const setVizDimensions = () => {
    const vizBoundingRect = gridRef.current.getBoundingClientRect();
    setWidth(vizBoundingRect.width);
  };

  useLayoutEffect(() => {
    setVizDimensions();
    const debouncedSetDimensions = _debounce(() => setVizDimensions(), 160);
    window.addEventListener('resize', debouncedSetDimensions);
    return () => {
      window.removeEventListener('resize', debouncedSetDimensions);
    };
  });

  // If we haven't calculated width yet (first load) render an empty grid on the
  // first paint.
  if (!width) {
    return (
      <Grid
        ref={gridRef}
      />
    );
  }

  const deviceSize = deviceSizeForWidth(width);
  const numCols = gridColumnsForBreakpoint[deviceSize];
  const cellWidth = width / numCols;
  const numRows = Math.ceil(imageMakers.length / numCols);
  const height = numRows * cellWidth;
  return (
    <Grid
      ref={gridRef}
      numImageMakers={imageMakers.length}
      height={height}
    >
      {
        imageMakers.map(({ node }, i) => {
          const gridCol = i % numCols;
          const gridRow = Math.floor(i / numCols);
          return (
            <PositionedImageCell
              imageMaker={node}
              key={node.id}
              idx={i}
              bottomBorderColor={colorForIdx(gridRow, gridLineColors)}
              deviceSize={deviceSize}
              // Doing inline style instead of styled components here because this was generating
              // so many css classes when resizing and noticably hurting performance
              style={{
                top: gridRow * cellWidth,
                left: gridCol * cellWidth,
                width: cellWidth - 2,
                height: cellWidth - 2,
                borderRight: `2px solid ${colorForIdx(gridCol, gridLineColors)}`,
                boxShadow: `${colorForIdx(gridRow, gridLineColors)} 0px 2px 0px 0px`,
              }}
            />
          );
        })
      }
    </Grid>
  );
};

ImageGridAnimated.propTypes = {
  imageMakers: PropTypes.array.isRequired,
};

export default ImageGridAnimated;
