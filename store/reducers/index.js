import { combineReducers } from "redux";

// Reducers
import itemReducer from "./itemReducer";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
  item: itemReducer,
  auth: authReducer,
  cart: cartReducer
});
