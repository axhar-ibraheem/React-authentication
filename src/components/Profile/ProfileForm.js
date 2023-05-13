import AuthContext from "../../store/authContxt";
import classes from "./ProfileForm.module.css";
import { useHistory } from "react-router-dom";
import React, { useContext, useRef } from "react";

const ProfileForm = () => {
  const newPasswordRef = useRef();
  const ctx = useContext(AuthContext);
  const history = useHistory();

  const inputSubmitHandler = async (e) => {
    e.preventDefault();
    const enteredNewPassword = newPasswordRef.current.value;
    const endPointUrl = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${ctx.apiKey}`;

    const response = await fetch(endPointUrl, {
      method: "POST",
      body: JSON.stringify({
        idToken: ctx.idToken,
        password: enteredNewPassword,
        returnSecureToken: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      history.push("/auth");
    }
    const data = await response.json();
  };

  return (
    <form onSubmit={inputSubmitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          ref={newPasswordRef}
          minLength="7"
          type="password"
          id="new-password"
        />
      </div>
      <div className={classes.action}>
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
