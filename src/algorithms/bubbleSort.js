// Bubble Sort Algorithm

/**
 * Basic bubble sort implementation with early termination optimization
 * 
 * This implementation uses the classic bubble sort algorithm with an optimization
 * that stops the algorithm if no swaps are made in a complete pass, indicating
 * that the array is already sorted.
 * 
 * Time Complexity: O(n^2) worst case, O(n) best case (already sorted)
 * Space Complexity: O(1)
 * 
 * @param {number[]} array - Array of numbers to sort
 * @returns {number[]} - Sorted array
 */
export function bubbleSort(array) {
  // Create a copy of the array to avoid mutating the original
  const arr = [...array];
  const n = arr.length;
  
  // Outer loop for number of passes
  for (let i = 0; i < n - 1; i++) {
    let swapped = false; // Flag to track if any swaps occurred in this pass
    
    // Inner loop for comparisons in each pass
    // After each pass, the largest element is bubbled to the end,
    // so we reduce the range by i
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap elements if they are in the wrong order
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true; // Set flag to true when a swap occurs
      }
    }
    
    // If no swaps occurred in the inner loop, the array is already sorted
    if (!swapped) {
      break;
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
  
  // Add initial state with compact representation
  steps.push({ type: 'init', array: [...arr] });
  
  const n = arr.length;
  // Bubble sort with visualization steps
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    // Add step for pass start
    steps.push({ type: 'passStart', index: i });
    
    for (let j = 0; j < n - i - 1; j++) {
      // Add step for comparison
      steps.push({ type: 'compare', indices: [j, j + 1] });
      
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        stats.swaps++;
        
        // Add step for swap
        steps.push({ type: 'swap', indices: [j, j + 1] });
      }
      stats.comparisons++;
    }
    
    // Add step for pass end
    steps.push({ type: 'passEnd', index: i });
    
    // If no swapping happened, array is sorted
    if (!swapped) break;
  }
  
  const endTime = performance.now();
  stats.time = endTime - startTime;
  
  // Add final sorted state
  steps.push({ type: 'complete', array: [...arr] });
  
  return { steps, stats };
}

export default bubbleSort;
