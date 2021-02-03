import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import axios from 'axios';

console.log(axios.defaults.headers);

// you can setup defaults for all your http requests like this
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';


// only relates to http REQUESTS
// there is no error if we get anything back from the server
axios.interceptors.request.use( response => {
  // console.log(request);
  // We can edit the response here
  return response;
}, error => {
  console.log(error);
  // this returns the config anyways
  // this allows us to make a global log file
  // + let the local files do their own catch methods
  return Promise.reject(error);
});

// this one deal with the RESPONSE
axios.interceptors.response.use( response => {
  // Any status code that lie within the
  // range of 2xx cause this function to trigger
  console.log('axios.interceptors.response');
  console.log(response);
  return response;
}, error => {
  // Any status codes that falls outside the
  // range of 2xx cause this function to trigger
  console.log(error);
  return Promise.reject(error);
});


ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
