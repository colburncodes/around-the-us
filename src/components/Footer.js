import React from "react";
import githubIcon from "../images/github.svg";

export function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="footer page__section">
      <p className="footer__title">
        &copy; {year} Colburn Sanders - Around The U.S.
      </p>
      <a
        href="https://github.com/colburncodes"
        target="_blank"
        rel="noreferrer"
      >
        <img src={githubIcon} className="footer__icon" alt="Github"></img>
      </a>
    </footer>
  );
}
