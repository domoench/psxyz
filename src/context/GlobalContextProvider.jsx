import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

export const GlobalStateContext = React.createContext();
export const GlobalDispatchContext = React.createContext();

const initialState = {
  imageMakers: [],
  savedImageMakerIds: [],
};

function reducer(state, action) {
  console.log('reducer state', state);
  console.log('reducer action', action);
  switch (action.type) {
    case 'ADD_SAVED_IMAGEMAKER': {
      const savedImageMakerIdsSet = new Set(state.savedImageMakerIds);
      savedImageMakerIdsSet.add(action.value);
      return {
        ...state,
        savedImageMakerIds: Array.from(savedImageMakerIdsSet),
      };
    }
    case 'DELETE_SAVED_IMAGEMAKER': {
      const savedImageMakerIdsSet = new Set(state.savedImageMakerIds);
      savedImageMakerIdsSet.delete(action.value);
      return {
        ...state,
        savedImageMakerIds: Array.from(savedImageMakerIdsSet),
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
