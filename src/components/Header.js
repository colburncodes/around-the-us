import React from "react";
import headerLogo from "../images/logo.svg";
import { Route, Link } from "react-router-dom";

export function Header({ handleLogOut, email }) {
  return (
    <header className="header page__section">
      <img className="header__logo" src={headerLogo} alt="Around the US" />
      <Route path="/">
        <div className="header__container">
          <p className="header__user">{email}</p>
          <button className="header__logout" onClick={handleLogOut}>
            Logout
          </button>
        </div>
      </Route>
      <Route path="/signup">
        <Link className="header__auth-link" to="signup">
          Signup
        </Link>
      </Route>
      <Route path="/signin">
        <Link className="header__auth-link" to="signin">
          Signin
        </Link>
      </Route>
    </header>
  );
}
