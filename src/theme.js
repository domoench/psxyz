export const colors = {
  blue: '#245CF1',
  red: '#E52715',
  green: '#3C842A',
  yellow: '#FDD316',
  white: '#FFFFFF',
  grayTint: '#F7F5F7', // Main background color
  gray: '#A0A0A0',
  darkGray: '#6B6B6B',
  black: '#000000',
  transparent: '#00000000',
};

export const overlayColors = [colors.blue, colors.red, colors.green];

export const gridLineColors = [
  colors.yellow,
  colors.blue,
  colors.red,
  colors.white,
  colors.green,
];

export const fonts = {
  serif: "'SuisseWorksRegular', Times New Roman, serif",
  sansSerif: 'Arial, sans-serif',
  druk: "'DrukWide', Arial, sans-serif",
};

// Distinct text styles from figma
export const fontStyles = {
  body1: {
    family: fonts.serif,
    size: 22,
    lineHeight: 1.27,
  },
  display2: {
    family: fonts.serif,
    size: 30,
    lineHeight: 1.15,
  },
  imageGridPill: {
    family: fonts.druk,
    size: 16,
    lineHeight: 1.0,
  },
  title1: {
    family: fonts.druk,
    size: 24,
    lineHeight: 1.33,
  },
  title2: {
    family: fonts.druk,
    size: 16,
    lineHeight: 1.15,
  },
  title3: {
    family: fonts.druk,
    size: 12,
    lineHeight: 1.15,
  },
};

// TODO remove
export const breakpoints = {
  xs: ['0px', '599px'],
  sm: ['600px', '959px'],
  md: ['960px', '1279px'],
  lg: ['1280px', '1919px'],
  xl: ['1920px', null],
};

export const breakpointsPx = {
  xs: [0, 599],
  sm: [600, 959],
  md: [960, 1279],
  lg: [1280, 1919],
  xl: [1920, null],
};

// Given a pixel width, find the proper breakpoint name.
export const deviceSizeForWidth = width => {
  const bps = Object.entries(breakpointsPx).sort((a, b) => a[1][0] - b[1][0]);
  let dSize = 'xs';
  bps.forEach(bp => {
    const [bpName, bpLimits] = bp;
    if (width >= bpLimits[0]) {
      dSize = bpName;
    }
  });
  return dSize;
};

export const mediaQuery = bp => {
  if (bp === 'xl') {
    return `@media (min-width: ${breakpoints[bp][0]})`;
  }
  return `@media (min-width: ${breakpoints[bp][0]}) and (max-width: ${breakpoints[bp][1]})`;
};

export const minWidthMediaQuery = bp =>
  `@media (min-width: ${breakpoints[bp][0]})`;

// Map from device size to number of grid columns
export const gridColumnsForBreakpoint = {
  xs: 2,
  sm: 3,
  md: 4,
  lg: 4,
  xl: 4,
};

export const gridColorForIdx = i => {
  const c = [
    colors.yellow,
    colors.blue,
    colors.red,
    colors.white,
    colors.green,
  ];
  return c[i % c.length];
};

export const colorForIdx = (i, colorArr) => colorArr[i % colorArr.length];

export const hoverStyles = {
  transition: '0.35s',
  cursor: 'pointer',
};
