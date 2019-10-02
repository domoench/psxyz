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
