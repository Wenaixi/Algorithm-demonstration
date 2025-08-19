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

export default insertionSort;