import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import authApi from "../utils/authApi";
import Auth from "./Auth";

function Login({ handleLogin }) {
  const [loginData, setloginData] = useState({ email: "", password: "" });
  const history = useHistory();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setloginData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    authApi
      .login(loginData)
      .then((res) => {
        localStorage.setItem("token", res.token);
        handleLogin();
      })
      .then(() => history.push("/"));
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
      />
      <input
        onChange={handleChange}
        type="password"
        className="auth__input"
        name="password"
        placeholder="Пароль"
        autoComplete="on"
        required
      />
    </Auth>
  );
}

export default Login;
