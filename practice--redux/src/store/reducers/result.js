import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
  results: []
}

export const deleteResult = (state, action) => {
  const updatedArray = state.results.filter( result =>
    result.id !== action.resultElId
  );
  return updateObject(state, {result: updatedArray})
}

const reducer = (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.STORE_RESULTS:
      return updateObject( state, {
        results:
          state.results.concat({
            id: new Date(),
            value: action.result * 2
          })
      });

    case actionTypes.DELETE_RESULTS:
      return deleteResult(state, action);
  }

  return state;
};

export default reducer;