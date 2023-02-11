import React from "react";
import heart from "../images/heart.svg";
import { CurrentUserContext } from "../context/CurrentUserContext";

export function Card(props) {
  const { card, onCardClick } = props;
  const user = React.useContext(CurrentUserContext);

  const isLiked = card.likes.some((i) => i._id === user._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked && "card__like-active"
  }`;

  const isOwn = card.owner._id === user._id;
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? "card__delete-button_visible" : "card__delete-button_hidden"
  }`;

  function handleClick() {
    onCardClick(card);
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
          className="card__delete-button"
          type="button"
          aria-label="delete"
        ></button>
        <button className={cardLikeButtonClassName} type="button">
          <img src={heart} alt="heart" />
        </button>
        <p className="card__like-count">
          {card.likes.length > 0 ? card.likes.length : ""}
        </p>
      </div>
    </li>
  );
}
