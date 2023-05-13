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
    idToken: "",
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
