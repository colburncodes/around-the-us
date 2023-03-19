import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { ImagePopup } from "./ImagePopup";
import { PopupWithForm } from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { EditProfilePopup } from "./Forms/EditProfilePopup";
import { EditAvatarPopup } from "./Forms/EditAvatarPopup";
import { AddPlacePopup } from "./Forms/AddPlacePopup";

function App() {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isAddPlaceModalOpen, setIsAddPlaceModalOpen] = useState(false);
  const [isEditAvatarModalOpen, setIsEditAvatarModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState({});

  const closeAllModals = () => {
    setIsEditAvatarModalOpen(false);
    setIsEditProfileModalOpen(false);
    setIsAddPlaceModalOpen(false);
    setIsImageOpen(false);
  };

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

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((avatar) => {
        setCurrentUser(avatar);
      })
      .catch((err) => console.error(err))
      .finally(() => closeAllModals());
  }

  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => console.error(err))
      .finally(() => closeAllModals());
  }

  function handleAddNewPlace(data) {
    api
      .addCard(data)
      .then((card) => {
        setCards([card, ...cards]);
      })
      .catch((err) => console.error(err.message))
      .finally(() => closeAllModals());
  }

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

        {isEditProfileModalOpen && (
          <EditProfilePopup
            name="edit"
            isEditProfileModalOpen={isEditProfileModalOpen}
            onUpdateUser={handleUpdateUser}
            closeAllModals={closeAllModals}
          />
        )}

        {isAddPlaceModalOpen && (
          <AddPlacePopup
            name="create"
            title="New Place"
            isAddPlaceModalOpen={isAddPlaceModalOpen}
            onAddNewPlace={handleAddNewPlace}
            closeAllModals={closeAllModals}
          />
        )}

        {isEditAvatarModalOpen && (
          <EditAvatarPopup
            name="avatar"
            isEditAvatarModalOpen={isEditAvatarModalOpen}
            onUpdateAvatar={handleUpdateAvatar}
            closeAllModals={closeAllModals}
          />
        )}

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
