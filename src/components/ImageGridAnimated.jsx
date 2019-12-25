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
  colorForIdx,
  gridLineColors,
  gridColumnsForBreakpoint,
  deviceSize,
  overlayColors,
} from '../theme';
import { hexToRGBA } from '../utils';
import { GlobalDispatchContext, GlobalStateContext } from '../context/GlobalContextProvider';
import SavedSVGIcon from './svg/saved';
import SourceSVGIcon from './svg/source';
import Pill from './reusable/Pill';
import Anchor from './reusable/Anchor';
import { colorsType } from './reusable/types';

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

const isVowel = (char) => {
  const c = char.toLowerCase();
  return c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u';
};

const categoryString = (categories) => {
  const n = categories.length;
  const parts = categories.map((c, idx) => {
    let part = '';
    const name = c.practitionerName;
    const startsWithVowel = isVowel(name.charAt(0));
    if (idx === 0) {
      part += startsWithVowel ? 'an ' : 'a ';
    } else if (n > 1 && idx === n - 1) {
      part += startsWithVowel ? 'and an' : 'and a ';
    }
    part += name;
    return part;
  });
  return parts.join(', ');
};

const imageMakerBlurb = imageMaker => (
  `${imageMaker.name} is ${categoryString(imageMaker.categories)}`
);

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
}) => {
  const [hover, setHover] = useState(false);
  const colors = hover ? hoverColors : defaultColors;

  return (
    <Pill
      borderRadius={20}
      colors={colors}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={clickHandler}
    >
      {isSaved ?
        (
          <OverlayButtonContent>
            <SavedSVGIcon color={colors.color} />
            REMOVE
          </OverlayButtonContent>
        ) :
        (
          <OverlayButtonContent>
            <SavedSVGIcon color={colors.color} />
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
};

const AnchorPill = ({
  href,
  defaultColors,
  hoverColors,
}) => {
  // TODO I do this hover management in many components. refactor?
  const [hover, setHover] = useState(false);
  const colors = hover ? hoverColors : defaultColors;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Anchor
        href={href}
        alt="imagemaker source url"
        textColor={colors.color}
      >
        <Pill
          borderRadius={20}
          colors={colors}
        >
          <OverlayButtonContent>
            <SourceSVGIcon color={colors.color} />
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
};


const Blurb = styled.span`
  padding: 1em;
`;

const ImageCell = ({ className, imageMaker, idx }) => {
  const dispatch = useContext(GlobalDispatchContext);
  const state = useContext(GlobalStateContext); // TODO move this up to the grid level?
  const savedImageMakerIdSet = new Set(state.savedImageMakerIds);
  const isSaved = savedImageMakerIdSet.has(imageMaker.id);

  return (
    <div className={className}>
      <RelativeWrapper>
        <Img fluid={imageMaker.mainImage.fluid} />
        <Overlay className="image-overlay" color={colorForIdx(idx, overlayColors)}>
          <Blurb>{imageMakerBlurb(imageMaker)}</Blurb>
          <OverlayButtons>
            <OverlayButton>
              {!!imageMaker.source && (
                <AnchorPill
                  href={imageMaker.source}
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
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const PositionedImageCell = styled(ImageCell)`
  position: absolute;
  ${props => `top: ${props.top}px;`}
  ${props => `left: ${props.left}px;`}
  ${props => `width: ${props.width - 2}px;`}
  ${props => `height: ${props.width - 2}px;`}
  ${props => `border-right: 2px solid ${props.rightBorderColor};`}
  ${props => `box-shadow: ${props.bottomBorderColor} 0px 2px 0px 0px;`}

  /* Slide when existing cell must change grid position */
  transition: top 2s ease 0s, left 2s ease 0s, width 2s ease 0s, height 2s ease 0s, border-color 0s ease 0s;

  /* Fade in when new cells enter the grid */
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
    const debouncedSetDimensions = _debounce(() => setVizDimensions(), 100);
    window.addEventListener('resize', debouncedSetDimensions);
    return () => {
      window.removeEventListener('resize', debouncedSetDimensions);
    };
  });

  const numCols = gridColumnsForBreakpoint[deviceSize(width)];
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
              width={cellWidth}
              left={gridCol * cellWidth}
              top={gridRow * cellWidth}
              imageMaker={node}
              key={node.id}
              idx={i}
              rightBorderColor={colorForIdx(gridCol, gridLineColors)}
              bottomBorderColor={colorForIdx(gridRow, gridLineColors)}
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
