import React from "react";

const AuthContext = React.createContext({
  idToken: "",
  isLoggedIn: false,
  apiKey: "AIzaSyBezG9y2vzN3ZEoEkEMYo68vi3GYFkJ99Q",
  login: () => {},
  logout: () => {},
});

export default AuthContext;
