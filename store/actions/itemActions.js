import * as actionTypes from "./actionTypes";

import axios from "axios";
const instance = axios.create({
  baseURL: "http://192.168.8.105/api/"
});

export const fetchItems = () => {
  return dispatch => {
    instance
      .get("item/list/")
      .then(res => res.data)
      .then(items => {
        dispatch({ type: actionTypes.FETCH_ITEMS, payload: items });
      })
      .catch(err => {
        dispatch(console.log(err.response));
      });
  };
};

export const fetchItemDetail = itemID => {
  return dispatch => {
    instance
      .get(`item/${itemID}/detail/`)
      .then(res => res.data)
      .then(item =>
        dispatch({
          type: actionTypes.FETCH_ITEM_DETAIL,
          payload: item
        })
      );
  };
};
