import * as actionTypes from '../actions';

const initialState = {
  results: []
}

const result = (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.STORE_RESULTS:
      return {
        ...state,
        results: state.results.concat({
          id: new Date(),
          value: action.result
        })
      }

    case actionTypes.DELETE_RESULTS:
      const updatedArray = state.results.filter( result =>
        result.id !== action.resultElId
      );
      console.log(updatedArray);
      return {
        ...state,
        results: updatedArray
      }
  }

  return state;
};

export default result;