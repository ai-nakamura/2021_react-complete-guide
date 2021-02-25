const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
  counter: 0
};


/* Reducer (function)
 * Only thing allowed to touch the Store/state
 * The changes that take place here are IMMUTABLE
 * Doesn't change the state directly
 *
 * @param state: old state
 * @param action: action to be taken
 * @return updated state
 */
const rootReducer = (state = initialState, action) => {
  if ( action.type = 'INC_COUNTER' ) {
    return {
      ...state,
      counter: state.counter + 1
    }
  }  if ( action.type = 'ADD_COUNTER' ) {
    return {
      ...state,
      counter: state.counter + action.value
    }
  }
  return state;
};


/* Store
 * Where the state will be stored
 */
const store = createStore(rootReducer);
console.log(store.getState());


/* Subscription
 * The code that runs whenever the state gets changed
 * Dispatch is when the change happens so it needs to be defined first
 * This will run with every dispatch that takes place
 */
store.subscribe( () => {
  console.log('[Subscription] ', store.getState());
});


/* Dispatching Action
 * Run the change that takes place
 * This is where the state actually changes
 */
store.dispatch({ type: 'INC_COUNTER'});
store.dispatch({ type: 'ADD_COUNTER', value: 10});
console.log(store.getState());

