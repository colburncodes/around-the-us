import { useState } from "react";
import { PopupWithForm } from "./PopupWithForm";

export function Register({ onRegister, onClose }) {
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
    <PopupWithForm
      title={"Sign up"}
      onSubmit={handleSubmit}
      buttonText={"Sign up"}
      onClose={onClose}
    >
      <div className="register">
        <div className="register__container">
          <h1 className="register__title">Sign up</h1>
          <input
            id="email"
            className="register__input-email"
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
            className="register__input-password"
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
        <h4>Already a member? Log in here!</h4>
      </div>
    </PopupWithForm>
  );
}
