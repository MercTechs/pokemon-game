/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./TimeCounter.module.css";

const TimeCounter = ({ totalTime, onTimeUp, gameEnded, updateProgress }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameEnded && progress < 100) {
        // Check if game has not ended and progress is less than 100
        setProgress((prevProgress) => prevProgress + 0.1);
      } else {
        clearInterval(interval);
        updateProgress(Math.round(progress));
        if (!gameEnded) {
          onTimeUp(); // Call the callback function when time is up
        }
      }
    }, totalTime / 100);
    return () => {
      clearInterval(interval);
    };
  }, [progress, totalTime, onTimeUp, gameEnded]);

  return (
    <div className={styles.timeCounter}>
      <div
        className={styles.progressBar}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

TimeCounter.propTypes = {
  totalTime: PropTypes.number.isRequired,
  onTimeUp: PropTypes.func.isRequired,
  gameEnded: PropTypes.bool.isRequired,
  updateProgress: PropTypes.func.isRequired,
};

export default TimeCounter;
