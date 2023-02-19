import React from "react";
import { PopupWithForm } from "../PopupWithForm";

export function AddPlacePopup({ isAddPlaceModalOpen, closeAllModals }) {
  return (
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
  );
}
