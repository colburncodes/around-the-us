import React from "react";
import likeIcon from "../images/heart.svg";
import profilePath from "../images/jacques-cousteau.jpg";

function handleEditAvatarClick() {
  document.querySelector(".modal__avatar").classList.add("modal__open");
}

function handleEditProfileClick() {
  document.querySelector(".modal__edit").classList.add("modal__open");
}

function handleAddPlaceClick() {
  document.querySelector(".modal__create").classList.add("modal__open");
}

export function Main({ heartPath }) {
  return (
    <main className="content">
      {/* <!--Profile Section--> */}
      <section className="profile page__section">
        <img className="profile__image" src={profilePath} alt="Avatar" />
        <button
          className="profile__avatar-edit"
          type="button"
          aria-label="edit-avatar"
          onClick={handleEditAvatarClick}
        ></button>
        <div className="profile__info">
          <h1 className="profile__title">Colburn Jones</h1>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="edit"
            onClick={handleEditProfileClick}
          ></button>
          <p className="profile__description">Engineer</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="add"
          onClick={handleAddPlaceClick}
        ></button>
      </section>
      {/* <!--End Profile Section--> */}
      <section className="cards page__section">
        <ul className="cards__list">
          <template id="card-template">
            <li className="card">
              <img className="card__image" src="#" alt="#" />
              <div className="card__label">
                <h2 className="card__label-text"></h2>
                <button
                  className="card__delete-button"
                  type="button"
                  aria-label="delete"
                ></button>
                <button
                  className="card__like-button"
                  type="button"
                  aria-label="heart"
                >
                  <img src={likeIcon} alt="Heart Icon" />
                </button>
                <p className="card__like-count"></p>
              </div>
            </li>
          </template>
        </ul>
      </section>
    </main>
  );
}
