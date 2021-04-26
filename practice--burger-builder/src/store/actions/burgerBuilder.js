import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};


// synchronous action creators, to be used in the next function with asynchronous code
export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};
export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

// returning a function that will dispatch an action
// possible due to redux-thunk being in the middleware
export const initIngredients = () => {

  return dispatch => {
    setTimeout( () => {
      axios
        // .get('http://react-my-burger-8295f-default-rtdb.firebaseio.com/ingredients')
        .get('https://react-my-burger-8295f-default-rtdb.firebaseio.com/ingredients.json')
        .then(response => dispatch( setIngredients(response.data) ))
        .catch(error   => dispatch( fetchIngredientsFailed() ));
    }, 500);
  };
};