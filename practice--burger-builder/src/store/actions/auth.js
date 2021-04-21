import axios from 'axios';

import * as actionTypes from './actionTypes';


// synchronous actions
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  };
};


// async to run the synchronous actions
export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout( () => {
      dispatch(logout());
    }, expirationTime * 1000);
  }
};

export const auth = (email, password, isSignup) => {
  const url_base = 'https://identitytoolkit.googleapis.com/v1/';
  const url_type = isSignup ? 'accounts:signUp' : 'accounts:signInWithPassword';
  const url_key = '?key=AIzaSyAW2sqwt0N6d-uA-MNgo8NDNlXt6AJGOTg';
  const url = url_base + url_type + url_key;

  const authData = {email, password, returnSecureToken: true};

  return dispatch => {

    dispatch(authStart());

    axios
      .post( url, authData )
      .then( response => {
        // console.log(response.data);

        const idToken =   response.data.idToken;
        const userId =    response.data.localId;
        const expiresIn = response.data.expiresIn;
        const now = Date.now();
        const expirationDate = new Date(now + (expiresIn * 1000));

        localStorage.setItem('token', idToken);
        localStorage.setItem('userId', userId);
        localStorage.setItem('expirationDate', expirationDate);

        dispatch(authSuccess(idToken, userId));
        dispatch(checkAuthTimeout(expiresIn));
      })
      .catch( err => {
        // this will only work if this is a network error
        // if '.then' throws an error, this will crash
        // bc err.response === undefined, err.response.data === crash!!
        // console.log(err.response.data.error);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    }
    else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate < new Date()) {
        dispatch(logout());
      }
      else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));

        const milliseconds = expirationDate.getTime() - Date.now();
        dispatch(checkAuthTimeout(milliseconds / 1000));
        // dispatch(checkAuthTimeout(expirationDate.getTime() - Date.now()));
      }
    }
  }
}
