import React from "react";
import headerLogo from "../images/logo.svg";

export function Header() {
  return (
    <header className="header page__section">
      <img className="header__logo" src={headerLogo} alt="Around the US" />
    </header>
  );
}
