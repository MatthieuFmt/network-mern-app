import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPLOAD_BIO = "UPLOAD_BIO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";

export const GET_USER_ERRORS = "GET_USER_ERRORS";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`/users/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`/users/upload`, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.errors) {
          console.log(res.data.errors);
          if (res.data.erros.maxSize !== "") {
            dispatch({
              type: GET_USER_ERRORS,
              payload: res.data.errors.maxSize,
            });
          } else if (res.data.errors.format !== "") {
            dispatch({
              type: GET_USER_ERRORS,
              payload: res.data.errors.format,
            });
          }
        } else {
          dispatch({ type: GET_USER_ERRORS, payload: "" });
          console.log(res);
          // return axios
          //   .get(`/users/user/${id}`)
          //   .then((res) => {
          //     console.log(res);
          dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
          // });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const uploadBio = (bio, id) => {
  return (dispatch) => {
    return axios
      .put(`/users/bio/${id}`, { bio: bio })
      .then((res) => {
        dispatch({ type: UPLOAD_BIO, payload: bio });
      })
      .catch((err) => console.log(err));
  };
};

export const followUser = (followerId, idToFollow) => {
  return (dispatch) => {
    return axios
      .patch(`/users/follow/${followerId}`, {
        idToFollow,
      })
      .then((res) => {
        dispatch({ type: FOLLOW_USER, payload: idToFollow });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const unfollowUser = (followerId, idToUnfollow) => {
  return (dispatch) => {
    return axios
      .patch(`/users/unfollow/${followerId}`, {
        idToUnfollow,
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: UNFOLLOW_USER, payload: idToUnfollow });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
