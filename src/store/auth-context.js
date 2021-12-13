import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {}
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const storedExpirationTime = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationTime);

  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("useriD");
    localStorage.removeItem("expirationTime");
    return null;
  }
  return {
    token: storedToken,
    userId,
    duration: storedExpirationTime
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  const userId = tokenData ? tokenData.userId : null;
  const initialToken = tokenData ? tokenData.token : null;
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("useriD");
    localStorage.removeItem("expirationTime");
    if (logoutTimer) clearTimeout(logoutTimer);
  }, []);

  const loginHandler = (token, userId, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) logoutTimer = setTimeout(logoutHandler, tokenData.duration);
  }, [tokenData, logoutHandler]);

  const ctxValue = {
    token,
    userId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  };

  return (
    <AuthContext.Provider value={ctxValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
