import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

// A list of creators, with name and picture
const CreatorThumbList = ({ creators, sortByCategory }) => (
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
              <CategoryList categories={creator.categories} sortByCategory={sortByCategory} />
            </li>
          );
        })
      }
    </ul>
  </div>
);

CreatorThumbList.propTypes = {
  creators: PropTypes.array.isRequired,
  sortByCategory: PropTypes.func.isRequired,
};

// Category list component
const CategoryList = ({ categories, sortByCategory }) => (
  <ul>
    {
      categories.map(ctg => (
        <button type="button" key={ctg.id} onClick={() => sortByCategory(ctg.id)}>{ctg.name}</button>
      ))
    }
  </ul>
);

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
  sortByCategory: PropTypes.func.isRequired,
};

export default CreatorThumbList;
