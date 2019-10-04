import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { Link } from 'gatsby';

import styled from 'styled-components';
import {
  colors,
  gridColumnsForBreakpoint,
  gridColorForIdx,
  mediaQuery,
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
        box-shadow: 0px ${gridLineW} 0px 0px ${gridColorForIdx(i)};
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
        border-right: ${gridLineW} solid ${gridColorForIdx(i)};
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
  justify-content: center;
  align-items: center;
  color: white;
  padding: 1em;
  background: ${props => hexToRGBA(props.color, 0.65)};

  & span {
    width: 100%;
    margin: 1em;
  }
`;

const ImgWrap = styled.div`
  position: relative;
  margin-bottom: ${gridLineW};
`;

const ImageCell = ({ imageMaker, idx }) => {
  const [hover, setHover] = useState(false);
  return (
    <ImgWrap className="image-maker" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <Img fluid={imageMaker.mainImage.fluid} style={{ position: 'static' }} />
      <Overlay show={hover} color={gridColorForIdx(idx)}>
        <span>{imageMaker.bio.bio}</span>
      </Overlay>
    </ImgWrap>
  );
};

ImageCell.propTypes = {
  imageMaker: PropTypes.object,
  idx: PropTypes.number,
};

const ImageGrid = ({ imageMakers }) => {
  const duplicated = [...imageMakers, ...imageMakers, ...imageMakers, ...imageMakers, ...imageMakers]; // TODO remove
  return (
    <Grid numImageMakers={duplicated.length}>
      {
        duplicated.map(({ node }, idx) => <ImageCell imageMaker={node} idx={idx} />)
      }
    </Grid>
  );
};

ImageGrid.propTypes = {
  imageMakers: PropTypes.array.isRequired,
};

const StyledCategoryList = styled.ul`
  list-style: none;
  text-align: center;
  font-size: 18px;
  margin: 0;
  & a {
    color: ${colors.blue};
  }
`;

const CategoryList = ({ categories }) => (
  <StyledCategoryList>
    {
      categories.map(ctg => (
        <li key={ctg.id}>
          <Link to={`/?cat=${ctg.slug}`}>{ctg.name}</Link>
        </li>
      ))
    }
  </StyledCategoryList>
);

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default ImageGrid;
