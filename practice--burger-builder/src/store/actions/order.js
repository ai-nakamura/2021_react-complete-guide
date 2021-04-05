import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// synchronous - returns the action
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id.toString(),
    orderData
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

// asynchronous - returns a dispatch that runs the function that returns the action
export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios
      .post('/orders.json?auth=' + token, orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        console.log(error);
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};


// synchronous code for fetching orders
export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
};

// asynchronous code for fetching orders
export const fetchOrders = (token, userId) => {
  return dispatch => {
  dispatch(fetchOrdersStart());

    // const queryParams = '?auth=' + token;
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get('/orders.json' + queryParams)
      .then( response => {
        const fetchedOrders = [];
        for (let item in response.data) {
          fetchedOrders.push({
            ...response.data[item],
            id: item
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch( error => {
        dispatch(fetchOrdersFail(error));
      });
  }
}