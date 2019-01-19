import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';

class CategorySelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
    this.handleChangeMultiple = this.handleChangeMultiple.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ categories: event.target.value });
  }

  handleChangeMultiple(event) {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      categories: value,
    });
  }

  render() {
    const { data } = this.props;
    const { categories } = this.state;
    return (
      <FormControl name="categories">
        <InputLabel htmlFor="categories">Categories</InputLabel>
        <Select
          multiple
          autoWidth
          value={categories}
          onChange={this.handleChange}
          input={<Input id="categories" name="categories" />}
        >
          {
            data.allContentfulCategory.edges.map(({ node }) => (
              <MenuItem key={node.id} value={node.name}>{node.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    );
  }
}

CategorySelect.propTypes = {
  data: PropTypes.object.isRequired, // TODO
};

export default CategorySelect;
