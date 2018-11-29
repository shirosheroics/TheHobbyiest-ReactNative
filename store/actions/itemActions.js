import * as actionTypes from "./actionTypes";

import axios from "axios";

export const fetchItems = () => {
  return dispatch => {
    axios
      .get("http://192.168.100.215/api/item/list/")
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
    axios
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
