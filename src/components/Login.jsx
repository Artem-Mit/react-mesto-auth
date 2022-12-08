import React, { useState } from "react";
import Auth from "./Auth";

function Login() {
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Auth title={"Вход"} name={"authForm"} buttonText={"Войти"}>
      <input
        onChange={handleChange}
        type="email"
        className="auth__input"
        name="emailInput"
        placeholder="Email"
        required
      />
      <input
        onChange={handleChange}
        type="password"
        className="auth__input"
        name="passwordInput"
        placeholder="Пароль"
        autoComplete="on"
        required
      />
    </Auth>
  );
}

export default Login;
