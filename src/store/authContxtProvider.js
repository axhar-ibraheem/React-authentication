import React, { useState } from "react";
import AuthContext from "./authContxt";

const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  const isLoggedIn = !!token;
  const loginHandler = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logoutHandler = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const context = {
    idToken: token,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    apiKey: "AIzaSyBezG9y2vzN3ZEoEkEMYo68vi3GYFkJ99Q",
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
