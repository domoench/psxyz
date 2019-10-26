// Returns a new imageMakers array, filtered by category slug
export const filterByCategory = (catSlugs, imageMakers) => {
  if (catSlugs.length === 0) {
    return imageMakers;
  }

  const filtered = [];
  for (let i = 0; i < imageMakers.length; i += 1) {
    // If the current imageMaker has all the queried categories, append it to result list
    const imageMakerSlugs = new Set(imageMakers[i].node.categories.map(c => c.slug));
    if (catSlugs.every(slug => imageMakerSlugs.has(slug))) {
      filtered.push(imageMakers[i]);
    }
  }
  return filtered;
};

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
