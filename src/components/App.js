import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import {
  Header,
  Main,
  Footer,
  ImagePopup,
  EditAvatarPopup,
  EditProfilePopup,
  AddPlacePopup,
  DeleteConfirmationModal,
} from "../components/index";
import { CurrentUserContext } from "../context/CurrentUserContext";


function App() {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isAddPlaceModalOpen, setIsAddPlaceModalOpen] = useState(false);
  const [isEditAvatarModalOpen, setIsEditAvatarModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedDeleteCard, setSelectedDeleteCard] = useState({});
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

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

  function handleDeleteCardClick(card) {
    setSelectedDeleteCard(card);
    setIsConfirmationModalOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImageOpen(true);
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .setUserAvatar(data)
      .then((avatar) => {
        setCurrentUser(avatar);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
        closeAllModals();
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .editUserInfo(data)
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
        closeAllModals();
      });
  }

  function handleAddNewPlace(data) {
    setIsLoading(true);
    api
      .addCard(data)
      .then((card) => {
        setCards([card, ...cards]);
      })
      .catch((err) => console.error(err.message))
      .finally(() => {
        setIsLoading(false);
        closeAllModals();
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api
      .changeCardLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  function handleDeleteCard(card) {
    api
      .deleteCardById(card._id)
      .then(() => {
        setCards([...cards.filter((item) => item._id !== card._id)]);
        closeAllModals();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cardsList, userInfo]) => {
        setCards(cardsList);
        setCurrentUser(userInfo);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__content">
          <Header />
          <Main
            cards={cards}
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onEditAvatarClick={handleEditAvatarClick}
            onCardLike={handleCardLike}
            onDeleteCard={handleDeleteCard}
            onCardClick={handleCardClick}
          />
          <Footer />
        </div>

        {isEditProfileModalOpen && (
          <EditProfilePopup
            name="edit"
            isLoading={isLoading}
            isEditProfileModalOpen={isEditProfileModalOpen}
            onUpdateUser={handleUpdateUser}
            closeAllModals={closeAllModals}
          />
        )}

        {isAddPlaceModalOpen && (
          <AddPlacePopup
            name="create"
            title="New Place"
            isLoading={isLoading}
            isAddPlaceModalOpen={isAddPlaceModalOpen}
            onAddNewPlace={handleAddNewPlace}
            closeAllModals={closeAllModals}
          />
        )}

        {isEditAvatarModalOpen && (
          <EditAvatarPopup
            name="avatar"
            isLoading={isLoading}
            isEditAvatarModalOpen={isEditAvatarModalOpen}
            onUpdateAvatar={handleUpdateAvatar}
            closeAllModals={closeAllModals}
          />
        )}

        {isConfirmationModalOpen && (
          <DeleteConfirmationModal
            name="delete"
            isLoading={isLoading}
            card={selectedDeleteCard}
            isConfirmationModalOpen={isConfirmationModalOpen}
            onDeleteCard={handleDeleteCardClick}
            closeAllModals={closeAllModals}
          />
        )}

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
