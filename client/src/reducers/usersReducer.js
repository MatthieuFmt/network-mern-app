import { GET_USERS } from "../actions/usersAction";

const initialState = {
  _id: "",
  pseudo: "",
  picture: "",

  followers: [],
  following: [],
  likes: [],
  createdAt: "",
  bio: "",
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload;

    default:
      return state;
  }
}
