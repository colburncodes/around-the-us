import { useState } from "react";
import { PopupWithForm } from "../components/PopupWithForm";

export function Login({ onLogin, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    onLogin(userData);
  };

  return (
    <PopupWithForm
      title={"Log in"}
      onSubmit={handleSubmit}
      buttonText={"Log in"}
      onClose={onClose}
    >
      <div className="login">
        <div className="login__container">
          <h1 className="login__title">Log in</h1>
          <input
            id="email"
            className="login__input-email"
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
            className="login__input-password"
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
        <h4>Not a member yet? Sign up here!</h4>
      </div>
    </PopupWithForm>
  );
}
