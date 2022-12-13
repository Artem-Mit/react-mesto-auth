import React, { useState } from "react";
import Auth from "./Auth";

function Register({ onSubmit }) {
  const [regData, setRegData] = useState({ email: "", password: "" });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setRegData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(regData)
  };

  return (
    <Auth
      title={"Регистрация"}
      name={"regForm"}
      buttonText={"Зарегистрироваться"}
      onSubmit={handleSubmit}
    >
      <input
        onChange={handleChange}
        type="email"
        className="auth__input"
        name="email"
        placeholder="Email"
        required
        value={regData.email}
      />
      <input
        onChange={handleChange}
        type="password"
        className="auth__input"
        name="password"
        placeholder="Пароль"
        autoComplete="on"
        required
        value={regData.password}
      />
    </Auth>
  );
}

export default Register;
