import React from "react";
import { useNavigate } from "react-router-dom";

import "./game-mode-card.css";

function GameModeCard(props) {
    const navigate = useNavigate();

    function handleClick() {
      navigate(`/game/${props.level}`);
    }
  return (
    <div onClick={handleClick}>
      <div className="card-box">
        <div className="level-number">
          {props.level}x{props.level}
        </div>
        <div className="level-text">{props.difficulty}</div>
      </div>
    </div>
  );
}

export default GameModeCard;
