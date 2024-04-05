import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./GetScore.module.css";

function GetScore({ level, currentScore }) {
  const [apiScores, setApiScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.lotegame.com/score/?level=${level}&limit=5`
        );
        setApiScores(response.data.scores);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [level]); // Fetch API scores only when level changes

  // Combine API scores with current score and sort by score
  const combinedScores = [
    ...apiScores,
    { player: "You", score: currentScore },
  ].sort((a, b) => b.score - a.score);

  return (
    <div className={styles["leader-board"]}>
      <h2 className={styles["leader-board-label"]}>Highest Scores</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className={styles["leader-board-table"]}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {combinedScores.map((score, index) => (
              <tr
                key={index}
                className={`${styles["leader-board-row"]} ${index === 0 ? styles["first-player"] : ""} ${score.player === "You" ? styles["current-player"] : ""}`}
              >
                <td>
                  {index < combinedScores.length - 1 ? (
                    index === 0 ? (
                      <span
                        className={styles["crown-icon"]}
                        role="img"
                        aria-label="crown"
                      >
                        👑
                      </span>
                    ) : (
                      index + 1
                    )
                  ) : null}
                </td>
                <td>{score.player}</td>
                <td>{score.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GetScore;
