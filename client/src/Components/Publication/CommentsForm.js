import React, { useState } from "react";
import { addComment } from "../../actions/postAction";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/postAction";

const CommentsForm = ({ post, userData }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleComment = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(addComment(post._id, userData._id, text, userData.pseudo))
        .then(() => dispatch(getPosts()))
        .then(() => setText(""));
    }
  };
  return (
    <form className="message-comment" onSubmit={handleComment}>
      <input
        type="text"
        placeholder="Commenter la publication ..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">
        <i className="fas fa-paper-plane"></i>
      </button>
    </form>
  );
};

export default CommentsForm;
