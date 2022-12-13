import React from "react";
import Auth from "./Auth";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function Login({ onSubmit }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation({ email: "", password: "" });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(values);
    resetForm();
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
        value={values.email}
      />
      <span
        className={`auth__input-err ${
          isValid ? "" : `auth__input-err_visible`
        }`}
      >
        {errors.email}
      </span>
      <input
        onChange={handleChange}
        type="password"
        className="auth__input"
        name="password"
        placeholder="Пароль"
        autoComplete="on"
        required
        value={values.password}
        minLength={3}
      />
      <span
        className={`auth__input-err ${
          isValid ? "" : `auth__input-err_visible`
        }`}
      >
        {errors.password}
      </span>
    </Auth>
  );
}

export default Login;
