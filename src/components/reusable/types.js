import PropTypes from 'prop-types';

const colorsType = PropTypes.shape({
  color: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
});

export { colorsType };
