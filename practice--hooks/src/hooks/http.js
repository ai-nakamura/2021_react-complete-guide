import { useReducer, useCallback } from 'react';

// by placing this outside of the actual hook, it won't be
// re-rendered everytime this custom hook is called

const initialState = {
  loading: false,
  error: null,
  data: null,
  extra: null, // <-- storing ingredientId
  identifier: null
}

const httpReducer = (currHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: action.identifier
      };
    case 'RESPONSE':
      return {
        ...currHttpState,
        loading: false,
        data: action.responseData,
        extra: action.extra
      };
    case 'ERROR':
      return {
        loading: false,
        error: action.errorData
      };
      /*
      case 'CLEAR':
      return {
        ...currHttpState,
        error: null
      };
      */
    case 'CLEAR':
      return initialState;
    default:
      throw new Error('Should not get here!');
  }
}

// `https://react-hooks-update-d72ef-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
const useHttp = (url, method, body) => {
  const [ httpState, dispatchHttp ] =
    useReducer(httpReducer, initialState, e => e);

  const clear = useCallback( () => dispatchHttp({ type: 'CLEAR' }), []);

  const sendRequest = useCallback( (url, method, body, reqExtra, reqIdentifier) => {
    dispatchHttp({type: 'SEND', identifier: reqIdentifier});
    fetch( url,
      {
        method,
        body,
        headers: {'Content-Type': 'application.json'}
      })
      .then( response => {
        console.log(response);
        return response.json();
      })
      .then( responseData => {
        console.log( responseData);
        dispatchHttp({
          type: 'RESPONSE',
          responseData,
          extra: reqExtra
        });
      })
      .catch(error => {
        dispatchHttp({
          type: 'ERROR',
          errorData: error.message
        });
      });
  }, []);

  // returning these is what makes this a custom hook
  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    reqExtra: httpState.extra, // <-- ingredientId
    reqIdentifier: httpState.identifier,
    sendRequest,
    clear
  }
  // these send back a state and sets up a the function
  // (not run every re-render, just ready to be!)
};

export default useHttp;