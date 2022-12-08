import mainLogo from "../images/logo_header.svg";
import { Route, Link, Switch } from "react-router-dom";

function Header() {
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
      </Switch>
    </header>
  );
}

export default Header;
