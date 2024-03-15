import React from 'react'
import styles from './game-mode-card.module.css'

function GameModeCard(props) {
  return (

    <div className={styles['card-box']}>
      <div className={styles['level-number']} >{props.level}x{props.level}</div>
      <div className={styles['level-text']}>{props.difficulty}</div>
    </div>

  )
}

export default GameModeCard