export function ImagePopup({ name, card, isOpen, onClose }) {
  return (
    <div className={`modal modal__${name} ${isOpen && "modal__open"}`}>
      <div className="modal__container modal__content-image">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
        ></button>
        <img className="modal__preview-image" alt={card.name} src={card.link} />
        <p className="modal__caption">{card.name}</p>
      </div>
    </div>
  );
}
