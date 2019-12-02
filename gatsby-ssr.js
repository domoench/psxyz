const React = require('react');
const PropTypes = require('prop-types');
const GlobalContextProvider = require('./src/context/GlobalContextProvider').default;

const wrapRootElement = ({ element }) => <GlobalContextProvider>{element}</GlobalContextProvider>;

wrapRootElement.propTypes = {
  element: PropTypes.element,
};

exports.wrapRootElement = wrapRootElement;
