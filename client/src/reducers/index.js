import { combineReducers } from "redux";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";
import postsReducer from "./postsReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  userReducer,
  usersReducer,
  postsReducer,
  errorReducer,
});
