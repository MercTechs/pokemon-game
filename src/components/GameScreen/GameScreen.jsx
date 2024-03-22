import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./GameScreen.module.css";

import GameCard from "../GameCard/GameCard";
import generateImagePairs from "./PairGen";

function GameScreen() {
  const { level } = useParams();
  const gridSize = parseInt(level, 10);

  const navigate = useNavigate();

  //stop re render cards everytime click
  const imagePairs = useMemo(() => generateImagePairs(level), [level]);

  // track flipped cards
  const [flippedCards, setFlippedCards] = useState([]);
  const [cardBonuses, setCardBonuses] = useState([]); // Store bonuses for each card

  //track match cards
  const [matchCard, setMatchCard] = useState([]);

  useEffect(() => {
    //bonuses for each card: 60
    setCardBonuses(new Array(imagePairs.length).fill(60));
  }, [imagePairs.length]);

  useEffect(() => {
    // log cardBonuses whenever it changes
    console.log("bonus=====", cardBonuses);
  }, [cardBonuses]);

  const handleBack = () => {
    navigate("/");
  };

  // Function to update card bonuses
  const updateCardBonuses = () => {
    setCardBonuses((prevBonuses) =>
      prevBonuses.map((bonus, index) =>
        flippedCards.includes(index) ? bonus - 10 : bonus
      )
    );
    console.log("bonus", cardBonuses);
  };

  //  handle flip logic
  function handleCardFlip(index, imgId) {
    if (matchCard.includes(index) || flippedCards.includes(index)) {
      return;
    }

    let newFlippedCards;

    if (flippedCards.length === 2) {
      newFlippedCards = [index];
      updateCardBonuses([index]);
    } else {
      newFlippedCards = [...flippedCards, index];
    }

    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      // console.log(imagePairs, "=====");
      const firstCardImgId = imagePairs[newFlippedCards[0]];
      // console.log(imgId);
      const secondCardImgId = imgId;

      // check match
      if (firstCardImgId === secondCardImgId) {
        // console.log(firstCardImgId, secondCardImgId);

        // delay before hide
        setTimeout(() => {
          // add matched cards
          setMatchCard([...matchCard, ...newFlippedCards]);
          // reset flipped cards
          setFlippedCards([]);
        }, 1000);
      } else {
        // If cards do not match, reset flipped cards after a delay
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  }

  // flipping back logic after 1 second
  useEffect(() => {
    if (flippedCards.length === 2) {
      const timer = setTimeout(() => {
        setFlippedCards([]);
        updateCardBonuses(); // Update card bonuses
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [flippedCards, updateCardBonuses]);

  return (
    <div className={styles["game-screen"]}>
      <div className={styles["back-btn"]}>
        <button onClick={handleBack}>Back to Main</button>
      </div>
      <div
        className={styles["game-board"]}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {imagePairs.map((id, index) => (
          <div
            key={index}
            className={styles["game-cell"]}
            style={{
              visibility: matchCard.includes(index) ? "hidden" : "visible",
            }}
          >
            <GameCard
              key={index}
              id={index}
              imgId={id}
              onCardClick={() => handleCardFlip(index, id)}
              isFlipped={
                flippedCards.includes(index) || matchCard.includes(index)
              }
              bonus={cardBonuses[index]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameScreen;
