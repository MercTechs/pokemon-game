import PropTypes from "prop-types";

function GameCard(props) {
  return (
    <div>
      <img
        style={{ maxWidth: "70px", padding: "15px 10px" }}
        src={`/src/img/pokemons/${props.imgId}.png`}
        alt="random"
      />
      <div>{props.id}</div>
    </div>
  );
}

GameCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imgId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default GameCard;
