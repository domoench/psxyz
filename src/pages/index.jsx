import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import CreatorThumbList from '../components/creatorThumbList';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creators: props.data.allContentfulCreator.edges,
    };
    this.sortByCategory = this.sortByCategory.bind(this);
  }

  sortByCategory(categoryId) {
    const { creators } = this.state;
    const updatedCreators = creators.slice();
    let i = 0;
    let curr = 0;
    // The result array has 2 partitions, the left partition [0,i) are all creators
    // with categories including categoryId
    while (curr < updatedCreators.length) {
      // If the current creator contains the category, append it to the left partition
      if (updatedCreators[curr].node.categories.findIndex(cat => cat.id === categoryId) >= 0) {
        // Swap the current creator with that at i (grow the left partition)
        const temp = updatedCreators[i];
        updatedCreators[i] = updatedCreators[curr];
        updatedCreators[curr] = temp;
        i += 1;
      }
      curr += 1;
    }
    this.setState({ creators: updatedCreators });
  }

  render() {
    const { creators } = this.state;
    return (
      <Layout>
        <CreatorThumbList creators={creators} sortByCategory={this.sortByCategory} />
      </Layout>
    );
  }
}

Index.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Index;

export const query = graphql`
  {
    allContentfulCreator (sort: {fields: fields___sortId}) {
      edges {
        node {
          id
          slug
          name
          images {
            id
            file {
              url
            }
          }
          bio {
            id
            bio
          }
          mainImage {
            file {
              url
            }
          }
          categories {
            id
            name
          }
        }
      }
    }
  }
`;
