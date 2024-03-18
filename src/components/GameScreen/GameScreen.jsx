import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function GameScreen() {
  const { level } = useParams();
  const gridSize = parseInt(level, 10);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="game-screen">
      <div className="back-btn">
        <button onClick={handleBack}>Back to Main</button>
      </div>
      <div
        className="game-board"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {Array.from({ length: gridSize * gridSize }, (_, index) => (
          <div key={index} className="game-cell">
            a
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameScreen;
