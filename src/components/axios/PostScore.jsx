import React, { useEffect } from "react";
import axios from "axios";

function PostScore({ player, score, level }) {
  const postData = async () => {
    try {
      const response = await axios.post("https://api.lotegame.com/score/", {
        player: player,
        score: score,
        level: level,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Call postData when component mounts
  useEffect(() => {
    postData();
  }, []); // Empty dependency array ensures this effect runs only once

  return null; // Since this is a utility component, it doesn't render anything
}

export default PostScore;
