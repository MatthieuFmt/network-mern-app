import React, { useState } from "react";
import axios from "axios";

export default function Connect() {
  const [user, setUser] = useState({
    pseudoConnect: "user-demo",
    passwordConnect: "111111",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUser({ ...user, [name]: value });
  };

  const logIn = async (e) => {
    e.preventDefault();

    const pseudoError = document.querySelector(".pseudo.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `/users/logIn`,
      withCredentials: true,

      data: {
        pseudo: user.pseudoConnect,
        password: user.passwordConnect,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          console.log(res);
          pseudoError.innerHTML = res.data.errors.includes("Pseudo")
            ? res.data.errors
            : "";

          passwordError.innerHTML = res.data.errors.includes("Mot de passe")
            ? res.data.errors
            : "";
        } else {
          window.location = "/accueil";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={logIn}>
      <p>Bienvenue</p>
      <input
        type="text"
        placeholder="Pseudo"
        onChange={handleChange}
        name="pseudoConnect"
        defaultValue="user-demo"
      />
      <div className="error pseudo"></div>
      <input
        type="password"
        name="passwordConnect"
        id="password"
        placeholder="Mot de passe"
        onChange={handleChange}
        defaultValue="111111"
      />
      <div className="error password"></div>
      <button type="submit">Connexion</button>
    </form>
  );
}
