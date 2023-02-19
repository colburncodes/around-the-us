import React from "react";

export function PopupWithForm({
  name,
  title,
  onClose,
  onSubmit,
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
          <form
            onSubmit={onSubmit}
            className={`modal__form modal__form-${name}`}
          >
            <fieldset className="modal__form-fieldset">
              {children}
              <button className="modal__save-button" type="submit">
                {buttonText}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}
