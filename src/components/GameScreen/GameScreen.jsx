import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from './GameScreen.module.css'

function GameScreen() {
  const { level } = useParams();
  const gridSize = parseInt(level, 10);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className={styles['game-screen']}>
      <div className={styles['back-btn']}>
        <button onClick={handleBack}>Back to Main</button>
      </div>
      <div
        className={styles['game-board']}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
q
        }}
      >
        {Array.from({ length: gridSize * gridSize }, (_, index) => (
          <div key={index} className={styles['game-cell']}>
            a
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameScreen;
