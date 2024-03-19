import PropTypes from "prop-types"; 
import './GameCard.css'

function GameCard(props) {
  let lastClick

  function handleClickCard(e) {
    lastClick = props.imgId
    e.target.classList.toggle('click')
    e.target.style.zIndex = 0
    console.log('hi', e.target)
  }

  return (

    <div class="flip-card" style={{
      position: 'relative', width: '130px', height: '170px', transition: 'transform 0.6s',
      transformStyle: 'preserve-3d'
    }} >
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img style={{ maxWidth: "70px", padding: "15px 10px", position: 'absolute', top: '25%', left: '25%', zIndex: '2' , className: "card-front" }}
            alt="random"
            src={`/src/img/pokemons/back-card/PokeBall1.png`} />
        </div>
        <div class="flip-card-back">
          <img
            style={{ zIndex: '1', maxWidth: "70px", padding: "15px 10px", position: 'absolute', top: '25%', left: '25%', className: "card-back" }}
            src={`/src/img/pokemons/${props.imgId}.png`}
            alt="random"
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
