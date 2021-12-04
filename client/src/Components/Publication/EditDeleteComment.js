import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "../../actions/postAction";
import { UserIdContext } from "../../Contexts/AppContext";

const EditDeleteComment = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const uid = useContext(UserIdContext);

  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId) {
        setIsAuthor(true);
      }
    };

    checkAuthor();
  }, [uid, comment.commenterId]);

  const handleEdit = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(editComment(postId, comment._id, text));
      setText("");
    }
    setEdit(false);
  };

  const handleDelete = () => {
    dispatch(deleteComment(postId, comment._id));
    setEdit(false);
  };

  return (
    <div className="edit-delete">
      {isAuthor && !edit && (
        <button
          className="edit"
          onClick={() => setEdit(!edit)}
          aria-label="éditer"
        >
          <i className="fas fa-pen"></i>
        </button>
      )}

      {isAuthor && edit && (
        <form onSubmit={handleEdit} className="form-edit">
          <textarea
            name="text"
            defaultValue={comment.text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="btn-submit" aria-label="valider">
            <i className="fas fa-check"></i>
          </button>
          <button
            onClick={() => {
              if (window.confirm("Voulez-vous supprimer cet article ?")) {
                handleDelete();
              }
            }}
            className="btn-delete"
            aria-label="supprimer"
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;
