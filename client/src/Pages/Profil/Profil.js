import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UploadImg from "./UploadImg";
import { uploadBio } from "../../actions/userAction";
import FollowHandler from "./FollowHandler";
import { dateParser, isEmpty, timestampParser } from "../../utils";
import { getPosts } from "../../actions/postAction";
import UpdatePost from "../../Components/Publication/UpdatePost";
import Navbar from "../../Components/Navbar/Navbar";

export default function Profil() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const postsData = useSelector((state) => state.postsReducer);
  const error = useSelector((state) => state.errorReducer);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  // bio

  const [bioActive, setBioActive] = useState(false);
  const [bio, setBio] = useState(userData.bio);

  const toggleBio = () => {
    setBioActive(!bioActive);
  };

  const handleBio = (e) => {
    setBio(e.target.value);
  };

  const dispatchBio = (e) => {
    e.preventDefault();
    toggleBio();
    dispatch(uploadBio(bio, userData._id));
  };

  // follows
  const [followersPopup, setFollowersPopup] = useState(false);
  const [followingPopup, setFollowingPopup] = useState(false);

  const handlePopup = (type) => {
    if (type === "followers") {
      setFollowersPopup(!followersPopup);
    }
    if (type === "following") {
      setFollowingPopup(!followingPopup);
    }
  };

  const closePopup = (e) => {
    if (e.target.className === "overlay") {
      setFollowersPopup(false);
      setFollowingPopup(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="profil-container container">
        <section className="user">
          <div className="user-profil">
            <img src={userData.picture} alt="utilisateur" />
            <UploadImg userData={userData} />
          </div>

          {!isEmpty(error) && <p className="errors">{error.usersErrors}</p>}

          <div className="profil-bottom">
            <form className="user-bio" onSubmit={dispatchBio}>
              <label htmlFor="bio" onClick={toggleBio}>
                biographie :
              </label>

              {bioActive ? (
                <textarea
                  name="bio"
                  id="bio"
                  defaultValue={userData.bio}
                  onChange={handleBio}
                ></textarea>
              ) : (
                <p onClick={toggleBio}>{userData.bio}</p>
              )}

              <button
                type="submit"
                className="update-bio"
                aria-label="éditer / valider"
              >
                {bioActive ? (
                  <i className="fas fa-check"></i>
                ) : (
                  <i className="fas fa-pencil-alt"></i>
                )}
              </button>
            </form>

            <div className="follows">
              <div
                className="followers"
                onClick={() => handlePopup("followers")}
              >
                Abonnés : {userData.followers && userData.followers.length}
              </div>
              <div
                className="following"
                onClick={() => handlePopup("following")}
              >
                Abonnements : {userData.following && userData.following.length}
              </div>
            </div>
          </div>
        </section>

        {followersPopup && (
          <div className="overlay" onClick={(e) => closePopup(e)}>
            <ul className="follows-popup">
              {!isEmpty(usersData) &&
                usersData.map((user) => {
                  for (let i = 0; i < userData.followers.length; i++) {
                    if (user._id === userData.followers[i]) {
                      return (
                        <li key={user._id}>
                          <div className="users">
                            <img src={user.picture} alt="utilisateur abonné" />
                            <h4>{user.pseudo}</h4>
                          </div>

                          <FollowHandler
                            idToFollow={user._id}
                            type={"suggestion"}
                          />
                        </li>
                      );
                    }
                  }
                  return;
                })}
            </ul>
          </div>
        )}
        {followingPopup && (
          <div className="overlay" onClick={(e) => closePopup(e)}>
            <ul className="follows-popup">
              {userData.following &&
                usersData.map((user) => {
                  for (let i = 0; i < userData.following.length; i++) {
                    if (user._id === userData.following[i]) {
                      return (
                        <li key={user._id}>
                          <div className="users">
                            <img src={user.picture} alt="utilisateur abonné" />
                            <h4>{user.pseudo}</h4>
                          </div>

                          <FollowHandler
                            idToFollow={user._id}
                            type={"suggestion"}
                          />
                        </li>
                      );
                    }
                  }
                  return;
                })}
            </ul>
          </div>
        )}

        <section className="content">
          <div className="name-date">
            <h2>{userData.pseudo}</h2>
            <span>Inscrit depuis le {dateParser(userData.createdAt)}</span>
          </div>
          <ul className="container-publication">
            {!isEmpty(postsData) &&
              postsData.map((post) => {
                if (post.posterId === userData._id) {
                  return (
                    <li className="post-card" key={post._id}>
                      <div className="top-card">
                        {/* <p className="post-message">{post.message}</p> */}
                        <UpdatePost post={post} userData={userData} />
                      </div>

                      {post.picture && (
                        <img src={post.picture} alt="publication" />
                      )}
                      {post.video && (
                        <iframe
                          src={post.video}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          title={`vidéo publication ${post.message}`}
                        />
                      )}

                      <ul>
                        {post.comments[0] &&
                          post.comments.map((comment) => {
                            return (
                              <li className="commenters" key={comment._id}>
                                <p className="commenter-pseudo">
                                  {comment.commenterPseudo}
                                </p>
                                <div className="comment-time">
                                  <p className="commenter-text">
                                    {comment.text}
                                  </p>
                                  <span className="timestamp">
                                    {timestampParser(comment.timestamp)}
                                  </span>
                                </div>
                              </li>
                            );
                          })}
                      </ul>

                      <div className="opinions">
                        <div className="likes" aria-label="likes">
                          <i className="fas fa-heart"></i> {post.likers.length}
                        </div>
                        <div className="comments" aria-label="commentaires">
                          {post.comments.length}{" "}
                          <i className="fas fa-comment-alt"></i>
                        </div>
                      </div>
                    </li>
                  );
                }
                return;
              })}
          </ul>
        </section>
      </main>
    </>
  );
}
