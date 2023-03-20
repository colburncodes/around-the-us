import React from "react";
import { PopupWithForm } from "../components/PopupWithForm";

export function DeleteConfirmationModal({
  name,
  card,
  isLoading,
  deleteCard,
  closeAllModals,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    deleteCard(card);
  }
  return (
    <PopupWithForm
      name={name}
      title="Are you sure?"
      buttonText={isLoading ? "Deleting..." : "Yes"}
      onSubmit={handleSubmit}
      onClose={closeAllModals}
    ></PopupWithForm>
  );
}
