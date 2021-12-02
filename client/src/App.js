import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profil from "./Pages/Profil/Profil";
import { useState, useEffect } from "react";
import { UserIdContext } from "./Contexts/AppContext";
import axios from "axios";
import { getUser } from "./actions/userAction";
import { useDispatch } from "react-redux";

function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: "/jwtid",
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => {
          console.log("No token App");
        });
    };

    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);
  return (
    <>
      <UserIdContext.Provider value={uid}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Register} />
            {/* <Route component={Register} /> */}

            <Route path="/accueil" exact component={Home} />
            <Route path="/profil" exact component={Profil} />
          </Switch>
        </BrowserRouter>
      </UserIdContext.Provider>
    </>
  );
}

export default App;
