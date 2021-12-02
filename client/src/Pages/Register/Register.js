import React, { useState } from "react";
import Sign from "../../Components/Sign/Sign";
import Connect from "../../Components/Connect/Connect";
import logo from "../../assets/meto-logo.png";
import background from "./background.svg";

const Home = () => {
  // toggle forms
  const [log, setLog] = useState({ sign: true, connect: false });

  const toggleRegister = (command) => {
    if (command === "sign") {
      setLog({ sign: true, connect: false });
    }
    if (command === "connect") {
      setLog({ sign: false, connect: true });
    }
  };

  return (
    <section className="container-register ">
      <img src={background} alt="fond d'écran" className="background-img" />

      <div className="container">
        <img src={logo} alt="logo" className="logo" />

        <div className="logs">
          <div className="btns">
            <button
              className={log.connect ? "btn-connect active" : "btn-connect"}
              onClick={() => toggleRegister("connect")}
            >
              Se connecter
            </button>
            <button
              className={log.sign ? "btn-sign active" : "btn-sign"}
              onClick={() => toggleRegister("sign")}
            >
              S'inscrire
            </button>
          </div>

          <div className="forms">
            {log.connect && <Connect />}

            {log.sign && <Sign />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
