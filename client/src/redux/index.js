import {combineReducers} from "redux"
import hashAnchor from "./reducer/hashAnchor";

const rootReducer = combineReducers({
  hashAnchor: hashAnchor,
});
export default rootReducer;
