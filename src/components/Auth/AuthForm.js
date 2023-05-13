import { useState, useRef, useContext } from "react";

import classes from "./AuthForm.module.css";
import AuthContext from "../../store/authContxt";
import { useHistory } from "react-router-dom";
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const ctx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onSubmitHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    try {
      let endPointUrl;
      if (isLogin) {
        endPointUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ctx.apiKey}`;
      } else {
        endPointUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ctx.apiKey}`;
      }
      const response = await fetch(endPointUrl, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        ctx.login(data.idToken);
        history.replace("/");
      } else {
        const errorMessage = data.error.message;
        throw new Error(errorMessage);
      }
    } catch (e) {
      alert(e.message);
    }
    setIsLoading(false);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={emailRef} type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input ref={passwordRef} type="password" id="password" required />
        </div>
        <div className={classes.actions}>
          {isLoading ? (
            <span className={classes.span}>Sending Request</span>
          ) : (
            <button type="submit">
              {isLogin ? "Login" : "Create Account"}
            </button>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
