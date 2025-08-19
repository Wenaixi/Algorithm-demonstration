// src/algorithms/mergeSort.js
// Wenxi Developer Signature

/**
 * Merge Sort Algorithm
 * 
 * An efficient, stable, comparison-based, divide-and-conquer sorting algorithm.
 * It divides the unsorted list into n sublists, each containing one element,
 * then repeatedly merges sublists to produce new sorted sublists.
 * 
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 * 
 * @param {number[]} array - Array of numbers to sort
 * @returns {Object} - Object containing sorted array and statistics
 */
export function mergeSort(array) {
  const stats = {
    comparisons: 0,
    swaps: 0, // Merge sort doesn't do in-place swaps, so this will be 0
    time: 0
  };
  
  const startTime = performance.now();
  
  // Create a copy of the array to avoid mutating the original
  const arr = [...array];
  
  // Internal recursive function
  function mergeSortRecursive(arr) {
    if (arr.length <= 1) {
      return arr;
    }
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSortRecursive(arr.slice(0, mid));
    const right = mergeSortRecursive(arr.slice(mid));
    
    return merge(left, right);
  }
  
  // Function to merge two sorted arrays
  function merge(left, right) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    while (leftIndex < left.length && rightIndex < right.length) {
      stats.comparisons++;
      if (left[leftIndex] <= right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }
    
    // Concat remaining elements
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }
  
  // Execute the merge sort
  const sortedArray = mergeSortRecursive(arr);
  
  const endTime = performance.now();
  stats.time = endTime - startTime;
  
  return { sortedArray, stats };
}

export default mergeSort;