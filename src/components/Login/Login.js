import styles from "./Login.module.css";

import { useContext, useEffect, useRef } from "react";

import AuthContext from "../../store/auth-context";
import MsgContext from "../../store/message-context";
import useHttp from "../../hooks/use-http";
import { loginRequest } from "../../helpers/functions";

import Card from "../UI/Card";
import Button from "../UI/Button";
import LoadingSpinner from "../UI/LoadingSpinner";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const msgCtx = useContext(MsgContext);
  const { sendRequest, cleanupData, status, data, error } = useHttp(
    loginRequest,
    false
  );

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (status === "completed" && !error) {
      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000
      );
      authCtx.login(data.idToken, data.localId, expirationTime.toISOString());
    }
    if (status === "completed" && error) {
      msgCtx.showMessage(`Ошибка: ${error}`, "error");
      cleanupData();
    }
  }, [status, authCtx, msgCtx, data, error, cleanupData]);

  const loginHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
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
