import styles from "./Login.module.css";

import { useState, useContext, useEffect, useRef } from "react";

import AuthContext from "../../store/auth-context";
import MsgContext from "../../store/message-context";
import useHttp from "../../hooks/use-http";
import { loginRequest } from "../../helpers/functions";

import Card from "../UI/Card";
import Button from "../UI/Button";
import LoadingSpinner from "../UI/LoadingSpinner";

const Login = () => {
  const [allowToShowM, setAllowToShowM] = useState(false);
  const authCtx = useContext(AuthContext);
  const msgCtx = useContext(MsgContext);
  const { sendRequest, status, data, error } = useHttp(loginRequest, false);

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (status === "completed") {
      if (!error) {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, data.localId, expirationTime.toISOString());
      } else {
        if (allowToShowM) {
          setAllowToShowM(false);
          msgCtx.showMessage(`Ошибка: ${error}`, "error");
        }
      }
    }
  }, [status, authCtx, msgCtx, data, error, allowToShowM]);

  const loginHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    setAllowToShowM(true);
    sendRequest({ email: enteredEmail, password: enteredPassword });
  };

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Card className={styles["form-wrapper"]}>
      <form onSubmit={loginHandler}>
        <div className={styles["form-row"]}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" ref={emailRef} />
        </div>
        <div className={styles["form-row"]}>
          <label htmlFor="password">Пароль</label>
          <input id="password" type="password" ref={passwordRef} />
        </div>
        <div className={styles["form-row"]}>
          <Button type="submit">Войти</Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
