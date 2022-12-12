import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import authApi from "../utils/authApi";
import Auth from "./Auth";

function Register({ popupOpener, onSubmit, onClose }) {
  const [regData, setRegData] = useState({ email: "", password: "" });
  const history = useHistory();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setRegData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    authApi
      .register(regData)
      .then((res) => {
        if (res) {
          setRegData(res);
          onSubmit(false);
          popupOpener();
        }
      })
      .then(() => {
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        onSubmit(true);
        popupOpener();
      });
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

export default Register;
