import React, { useReducer, /*useState, */useEffect, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import useHttp from '../../hooks/http';


const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get here!');
  }
}

/* moved into custom hook at '../../hooks/http'
const httpReducer = (currHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null };
    case 'RESPONSE':
      return { ...currHttpState, loading: false }
    case 'ERROR':
        return { loading: false, error: action.errorData };
    case 'CLEAR':
      return { ...currHttpState, error: null};
    default:
      throw new Error('Should not get here!');
  }
}
*/
const Ingredients = () => {
  const [ userIngredients, dispatch ] = useReducer(ingredientReducer, []);
  const {
    isLoading,
    data,
    error,
    reqExtra,
    reqIdentifier,
    sendRequest,
    clear
  } = useHttp();

  /* moved to custom hook '../../hooks/http'
  const [ httpState, dispatchHttp ] = useReducer(httpReducer, {loading: false, error: null});
   */
  /* replaced by useReducer so it won't run an extra time when the page is first loaded
  const [ userIngredients, setUserIngredients ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(false);

  runs after every render cycle
  second param - list of dependencies.
   - If not there, it's after every render
   - If there, runs when dependency changes
       - empty array = works like componentDidMount, only runs once
  useEffect(() => {
    fetch('https://react-hooks-update-d72ef-default-rtdb.firebaseio.com/ingredients.json')
      .then(response => response.json())
      .then(responseData => {
        const loadedIngredients = [];
        for (const ingredientKey in responseData) {
          loadedIngredients.push({
            id: ingredientKey,
            title: responseData[ingredientKey].title,
            amount: responseData[ingredientKey].amount
          });
        }
        setUserIngredients(loadedIngredients);
      });
  }, []);
  */

  useEffect( () => {
    if (!isLoading && reqExtra === 'REMOVE_INGREDIENT') {
      dispatch({
        type: 'DELETE',
        id: reqExtra
      });
    }
    else if (!isLoading && !error && reqIdentifier === 'ADD_INGREDIENT'){
      dispatch({
        type: 'ADD',
        ingredient:
          {
            id: data.name,
            ...reqExtra
          }
      });
    }
  }, [data, reqExtra, reqIdentifier, isLoading, error]);


  const filteredIngredientsHandler =
    useCallback(filteredIngredients => {
      // setUserIngredients(filteredIngredients);
      dispatch({ type: 'SET', ingredients: filteredIngredients})
    }, []);

  const addIngredientHandler = useCallback(ingredient => {
    sendRequest(
      'https://react-hooks-update-d72ef-default-rtdb.firebaseio.com/ingredients.json',
      'POST',
      JSON.stringify(ingredient),
      ingredient,
      'ADD_INGREDIENT'
    );
    /*
    // setIsLoading(true);
    dispatchHttp({ type: 'SEND' });
    fetch(
      'https://react-hooks-update-d72ef-default-rtdb.firebaseio.com/ingredients.json', {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: { 'Content-Type': 'application/json'}
      })
      .then(response => {
        // setIsLoading(false);
        dispatchHttp({ type: 'RESPONSE' });
        return response.json();
      })
      .then( responseData => {
        // setUserIngredients(prevIngredients => [
        //   ...prevIngredients,
        //   { id: responseData.name, ...ingredient }
        // ]);
        dispatch({ type: 'ADD', ingredient: { id: responseData.name, ...ingredient }})
      })
      .catch();
      */
  }, [sendRequest]);

  const removeIngredientHandler = useCallback(ingredientId => {
    console.log('removing')
    sendRequest(
      `https://react-hooks-update-d72ef-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
      'DELETE',
      null,
      ingredientId,
      'REMOVE_INGREDIENT'
    );
    /* moved to custom hook '../../hooks/http'
      // setIsLoading(true);
      dispatchHttp({type: 'SEND'});
      fetch(
        `https://react-hooks-update-d72ef-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`, {
          method: 'DELETE',
        })
        .then(_ => {
          // setIsLoading(false);
          dispatchHttp({type: 'RESPONSE'});
          // setUserIngredients(prevIngredients =>
          //   prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
          // );
          dispatch({type: 'DELETE', id: ingredientId});
        })
        .catch(error => {
          // setError(error.message);
          // setIsLoading(false);
          dispatchHttp({type: 'ERROR', errorData: error.message});
        });
  */
  }, [sendRequest]);

// const clearError = () => setError(null);
  const clearError = clear(); // can also call in the JSX since it's so small

  const ingredientList = useMemo(() => {
    return <IngredientList
      onRemoveItem={removeIngredientHandler}
      ingredients={userIngredients}
    />
  }, [userIngredients, removeIngredientHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
