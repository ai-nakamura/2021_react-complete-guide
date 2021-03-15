import * as actionTypes from './actionTypes';
// import {DELETE_RESULTS, STORE_RESULTS} from './actionTypes';

// asynchronous action creators
// only synchronous code is the one that'll change the state
const saveResult = res => {
  return {
    type: actionTypes.STORE_RESULTS,
    result: res
  }
}

// async action returns a function to be dispatched
// this never reaches the burgerBuilder, so it leaves no footprint
export const storeResult = res => {
  return (dispatch, getState) => {
    setTimeout( () => {
      // const oldCounter = getState().ctr.counter;
      // console.log('[result.js] async: old counter=' + oldCounter);
      dispatch(saveResult(res));
    }, 2000);

  }

};
export const deleteResult = id => {
  return {
    type: actionTypes.DELETE_RESULTS,
    resultElId: id}
};