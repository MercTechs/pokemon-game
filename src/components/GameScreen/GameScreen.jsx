import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./GameScreen.module.css";

import GameCard from "../GameCard/GameCard";
import generateImagePairs from "./PairGen";

function GameScreen() {
  const { level } = useParams();
  const gridSize = parseInt(level, 10);

  const navigate = useNavigate();

  const imagePairs = useMemo(() => generateImagePairs(level), [level]);

  // State to track flipped cards
  const [flippedCards, setFlippedCards] = useState([]);
  const [cardBonuses, setCardBonuses] = useState([]); // Store bonuses for each card

  useEffect(() => {
    // Initialize bonuses for each card to 60
    setCardBonuses(new Array(imagePairs.length).fill(60));
  }, [imagePairs.length]);

  useEffect(() => {
    // Log cardBonuses whenever it changes
    console.log("cardBonuses:", cardBonuses);
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
  };

  //  handle flip logic
  const handleCardFlip = (index) => {
    // If there are already 2 cards flipped and not yet handled, reset them
    if (flippedCards.length === 2) {
      // Reset immediately if a third card is clicked
      setFlippedCards([index]);
      updateCardBonuses([index]);
    } else {
      // Add the new flipped card to the state
      setFlippedCards([...flippedCards, index]);
    }
  };

  // Effect to handle the flipping back logic after 1 second
  useEffect(() => {
    if (flippedCards.length === 2) {
      const timer = setTimeout(() => {
        setFlippedCards([]);
        updateCardBonuses(); // Update card bonuses after flipping back
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
          <div key={index} className={styles["game-cell"]}>
            {/* Pass the handleCardFlip function, whether the card is flipped, and the card's bonus to GameCard */}
            <GameCard
              key={index}
              id={index}
              imgId={id}
              onCardClick={() => handleCardFlip(index)}
              isFlipped={flippedCards.includes(index)}
              bonus={cardBonuses[index]} // Pass the bonus for the card
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameScreen;