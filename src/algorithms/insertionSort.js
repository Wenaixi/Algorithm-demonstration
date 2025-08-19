// src/algorithms/insertionSort.js
// Wenxi Developer Signature

/**
 * Insertion Sort Algorithm
 * 
 * A simple sorting algorithm that builds the final sorted array one item at a time.
 * It is much less efficient on large lists than more advanced algorithms.
 * 
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 * 
 * @param {number[]} array - Array of numbers to sort
 * @returns {Object} - Object containing sorted array and statistics
 */
export function insertionSort(array) {
  // Create a copy of the array to avoid mutating the original
  const arr = [...array];
  const stats = {
    comparisons: 0,
    swaps: 0,
    time: 0
  };
  
  const startTime = performance.now();
  
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    
    // Move elements that are greater than key one position ahead
    while (j >= 0 && arr[j] > key) {
      stats.comparisons++;
      arr[j + 1] = arr[j];
      stats.swaps++;
      j = j - 1;
    }
    
    // Place key at its correct position
    arr[j + 1] = key;
    
    // Count the final comparison that broke the while loop
    if (j >= 0) stats.comparisons++;
  }
  
  const endTime = performance.now();
  stats.time = endTime - startTime;
  
  return { sortedArray: arr, stats };
}

/**
 * Insertion Sort Algorithm with Steps for Visualization
 * 
 * A version of insertion sort that returns each step of the sorting process
 * for visualization purposes.
 * 
 * @param {number[]} array - Array of numbers to sort
 * @returns {Object} - Object containing array of steps and final stats
 */
export function insertionSortSteps(array) {
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
  
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    
    // Add step for key selection
    steps.push({ array: [...arr], comparing: [i], swapping: [] });
    
    // Move elements that are greater than key one position ahead
    while (j >= 0 && arr[j] > key) {
      stats.comparisons++;
      
      // Add step for comparison
      steps.push({ array: [...arr], comparing: [j, j + 1], swapping: [] });
      
      arr[j + 1] = arr[j];
      stats.swaps++;
      
      // Add step for shift
      steps.push({ array: [...arr], comparing: [], swapping: [j, j + 1] });
      
      j = j - 1;
    }
    
    // Place key at its correct position
    arr[j + 1] = key;
    
    // Count the final comparison that broke the while loop
    if (j >= 0) stats.comparisons++;
    
    // Add step for insertion
    steps.push({ array: [...arr], comparing: [], swapping: [] });
  }
  
  const endTime = performance.now();
  stats.time = endTime - startTime;
  
  // Add final sorted state
  steps.push({ array: [...arr], comparing: [], swapping: [] });
  
  return { steps, stats };
}

export default insertionSort;