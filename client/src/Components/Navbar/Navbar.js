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
          <li>
            <NavLink exact activeClassName="current" to="/profil">
              {userData.pseudo}
              <img src={userData.picture} alt="" />
            </NavLink>
          </li>
          <li className="middle">
            <NavLink
              exact
              activeClassName="current"
              to="/accueil"
              aria-label="accueil"
            >
              <i className="fas fa-home"></i>
            </NavLink>
          </li>
          <li className="deconnect" onClick={logOut} aria-label="déconnexion">
            <i className="fas fa-power-off"></i>
          </li>
        </ul>
      </div>
    </nav>
  );
}
