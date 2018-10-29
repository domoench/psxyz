import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

// A list of creators, with name and picture
const CreatorThumbList = ({ creators }) => (
  <div>
    <ul style={{ listStyle: 'none', float: 'left' }}>
      {
        creators.map(({ node }) => {
          const creator = node;
          const link = `/${creator.slug}`;
          const image = `https:${creator.mainImage.file.url}`;
          return (
            <li key={creator.id}>
              <Link to={link}>
                <p style={{ clear: 'both', padding: '1rem 0' }}>
                  {creator.name}
                  <img
                    src={image}
                    alt={creator.name}
                    style={{ maxWidth: '300px', float: 'right', padding: '0 1rem' }}
                  />
                </p>
              </Link>
              <CategoryList categories={creator.categories} />
            </li>
          );
        })
      }
    </ul>
  </div>
);

CreatorThumbList.propTypes = {
  creators: PropTypes.array.isRequired,
};

// Category list component
const CategoryList = ({ categories }) => (
  <ul>
    {
      categories.map(ctg => (
        <Link key={ctg.id} to={`/?cat=${ctg.slug}`}>{ctg.name}</Link>
      ))
    }
  </ul>
);

// <button type="button" key={ctg.id} onClick={() => filterByCategory(ctg.id)}>{ctg.name}</button>

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default CreatorThumbList;
