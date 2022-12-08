import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__delete-btn ${
    isOwn ? "" : "element__delete-btn_hide"
  }`;
  const isLiked = props.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like-btn ${
    isLiked ? "element__like-btn_active" : ""
  }`;

  function handleClick() {
    props.onCardClick(props);
  }

  return (
    <article className="element">
      <img
        src={props.link}
        alt={props.name}
        className="element__img"
        onClick={handleClick}
      />
      <div className="element__text-area">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__like-section">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={() => {
              props.onCardLike(props);
            }}
          ></button>
          <p className="element__like-counter">{props.likes.length}</p>
        </div>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={() => {
          props.onCardDelete(props);
        }}
      ></button>
    </article>
  );
}

export default Card;
