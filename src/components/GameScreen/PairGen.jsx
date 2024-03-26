export default function generateImagePairs(level) {
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

  const cards = [];

  // Generate unique pairs
  while (cards.length < maxPairs * 2) {
    const id = Math.floor(Math.random() * 64) + 1; // Generating image id between 1 and 64
    const exists = cards.some((card) => card.id === id);
    if (exists) {
    } else {
      cards.push({
        id: id,
        bonusPoints: 50,
        basePoints: 50,
        isFlip: false,
        isComplete: false,
      });
      cards.push({
        id: id,
        bonusPoints: 50,
        basePoints: 50,
        isFlip: false,
        isComplete: false,
      });
    }
  }

  // Shuffle pairs
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  // Return only the required number of pairs
  return cards;
}
