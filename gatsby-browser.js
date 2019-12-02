import './src/global.css';
import PropTypes from 'prop-types';

import React from 'react';
import GlobalContextProvider from './src/context/GlobalContextProvider';

export const wrapRootElement = ({ element }) => (
  <GlobalContextProvider>{element}</GlobalContextProvider>
);

wrapRootElement.propTypes = {
  element: PropTypes.element,
};
