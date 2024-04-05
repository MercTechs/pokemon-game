import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./GameScreen.module.css";

import GameCard from "../GameCard/GameCard";
import generateImagePairs from "./PairGen";

import GetScore from "../axios/GetScore";
import PostScore from "../axios/PostScore";

import Popup from "reactjs-popup";
import { RotateCcw } from "lucide-react";

import axios from "axios";

function GameScreen() {
  const { level } = useParams();
  const gridSize = parseInt(level, 10);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const imagePairs = useMemo(() => generateImagePairs(level), [level]);

  const [checkCards, setCheckCards] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);

  const [postedScore, setPostedScore] = useState(false);
  const [displayedPoints, setDisplayedPoints] = useState(0); // New state for displaying points incrementally

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
  }, [checkCards, gameEnded]);

  useEffect(() => {
    if (totalPoints !== displayedPoints) {
      const timer = setInterval(() => {
        setDisplayedPoints((prevPoints) =>
          prevPoints === totalPoints ? totalPoints : prevPoints + 5
        );
      }, 10); // Adjust this interval to change the speed of incrementation
      return () => clearInterval(timer);
    }
  }, [totalPoints, displayedPoints]);

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

  const popupContent = (close) => (
    <div className={styles["popup"]}>
      Game Over! Your score: {totalPoints}
      <div className={styles["popup-btn"]}>
        <button
          className="close"
          onClick={() => {
            close();
            window.location.reload();
          }}
        >
          <RotateCcw />
        </button>
        <button onClick={handleBack}>Back to Main</button>
      </div>
    </div>
  );

  useEffect(() => {
    if (gameEnded && !postedScore) {
      const postData = async () => {
        try {
          const response = await axios.post("https://api.lotegame.com/score/", {
            player: username,
            score: totalPoints,
            level: level,
          });
        } catch (error) {
          console.error(error);
        }
      };
      if (import.meta.env.DEV) {
        setPostedScore(true);
      } else {
        postData();
        setPostedScore(true);
      }
    }
  }, [gameEnded, postedScore]);

  return (
    <div className={styles["game-screen"]}>
      <div className={styles["back-btn"]}>
        <button onClick={handleBack}>Back to Main</button>
      </div>
      <GetScore level={level} currentScore={displayedPoints} />{" "}
      {/* Display the incrementing score */}
      <div className={styles["total-points-board"]}>
        <div className={styles["total-points"]}>
          Score: {displayedPoints} {/* Display the incrementing score */}
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
              className={`${styles["game-cell"]} ${
                card.isComplete ? styles.hidden : ""
              }`}
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
      </div>
      {gameEnded && (
        <>
          <Popup
            open={gameEnded}
            closeOnDocumentClick
            onClose={() => setGameEnded(false)}
          >
            {popupContent}
          </Popup>
        </>
      )}
    </div>
  );
}

export default GameScreen;
