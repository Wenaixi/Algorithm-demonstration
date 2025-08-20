// Bogo Sort Algorithm (Monkey Sort)

/**
 * Basic bogo sort implementation (for educational purposes only)
 * 
 * @param {number[]} array - Array of numbers to sort
 * @returns {number[]} - Sorted array
 */
export function bogoSort(array) {
  const arr = [...array];
  
  // Helper function to check if array is sorted
  function isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) {
        return false;
      }
    }
    return true;
  }
  
  // Helper function to shuffle array
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  // Keep shuffling until the array is sorted
  while (!isSorted(arr)) {
    shuffle(arr);
  }
  
  return arr;
}

/**
 * Bogo Sort Algorithm with Steps for Visualization
 * 
 * A version of bogo sort that returns each step of the sorting process
 * for visualization purposes. Note: This algorithm is extremely inefficient
 * and should only be used for educational/demonstration purposes.
 * 
 * @param {number[]} array - Array of numbers to sort
 * @returns {Object} - Object containing array of steps and final stats
 */
export function bogoSortSteps(array) {
  // Create a copy of the array to avoid mutating the original
  const arr = [...array];
  const stats = {
    comparisons: 0,
    swaps: 0, // We'll count shuffle operations as swaps
    time: 0
  };
  
  const steps = [];
  const startTime = performance.now();
  
  // Add initial state with compact representation
  steps.push({ type: 'init', array: [...arr] });
  
  // Helper function to check if array is sorted
  function isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
      stats.comparisons++;
      if (arr[i] < arr[i - 1]) {
        return false;
      }
    }
    return true;
  }
  
  // Helper function to shuffle array
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
      stats.swaps++;
      
      // Add step for shuffle (compact representation)
      steps.push({ type: 'shuffle', indices: [i, j] });
    }
  }
  
  // Keep shuffling until the array is sorted
  // Note: We limit the number of iterations for visualization purposes
  // to prevent infinite loops in the visualization
  let iterations = 0;
  const maxIterations = 1000; // Limit for visualization
  
  while (!isSorted(arr) && iterations < maxIterations) {
    shuffle(arr);
    iterations++;
  }
  
  const endTime = performance.now();
  stats.time = endTime - startTime;
  
  // Add final sorted state or timeout state
  if (iterations < maxIterations) {
    steps.push({ type: 'complete', array: [...arr] });
  } else {
    steps.push({ type: 'timeout', array: [...arr] });
  }
  
  return { steps, stats };
}

export default bogoSort;