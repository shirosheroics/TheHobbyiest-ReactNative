import * as actionTypes from "../actions/actionTypes";

const initialState = {
  cart: {},
  cartItems: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_ITEM:
      state.cart.orderItems = state.cart.orderItems.concat(action.payload);
      return {
        ...state,
        cartItems: state.cartItems.concat(action.payload),
        cart: state.cart
      };
    case actionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item !== action.payload)
      };
    case actionTypes.CHECKOUT:
      return {
        ...state,
        cartItems: []
      };
    case actionTypes.SET_CART:
      return {
        ...state,
        cart: action.payload,
        cartItems: action.payload.orderItems
      };
    case actionTypes.ADD_TO_CART:
      state.cart.orderItems = state.cart.orderItems.concat(action.payload);
      return {
        ...state,
        cartItems: state.cartItems.concat(action.payload),
        cart: state.cart
      };
    case actionTypes.SET_QUANTITY:
      let item = state.cartItems.find(
        item => item.id == action.payload.item_id
      );
      item.quantity = action.payload.quantity;
      return {
        ...state
      };
    default:
      return state;
  }
}
