export const colors = {
  blue: '#245CF1',
  red: '#E52715',
  green: '#3C842A',
  yellow: '#FDD316',
  white: '#FFFFFF',
  gray: '#A0A0A0',
  black: '#000000',
};

export const overlayColors = [
  colors.blue,
  colors.red,
  colors.green,
];

export const gridLineColors = [
  colors.yellow,
  colors.blue,
  colors.red,
  colors.white,
  colors.green,
];

export const fonts = {
  serif: 'Times New Roman, serif',
  sansSerif: 'Arial, sans-serif',
  druk: "'DrukWide', Arial, sans-serif",
};

export const fontSize = {
  body: 20, // TODO depricate
  imageGridPill: 16,

  title1: 24,
  body1: 22,
  display2: 30,

  mWebTitle2: 9,
  mWebBody1: 16,
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
export const deviceSizeForWidth = (width) => {
  const bps = Object.entries(breakpointsPx).sort((a, b) => a[1][0] - b[1][0]);
  let dSize = 'xs';
  bps.forEach((bp) => {
    const [bpName, bpLimits] = bp;
    if (width >= bpLimits[0]) {
      dSize = bpName;
    }
  });
  return dSize;
};

export const mediaQuery = (bp) => {
  if (bp === 'xl') {
    return `@media (min-width: ${breakpoints[bp][0]})`;
  }
  return `@media (min-width: ${breakpoints[bp][0]}) and (max-width: ${breakpoints[bp][1]})`;
};

export const minWidthMediaQuery = bp => `@media (min-width: ${breakpoints[bp][0]})`;

// Map from device size to number of grid columns
export const gridColumnsForBreakpoint = {
  xs: 2,
  sm: 3,
  md: 4,
  lg: 4,
  xl: 4,
};

export const gridColorForIdx = (i) => {
  const c = [colors.yellow, colors.blue, colors.red, colors.white, colors.green];
  return c[i % c.length];
};

export const colorForIdx = (i, colorArr) => colorArr[i % colorArr.length];
