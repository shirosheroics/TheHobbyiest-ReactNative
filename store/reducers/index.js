import { combineReducers } from "redux";

// Reducers
import itemReducer from "./itemReducer";
import authReducer from "./authReducer";

export default combineReducers({
  item: itemReducer,
  auth: authReducer
});
