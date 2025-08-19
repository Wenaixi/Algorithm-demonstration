// Bubble Sort Algorithm

/**
 * Basic bubble sort implementation
 * 
 * @param {number[]} array - Array of numbers to sort
 * @returns {number[]} - Sorted array
 */
export function bubbleSort(array) {
  const arr = [...array];
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  
  return arr;
}

/**
 * Bubble Sort Algorithm with Steps for Visualization
 * 
 * A version of bubble sort that returns each step of the sorting process
 * for visualization purposes.
 * 
 * @param {number[]} array - Array of numbers to sort
 * @returns {Object} - Object containing array of steps and final stats
 */
export function bubbleSortSteps(array) {
  // Create a copy of the array to avoid mutating the original
  const arr = [...array];
  const stats = {
    comparisons: 0,
    swaps: 0,
    time: 0
  };
  
  const steps = [];
  const startTime = performance.now();
  
  // Add initial state
  steps.push({ array: [...arr], comparing: [], swapping: [] });
  
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      stats.comparisons++;
      
      // Add step for comparison
      steps.push({ array: [...arr], comparing: [j, j + 1], swapping: [] });
      
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        stats.swaps++;
        
        // Add step for swap
        steps.push({ array: [...arr], comparing: [], swapping: [j, j + 1] });
      }
    }
  }
  
  const endTime = performance.now();
  stats.time = endTime - startTime;
  
  // Add final sorted state
  steps.push({ array: [...arr], comparing: [], swapping: [] });
  
  return { steps, stats };
}

export default bubbleSort;
