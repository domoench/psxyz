import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import {
  Button,
  TextField,
} from '@material-ui/core';
import Layout from '../components/layout';
import CategorySelect from '../components/CategorySelect';

class SubmitForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      name: '',
      bio: '',
      loc: '',
    };
  }

  /* TODO re-add validation and error messages
  getBioValidationState() {
    const { bio } = this.state;
    if (bio.length > 0) return 'success';
    return 'null';
  }

  getLocValidationState() {
    const { loc } = this.state;
    const properFormat = s => /^[A-Za-z\s]+,\s[A-Z][A-Z]/.test(s);
    if (loc.length > 0 && !properFormat(loc)) return 'error';
    if (loc.length > 0) return 'success';
    return null;
  }

  getNameValidationState() {
    const { name } = this.state;
    if (name.length > 0) return 'success';
    return 'null';
  }
  */

  handleChange(name) {
    return (e) => {
      this.setState({
        [name]: e.target.value,
      });
    };
  }

  render() {
    const {
      data,
      name,
      bio,
      loc,
    } = this.state;
    return (
      <Layout>
        <form name="creatorSub" action="#" method="post" netlify-honeypot="bot-field" data-netlify="true">
          <input type="hidden" name="bot-field" />

          <TextField
            id="name"
            name="name"
            label="Name"
            value={name}
            onChange={this.handleChange('name')}
          />
          <br />

          <TextField
            multiline
            id="bio"
            name="bio"
            label="Bio"
            value={bio}
            onChange={this.handleChange('bio')}
          />
          <br />

          <TextField
            id="loc"
            name="loc"
            label="Location"
            value={loc}
            onChange={this.handleChange('loc')}
          />
          <br />

          <CategorySelect data={data} />
          <br />

          <TextField
            multiline
            id="links"
            name="links"
            label="Links"
          />
          <br />

          <Button type="submit">Submit</Button>
        </form>
      </Layout>
    );
  }
}

SubmitForm.propTypes = {
  data: PropTypes.object.isRequired, // TODO
};

export default SubmitForm;

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
