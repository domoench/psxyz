export const colors = {
  blue: '#245CF1',
  red: '#E52715',
  green: '#3C842A',
  yellow: '#FDD316',
  white: '#FFFFFF',
  gray: '#A0A0A0',
  black: '#000000',
};

export const fonts = {
  serif: 'Times New Roman, serif',
  sansSerif: 'Arial, sans-serif',
};

export const breakpoints = {
  xs: ['0px', '599px'],
  sm: ['600px', '959px'],
  md: ['960px', '1279px'],
  lg: ['1280px', '1919px'],
  xl: ['1920px', null],
};

export const mediaQuery = (bp) => {
  if (bp === 'xl') {
    return `@media (min-width: ${breakpoints[bp][0]})`;
  }
  return `@media (min-width: ${breakpoints[bp][0]}) and (max-width: ${breakpoints[bp][1]})`;
};

// Map from device size to number of grid columns
export const gridColumnsForBreakpoint = {
  xs: 2,
  sm: 3,
  md: 4,
  lg: 5,
  xl: 6,
};

export const gridColorForIdx = (i) => {
  const c = [colors.yellow, colors.blue, colors.red, colors.white, colors.green];
  return c[i % c.length];
};
