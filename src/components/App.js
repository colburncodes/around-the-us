import React from "react";
import { useState } from "react";

import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { PopupWithForm } from "./PopupWithForm";

function App() {
  const [activeModal, setActiveModal] = useState(null);

  const closeAllModals = () => {
    setActiveModal(null);
  };
  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main />
        <Footer />
      </div>

      <PopupWithForm
        name="edit"
        title="Edit Profile"
        buttonText="Save"
        onClose={closeAllModals}
      >
        <input
          id="profile-name"
          className="modal__input modal__input-profile-name"
          type="text"
          name="name"
          placeholder="Name"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="modal__input-error profile-name-error"></span>
        <input
          id="profile-description"
          className="modal__input modal__input-profile-description"
          type="text"
          name="about"
          placeholder="Description"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="modal__input-error profile-description-error"></span>
      </PopupWithForm>

      {/* 
    <!-- Create Modal--> */}
      <div className="modal modal__create">
        <div className="modal__container">
          <button className="modal__close" type="button"></button>
          <h3 className="modal__title">New Place</h3>
          <form className="modal__form modal__form-create" noValidate>
            <fieldset className="modal__form-fieldset">
              <input
                id="card-title"
                className="modal__input modal__input-card-title"
                type="text"
                name="name"
                placeholder="Title"
                minLength="1"
                maxLength="30"
                required
              />
              <span className="modal__input-error card-title-error"></span>
              <input
                id="card-url"
                className="modal__input modal__input-card-url"
                type="url"
                name="link"
                placeholder="Image Url"
                pattern="https://.*"
                required
              />
              <span className="modal__input-error card-url-error"></span>
              <button
                className="modal__save-button modal__button-disabled"
                type="submit"
                disabled
              >
                Save
              </button>
            </fieldset>
          </form>
        </div>
      </div>
      {/* Avatar Modal */}
      <div className="modal modal__avatar">
        <div className="modal__container">
          <h3 className="modal__title">Change profile picture</h3>
          <button type="button" className="modal__close"></button>
          <form className="modal__form modal__form-avatar" noValidate>
            <fieldset className="modal__form-fieldset">
              <input
                id="avatar-url"
                className="modal__input modal__input-profile-avatar"
                type="url"
                name="avatar"
                placeholder="Avatar Image"
                pattern="https://.*"
                required
              />
              <span className="modal__input-error avatar-url-error"></span>
              <button
                className="modal__save-button modal__button-disabled"
                type="submit"
              >
                Save
              </button>
            </fieldset>
          </form>
        </div>
      </div>
      {/* Image Modal */}
      <div className="modal" id="image-modal">
        <div className="modal__container modal__content-image">
          <button type="button" className="modal__close"></button>
          <img className="modal__preview-image" alt="#" src="#" />
          <p className="modal__caption"></p>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      <div className="modal" id="delete-modal">
        <div className="modal__delete-container">
          <h3 className="modal__title">Are you sure?</h3>
          <button type="button" className="modal__close"></button>
          <button className="modal__save-button" type="submit">
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
