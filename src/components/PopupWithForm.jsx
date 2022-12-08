function PopupWithForm({
  name,
  isOpen,
  title,
  onClose,
  children,
  buttonText,
  onSubmit,
}) {
  return (
    <div className={`popup ${name}-popup ${isOpen ? `popup_opened` : ""}`}>
      <form
        onSubmit={onSubmit}
        action="#"
        className="popup__container profile-popup__container popup__form"
        name={`${name}`}
      >
        <h2 className="popup__title">{title}</h2>
        <fieldset className="popup__fieldset">{children}</fieldset>
        <button className="popup__button" type="submit">
          {buttonText}
        </button>
        <button
          className="popup__close profile-popup__close"
          type="button"
          onClick={onClose}
        ></button>
      </form>
    </div>
  );
}

export default PopupWithForm;
