import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styled, { keyframes } from 'styled-components';
import _debounce from 'lodash.debounce';

/* TODO
 * - Implement FLIP Animation?
 * - Cleanup
 */

import {
  colorForIdx,
  gridLineColors,
  gridColumnsForBreakpoint,
  deviceSize,
  overlayColors,
} from '../theme';
import { hexToRGBA } from '../utils';

const Grid = styled.div`
  width: 100vw;
  background: blue;
  position: relative;
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
  align-items: center;
  justify-content: center;
  opacity: 0;
  background: ${props => `linear-gradient(${hexToRGBA(props.color, 1.0)}, ${hexToRGBA(props.color, 0.3)})`};
  transition: opacity 0.5s ease 0s;
  color: white;
  & span {
    padding: 1em;
  }
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

const ImageCell = ({ className, imageMaker, idx }) => (
  <div className={className}>
    <RelativeWrapper>
      <Img fluid={imageMaker.mainImage.fluid} />
      <Overlay className="image-overlay" color={colorForIdx(idx, overlayColors)}>
        <span>{imageMakerBlurb(imageMaker)}</span>
      </Overlay>
    </RelativeWrapper>
  </div>
);

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
  return (
    <Grid ref={gridRef} numImageMakers={imageMakers.length}>
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
