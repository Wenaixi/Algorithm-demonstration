// Selection Sort Algorithm

/**
 * Basic selection sort implementation
 * 
 * This implementation finds the minimum element in the unsorted portion of the array
 * and swaps it with the first element of the unsorted portion. This process is
 * repeated until the entire array is sorted.
 * 
 * Time Complexity: O(n^2) in all cases
 * Space Complexity: O(1)
 * 
 * @param {number[]} array - Array of numbers to sort
 * @returns {number[]} - Sorted array
 */
export function selectionSort(array) {
  // Create a copy of the array to avoid mutating the original
  const arr = [...array];
  const n = arr.length;
  
  // Traverse through all array elements
  for (let i = 0; i < n - 1; i++) {
    // Find the minimum element in the remaining unsorted array
    let minIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    // Swap the found minimum element with the first element
    // Optimization: Only swap if minIndex is different from i
    // This also handles the case where the array is already sorted
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  
  return arr;
}

/**
 * Selection Sort Algorithm with Steps for Visualization
 * 
 * A version of selection sort that returns each step of the sorting process
 * for visualization purposes.
 * 
 * @param {number[]} array - Array of numbers to sort
 * @returns {Object} - Object containing array of steps and final stats
 */
export function selectionSortSteps(array) {
  // Create a copy of the array to avoid mutating the original
  const arr = [...array];
  const stats = {
    comparisons: 0,
    swaps: 0,
    time: 0
  };
  
  const steps = [];
  const startTime = performance.now();
  
  // Add initial state with compact representation
  steps.push({ type: 'init', array: [...arr] });
  
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    // Add step for selection start
    steps.push({ type: 'selectionStart', index: i });
    
    // Find the minimum element in the remaining unsorted array
    for (let j = i + 1; j < n; j++) {
      // Add step for comparison
      steps.push({ type: 'compare', indices: [j, minIndex] });
      
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
      stats.comparisons++;
    }
    
    // Add step for selection end
    steps.push({ type: 'selectionEnd', index: i });
    
    // Swap the found minimum element with the first element
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      stats.swaps++;
      
      // Add step for swap
      steps.push({ type: 'swap', indices: [i, minIndex] });
    }
  }
  
  const endTime = performance.now();
  stats.time = endTime - startTime;
  
  // Add final sorted state
  steps.push({ type: 'complete', array: [...arr] });
  
  return { steps, stats };
}

export default selectionSort;
