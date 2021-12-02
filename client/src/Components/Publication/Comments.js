import React, { useState } from "react";
import { isEmpty, timestampParser } from "../../utils";
import LikeButton from "./LikeButton";
import EditeDeleteComment from "./EditDeleteComment";

export default function Comments({ post, userData, usersData }) {
  const [toggleComments, setToggleComments] = useState(false);
  return (
    <div className="container-comments">
      <div className="opinions">
        <div className="likes">
          <LikeButton post={post} />
          <button>{post.likers.length}</button>
          {/* onClick affiche les likers */}
        </div>

        <button
          onClick={() => setToggleComments(!toggleComments)}
          className="toggle-comment"
        >
          {post.comments.length} commentaires{" "}
          <i className="fas fa-comment-alt"></i>
        </button>
      </div>

      {toggleComments &&
        post.comments.map((comment) => {
          return (
            <div
              key={comment._id}
              className={
                comment.commenterId === userData._id
                  ? "text-comment my-comment"
                  : "text-comment"
              }
            >
              <div className="commenters">
                <img
                  src={
                    !isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === comment.commenterId)
                          return user.picture;
                        else return null;
                      })
                      .join("")
                  }
                  alt="utilisateur"
                />

                <span className="commenter-pseudo">
                  {comment.commenterPseudo}
                </span>
              </div>

              <div className="commenter-text">
                {comment.text}

                <EditeDeleteComment comment={comment} postId={post._id} />
              </div>

              <div className="comment-date">
                {timestampParser(comment.timestamp)}
              </div>
            </div>
          );
        })}
    </div>
  );
}
