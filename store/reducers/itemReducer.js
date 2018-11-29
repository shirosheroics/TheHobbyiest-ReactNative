import * as actionTypes from "../actions/actionTypes";

const initialState = {
  items: [],
  item: {},
  loading: true
};
const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ITEMS:
      console.log(action.payload);
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case actionTypes.FETCH_ITEM_DETAIL:
      return {
        ...state,
        item: action.payload
      };
    case actionTypes.ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default itemReducer;
