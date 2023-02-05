import React, { useState } from "react";
import { api } from "../utils/api";
import { Card } from "../components/Card";

export function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
}) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  React.useEffect(() => {
    api
      .getAppInfo()
      .then(([user, cards]) => {
        setUserName(user.name);
        setUserDescription(user.about);
        setUserAvatar(user.avatar);
        setCards(cards);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="content">
      <section className="profile page__section">
        <img className="profile__image" src={userAvatar} alt={userName} />
        <button
          className="profile__avatar-edit"
          type="button"
          aria-label="edit-avatar"
          onClick={onEditAvatarClick}
        ></button>
        <div className="profile__info">
          <h1 className="profile__title">{userName}</h1>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="edit"
            onClick={onEditProfileClick}
          ></button>
          <p className="profile__description">{userDescription}</p>
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
