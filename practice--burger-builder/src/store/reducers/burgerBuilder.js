import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  ingredients: null,
  error: false,
  totalPrice: 0,
  building: false
};

const BASE_BUN_PRICE = 4;
export const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

const burgerBuilder = (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.SET_INGREDIENTS:          return setIngredient(state, action);
    case actionTypes.ADD_INGREDIENT:           return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:        return removeIngredient(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredients(state, action);
    default: return state;

  }
};

const setIngredient = (state, action) => {
  const ingredients = action.ingredients
  const { salad, bacon, cheese, meat } = ingredients;
  return updateObject(state, {
    ingredients: { salad, bacon, cheese, meat },
    totalPrice: resetPrice(ingredients),
    error: false,
    building: false
  });
  // return {
  //   ...state,
  //   // ingredients: {
  //   //   salad: ingredients.salad,
  //   //   bacon: ingredients.bacon,
  //   //   cheese: ingredients.cheese,
  //   //   meat: ingredients.meat
  //   // },
  //   ingredients: { salad, bacon, cheese, meat },
  //   totalPrice: resetPrice(ingredients),
  //   error: false
  // };
};

const addIngredient = (state, action) => {
  // update ingredient obj first
  const updatedAddIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  }
  const updatedAddIngredients =
    updateObject(state.ingredients, updatedAddIngredient)

  // then the rest of the state
  const updatedAddState = {
    ingredients: updatedAddIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  };

  return updateObject(state, updatedAddState);
};

const removeIngredient = (state, action) => {

  // update ingredient obj first
  const updatedRemoveIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
  };
  const updatedRemoveIngredients =
    updateObject(state.ingredients, updatedRemoveIngredient);

  // then the rest of the state
  const updatedRemoveState = {
    ingredients: updatedRemoveIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true
  };

  return updateObject(state, updatedRemoveState);
};

const fetchIngredients = (state, action) => {
  return updateObject( state, { error: true } );
};

const resetPrice = ingredients => {
  const buns = BASE_BUN_PRICE;
  const ingredientCost =
    Object.keys(ingredients)
      .map(ingName => ingredients[ingName] * INGREDIENT_PRICES[ingName])
      .reduce((acc, currentValue) => acc + currentValue, 0);

  return buns + ingredientCost;
};

export default burgerBuilder;