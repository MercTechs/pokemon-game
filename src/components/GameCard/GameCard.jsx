import PropTypes from "prop-types";
import styles from "./GameCard.module.css";

function GameCard(props) {
  let lastClick;

  function handleClickCard(e) {
    lastClick = props.imgId;
    e.target.classList.toggle("click");
    e.target.style.zIndex = 0;
    console.log("hi", e.target);

    const flipCard = document.querySelector(".flip-card-inner ");
    flipCard.classList.toggle("flip");
    console.log(flipCard);
  }

  return (
    <div className={styles["flip-card"]} onClick={handleClickCard}>
      <div className={styles["flip-card-inner"]}>
        <div className={styles["flip-card-front"]}>
          <img
            style={{
              maxWidth: "70px",
              position: "absolute",
              top: "20%",
              left: "9%",
            }}
            alt="random"
            src={`/src/img/pokemons/back-card/PokeBall1.png`}
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
            src={`/src/img/pokemons/${props.imgId}.png`}
            alt="random"
            className={styles["card-back"]}
          />
        </div>
        <div>{props.imgId}</div>
      </div>
    </div>
  );
}

GameCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imgId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default GameCard;
