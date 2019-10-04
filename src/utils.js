// Returns a new creators array, filtered by category slug
export const filterByCategory = (catSlug, creators) => {
  const filtered = [];
  for (let i = 0; i < creators.length; i += 1) {
    // If the current creator contains the category, append it to result list
    if (creators[i].node.categories.findIndex(cat => cat.slug === catSlug) >= 0) {
      filtered.push(creators[i]);
    }
  }
  return filtered;
};

export const noop = () => {}; // TODO remove

// From https://stackoverflow.com/questions/21646738/convert-hex-to-rgba
export const hexToRGBA = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return `rgba(${r},${g},${b},${alpha})`;
  }
  return `rgba(${r},${g},${b})`;
};
