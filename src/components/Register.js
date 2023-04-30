import { useState } from "react";
import { Button } from "../components/Button";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  return (
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
          onChange={handleEmail}
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
          onChange={handlePassword}
          required
        />
      </div>
      <Button title={"Log in"} />
      <h4>Already a member? Log in here!</h4>
    </div>
  );
}
