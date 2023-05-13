import React from "react";

const AuthContext = React.createContext({
  idToken: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
