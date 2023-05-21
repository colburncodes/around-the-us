import React, { useEffect, useState } from "react";
import { PopupWithForm } from "../PopupWithForm";
import { CurrentUserContext } from "../../context/CurrentUserContext";

export function EditProfilePopup({
  name,
  isLoading,
  isEditProfileModalOpen,
  onUpdateUser,
  closeAllModals,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [username, setUserName] = useState("");
  const [description, setDescription] = useState("");

  function hanldeNameChange(e) {
    setUserName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name: username, description: description });
  }

  useEffect(() => {
    setUserName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name={name}
      title="Edit Profile"
      buttonText={isLoading ? "Saving..." : "Save"}
      isOpen={isEditProfileModalOpen}
      onClose={closeAllModals}
      onSubmit={handleSubmit}
    >
      {username.trim() && username.length < 3 ? (
        <p className="username-error" style={{ color: "red" }}>
          Name is too short
        </p>
      ) : null}
      <input
        id="profile-name"
        className="modal__input modal__input-profile-name"
        type="text"
        name="name"
        placeholder="Name"
        minLength="2"
        maxLength="40"
        value={username}
        onChange={hanldeNameChange}
        required
      />
      <span className="modal__input-error profile-name-error"></span>
      {description.trim() && description.length < 3 ? (
        <p className="description-error" style={{ color: "red" }}>
          Description is too short
        </p>
      ) : null}
      <input
        id="profile-description"
        className="modal__input modal__input-profile-description"
        type="text"
        name="about"
        placeholder="Description"
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleDescriptionChange}
        required
      />
      <span className="modal__input-error profile-description-error"></span>
    </PopupWithForm>
  );
}
