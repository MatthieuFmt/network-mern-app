import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../utils";
import { addPost, getPosts } from "../../actions/postAction";

export default function PostForm() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer);

  const handleMessage = (e) => {
    setMessage(e);
  };

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setVideo("");
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (message || postPicture || video) {
      const data = new FormData();

      data.append("posterId", userData._id);
      data.append("message", message);
      if (file) data.append("file", file);
      data.append("video", video);
      console.log(data);

      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    } else {
      alert("Veuillez entrer un message");
    }
  };

  const cancelPost = () => {
    setPostPicture("");
    setMessage("");
    setVideo("");
    setFile("");
  };

  useEffect(() => {
    const handleVideo = () => {
      let findLink = video.split(" ");

      for (let i = 0; i < findLink.length; i++) {
        if (
          findLink[i].includes("https://www.yout") ||
          findLink[i].includes("https://yout")
        ) {
          let embed = findLink[i].replace("watch?v=", "embed/");
          setVideo(embed.split("&")[0]);
          setPostPicture("");
        }
      }
    };

    handleVideo();
  }, [userData, video]);

  return (
    <form className="form-publication">
      <legend>Nouvelle publication</legend>

      <input
        type="text"
        id="message"
        value={message}
        onChange={(e) => handleMessage(e.target.value)}
        placeholder="Description..."
      />

      <div className="medias">
        {isEmpty(video) && (
          <div className="picture">
            <span>
              <i className="fas fa-camera" aria-label="image"></i>
            </span>
            <label htmlFor="file" className="media-label">
              Choisissez une image
            </label>
            <input
              type="file"
              name="file"
              id="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => handlePicture(e)}
            />
          </div>
        )}
        {isEmpty(postPicture) && isEmpty(video) && (
          <div className="space"></div>
        )}
        {isEmpty(postPicture) && (
          <div className="video">
            <span>
              <i className="fas fa-video" aria-label="vidéo"></i>
            </span>
            <input
              type="text"
              id="url"
              onChange={(e) => setVideo(e.target.value)}
              value={video}
              placeholder="URL vidéo youtube"
            />
          </div>
        )}
      </div>
      {/* render */}
      {(video || message || file || postPicture) && (
        <div className="render-post">
          <div className="user">
            <img
              src={userData.picture}
              alt="utilisateur"
              className="render-user-img"
            />
            <h3 className="render-post-pseudo">{userData.pseudo}</h3>
          </div>

          <p className="message-post">{message}</p>
          {postPicture && (
            <img
              src={postPicture}
              alt="publication"
              className="render-post-media picture-post"
            />
          )}
          {video && (
            <iframe
              src={video}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title={"vidéo publication"}
              className="render-post-media video-post"
            />
          )}
        </div>
      )}

      {(video || message || file || postPicture) && (
        <div className="btns-post">
          <button className="cancel-post" onClick={cancelPost}>
            Annuler <i className="fas fa-ban"></i>
          </button>
          <button className="send-post" onClick={handlePost}>
            Publier <i className="fas fa-check"></i>
          </button>
        </div>
      )}
      {!isEmpty(error) && <p className="errors">{error.postsErrors}</p>}
    </form>
  );
}
