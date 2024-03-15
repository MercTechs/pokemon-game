import React from 'react'
import './game-mode-card.css'

function GameModeCard(props) {
  return (
    <div>        
        <div className="card-box">
            <div className="level-number">{props.level}x{props.level}</div>
            <div className="level-text">{props.difficulty}</div>
        </div>
    </div>
  )
}

export default GameModeCard