// src/algorithms/quickSort.js
// Wenxi Developer Signature

/**
 * Quick Sort Algorithm
 * 
 * An efficient, comparison-based, divide-and-conquer sorting algorithm.
 * It works by selecting a 'pivot' element from the array and partitioning
 * the other elements into two sub-arrays according to whether they are
 * less than or greater than the pivot.
 * 
 * Time Complexity: O(n log n) average, O(n^2) worst case
 * Space Complexity: O(log n)
 * 
 * @param {number[]} array - Array of numbers to sort
 * @returns {Object} - Object containing sorted array and statistics
 */
export function quickSort(array) {
  const stats = {
    comparisons: 0,
    swaps: 0,
    time: 0
  };
  
  const startTime = performance.now();
  
  // Create a copy of the array to avoid mutating the original
  const arr = [...array];
  
  // Internal recursive function
  function quickSortRecursive(low, high) {
    if (low < high) {
      // Partition the array and get the pivot index
      const pivotIndex = partition(low, high);
      
      // Recursively sort elements before and after partition
      quickSortRecursive(low, pivotIndex - 1);
      quickSortRecursive(pivotIndex + 1, high);
    }
  }
  
  // Function to partition the array
  function partition(low, high) {
    const pivot = arr[high]; // Choosing the last element as pivot
    let i = low - 1; // Index of smaller element
    
    for (let j = low; j < high; j++) {
      stats.comparisons++;
      // If current element is smaller than or equal to pivot
      if (arr[j] <= pivot) {
        i++;
        // Swap elements
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          stats.swaps++;
        }
      }
    }
    
    // Swap the pivot element with the element at i+1
    if (i + 1 !== high) {
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      stats.swaps++;
    }
    
    return i + 1;
  }
  
  // Call the recursive function
  quickSortRecursive(0, arr.length - 1);
  
  const endTime = performance.now();
  stats.time = endTime - startTime;
  
  return { sortedArray: arr, stats };
}

export default quickSort;