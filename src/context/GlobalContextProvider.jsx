import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

export const GlobalStateContext = React.createContext();
export const GlobalDispatchContext = React.createContext();

const localStorageGet = key =>
  typeof window === 'undefined' ? null : localStorage.getItem(key);

const localStorageSet = (k, v) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(k, v);
  }
};

const initialState = {
  // State that will be persisted in local storage
  savedImageMakerIds: JSON.parse(localStorageGet('savedImageMakerIds')) || [],

  // State that will NOT be persisted in local storage
  categoryFilterSlugs: [],
};

const persistStateToLocalStorage = state => {
  Object.entries(state).forEach(([k, v]) =>
    localStorageSet(k, JSON.stringify(v))
  );
  return state;
};

function reducer(state, action) {
  switch (action.type) {
    // TODO: Don't need spearate add and delete actions. ADD_OR_DELETE can
    // choose to add or delete based on whether the item is present in the set or not
    case 'ADD_SAVED_IMAGEMAKER': {
      const savedImageMakerIdsSet = new Set(state.savedImageMakerIds);
      savedImageMakerIdsSet.add(action.value);
      const newState = {
        ...state,
        savedImageMakerIds: Array.from(savedImageMakerIdsSet),
      };
      return persistStateToLocalStorage(newState);
    }
    case 'DELETE_SAVED_IMAGEMAKER': {
      const savedImageMakerIdsSet = new Set(state.savedImageMakerIds);
      savedImageMakerIdsSet.delete(action.value);
      const newState = {
        ...state,
        savedImageMakerIds: Array.from(savedImageMakerIdsSet),
      };
      return persistStateToLocalStorage(newState);
    }
    case 'SET_CATEGORY_FILTERS': {
      const categoryFilterSet = new Set(action.value);
      return {
        ...state,
        categoryFilterSlugs: Array.from(categoryFilterSet),
      };
    }
    case 'ADD_OR_DELETE_CATEGORY_FILTER': {
      const categoryFilterSet = new Set(state.categoryFilterSlugs);
      const categorySlug = action.value;
      if (categoryFilterSet.has(categorySlug)) {
        categoryFilterSet.delete(categorySlug);
      } else {
        categoryFilterSet.add(categorySlug);
      }
      return {
        ...state,
        categoryFilterSlugs: Array.from(categoryFilterSet),
      };
    }
    case 'CLEAR_CATEGORY_FILTERS': {
      return {
        ...state,
        categoryFilterSlugs: [],
      };
    }
    default:
      throw new Error('Bad Action Type');
  }
}

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

GlobalContextProvider.propTypes = {
  children: PropTypes.element,
};

export default GlobalContextProvider;
