import React from "react";
import headerLogo from "../images/logo.svg";
import { Route, Link } from "react-router-dom";

export function Header({ onSignOut, email }) {
  function handleSignOut() {
    onSignOut();
  }
  return (
    <header className="header page__section">
      <img className="header__logo" src={headerLogo} alt="Around the US" />
      <Route path="/">
        <div className="header__container">
          <p className="header__user">{email}</p>
          {/* <button className="header__logout" onClick={handleSignOut}>
            Logout
          </button> */}

          <Route path="/signup">
            <Link className="header__auth-link" to="signup">
              Sign up
            </Link>
          </Route>
          <Route path="/signin">
            <Link className="header__auth-link" to="signin">
              Log in
            </Link>
          </Route>
        </div>
      </Route>
    </header>
  );
}
