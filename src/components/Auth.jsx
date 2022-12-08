import React from "react";
import { Link, useLocation } from "react-router-dom";

function Auth({ title, name, buttonText, onSubmit, children }) {
  const location = useLocation();
  return (
    <div className="auth">
      <h1 className="auth__tilte">{title}</h1>
      <form
        onSubmit={onSubmit}
        action="#"
        className="auth__form"
        name={`${name}`}
      >
        <fieldset className="auth__fieldset">{children}</fieldset>
        <button className="auth__button" type="submit">
          {buttonText}
        </button>
      </form>
      {location.pathname === "/sign-up" ? (
        <Link to="/sign-in" className="auth__redirect-link">
          Уже зарегистрированы? Войти
        </Link>
      ) : null}
    </div>
  );
}

export default Auth;
