import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost, updatePost } from "../../actions/postAction";

export default function UpdatePost({ post, userData }) {
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
      setIsUpdated(false);
    }
  };

  const deleteQuote = () => {
    dispatch(deletePost(post._id));
  };
  return (
    <div className="update-post">
      <div className="form-update">
        {!isUpdated && <p className="description">{post.message}</p>}

        {isUpdated && (
          <form onSubmit={updateItem}>
            <textarea
              defaultValue={post.message}
              onChange={(e) => setTextUpdate(e.target.value)}
            />
            <button type="submit" className="update-btn">
              <i className="fas fa-check-square"></i>
            </button>
          </form>
        )}
      </div>
      {userData._id === post.posterId && (
        <div className="btns-edit-delete">
          <button onClick={() => setIsUpdated(!isUpdated)} className="edit">
            <i className="far fa-edit"></i>
          </button>
          <button
            onClick={() => {
              if (window.confirm("Voulez-vous supprimer cet article ?")) {
                deleteQuote();
              }
            }}
            className="delete"
          >
            <i className="far fa-trash-alt"></i>
          </button>
        </div>
      )}
    </div>
  );
}
