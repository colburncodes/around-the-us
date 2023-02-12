import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { ImagePopup } from "./ImagePopup";
import { PopupWithForm } from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function App() {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isAddPlaceModalOpen, setIsAddPlaceModalOpen] = useState(false);
  const [isEditAvatarModalOpen, setIsEditAvatarModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarModalOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfileModalOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlaceModalOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImageOpen(true);
  }

  const closeAllModals = () => {
    setIsEditAvatarModalOpen(false);
    setIsEditProfileModalOpen(false);
    setIsAddPlaceModalOpen(false);
    setIsImageOpen(false);
  };

  const fetchUserInfo = async () => {
    await api
      .getUserInfo()
      .then(async (data) => {
        setCurrentUser(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__content">
          <Header />
          <Main
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onEditAvatarClick={handleEditAvatarClick}
            onCardClick={handleCardClick}
          />
          <Footer />
        </div>

        <PopupWithForm
          name="edit"
          title="Edit Profile"
          buttonText="Save"
          isOpen={isEditProfileModalOpen}
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

        <PopupWithForm
          name="create"
          title="New Place"
          buttonText="Save"
          isOpen={isAddPlaceModalOpen}
          onClose={closeAllModals}
        >
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
        </PopupWithForm>

        <PopupWithForm
          name="avatar"
          title="Change profile picture"
          buttonText="Save"
          isOpen={isEditAvatarModalOpen}
          onClose={closeAllModals}
        >
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
        </PopupWithForm>

        {/* Delete Confirmation Modal */}
        <PopupWithForm
          name="delete"
          title="Are you sure?"
          buttonText="Yes"
          onClose={closeAllModals}
        ></PopupWithForm>
        {/* <div className="modal" id="delete-modal">
        <div className="modal__delete-container">
          <h3 className="modal__title">Are you sure?</h3>
          <button type="button" className="modal__close"></button>
          <button className="modal__save-button" type="submit">
            Yes
          </button>
        </div>
      </div> */}
        <ImagePopup
          name="image"
          card={selectedCard}
          isOpen={isImageOpen}
          onClose={closeAllModals}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
