import React from 'react';
import { useParams } from 'react-router-dom';

function GameScreen() {
  const { level } = useParams();
  const gridSize = parseInt(level, 10);

  return (
    <div className="game-board" style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
      {Array.from({ length: gridSize * gridSize }, (_, index) => (
        <div key={index} className="game-cell">a</div>
      ))}
    </div>
  );
}

export default GameScreen;