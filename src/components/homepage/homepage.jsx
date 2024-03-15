import React from "react";
import GameModeCard from "../game-mode-card/game-mode-card";
import './homepage.css';

function HomePage() {
  const gameMode = [
    { level: 4, difficulty: "Easy" },
    { level: 6, difficulty: "Medium" },
    { level: 8, difficulty: "Hard" },
    { level: 10, difficulty: "Super Hard" },
  ];

  return (
    <div>
      <div className="banner">
        <div className="main-content">POKEMON FLIPCARD GAME</div>
      </div>
      <div className="game-mode">
        <div className="game-mode-text">Select Mode</div>
        <div className="game-mode-card">
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
