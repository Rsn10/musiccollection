import { combineReducers } from "redux";
import loader from "./loader/reducer";

const rootReducer = combineReducers({
  loader: loader,
});

export default rootReducer;
