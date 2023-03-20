import React, { useState } from "react";
import { PopupWithForm } from "../PopupWithForm";

export function AddPlacePopup({
  name,
  title,
  isLoading,
  onAddNewPlace,
  isAddPlaceModalOpen,
  closeAllModals,
}) {
  const [cardTitle, setCardTitle] = useState("");
  const [image, setImage] = useState("");

  function hanldeNameChange(e) {
    setCardTitle(e.target.value);
  }

  function handleImageChange(e) {
    setImage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddNewPlace({ name: cardTitle, link: image });
  }
  return (
    <PopupWithForm
      name={name}
      title={title}
      buttonText={isLoading ? "Saving..." : "Save"}
      isOpen={isAddPlaceModalOpen}
      onClose={closeAllModals}
      onSubmit={handleSubmit}
    >
      <input
        id="card-title"
        className="modal__input modal__input-card-title"
        type="text"
        name="name"
        placeholder="Title"
        minLength="1"
        maxLength="30"
        value={cardTitle}
        onChange={hanldeNameChange}
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
        value={image}
        onChange={handleImageChange}
        required
      />
      <span className="modal__input-error card-url-error"></span>
    </PopupWithForm>
  );
}
