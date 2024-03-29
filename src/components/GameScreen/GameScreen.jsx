import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./GameScreen.module.css";

import GameCard from "../GameCard/GameCard";
import generateImagePairs from "./PairGen";

import GetScore from "../axios/GetScore";
import PostScore from "../axios/PostScore";

function GameScreen() {
  const { level } = useParams();
  const gridSize = parseInt(level, 10);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const imagePairs = useMemo(() => generateImagePairs(level), [level]);

  const [checkCards, setCheckCards] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);

  const handleBack = () => {
    navigate("/");
  };

  const totalPoints = useMemo(() => {
    let points = 0;
    for (const card of imagePairs) {
      if (card.isComplete) {
        points = points + (card.basePoints + card.bonusPoints);
      }
    }
    return points;
  }, [checkCards]);

  useEffect(() => {
    if (checkCards.length === 2) {
      const [firstCard, secondCard] = checkCards;
      if (firstCard.id === secondCard.id) {
        firstCard.isComplete = true;
        secondCard.isComplete = true;
        if (checkGameEnd()) {
          setGameEnded(!gameEnded);
        }
      } else {
        setTimeout(() => {
          for (const card of checkCards) {
            card.bonusPoints =
              card.bonusPoints === 0 ? 0 : card.bonusPoints - 10;
          }
          firstCard.isFlip = false;
          secondCard.isFlip = false;

          setCheckCards((checkCards) =>
            checkCards.filter((card) => card.isFlip)
          );
        }, 1000);
      }
    }
  }, [checkCards, imagePairs]);

  const checkGameEnd = () => {
    for (const card of imagePairs) {
      if (!card.isComplete) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className={styles["game-screen"]}>
      <div className={styles["back-btn"]}>
        <button onClick={handleBack}>Back to Main</button>
      </div>
      <div>
        <GetScore level={level} />
        <div className={styles["total-points"]}>Your Score: {totalPoints}</div>
      </div>
      <div
        className={styles["game-board"]}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {imagePairs.map((card, index) => (
          <div
            key={index}
            className={`${styles["game-cell"]} ${card.isComplete ? styles.hidden : ""}`}
          >
            <GameCard
              key={index}
              id={index}
              imgId={card.id}
              isFlipped={card.isFlip}
              onCardClick={() => {
                if (checkCards.length === 2) {
                  checkCards.forEach((card) => {
                    card.isFlip = false; // Unflip 2 card dau
                  });
                  setCheckCards([card]); // add card thu ba
                } else if (!card.isFlip) {
                  setCheckCards([...checkCards, card]);
                }
                card.isFlip = true;
              }}
            />
          </div>
        ))}
      </div>
      {gameEnded && (
        <PostScore player={username} score={totalPoints} level={level} />
      )}
    </div>
  );
}

export default GameScreen;
