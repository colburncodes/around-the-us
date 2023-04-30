import { useState } from "react";
import { Button } from "../components/Button";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  return (
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
          onChange={handleEmail}
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
          onChange={handlePassword}
          required
        />
      </div>
      <Button title={"Log in"} />
      <h4>Not a member yet? Sign up here!</h4>
    </div>
  );
}
