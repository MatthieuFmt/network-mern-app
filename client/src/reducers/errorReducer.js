import { GET_POST_ERRORS } from "../actions/postAction";
import { GET_USER_ERRORS } from "../actions/userAction";

const initialState = { postsErrors: [], usersErrors: [] };

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST_ERRORS:
      return {
        postsErrors: action.payload,
        usersErrors: [],
      };

    case GET_USER_ERRORS:
      console.log(state);
      return {
        usersErrors: action.payload,
        postsErrors: [],
      };

    default:
      return state;
  }
}
