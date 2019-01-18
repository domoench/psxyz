import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import {
  Grid, FormGroup, ControlLabel,
  FormControl, HelpBlock, Button,
} from 'react-bootstrap';
import Layout from '../components/layout';

class SubmitForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleBioChange = this.handleBioChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLocChange = this.handleLocChange.bind(this);

    this.state = {
      data: props.data,
      name: '',
      bio: '',
      loc: '',
    };
  }

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

  handleBioChange(e) {
    this.setState({ bio: e.target.value });
  }

  handleLocChange(e) {
    this.setState({ loc: e.target.value });
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
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
        <Grid>
          <form name="creatorSub" action="#" method="post" netlify-honeypot="bot-field" data-netlify="true">
            <input type="hidden" name="bot-field" />

            <FormGroup controlId="formName" validationState={this.getNameValidationState()}>
              <ControlLabel>Creator Name</ControlLabel>
              <FormControl
                name="name"
                type="text"
                value={name}
                placeholder="Name"
                onChange={this.handleNameChange}
              />
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup controlId="formBio" validationState={this.getBioValidationState()}>
              <ControlLabel>Bio</ControlLabel>
              <FormControl
                name="bio"
                componentClass="textarea"
                value={bio}
                placeholder="What's your deal&#63;"
                onChange={this.handleBioChange}
              />
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup controlId="formCat">
              <ControlLabel>Categories</ControlLabel>
              <FormControl componentClass="select" name="categories[]" multiple>
                {
                  data.allContentfulCategory.edges.map(({ node }) => (
                    <option key={node.id} value={node.name}>{node.name}</option>
                  ))
                }
              </FormControl>
              <HelpBlock>Select all that apply</HelpBlock>
            </FormGroup>

            <FormGroup controlId="formLoc" validationState={this.getLocValidationState()}>
              <ControlLabel>Location</ControlLabel>
              <FormControl
                name="location"
                type="text"
                value={loc}
                placeholder="Where are you based&#63;"
                onChange={this.handleLocChange}
              />
              <HelpBlock>Format must be [City Name], [State Initials]. e.g. New York, NY</HelpBlock>
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup controlId="formLinks" validationState={null}>
              <ControlLabel>Links</ControlLabel>
              <FormControl
                name="links"
                componentClass="textarea"
                placeholder="Links to websites, images, and video"
                onChange={() => null}
              />
            </FormGroup>

            <Button type="submit">Submit</Button>
          </form>
        </Grid>
      </Layout>
    );
  }
}

SubmitForm.propTypes = {
  data: PropTypes.object.isRequired,
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
