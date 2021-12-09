import "./index.css";
import { useState, useRef, Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DetailsPage from "./pages/DetailsPage";

import Navigation from "./components/Navigation/Navigation";
import Workflow from "./components/UI/Workflow";
import { Redirect } from "react-router-dom";

const API_KEY = "AIzaSyAygkuob-llQEBdiyuUxv29_CthHtt1P9A";
const APP_PATH = "https://react-http-d6323-default-rtdb.firebaseio.com/";

export default function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const emailRef = useRef();
  const passwordRef = useRef();

  const isLoggedIn = !!token;

  const loginHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        })
      }
    )
      .then((resp) => {
        if (!resp.ok) throw new Error("Oops...");
        return resp.json();
      })
      .then((data) => {
        setToken(data.idToken);
        setUserId(data.localId);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const getHandler = () => {
    fetch(APP_PATH + userId + "/gas.json?auth=" + token)
      .then((resp) => {
        return resp.json().then((data) => console.log(data));
      })
      .catch((error) => console.log(error.message));
  };

  const postHandler = () => {
    fetch(APP_PATH + userId + "/gas/2111.json?auth=" + token, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paid: 0,
        value: 340
      })
    })
      .then((resp) => {
        return resp.json().then((data) => console.log(data));
      })
      .catch((error) => console.log(error.message));
  };

  const content = (
    <div className="wrapper">
      {isLoggedIn && <h2>Вы авторизированы</h2>}
      <form onSubmit={loginHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="password">Пароль</label>
          <input id="password" type="password" ref={passwordRef} />
        </div>
        <div>
          <button type="submit">Войти</button>
        </div>
      </form>
      <div className="extra-buttons">
        <button onClick={postHandler}>POST</button>
        <button onClick={getHandler}>GET</button>
      </div>
    </div>
  );

  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route>
          <Navigation />
          <Workflow>
            <Switch>
              <Route path="/details" exact>
                <DetailsPage />
              </Route>
              <Route>
                <div>Hello</div>
              </Route>
            </Switch>
          </Workflow>
        </Route>
      </Switch>
    </Fragment>
  );
}
