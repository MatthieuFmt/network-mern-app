import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import cookie from "js-cookie";

import { useSelector } from "react-redux";
import logo from "../../assets/meto-logo.png";

export default function Navbar() {
  const userData = useSelector((state) => state.userReducer);

  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logOut = async () => {
    await axios({
      method: "get",
      url: `/users/logOut`,
      withCredentials: true,
    })
      .then(() => {
        removeCookie("jwt");
      })
      .catch((err) => {
        console.log(err);
      });

    window.location = "/";
  };

  return (
    <nav>
      <div className="navigation">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <ul>
          <NavLink exact activeClassName="current" to="/profil">
            <li>
              {userData.pseudo}
              <img src={userData.picture} alt="" />
            </li>
          </NavLink>
          <NavLink exact activeClassName="current" to="/accueil">
            <li className="middle">
              <i className="fas fa-home"></i>
            </li>
          </NavLink>
          <li className="deconnect" onClick={logOut}>
            <i className="fas fa-power-off"></i>
          </li>
        </ul>
      </div>
    </nav>
  );
}
