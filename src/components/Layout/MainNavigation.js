import { Link, useHistory } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import AuthContext from "../../store/authContxt";
import { useContext } from "react";

const MainNavigation = () => {
  const ctx = useContext(AuthContext);
  const history = useHistory();
  const logOutHandler = () => {
    ctx.logout();
    history.replace("/auth");
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!ctx.isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}

          {ctx.isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          <li>
            {ctx.isLoggedIn && <button onClick={logOutHandler}>Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
