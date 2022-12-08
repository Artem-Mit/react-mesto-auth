import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarLinkInput = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarLinkInput.current.value,
    });
  }

  useEffect(() => {
    avatarLinkInput.current.value = ''
  }, [props.isOpen])

  return (
    <PopupWithForm
      name="avatar"
      isOpen={props.isOpen}
      title="Обновить аватар"
      onClose={props.onClose}
      buttonText={props.loading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarLinkInput}
        type="url"
        className="popup__input"
        id="avatarLinkInput"
        name="avatarLinkInput"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error avatarLinkInput-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
