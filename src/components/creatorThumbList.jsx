import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Grid } from '@material-ui/core';
import Img from 'gatsby-image';
import styles from './creatorThumbList.module.less';

// A list of creators, with name and picture
// TODO: Does a grid really give you anyhting here? just style rows yourself?
const CreatorThumbList = ({ creators }) => (
  creators.map(({ node }) => {
    const creator = node;
    const link = `/${creator.slug}`;
    return (
      <Grid container spacing={24} key={creator.id} className="creatorRow">
        <Grid item xs={12} s={12} md={3}>
          <Link to={link}>
            <Img fluid={creator.mainImage.fluid} />
          </Link>
        </Grid>

        <Grid item xs={12} s={6} md={3}>
          <div className={styles.creatorName}>
            <Link to={link}>{creator.name}</Link>
          </div>
        </Grid>

        <Grid item xs={6} s={3} md={3}>
          <CategoryList categories={creator.categories} className={styles.catList} />
        </Grid>

        <Grid item xs={6} s={3} md={3}>{creator.location}</Grid>
      </Grid>
    );
  })
);

CreatorThumbList.propTypes = {
  creators: PropTypes.array.isRequired,
};

const CategoryList = ({ categories, className }) => (
  <ul className={className}>
    {
      categories.map(ctg => (
        <li key={ctg.id}>
          <Link to={`/?cat=${ctg.slug}`}>{ctg.name}</Link>
        </li>
      ))
    }
  </ul>
);

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
  className: PropTypes.object.isRequired,
};

export default CreatorThumbList;
