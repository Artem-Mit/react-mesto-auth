import React, { useState } from "react";
import Auth from "./Auth";

function Login({ onSubmit }) {
  const [loginData, setloginData] = useState({ email: "", password: "" });


  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setloginData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(loginData)
  };

  return (
    <Auth
      title={"Вход"}
      name={"authForm"}
      buttonText={"Войти"}
      onSubmit={handleSubmit}
    >
      <input
        onChange={handleChange}
        type="email"
        className="auth__input"
        name="email"
        placeholder="Email"
        required
        value={loginData.email}
      />
      <input
        onChange={handleChange}
        type="password"
        className="auth__input"
        name="password"
        placeholder="Пароль"
        autoComplete="on"
        required
        value={loginData.password}
      />
    </Auth>
  );
}

export default Login;
