export function Card(props) {
  const { card, onCardClick } = props;

  function handleClick() {
    onCardClick(props.card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="card__label">
        <h2 className="card__label-text">{card.name}</h2>
        <button
          className="card__delete-button"
          type="button"
          aria-label="delete"
        ></button>
        <button
          className="card__like-button"
          type="button"
          aria-label="heart"
        ></button>
        {/* <img src="../images/heart.svg" alt="Heart Icon" /> */}
        <p className="card__like-count">{card.likes.length}</p>
      </div>
    </li>
  );
}
