import { useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/use-http";
import { API_KEY, API_PATH } from "../../helpers/data";
import { loginRequest } from "../../helpers/functions";

import Card from "../UI/Card";
import Button from "../UI/Button";
import LoadingSpinner from "../UI/LoadingSpinner";
import styles from "./Login.module.css";

const Login = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const { sendRequest, status, data, error } = useHttp(loginRequest, false);

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (status === "completed") {
      authCtx.login(data.idToken, data.localId, data.expiresIn);
      history.push("/details");
    }
  }, [status, authCtx, history, data]);

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

  if (error) {
    return <p>{error}</p>;
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