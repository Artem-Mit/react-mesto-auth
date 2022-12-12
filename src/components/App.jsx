import { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Spinner from "./Spinner";
import ProtectedRoute from "./ProtectedRoute";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import authApi from "../utils/authApi";
import WarningPopup from "./WarningPopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isWarningPopupOpen, setisWarningPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = useState({ name: "", about: "" });
  const [userEmail, setUserEmail] = useState("");
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButtonText, setIsLoadingButtonText] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const [registerError, setRegisterError] = useState(false);

  /* Проверка имеется ли токен в локальном хранилище */

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authApi
        .checkIn(token)
        .then((res) => {
          setUserEmail(res.data.email);
          handleLogin();
        })
        .catch((err) => console.log(err.message))
        .finally(() => history.push("/"));
    }
  }, [loggedIn, history, userEmail]);

  /* Загрузка карточек с сервера */

  useEffect(() => {
    setIsLoading(true);
    api
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => console.log(err.message));
  }, []);

  /* загрузка информации о пользователе */

  useEffect(() => {
    api
      .getProfileInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  /* Логика лайков */

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err.message));
  }

  /* Логика удаления карточек */
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err.message));
  }

  /* Открытие и закрытие попапов */

  function handleCardClick(props) {
    setSelectedCard({ name: props.name, link: props.link });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleWarningPopupOpen() {
    setisWarningPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setisWarningPopupOpen(false);
  }

  const isOpen =
    isWarningPopupOpen ||
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard.link;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  /* Обрновление информации о пользователе */

  function handleUpdateUser(data) {
    setIsLoadingButtonText(true);
    api
      .editProfileInfo(data)
      .then((userData) => setCurrentUser(userData))
      .then(() => {
        closeAllPopups();
        setIsLoadingButtonText(false);
      })
      .catch((err) => console.log(err.message));
  }

  /* Обрновление аватара */

  function handleUpdateAvatar(data) {
    setIsLoadingButtonText(true);
    api
      .setAvatar(data)
      .then((userData) => setCurrentUser(userData))
      .then(() => {
        closeAllPopups();
        setIsLoadingButtonText(false);
      })
      .catch((err) => console.log(err.message));
  }

  /* Добавление новой карточки */

  function handleUpdateCards(newCard) {
    setIsLoadingButtonText(true);
    api
      .postNewCard(newCard)
      .then((res) => setCards([res, ...cards]))
      .then(() => {
        closeAllPopups();
        setIsLoadingButtonText(false);
      })
      .catch((err) => console.log(err.message));
  }

  /* Перевод статуса логина  */

  function handleLogin() {
    setLoggedIn(true);
  }

  /* Логика удаления токена из локала для выхода из профиля*/

  function handleLogout() {
    localStorage.removeItem("token");
    setUserEmail("");
  }

  /* Логика ошибки при регистрации */

  function handleRegisterStatus(status) {
    setRegisterError(status);
  }

  return isLoading ? (
    <Spinner isLoading={isLoading} size={150} />
  ) : (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header email={userEmail} onLogout={handleLogout} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onImgPopup={handleCardClick}
            cardsToRender={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register
              popupOpener={handleWarningPopupOpen}
              onSubmit={handleRegisterStatus}
              onClose={closeAllPopups}
            />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        {loggedIn && <Footer />}
      </div>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <EditProfilePopup
        loading={isLoadingButtonText}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        loading={isLoadingButtonText}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleUpdateCards}
      />
      <EditAvatarPopup
        loading={isLoadingButtonText}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <WarningPopup
        name={"warning"}
        isOpen={isWarningPopupOpen}
        onClose={closeAllPopups}
        registerFail={registerError}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
