import React, { useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { likePost, unlikePost } from "../../actions/postAction";
import { UserIdContext } from "../../Contexts/AppContext";

export default function LikeButton({ post }) {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UserIdContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (post.likers.includes(uid)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [uid, post.likers, liked]);

  const like = () => {
    setLiked(true);
    dispatch(likePost(post._id, uid));
  };

  const unlike = () => {
    setLiked(false);
    dispatch(unlikePost(post._id, uid));
  };
  return (
    <>
      {liked ? (
        <button
          onClick={() => unlike()}
          className="unlike"
          aria-label="je n'aime pas"
        >
          <i className="fas fa-heart"></i>
        </button>
      ) : (
        <button onClick={like} className="like" aria-label="j'aime">
          <i className="far fa-heart"></i>
        </button>
      )}
    </>
  );
}
