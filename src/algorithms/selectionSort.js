// src/algorithms/selectionSort.js
// Wenxi Developer Signature

/**
 * Selection Sort Algorithm
 * 
 * A simple in-place comparison sorting algorithm that divides the input list 
 * into two parts: a sorted sublist and an unsorted sublist.
 * 
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 * 
 * @param {number[]} array - Array of numbers to sort
 * @returns {Object} - Object containing sorted array and statistics
 */
export function selectionSort(array) {
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
    let minIndex = i;
    
    // Find the minimum element in the remaining unsorted array
    for (let j = i + 1; j < n; j++) {
      stats.comparisons++;
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    // Swap the found minimum element with the first element
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      stats.swaps++;
    }
  }
  
  const endTime = performance.now();
  stats.time = endTime - startTime;
  
  return { sortedArray: arr, stats };
}

export default selectionSort;