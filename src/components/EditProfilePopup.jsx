import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      isOpen={props.isOpen}
      title="Редактировать профиль"
      onClose={props.onClose}
      buttonText={props.loading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input"
        id="name-input"
        name="person"
        placeholder="Имя"
        value={name}
        onChange={handleNameChange}
        pattern=".{2,40}"
        required
      />
      <span className="popup__error name-input-error"></span>
      <input
        type="text"
        className="popup__input"
        id="job-input"
        name="job"
        placeholder="О себе"
        value={description}
        onChange={handleDescriptionChange}
        pattern=".{2,200}"
        required
      />
      <span className="popup__error job-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
