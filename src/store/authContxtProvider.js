import React, { useState } from "react";
import AuthContext from "./authContxt";

const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");

  const isLoggedIn = token.length > 0;
  const loginHandler = (token) => {
    setToken(token);
  };

  const logoutHandler = () => {
    setToken("");
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
