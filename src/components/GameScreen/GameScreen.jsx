/* eslint-disable no-unused-vars */
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./GameScreen.module.css";

import GameCard from "../GameCard/GameCard";

function GameScreen() {
  const { level } = useParams();
  const gridSize = parseInt(level, 10);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  function generateImagePairs(level) {
    let maxPairs;
    let randomDifficulty;
    switch (level) {
      case "4":
        maxPairs = 8;
        randomDifficulty = 3;
        break;
      case "6":
        maxPairs = 18;
        randomDifficulty = 6;
        break;
      case "8":
        maxPairs = 32;
        randomDifficulty = 9;
        break;
      case "10":
        maxPairs = 50;
        randomDifficulty = 12;
        break;
      default:
        throw new Error("Invalid level specified.");
    }

    const totalImages = level * level;
    const pairs = [];

    // Generate unique pairs
    while (pairs.length < maxPairs) {
      const id = Math.floor(Math.random() * 64) + 1; // Generating image id between 1 and 64
      if (!pairs.includes(id)) {
        pairs.push(id);
      }
    }
    let numToCut = Math.floor(Math.random() * randomDifficulty);
    pairs.splice(0, numToCut);

    console.log("Original Array ===========1111:", pairs);

    const pickid = [];
    // Index to keep track of where we are in the original array
    let index = 0;

    // Loop until pickid has maxPairs elements
    while (pickid.length < maxPairs) {
      // Append element from originalArray to pickid
      pickid.push(pairs[index]);
      // Move to the next element in the originalArray
      index++;
      // If we reach the end of the originalArray, loop back to the beginning
      if (index === pairs.length) {
        index = 0;
      }
    }
    console.log("Original Array =====2222222222222222:", pairs);
    console.log("New Array with 8 elements:", pickid);

    // Duplicate pairs if needed
    const imagePairs = [...pickid, ...pickid];
    // Shuffle pairs
    for (let i = imagePairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [imagePairs[i], imagePairs[j]] = [imagePairs[j], imagePairs[i]];
    }

    // Return only the required number of pairs
    return imagePairs.slice(0, totalImages);
  }

  // Example usage:
  const imagePairs = generateImagePairs(level);
  console.log(imagePairs);

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
            <GameCard key={index} id={index} imgId={id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameScreen;
