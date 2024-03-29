import PropTypes from "prop-types";
import styles from "./GameCard.module.css";

function GameCard({ id, imgId, onCardClick, isFlipped, isCompleted }) {
  const cardClasses = `${styles["flip-card-inner"]} ${isFlipped ? styles.flip : ""}`;

  return (

    <div className={styles["flip-card"] + ` ${isCompleted ? styles["hidden"] : ""}`} onClick={onCardClick} id={`${id}`}>
      <div className={cardClasses}>
        <div className={styles["flip-card-front"]}>
          <img
            style={{
              maxWidth: "70px",
              position: "absolute",
              top: "20%",
              left: "9%",
            }}
            alt="random"
            src={`/img/pokemons/back-card/PokeBall1.png`}
            className={styles["card-front"]}
          />
        </div>
        <div className={styles["flip-card-back"]}>
          <img
            style={{
              maxWidth: "70px",
              position: "absolute",
              top: "20%",
              left: "9%",
            }}
            src={`/img/pokemons/${imgId}.png`}
            alt="random"
            className={styles["card-back"]}
          />
        </div>
        <div>{imgId}</div>
      </div>
    </div>
  );
}

GameCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  imgId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onCardClick: PropTypes.func.isRequired, // Ensure this prop is required for proper functionality
  isFlipped: PropTypes.bool.isRequired, // Ensure this prop is required for controlling flip state
  isCompleted: PropTypes.bool,
};

export default GameCard;
