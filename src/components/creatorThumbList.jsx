import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import {
  Grid, Row, Col, Image,
} from 'react-bootstrap';
import styles from './creatorThumbList.module.css';

// A list of creators, with name and picture
const CreatorThumbList = ({ creators }) => (
  <Grid>
    {
      creators.map(({ node }) => {
        const creator = node;
        const link = `/${creator.slug}`;
        const image = `https:${creator.mainImage.file.url}`;
        const rowClasses = `show-grid ${styles.row}`;
        return (
          <Row className={rowClasses} key={creator.id}>
            <Col xs={12} s={12} md={3}>
              <Link to={link}>
                <Image src={image} alt={creator.name} responsive />
              </Link>
            </Col>
            <Col xs={12} s={6} md={3}>
              <Link to={link}>
                <h2>
                  {creator.name}
                </h2>
              </Link>
            </Col>
            <Col xs={6} s={3} md={3}>
              <CategoryList categories={creator.categories} cssClass={styles.cat_list} />
            </Col>
            <Col xs={6} s={3} md={3}>
              <p>{creator.location}</p>
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
const CategoryList = ({ categories, cssClass }) => (
  <ul className={cssClass}>
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
  cssClass: PropTypes.string,
};

export default CreatorThumbList;
