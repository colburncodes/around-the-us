import React from "react";

export function PopupWithForm({
  name,
  title,
  onClose,
  isOpen,
  children,
  buttonText = "Save",
}) {
  return (
    <>
      <div className={`modal modal__${name} ${isOpen ? "modal__open" : ""}`}>
        <div className="modal__container">
          <button
            className="modal__close"
            type="button"
            onClick={onClose}
          ></button>
          <h3 className="modal__title">{title}</h3>
          <form className={`modal__form modal__form-${name}`}>
            <fieldset className="modal__form-fieldset">
              {children}
              <button
                className="modal__save-button modal__button-disabled"
                type="submit"
                disabled
              >
                {buttonText}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}
