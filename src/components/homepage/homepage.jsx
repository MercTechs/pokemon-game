import React from "react";
import GameModeCard from "../game-mode-card/game-mode-card";
import styles from './homepage.module.css';

function HomePage() {
  const gameMode = [
    { level: 4, difficulty: "Easy" },
    { level: 6, difficulty: "Medium" },
    { level: 8, difficulty: "Hard" },
    { level: 10, difficulty: "Super Hard" },
  ];

  return (
    <div>
      <div className={styles.banner}>
        <div className="main-content">
        <div>
        <a href="https://merctrans.vn/" target="_blank">
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png' className="logo" alt="Pokemon logo" />
        </a>

      </div>
      <h1>POKEMON FLIPCARD GAME</h1>
        </div>
      </div>
      <div className="game-mode">
        <div className={styles['select-mode']}>
            <strong>Select Mode</strong>
        </div>
        <div className={styles['game-mode-card']}>
          {gameMode.map((mode) => (
            <GameModeCard
              level={mode.level}
              difficulty={mode.difficulty}
              key={mode.level}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
