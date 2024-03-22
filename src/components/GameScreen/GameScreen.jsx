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
  const [totalPoints, setTotalPoints] = useState(0); // Total points state

  // Function to handle flipping of cards
  const handleCardFlip = (index, imgId) => {
    if (flippedCards.some((card) => card.index === index)) {
      return;
    }
    // If there are already 2 cards flipped and not yet handled, reset them
    if (flippedCards.length === 2) {
      // Reset immediately if a third card is clicked
      setFlippedCards([{ index, imgId }]);
      updateCardBonuses();
    } else {
      // Add the new flipped card to the state
      setFlippedCards([...flippedCards, { index, imgId }]);
    }
  };

  useEffect(() => {
    // Initialize bonuses for each card to 60
    setCardBonuses(new Array(imagePairs.length).fill(50));
  }, [imagePairs.length]);

  const handleBack = () => {
    navigate("/");
  };

  // Function to update card bonuses
  const updateCardBonuses = () => {
    setCardBonuses((prevBonuses) =>
      prevBonuses.map((bonus, index) =>
        flippedCards.some((card) => card.index === index)
          ? Math.max(bonus - 10, 0) // Ensure the bonus doesn't go below 0
          : bonus
      )
    );
  };

  useEffect(() => {
    // Log cardBonuses whenever it changes
    console.log("cardBonuses:", cardBonuses);
  }, [cardBonuses, updateCardBonuses]);

  // State to keep track of matched cards
  const [matchedCards, setMatchedCards] = useState([]);

  // Effect to handle the flipping back logic after 1 second
  useEffect(() => {
    if (flippedCards.length === 2 && flippedCards.some((card) => !matchedCards.includes(card.index))) {
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.imgId === secondCard.imgId) {
        // If the image IDs match, leave the cards flipped and calculate points
        const timer = setTimeout(() => {
          console.log("match==============");
          const bonusPoints = cardBonuses[firstCard.index] + cardBonuses[secondCard.index];
          const totalPoints = 100 + bonusPoints;
          // Update total points
          setTotalPoints((prevPoints) => prevPoints + totalPoints);
          // Set matched cards to be hidden
          setMatchedCards((prevMatchedCards) => [...prevMatchedCards, firstCard.index, secondCard.index]);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        // If the image IDs don't match, flip the cards back after 1 second
        const timer = setTimeout(() => {
          setFlippedCards([]);
          updateCardBonuses(); // Update card bonuses after flipping back
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [flippedCards, updateCardBonuses, cardBonuses, matchedCards]);

  return (
    <div className={styles["game-screen"]}>
      <div className={styles["back-btn"]}>
        <button onClick={handleBack}>Back to Main</button>
      </div>
      <div>
        <p>Total Points: {totalPoints}</p> {/* Display total points */}
      </div>
      <div
        className={styles["game-board"]}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {imagePairs.map((id, index) => (
          <div key={index} className={`${styles["game-cell"]} ${matchedCards.includes(index) ? styles["hidden"] : ''}`}>
            {/* Pass the handleCardFlip function, whether the card is flipped, and the card's bonus to GameCard */}
            <GameCard
              key={index}
              id={index}
              imgId={id}
              onCardClick={() => handleCardFlip(index, id)}
              isFlipped={flippedCards.some((card) => card.index === index)}
              bonus={
                cardBonuses[index]
              } /* Pass the bonus for the card */
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameScreen;
