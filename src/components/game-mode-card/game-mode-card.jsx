import React from "react";
import { useNavigate } from "react-router-dom";

import styles from './game-mode-card.module.css'

function GameModeCard(props) {
    const navigate = useNavigate();

    function handleClick() {
      navigate(`/game/${props.level}`);
    }
  return (
    <div onClick={handleClick}>
      <div className={styles['card-box']}>
        <div className={styles['level-number']}>
          {props.level}x{props.level}
        </div>
        <div className={styles['level-text']}>{props.difficulty}</div>
      </div>
    </div>
  );
}

export default GameModeCard;
