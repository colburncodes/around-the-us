import SuccessIcon from "../images/success.png";
import ErrorIcon from "../images/error.png";

export function InfoToolTip({ isOpen, onClose, status }) {
  return (
    <>
      {status === "success" ? (
        <div>
          <img
            src={SuccessIcon}
            className="modal__icon"
            alt="Success message"
          />
          <p className="modal__icon-message">
            Success! You have now been registered.
          </p>
        </div>
      ) : (
        <div>
          <img src={ErrorIcon} className="modal__icon" alt="Error message" />
          <p className="modal__icon-message">
            Oops, something went wrong! Please try again.
          </p>
        </div>
      )}
    </>
  );
}
