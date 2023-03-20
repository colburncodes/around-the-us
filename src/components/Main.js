import React from "react";
import { Card } from "../components/Card";
import { CurrentUserContext } from "../context/CurrentUserContext";

export function Main({
  cards,
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardLike,
  onDeleteCard,
  onCardClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile page__section">
        <img
          className="profile__image"
          src={currentUser.avatar}
          alt={currentUser.name}
        />
        <button
          className="profile__avatar-edit"
          type="button"
          aria-label="edit-avatar"
          onClick={onEditAvatarClick}
        ></button>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="edit"
            onClick={onEditProfileClick}
          >
            Edit profile
          </button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="add"
          onClick={onAddPlaceClick}
        >
          Create
        </button>
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onDeleteCard}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
