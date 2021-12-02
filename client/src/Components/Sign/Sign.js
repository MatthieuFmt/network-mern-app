import React, { useState, useRef } from "react";
import axios from "axios";

export default function Sign() {
  // handle form
  const [user, setUser] = useState({
    pseudoSign: "",
    passwordSign: "",
    confirmPassword: "",
    checked: false,
  });

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUser({ ...user, [name]: value });
  };

  // checkbox
  const check = useRef();

  const handleCheck = () => {
    user.checked = !user.checked;
  };

  // register
  const signUp = async (e) => {
    e.preventDefault();

    const pseudoError = document.querySelector(".pseudo-sign.error");
    const passwordError = document.querySelector(".password-sign.error");
    const confirmPasswordError = document.querySelector(
      ".confirm-password-sign.error"
    );
    const checkboxError = document.querySelector(".checkbox.error");

    pseudoError.innerHTML = "";
    passwordError.innerHTML = "";
    confirmPasswordError.innerHTML = "";
    checkboxError.innerHTML = "";

    if (
      user.passwordSign !== user.confirmPassword ||
      !user.checked ||
      user.passwordSign.length < 5 ||
      user.pseudoSign.length < 3
    ) {
      if (user.passwordSign !== user.confirmPassword) {
        confirmPasswordError.innerHTML =
          "Les mots de passe ne correspondent pas";
      }
      if (!user.checked) {
        checkboxError.innerHTML =
          "Veuillez valider les conditions d'utilisation";
      }
      if (user.passwordSign.length < 5) {
        passwordError.innerHTML = "5 caractères minimum";
      }
      if (user.pseudoSign.length < 3) {
        pseudoError.innerHTML = "3 caractères minimum";
      }
    } else {
      axios({
        method: "post",
        url: `/users/register`,
        withCredentials: true,
        data: {
          pseudo: user.pseudoSign,
          password: user.passwordSign,
        },
      })
        .then((res) => {
          if (res.data.errors) {
            if (res.data.errors.pseudo) {
              pseudoError.innerHTML = res.data.errors.pseudo;
            }
          } else {
            axios({
              method: "post",
              url: `/users/logIn`,
              withCredentials: true,

              data: {
                pseudo: user.pseudoSign,
                password: user.passwordSign,
              },
            });
          }
          window.location = "/accueil";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <form onSubmit={signUp}>
      <p>Créer un compte</p>
      <input
        type="text"
        name="pseudoSign"
        placeholder="Pseudo"
        value={user.pseudoSign}
        onChange={handleChange}
      />
      <div className="error pseudo-sign"></div>

      <input
        type="password"
        name="passwordSign"
        id="password"
        placeholder="Mot de passe"
        value={user.passwordSign}
        onChange={handleChange}
      />
      <div className="error password-sign"></div>

      <input
        type="password"
        name="confirmPassword"
        id="confirm-password"
        placeholder="Confirmer mot de passe"
        value={user.confirmPassword}
        onChange={handleChange}
      />
      <div className="error confirm-password-sign"></div>

      <div className="check">
        <input
          type="checkbox"
          name=""
          id="check"
          ref={check}
          onClick={handleCheck}
        />
        <label htmlFor="check">J'accepte les </label>
        <span>conditions d'utilisation</span>
      </div>
      <div className="error checkbox"></div>

      <button>Inscription</button>
    </form>
  );
}
