import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

export const GlobalStateContext = React.createContext();
export const GlobalDispatchContext = React.createContext();

const savedImageMakerIdsKey = 'savedImageMakerIds';

// TODO clean up. Create a schema of keys and default values?
const initialState = {
  [savedImageMakerIdsKey]: JSON.parse(localStorage.getItem(savedImageMakerIdsKey)) || [],
};

console.log('initialState', initialState);

const persistStateToLocalStorage = (state) => {
  Object.entries(state).forEach(([k, v]) => localStorage.setItem(k, JSON.stringify(v)));
  return state;
};

function reducer(state, action) {
  switch (action.type) {
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
