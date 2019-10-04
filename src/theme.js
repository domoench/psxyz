export const colors = {
  blue: '#428bca',
  gray: '#a0a0a0',
  black: '#000000',
};

export const breakpoints = {
  xs: '0px',
  sm: '600px',
  md: '960px',
  lg: '1280px',
  xl: '1920px',
};

// Map from device size to number of grid columns
export const gridColumnsForBreakpoint = {
  xs: 2,
  sm: 3,
  md: 4,
  lg: 5,
  xl: 6,
};

export const gridColorForColumn = (i) => {
  const c = ['red', 'blue', 'yellow', 'green', 'orange']; // TODO
  return c[i % c.length];
};
