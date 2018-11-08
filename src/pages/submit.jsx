import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Grid } from 'react-bootstrap';
import Layout from '../components/layout';

// TODO Lets start with a basic form. After that:
//  * Pull categories and create a dropdown
//  * Image upload
//  * Add validation: Try the react-bootstrap form components: https://react-bootstrap.github.io/components/forms/
//  * Implement token autocomplete for categories: https://react.rocks/example/react-token-autocomplete
const SubmitForm = ({ data }) => (
  <Layout>
    <Grid>
      <form name="creatorSub" action="#" method="POST" netlify-honeypot="bot-field" data-netlify="true">
        <input type="hidden" name="bot-field" />

        <div className="field">
          <label htmlFor="name">
            Name
            <input type="text" name="name" id="name" />
          </label>
        </div>

        <div className="field">
          <label htmlFor="bio">
            Bio
            <textarea name="bio" id="bio" rows="6" defaultValue="bio" />
          </label>
        </div>

        <div className="field">
          <CategorySelect data={data} />
        </div>

        <div className="field">
          <label htmlFor="slug">
            Slug
            <input type="text" name="slug" id="slug" />
          </label>
        </div>

        <div className="field">
          <label htmlFor="location">
            Location
            <input type="text" name="location" id="location" />
          </label>
        </div>

        <div className="field">
          <label htmlFor="images">
            Images
            <input type="file" name="images[]" id="images" multiple />
          </label>
        </div>

        <input type="submit" value="Submit" />
      </form>
    </Grid>
  </Layout>
);

SubmitForm.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SubmitForm;

const CategorySelect = ({ data }) => (
  <label htmlFor="categories">
    Categories
    <select name="categories[]" id="categories" multiple>
      {
        data.allContentfulCategory.edges.map(({ node }) => (
          <option key={node.id} value={node.name}>{node.name}</option>
        ))
      }
    </select>
  </label>
);

CategorySelect.propTypes = {
  data: PropTypes.object.isRequired,
};

export const query = graphql`
  {
    allContentfulCategory (sort: {fields: name} ){
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
`;
