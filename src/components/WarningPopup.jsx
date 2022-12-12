import React from "react";
import errorImg from "../images/error_img.svg";
import successImg from "../images/success_img.svg";

function WarningPopup({ name, onClose, isOpen, registerFail }) {
  return (
    <div className={`popup ${name}-popup ${isOpen ? `popup_opened` : ""}`}>
      <div className="popup__container">
        <img
          src={registerFail ? errorImg : successImg}
          alt=""
          className="popup__image"
        />
        <p className="popup__warning-text">
          {registerFail
            ? "Что-то пошло не так! Попробуйте ещё раз."
            : "Вы успешно зарегистрировались!"}
        </p>
        <button
          className="popup__close profile-popup__close"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default WarningPopup;
