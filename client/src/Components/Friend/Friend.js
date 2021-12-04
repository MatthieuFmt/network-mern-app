import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../../utils";
import FollowHandler from "../../Pages/Profil/FollowHandler";
import { FriendProfil } from "../Publication/FriendProfil";

const Friend = () => {
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const [slot, setSlot] = useState(1);
  const [division, setDivision] = useState(5);
  const [translate, setTranslate] = useState(850);
  const [friendList, setFriendList] = useState([]);
  const [width, setWidth] = useState();
  const [toggleFriendProfil, setToggleFriendProfil] = useState(false);
  const [userFriendProfil, setUserFriendProfil] = useState({});
  const number = friendList.length;
  const max = Math.ceil(number / division);

  let list = document.querySelector(".friend-list");

  useEffect(() => {
    window.addEventListener("load", () => {
      const innerWidth = window.innerWidth;
      setWidth(innerWidth);

      if (innerWidth > 1000) {
        setDivision(5);
        setTranslate(850);
      }
      if (innerWidth < 1000 && innerWidth > 650) {
        setDivision(4);
        setTranslate(480);
      }

      if (innerWidth < 650) {
        setTranslate(240);
        setDivision(3);
      }
    });

    window.addEventListener("resize", () => {
      const innerWidth = window.innerWidth;
      setWidth(innerWidth);

      if (innerWidth > 1000) {
        setDivision(5);
        setTranslate(850);
      }
      if (innerWidth < 1000 && innerWidth > 650) {
        setDivision(4);
        setTranslate(480);
      }

      if (innerWidth < 650) {
        setTranslate(240);
        setDivision(3);
      }
    });
  }, [width, friendList, division]);

  const handleSlot = (type) => {
    if (type === "next") {
      if (slot >= max) {
        return;
      } else {
        list.style.transform = `translateX(-${translate * slot}px)`;
        setSlot(slot + 1);
      }
    }
    if (type === "prev") {
      setSlot(1);
      list.style.transform = `translateX(0)`;
    }
  };

  useEffect(() => {
    const notFriendList = () => {
      let array = [];
      usersData.map((user) => {
        if (
          user._id !== userData._id &&
          !user.followers.includes(userData._id)
        ) {
          return array.push(user._id);
        }
      });
      array.sort(() => 0.5 - Math.random());
      setFriendList(array);
    };

    if (!isEmpty(usersData[0]) && !isEmpty(userData._id)) {
      notFriendList();
    }
  }, [userData, usersData]);

  const handleFriendProfil = (id) => {
    console.log(id);
    usersData.map((user) => {
      if (user._id === id) {
        return setUserFriendProfil(user);
      }
      setToggleFriendProfil(true);
    });
  };

  return (
    <div
      className={friendList <= 0 ? "container-friend none" : "container-friend"}
    >
      {toggleFriendProfil && (
        <FriendProfil
          user={userFriendProfil}
          toggleUser={setToggleFriendProfil}
          userData={userData}
        />
      )}
      <h4>Vous connaissez peut-être</h4>
      {number && number > 6 && (
        <button
          className="before-btn"
          onClick={() => handleSlot("prev")}
          aria-label="boutton gauche"
        >
          <i className="fas fa-caret-square-left"></i>
        </button>
      )}
      <div className="friends">
        <ul className="friend-list">
          {friendList &&
            friendList.map((user) => {
              for (let i = 0; i < usersData.length; i++) {
                if (usersData[i]._id === user) {
                  return (
                    <li key={user}>
                      <button onClick={() => handleFriendProfil(user)}>
                        <img src={usersData[i].picture} alt="utilisateur" />
                        <span>{usersData[i].pseudo}</span>
                      </button>
                      <FollowHandler
                        idToFollow={usersData[i]._id}
                        type={"suggestion"}
                      />
                    </li>
                  );
                }
              }
            })}
        </ul>
      </div>
      {number && number > 6 && (
        <button
          className="after-btn"
          onClick={() => handleSlot("next")}
          aria-label="boutton droit"
        >
          <i className="fas fa-caret-square-right"></i>
        </button>
      )}
    </div>
  );
};

export default Friend;
