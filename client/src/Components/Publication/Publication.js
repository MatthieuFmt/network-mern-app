import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/postAction";
import { dateParser, isEmpty } from "../../utils";
import FollowHandler from "../../Pages/Profil/FollowHandler";
import { FriendProfil } from "./FriendProfil";
import UpdatePost from "./UpdatePost";
import Comments from "./Comments";
import CommentsForm from "./CommentsForm";

export default function Publication() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadPosts, setLoadPosts] = useState(true);
  const [toggleFriendProfil, setToggleFriendProfil] = useState(false);
  const [userFriendProfil, setUserFriendProfil] = useState({});

  const postsData = useSelector((state) => state.postsReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPosts(true);
    }
  };

  useEffect(() => {
    if (loadPosts) {
      dispatch(getPosts(count));
      setLoadPosts(false);
      setCount(count + 5);
    }

    window.addEventListener("scroll", loadMore);

    return () => {
      window.removeEventListener("scroll", loadMore);
    };
  }, [dispatch]);

  const handleFriendProfil = (id) => {
    usersData.map((user) => {
      if (user._id === id) {
        return setUserFriendProfil(user);
      }
      setToggleFriendProfil(true);
    });
  };

  return (
    <section className="content">
      {toggleFriendProfil && (
        <FriendProfil
          user={userFriendProfil}
          toggleUser={setToggleFriendProfil}
          userData={userData}
        />
      )}
      {!isEmpty(postsData[0]) &&
        postsData.map((post) => {
          return (
            <article key={post._id}>
              {!isLoading ? (
                <>
                  <div className="user-info">
                    <div className="show-user">
                      <div className="img-user">
                        <img
                          src={
                            !isEmpty(usersData[0]) &&
                            usersData
                              .map((user) => {
                                if (user._id === post.posterId) {
                                  return user.picture;
                                }
                              })
                              .join("")
                          }
                          alt="utilisateur"
                        />
                      </div>
                      <h3 className="user-name">
                        {!isEmpty(usersData[0]) &&
                          usersData.map((user) => {
                            if (user._id === post.posterId) {
                              return (
                                <button
                                  key={user._id}
                                  onClick={() => handleFriendProfil(user._id)}
                                >
                                  {" "}
                                  {user.pseudo}
                                </button>
                              );
                            }
                          })}
                      </h3>
                      {post.posterId !== userData._id && (
                        <FollowHandler
                          idToFollow={post.posterId}
                          type={"card"}
                        />
                      )}
                    </div>

                    <span>{dateParser(post.createdAt)}</span>
                  </div>

                  <UpdatePost post={post} userData={userData} />

                  <div className="media">
                    {post.picture && (
                      <img src={`${post.picture}`} alt="publication" />
                    )}
                    {post.video && (
                      <iframe
                        src={post.video}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        title={`vidéo publication ${post.message}`}
                      />
                    )}
                  </div>

                  <Comments
                    post={post}
                    userData={userData}
                    usersData={usersData}
                  />

                  <CommentsForm post={post} userData={userData} />
                </>
              ) : (
                <div className="loadings">
                  <div className="user-loading">
                    <div className="user-picture-loading loading"></div>
                    <div className="user-name-loading  loading"></div>
                    <div className="date-loading  loading"></div>
                  </div>

                  <div className="description-loading  loading"></div>

                  <div className="media-loading loading"> </div>

                  <div className="message-loading  loading"> </div>
                </div>
              )}
            </article>
          );
        })}
    </section>
  );
}
