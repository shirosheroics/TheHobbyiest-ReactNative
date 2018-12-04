// Types
import * as actionTypes from "./actionTypes";
import axios from "axios";
import { fetchProfile } from "./authActions";

// Add item to Cart

export const createOrder = () => {
  return dispatch => {
    axios
      .post("http://127.0.0.1:8000/api/order/create/")
      .then(res => res.data)
      .then(cart => {
        dispatch({
          type: actionTypes.SET_CART,
          payload: { ...cart, orderItems: [] }
        });
      })
      .catch(err => {
        dispatch(console.log(err.response));
      });
  };
};

export const createOrderItem = (item_id, order_id, quantity) => {
  return dispatch => {
    axios
      .post("http://127.0.0.1:8000/api/orderitem/create/", {
        item: item_id,
        order: order_id,
        quantity: quantity
      })
      .then(res => res.data)
      .then(item => {
        console.log(item);
        dispatch({
          type: actionTypes.ADD_TO_CART,
          payload: item
        });
      })
      .catch(err => {
        dispatch(console.log(err.response));
      });
  };
};

export const setCart = profile => dispatch => {
  let cart = profile.orders.find(order => order.status === "C");
  if (cart) {
    dispatch({
      type: actionTypes.SET_CART,
      payload: cart
    });
  } else {
    dispatch(createOrder());
  }
};

export const setStock = (item, quantity) => {
  return dispatch => {
    console.log("stock update");
    axios
      .put(`http://127.0.0.1:8000/api/item/${item.id}/stock-update/`, {
        stock: item.stock - quantity
      })
      .then(res => {
        dispatch({ type: actionTypes.SET_STOCK, payload: res.data });
      })
      .catch(err => {
        console.log(err.response);
      });
  };
};

export const setStatus = (order_id, status, navigation, address_id) => {
  return dispatch => {
    console.log("TEST");
    axios
      .put(`http://127.0.0.1:8000/api/order/${order_id}/status-update/`, {
        status: status,
        address: address_id
      })
      .then(() => {
        dispatch(createOrder());
      })
      .then(() => navigation.navigate("Profile"))
      .catch(err => {
        console.log(err.response);
      });
  };
};

// Remove item from cart
export const removeItemFromCart = item => dispatch => {
  dispatch({
    type: actionTypes.REMOVE_ITEM,
    payload: item
  });
};

// Checkout
export const checkoutCart = () => dispatch => {
  dispatch({
    type: actionTypes.CHECKOUT
  });
};

export const updateOrderItemInCart = (orderItem_id, quantity, navigation) => {
  return dispatch => {
    axios
      .put(
        `http://127.0.0.1:8000/api/orderitem/${orderItem_id}/quantity-update/`,
        {
          quantity: quantity
        }
      )
      .then(res => res.data)
      .then(() => {
        dispatch({
          type: actionTypes.SET_QUANTITY,
          payload: { item_id: orderItem_id, quantity: quantity }
        });
      })
      .catch(err => {
        dispatch(console.log(err.response));
      });
  };
};
