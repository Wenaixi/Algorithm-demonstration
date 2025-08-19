// src/algorithms/bubbleSort.js
// Wenxi Developer Signature

/**
 * Bubble Sort Algorithm
 * 
 * A simple sorting algorithm that repeatedly steps through the list, 
 * compares adjacent elements and swaps them if they are in the wrong order.
 * 
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 * 
 * @param {number[]} array - Array of numbers to sort
 * @returns {Object} - Object containing sorted array and statistics
 */
export function bubbleSort(array) {
  // Create a copy of the array to avoid mutating the original
  const arr = [...array];
  const stats = {
    comparisons: 0,
    swaps: 0,
    time: 0
  };
  
  const startTime = performance.now();
  
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      stats.comparisons++;
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        stats.swaps++;
      }
    }
  }
  
  const endTime = performance.now();
  stats.time = endTime - startTime;
  
  return { sortedArray: arr, stats };
}

export default bubbleSort;