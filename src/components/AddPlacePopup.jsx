import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  function handleCardNameChange(e) {
    setCardName(e.target.value);
  }

  function handleCardLinkChange(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: cardName,
      link: cardLink,
    });
  }

  useEffect(() => {
    setCardName('')
    setCardLink('')
  }, [props.isOpen])

  return (
    <PopupWithForm
      name="add"
      isOpen={props.isOpen}
      title="Новое место"
      onClose={props.onClose}
      buttonText={props.loading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input"
        id="img-input"
        name="name"
        placeholder="Название"
        value={cardName}
        onChange={handleCardNameChange}
        pattern=".{2,30}"
        required
      />
      <span className="popup__error img-input-error"></span>
      <input
        type="url"
        className="popup__input"
        id="source-input"
        name="link"
        placeholder="Ссылка на картинку"
        value={cardLink}
        onChange={handleCardLinkChange}
        required
      />
      <span className="popup__error source-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
