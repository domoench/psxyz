import React from 'react';
import PropTypes from 'prop-types';

import { StyledPath } from '../reusable/styled';

const FiltersSVGIcon = ({ color, width }) => (
  <svg
    width={width}
    height={width}
    viewBox="0 0 17 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <StyledPath
      d="M11.1128 4.07121C11.9644 4.07121 12.7018 3.53115 13.003 2.78338H15.8487C16.233 2.78338 16.5653 2.45103 16.5653 2.03561C16.5653 1.62018 16.233 1.28784 15.8487 1.28784H13.003C12.7018 0.540045 11.9644 0 11.1128 0C10.2611 0 9.52374 0.540045 9.22256 1.28784H0.747765C0.33234 1.28784 0 1.62018 0 2.03561C0 2.45103 0.33234 2.78338 0.747765 2.78338H9.22256C9.52374 3.53115 10.2611 4.07121 11.1128 4.07121ZM11.1128 2.95994C10.5935 2.95994 10.1884 2.54451 10.1884 2.03561C10.1884 1.50592 10.5935 1.11127 11.1128 1.11127C11.632 1.11127 12.0371 1.50592 12.0371 2.03561C12.0371 2.54451 11.632 2.95994 11.1128 2.95994ZM0.706225 6.25222C0.33234 6.25222 0 6.58457 0 6.99999C0 7.42582 0.33234 7.74776 0.706225 7.74776H3.58308C3.88427 8.50593 4.62166 9.0356 5.47329 9.0356C6.32494 9.0356 7.06233 8.50593 7.36351 7.74776H15.8175C16.233 7.74776 16.5653 7.42582 16.5653 6.99999C16.5653 6.58457 16.233 6.25222 15.8175 6.25222H7.36351C7.06233 5.50445 6.32494 4.97476 5.47329 4.97476C4.62166 4.97476 3.88427 5.50445 3.58308 6.25222H0.706225ZM5.47329 7.92432C4.954 7.92432 4.54896 7.51928 4.54896 6.99999C4.54896 6.4807 4.954 6.07566 5.47329 6.07566C5.9926 6.07566 6.39764 6.4807 6.39764 6.99999C6.39764 7.51928 5.9926 7.92432 5.47329 7.92432ZM11.1128 14C11.9644 14 12.7018 13.4703 13.003 12.7122H15.8487C16.233 12.7122 16.5653 12.3902 16.5653 11.9644C16.5653 11.549 16.233 11.2166 15.8487 11.2166H13.003C12.7018 10.4688 11.9644 9.93917 11.1128 9.93917C10.2611 9.93917 9.52374 10.4688 9.22256 11.2166H0.747765C0.33234 11.2166 0 11.549 0 11.9644C0 12.3902 0.33234 12.7122 0.747765 12.7122H9.22256C9.52374 13.4703 10.2611 14 11.1128 14ZM11.1128 12.8887C10.5935 12.8887 10.1884 12.4837 10.1884 11.9644C10.1884 11.4451 10.5935 11.0401 11.1128 11.0401C11.632 11.0401 12.0371 11.4451 12.0371 11.9644C12.0371 12.4837 11.632 12.8887 11.1128 12.8887Z"
      fill={color}
    />
  </svg>
);

FiltersSVGIcon.propTypes = {
  color: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default FiltersSVGIcon;
