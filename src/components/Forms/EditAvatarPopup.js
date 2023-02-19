import React, { useRef, useState } from "react";
import { PopupWithForm } from "../PopupWithForm";

export function EditAvatarPopup({
  name,
  isEditAvatarModalOpen,
  onUpdateAvatar,
  closeAllModals,
}) {
  const [avatar, setAvatar] = useState("");

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatar,
    });
  }

  return (
    <PopupWithForm
      name={name}
      title="Change profile picture"
      buttonText="Save"
      isOpen={isEditAvatarModalOpen}
      onClose={closeAllModals}
      onSubmit={handleSubmit}
    >
      <input
        id="avatar-url"
        className="modal__input modal__input-profile-avatar"
        type="url"
        name="avatar"
        value={avatar}
        onInput={handleAvatarChange}
        placeholder="Avatar Image"
        pattern="https://.*"
        required
      />
      <span className="modal__input-error avatar-url-error"></span>
    </PopupWithForm>
  );
}
