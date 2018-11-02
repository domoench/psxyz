import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import {
  Grid, Row, Col,
} from 'react-bootstrap';
import Img from 'gatsby-image';
import styles from '../css/creatorThumbList.module.less';

// A list of creators, with name and picture
const CreatorThumbList = ({ creators }) => (
  <Grid>
    {
      creators.map(({ node }) => {
        const creator = node;
        const link = `/${creator.slug}`;
        const rowClasses = `show-grid ${styles.row}`;
        return (
          <Row className={rowClasses} key={creator.id}>
            <Col xs={12} s={12} md={3}>
              <Link to={link}>
                <Img fluid={creator.mainImage.fluid} />
              </Link>
            </Col>
            <Col xs={12} s={6} md={3}>
              <Link to={link}>
                <p className={styles.creator_name}>{creator.name}</p>
              </Link>
            </Col>
            <Col xs={6} s={3} md={3}>
              <CategoryList categories={creator.categories} />
            </Col>
            <Col xs={6} s={3} md={3}>
              <p className={styles.creator_loc}>{creator.location}</p>
            </Col>
          </Row>
        );
      })
    }
  </Grid>
);

CreatorThumbList.propTypes = {
  creators: PropTypes.array.isRequired,
};

// Category list component
const CategoryList = ({ categories }) => (
  <ul className={styles.cat_list}>
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
};

export default CreatorThumbList;
