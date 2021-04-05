import * as actionTypes from '../actions/actionTypes';
import { updateObject} from '../../shared/utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
};

const reducer = (state=initialState, action) => {
  switch (action.type) {

    case actionTypes.AUTH_START:              return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:            return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:               return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:             return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:  return setAuthRedirectPath(state, action);

    default:
      return state;
  }
};

const authStart = (state, action) => {
  return updateObject( state, { error: null, loading: true });
};
const authSuccess = (state, action) => {
  return updateObject( state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false
  });
};
const authFail = (state, action) => {
  return updateObject( state, {
    error: action.error,
    loading: false
  });
};
const authLogout = (state, action) => {
  return updateObject(state, {token: null, userId: null});
};
const setAuthRedirectPath = (state, action) => {
  return updateObject(state, {authRedirectPath: action.path});
}


export default reducer;


/*
// function has been instantiated, but 'this' is determined at call time
function sayHi() {
  console.log(`Hello from ${this.name}`);
}

// function has been instantiated and
// 'this' becomes bound to what 'this' was
// at the time the function itself was created
const alsoHi = () => {
  console.log(`Hello from ${this.name}`);
}

name = 'Paul';

const person = {
  name: 'Ai',
  sayHi,
  alsoHi,
  anotherHi() {
    console.log(`Hello from ${this.name}`); // also prints 'Ai'
  }
};

// prints Hello from Ai
person.sayHi();
sayHi.bind(     person     )();
sayHi.bind({ name: 'Paul' })();

person.alsoHi.bind(person)();

sayHi(); // prints Hello from [window object]
window.sayHi(); // essentially the same as above*/
