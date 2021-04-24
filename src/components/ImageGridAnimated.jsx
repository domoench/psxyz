import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styled, { keyframes } from 'styled-components';

/* TODO
 * - Implement FLIP Animation?
 * - Cleanup
 */

import {
  colors as themeColors,
  fonts,
  fontStyles,
  colorForIdx,
  gridLineColors,
  gridColumnsForBreakpoint,
  deviceSizeForWidth,
  fontScaleForDevice,
  overlayColors,
} from '../theme';
import { hexToRGBA } from '../utils';
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider';
import SavedSVGIcon from './svg/saved';
import SourceSVGIcon from './svg/source';
import Pill from './reusable/Pill';
import Anchor from './reusable/Anchor';
import { colorsType } from './reusable/types';

// TODO remove?
const Grid = styled.div`
  width: 100vw;
  display: block;
  position: relative;
  ${props => `height: ${props.height}px;`}
`;

const RelativeWrapper = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
  &:hover .image-overlay {
    opacity: 1;
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
  background: ${props =>
    `linear-gradient(${hexToRGBA(props.color, 1.0)} 0%, 85%, ${hexToRGBA(
      props.color,
      0.3
    )}) 100%`};
  transition: opacity 0.4s ease-out 0s;
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
  const fontSize =
    fontStyles.imageGridPill.size * fontScaleForDevice[deviceSize];

  return (
    <Pill
      borderRadius={20}
      py={4}
      px={11}
      colors={colors}
      fontSize={fontSize}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={clickHandler}
    >
      {isSaved ? (
        <OverlayButtonContent>
          <SavedSVGIcon color={colors.color} width={fontSize} />
          REMOVE
        </OverlayButtonContent>
      ) : (
        <OverlayButtonContent>
          <SavedSVGIcon color={colors.color} width={fontSize} />
          SAVE
        </OverlayButtonContent>
      )}
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

const AnchorPill = ({ href, defaultColors, hoverColors, deviceSize }) => {
  // TODO I do this hover management in many components. refactor?
  const [hover, setHover] = useState(false);
  const colors = hover ? hoverColors : defaultColors;
  const fontSize =
    fontStyles.imageGridPill.size * fontScaleForDevice[deviceSize];

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Anchor href={href} altText="imagemaker source url" color={colors.color}>
        <Pill
          borderRadius={20}
          py={4}
          px={11}
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
    const { practitionerName } = c;
    const startsWithVowel = isVowel(practitionerName.charAt(0));

    if (idx === 0) {
      article = startsWithVowel ? ' an ' : ' a ';
    } else if (n > 1 && idx === n - 1) {
      article = startsWithVowel ? ' and ' : ' and ';
    }
    return (
      <React.Fragment key={c.id}>
        {`${idx > 0 && n > 2 ? ',' : ''} `}
        {article}
        <CategoryText>{practitionerName}</CategoryText>
      </React.Fragment>
    );
  });
  return parts;
};

const Blurb = styled.span`
  padding: 1em;
  font-size: ${({ fontSize }) => fontSize}px;
  font-family: ${fonts.serif};
  line-height: 1.15;
`;

const CategoryText = styled.span`
  text-decoration: underline;
`;

const fontScaleForIMBlurb = {
  xs: 0.55,
  sm: 0.7,
  md: 0.85,
  lg: 1.0,
  xl: 1.0,
};

const ImageMakerBlurb = ({ imageMaker, deviceSize }) => (
  <Blurb fontSize={Math.ceil(27 * fontScaleForIMBlurb[deviceSize])}>
    {`${imageMaker.name} is`}
    {categorySentence(imageMaker.categories)}.
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
  cellWidth,
  style,
}) => {
  const dispatch = useContext(GlobalDispatchContext);
  const state = useContext(GlobalStateContext); // TODO move this up to the grid level?
  const savedImageMakerIdSet = new Set(state.savedImageMakerIds);
  const isSaved = savedImageMakerIdSet.has(imageMaker.id);

  return (
    <div className={className} style={style}>
      <RelativeWrapper>
        <Img
          fluid={{
            ...imageMaker.mainImage?.fluid,
            sizes: `${cellWidth}px`, // Explicitly control the source size
          }}
          objectFit="cover"
          style={{ height: '100%' }}
          alt={imageMaker.name}
        />
        <Overlay
          className="image-overlay"
          color={colorForIdx(idx, overlayColors)}
        >
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
                clickHandler={() =>
                  dispatch({
                    type: isSaved
                      ? 'DELETE_SAVED_IMAGEMAKER'
                      : 'ADD_SAVED_IMAGEMAKER',
                    value: imageMaker.id,
                  })
                }
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
  cellWidth: PropTypes.number,
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
  transition: top 0.5s ease 0s, left 0.5s ease 0s, width 0.5s ease 0s,
    height 0.5s ease 0s;
  animation: ${fadeIn} ease 1;
  animation-duration: 0.3s;
`;

const ImageGridAnimated = ({ imageMakers, width }) => {
  const deviceSize = deviceSizeForWidth(width);
  const numCols = gridColumnsForBreakpoint[deviceSize];
  const cellWidth = Math.floor(width / numCols);
  const numRows = Math.ceil(imageMakers.length / numCols);
  const height = numRows * cellWidth;
  return (
    <Grid numImageMakers={imageMakers.length} height={height}>
      {imageMakers.map(({ node }, i) => {
        const gridCol = i % numCols;
        const gridRow = Math.floor(i / numCols);
        return (
          <PositionedImageCell
            imageMaker={node}
            key={node.id}
            idx={i}
            bottomBorderColor={colorForIdx(gridRow, gridLineColors)}
            deviceSize={deviceSize}
            cellWidth={cellWidth}
            // Doing inline style instead of styled components here because this was generating
            // so many css classes when resizing and noticably hurting performance
            style={{
              top: gridRow * cellWidth,
              left: gridCol * cellWidth,
              width: cellWidth - 2,
              height: cellWidth - 2,
              borderRight: `2px solid ${colorForIdx(gridCol, gridLineColors)}`,
              boxShadow: `${colorForIdx(
                gridRow,
                gridLineColors
              )} 0px 2px 0px 0px`,
            }}
          />
        );
      })}
    </Grid>
  );
};

ImageGridAnimated.propTypes = {
  imageMakers: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
};

export default ImageGridAnimated;
