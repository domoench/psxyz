import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styled from 'styled-components';

import {
  gridColumnsForBreakpoint,
  colorForIdx,
  overlayColors,
  gridLineColors,
  mediaQuery,
  fonts,
  fontSize,
} from '../theme';
import { hexToRGBA } from '../utils';

const gridLineW = '2px';

const rowStyles = (numCols, numElems) => {
  const numRows = Math.floor(numElems / numCols);

  const styles = [];
  for (let i = 0; i < numRows - 1; i += 1) {
    // NB: (nth-child is not zero indexed)
    // Calculate selectors for element range: [i * numCols + 1, i*numCols + numCols]
    const rowStart = i * numCols + 1;
    const rowEnd = i * numCols + numCols;
    styles.push(`
      .image-maker:nth-child(n + ${rowStart}):nth-child(-n + ${rowEnd}) {
        box-shadow: 0px ${gridLineW} 0px 0px ${colorForIdx(i, gridLineColors)};
      }
    `);
  }

  return styles;
};

const colStyles = (numCols) => {
  const styles = [];
  for (let i = 1; i < numCols; i += 1) {
    styles.push(`
      .image-maker:nth-child(${numCols}n-${i}) {
        border-right: ${gridLineW} solid ${colorForIdx(i, gridLineColors)};
      }
    `);
  }
  return styles;
};

const gridStyleForBreakpoint = (bp, numElems) => {
  const numCols = gridColumnsForBreakpoint[bp];

  return (`
    ${mediaQuery(bp)} {
      grid-template-columns: repeat(${numCols}, 1fr);
      ${colStyles(numCols).join('\n')}
      ${rowStyles(numCols, numElems).join('\n')}
    }
  `);
};

const Grid = styled.div`
  display: grid;
  ${props => gridStyleForBreakpoint('xs', props.numImageMakers)}
  ${props => gridStyleForBreakpoint('sm', props.numImageMakers)}
  ${props => gridStyleForBreakpoint('md', props.numImageMakers)}
  ${props => gridStyleForBreakpoint('lg', props.numImageMakers)}
  ${props => gridStyleForBreakpoint('xl', props.numImageMakers)}
`;

const Overlay = styled.div`
  display: ${props => (props.show ? 'flex' : 'none')};
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 1em;
  background: ${props => `linear-gradient(${hexToRGBA(props.color, 1.0)}, ${hexToRGBA(props.color, 0.3)})`};
  font-family: ${fonts.serif};

  & span.name {
    font-size: ${fontSize.body * 1.2}px;
  }
  & span.category {
    font-size: ${fontSize.body}px;
    text-decoration: underline;
  }
`;

const ImageCell = ({ className, imageMaker, idx }) => {
  const [hover, setHover] = useState(false);
  const cats = imageMaker.categories;
  return (
    <div className={className} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <Img fluid={imageMaker.mainImage.fluid} style={{ position: 'static' }} />
      <Overlay show={hover} color={colorForIdx(idx, overlayColors)}>
        <p>
          <span className="name">{`${imageMaker.name}. `}</span>
          {cats.map((cat, i) => (
            <span>
              <span className="category">
                {`${cat.name}`}
              </span>
              {i === cats.length - 1 ? '.' : '. '}
            </span>
          ))}
        </p>
      </Overlay>
    </div>
  );
};

ImageCell.propTypes = {
  className: PropTypes.string,
  imageMaker: PropTypes.object,
  idx: PropTypes.number,
};

const StyledImageCell = styled(ImageCell)`
  position: relative;
  margin-bottom: ${gridLineW};
`;

const ImageGrid = ({ imageMakers }) => {
  const duplicated = [...imageMakers, ...imageMakers, ...imageMakers, ...imageMakers, ...imageMakers]; // TODO remove
  return (
    <Grid numImageMakers={duplicated.length}>
      {
        duplicated.map(({ node }, idx) => <StyledImageCell className="image-maker" imageMaker={node} idx={idx} />)
      }
    </Grid>
  );
};

ImageGrid.propTypes = {
  imageMakers: PropTypes.array.isRequired,
};

export default ImageGrid;
