import React, { useState, useEffect } from "react";
import axios from "axios";

function GetScore({ level }) {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.lotegame.com/score/?level=${level}&limit=5`
        );
        setScores(response.data.scores);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [level]);

  return (
    <div>
      <h2>Highest Scores</h2>
      {scores.length > 0 ? (
        <ul>
          {scores.map((score, index) => (
            <li key={index}>
              Player: {score.player}, Score: {score.score}
            </li>
          ))}
        </ul>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default GetScore;
