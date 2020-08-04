import React from 'react';
import PropTypes from 'prop-types';

const SourceSVGIcon = ({ color, width }) => (
  <svg
    width={width}
    height={width}
    viewBox="0 0 15 14"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.80456 9.69177L6.74152 8.76288C6.86269 8.64171 6.99192 8.50441 7.08886 8.39132C6.73344 8.34285 6.41843 8.15707 6.12765 7.87438C5.28761 7.03432 5.27954 5.8712 6.11957 5.03116L8.74469 2.40603C9.58473 1.56599 10.7479 1.57406 11.5879 2.41412C12.436 3.26223 12.436 4.42537 11.6041 5.25731L10.9175 5.93581C11.2083 6.49316 11.394 7.3251 11.1275 8.14092L12.856 6.40429C14.3827 4.87768 14.3907 2.69681 12.856 1.16213C11.3052 -0.388716 9.12432 -0.380643 7.59771 1.14597L4.85951 3.88418C3.3329 5.41079 3.3329 7.59167 4.86759 9.13444C5.14222 9.40906 5.46531 9.61099 5.80456 9.69177ZM1.15203 12.85C2.6948 14.3847 4.87566 14.3847 6.41843 12.8419L9.14048 10.1199C10.6752 8.59326 10.6752 6.40429 9.13241 4.86961C8.85778 4.59497 8.53469 4.38497 8.20351 4.30419L7.25039 5.25731C7.12924 5.3704 7.00808 5.49964 6.91114 5.61273C7.27463 5.66119 7.58964 5.84696 7.87235 6.12967C8.71239 6.96971 8.72046 8.13285 7.88849 8.97289L5.2553 11.598C4.42334 12.438 3.25213 12.43 2.42016 11.5899C1.57204 10.7418 1.56397 9.57868 2.404 8.74672L3.0825 8.06822C2.79172 7.51089 2.60593 6.67893 2.88057 5.86313L1.14396 7.59167C-0.382662 9.12635 -0.382662 11.3072 1.15203 12.85Z"
      fill={color}
    />
  </svg>
);

SourceSVGIcon.propTypes = {
  color: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default SourceSVGIcon;
