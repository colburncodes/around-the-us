import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { api } from "../utils/api";
import { login, register } from "../utils/auth";

import {
  Header,
  Main,
  Footer,
  Login,
  Register,
  ImagePopup,
  InfoToolTip,
  EditAvatarPopup,
  EditProfilePopup,
  AddPlacePopup,
  DeleteConfirmationModal,
} from "../components/index";
import { CurrentUserContext } from "../context/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isAddPlaceModalOpen, setIsAddPlaceModalOpen] = useState(false);
  const [isEditAvatarModalOpen, setIsEditAvatarModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [toolTipStatus, setToolTipStatus] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedDeleteCard, setSelectedDeleteCard] = useState({});
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [email, setEmail] = useState("");
  const [cards, setCards] = useState([]);

  const history = useHistory();

  const closeAllModals = () => {
    setIsEditAvatarModalOpen(false);
    setIsEditProfileModalOpen(false);
    setIsAddPlaceModalOpen(false);
    setIsImageOpen(false);
    setIsInfoToolTipOpen(false);
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

  function onRegister({ email, password }) {
    setIsLoading(true);
    register(email, password)
      .then((res) => {
        console.log(res);
        if (res._id) {
          setIsInfoToolTipOpen(true);
          history.push("/signin");
        }
      })
      .catch((err) => {
        return console.error(err);
      })
      .finally(() => setIsInfoToolTipOpen(true));
  }

  function onLogin({ email, password }) {
    setIsLoading(true);
    login(email, password)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setEmail(email);
          setCurrentUser(res.token);
          localStorage.setItem("token", res.token);
        } else {
          setToolTipStatus("fail");
          setIsInfoToolTipOpen(true);
        }
      })
      .catch((err) => {
        setToolTipStatus("fail");
        setIsInfoToolTipOpen(true);
      })
      .finally(() => setIsLoading(false));
  }

  function onSignOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setEmail("");
    setCurrentUser({});
    history.push("/signin");
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
          <Header isLoggedIn={isLoggedIn} email={email} onSignOut={onSignOut} />
          <Switch>
            <Route exact path="/" isLoggedIn={isLoggedIn}>
              <Main
                cards={cards}
                onEditProfileClick={handleEditProfileClick}
                onAddPlaceClick={handleAddPlaceClick}
                onEditAvatarClick={handleEditAvatarClick}
                onCardLike={handleCardLike}
                onDeleteCard={handleDeleteCard}
                onCardClick={handleCardClick}
              />
            </Route>

            <Route path="/signup">
              <Register onRegister={onRegister} />
            </Route>

            <Route path="/signin">
              <Login onLogin={onLogin} />
            </Route>
            <Route>
              {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>
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

        {/* <InfoToolTip isOpen={isInfoToolTipOpen} onClose={closeAllModals} /> */}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
