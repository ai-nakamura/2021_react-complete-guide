import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false
};

const BASE_BUN_PRICE = 4;
export const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}


const resetPrice = ingredients => {
  const buns = BASE_BUN_PRICE;
  const ingredientCost =
    Object.keys(ingredients)
      .map(ingName => ingredients[ingName] * INGREDIENT_PRICES[ingName])
      .reduce((acc, currentValue) => acc + currentValue, 0);

  return buns + ingredientCost;
}


const burgerBuilder = (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.SET_INGREDIENTS:

      const ingredients = action.ingredients
      const { salad, bacon, cheese, meat } = ingredients;
      return {
        ...state,
        // ingredients: {
        //   salad: ingredients.salad,
        //   bacon: ingredients.bacon,
        //   cheese: ingredients.cheese,
        //   meat: ingredients.meat
        // },
        ingredients: { salad, bacon, cheese, meat },
        totalPrice: resetPrice(ingredients),
        error: false
      };

    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      }

    default:
      return {
        ...state
      }

  }
};

export default burgerBuilder;