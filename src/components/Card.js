import React from "react";
import heart from "../images/heart.svg";
import { CurrentUserContext } from "../context/CurrentUserContext";

export function Card(props) {
  const { card, onCardClick, onCardLike, onCardDelete } = props;
  const currentUser = React.useContext(CurrentUserContext);
  const isLiked = card.likes.some((user) => user._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked && "card__like-active"
  }`;

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = isOwn
    ? "card__delete-button"
    : "card__delete-hidden";

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="card__label">
        <h2 className="card__label-text">{card.name}</h2>
        <button
          onClick={handleDeleteClick}
          className={cardDeleteButtonClassName}
          type="button"
          aria-label="delete"
        ></button>
        <button className={cardLikeButtonClassName} type="button">
          <img src={heart} alt="heart" onClick={handleLikeClick} />
        </button>
        <p className="card__like-count">
          {card.likes.length > 0 ? card.likes.length : ""}
        </p>
      </div>
    </li>
  );
}
