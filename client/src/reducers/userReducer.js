import {
  GET_USER,
  UPLOAD_PICTURE,
  UPLOAD_BIO,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "../actions/userAction";

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

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;

    case UPLOAD_PICTURE:
      return {
        ...state,
        picture: action.payload,
      };

    case UPLOAD_BIO:
      return {
        ...state,
        bio: action.payload,
      };

    case FOLLOW_USER:
      return {
        ...state,
        following: [...state.following, action.payload],
      };

    case UNFOLLOW_USER:
      return {
        ...state,
        following: state.following.filter((id) => id !== action.payload),
      };

    default:
      return state;
  }
}
