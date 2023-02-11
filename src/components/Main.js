import React, { useState } from "react";
import { api } from "../utils/api";
import { Card } from "../components/Card";
import { CurrentUserContext } from "../context/CurrentUserContext";

export function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
}) {
  const { name, avatar, about } = React.useContext(CurrentUserContext);
  const [cards, setCards] = useState([]);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <main className="content">
      <section className="profile page__section">
        <img className="profile__image" src={avatar} alt={name} />
        <button
          className="profile__avatar-edit"
          type="button"
          aria-label="edit-avatar"
          onClick={onEditAvatarClick}
        ></button>
        <div className="profile__info">
          <h1 className="profile__title">{name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="edit"
            onClick={onEditProfileClick}
          ></button>
          <p className="profile__description">{about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="add"
          onClick={onAddPlaceClick}
        ></button>
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}
