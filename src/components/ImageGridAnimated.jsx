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
} from '../theme';

const Grid = styled.div`
  width: 100vw;
  background: blue;
  position: relative;
`;

const ImageCell = ({ className, imageMaker }) => (
  <div className={className}>
    <Img fluid={imageMaker.mainImage.fluid} />
  </div>
);

ImageCell.propTypes = {
  className: PropTypes.string,
  imageMaker: PropTypes.object,
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
              i={i}
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
