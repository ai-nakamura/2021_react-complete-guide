import * as actionTypes from './actionTypes';
// import {ADD, DECREMENT, INCREMENT, SUBTRACT} from './actionTypes';


// action creators
// it's nice for keeping code clean and all the action logic in one place
export const increment = () => {
  return { type: actionTypes.INCREMENT
  }};
export const decrement = () => {
  return { type: actionTypes.DECREMENT }
};

export const add = (val) => {
  return { type: actionTypes.ADD, val }
};
export const subtract =  (val) => {
  return { type: actionTypes.SUBTRACT, val }
};

