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
  
    // Duplicate pairs if needed
    const imagePairs = [...pickid, ...pickid];
    // Shuffle pairs
    for (let i = imagePairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [imagePairs[i], imagePairs[j]] = [imagePairs[j], imagePairs[i]];
    }
  
    // Return only the required number of pairs
    return imagePairs;
  }