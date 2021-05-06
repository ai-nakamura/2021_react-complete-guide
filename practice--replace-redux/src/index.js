import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { combineReducers, createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
// import productReducer from './store/reducers/products';
import configureProductsStore from './hooks-store/products-store';

// const rootReducer = combineReducers({
//   shop: productReducer
// });

configureProductsStore();

// const store = createStore(rootReducer);

ReactDOM.render(
  // <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  // </Provider>,
  document.getElementById('root')
);
