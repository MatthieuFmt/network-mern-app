import React from "react";
import FollowHandler from "../../Pages/Profil/FollowHandler";
import { dateParser } from "../../utils";

export const FriendProfil = ({ user, toggleUser, userData }) => {
  const closePopup = (e) => {
    console.log(e.target.className);
    if (e.target.className === "friend-profil-container") {
      toggleUser(false);
    }
  };
  return (
    <div className="friend-profil-container" onClick={closePopup}>
      <div className="friend-content">
        <div className="user-img-pseudo">
          <img src={user.picture} alt="" className="user-img" />
          <h3 className="user-pseudo">
            {user.pseudo}

            {userData._id !== user._id && (
              <FollowHandler idToFollow={user._id} type="card" />
            )}
          </h3>
          <div className="user-registration">
            Inscrit depuis le {dateParser(user.createdAt)}
          </div>
        </div>

        <p className="user-bio">{user.bio}</p>
        <div className="user-follows">
          <div className="user-followers">Abonnés {user.followers.length} </div>
          <div className="user-following">
            Abonnements {user.following.length}
          </div>
        </div>
      </div>
    </div>
  );
};
