import { useState } from "react";
import { Link } from "react-router-dom";

export function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    onRegister(userData);
  };

  return (
    <div className="auth-form">
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <div className="auth-form__wrapper">
          <div className="register">
            <div className="register__container">
              <h1 className="auth__form-title">Sign up</h1>
              <input
                id="email"
                className="auth-form__textfield"
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                minLength={5}
                maxLength={30}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                id="password"
                className="auth-form__textfield"
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                minLength={5}
                maxLength={30}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="auth-form__button" type="submit">
              Sign up
            </button>
            <p className="auth-form__text">
              Already a member?{" "}
              <Link className="auth-form__link" to="/signin">
                Log in here!
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
