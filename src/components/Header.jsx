import mainLogo from "../images/logo_header.svg";
import { Route, Link, Switch } from "react-router-dom";

function Header({ email, onLogout }) {
  return (
    <header className="header">
      <img src={mainLogo} alt="Логотип Место" className="header__logo" />
      <Switch>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </Route>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route path="/">
          <div className="header__user-info">
            {email && <p className="header__email">{email}</p>}
            <Link to="/sign-in" className="header__link" onClick={onLogout}>
              Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
