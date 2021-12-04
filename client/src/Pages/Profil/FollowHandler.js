import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/userAction";
import { isEmpty } from "../../utils";

export default function FollowHandler({ idToFollow, type }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const [isFollowed, setIsFollowed] = useState(false);

  const handleFollow = (e) => {
    e.preventDefault();
    dispatch(followUser(userData._id, idToFollow));
    setIsFollowed(true);
  };

  const handleUnfollow = (e) => {
    e.preventDefault();
    dispatch(unfollowUser(userData._id, idToFollow));
    setIsFollowed(false);
  };

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true);
      }
    }
  }, [idToFollow, userData.following]);

  return (
    <>
      {isFollowed && !isEmpty(userData) && (
        <div className="follow-unfollow">
          {type === "suggestion" && (
            <button
              onClick={handleUnfollow}
              className="unfollow"
              aria-label="ne plus suivre"
            >
              <i className="fas fa-window-close"></i>
            </button>
          )}

          {type === "card" && (
            <button
              onClick={handleUnfollow}
              className="unfollow-card"
              aria-label="ne plus suivre"
            >
              <i className="fas fa-check-circle"></i>
            </button>
          )}
        </div>
      )}

      {!isFollowed && !isEmpty(userData) && (
        <div className="follow-unfollow">
          {type === "suggestion" && (
            <button
              onClick={handleFollow}
              className="follow"
              aria-label="suivre"
            >
              <i className="fas fa-user-plus"></i>
            </button>
          )}

          {type === "card" && (
            <button
              onClick={handleFollow}
              className="follow-card"
              aria-label="suivre"
            >
              <i className="far fa-check-circle"></i>
            </button>
          )}
        </div>
      )}
    </>
  );
}
