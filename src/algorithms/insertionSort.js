// Insertion Sort Algorithm

/**
 * Basic insertion sort implementation with early termination optimization
 * 
 * This implementation builds the sorted array one element at a time by repeatedly
 * taking the next element and inserting it into the correct position in the
 * already sorted portion of the array.
 * 
 * Time Complexity: O(n^2) worst case, O(n) best case (already sorted)
 * Space Complexity: O(1)
 * 
 * @param {number[]} array - Array of numbers to sort
 * @returns {number[]} - Sorted array
 */
export function insertionSort(array) {
  // Create a copy of the array to avoid mutating the original
  const arr = [...array];
  const n = arr.length;
  
  // Traverse from the second element to the last element
  for (let i = 1; i < n; i++) {
    // Store the current element to be inserted
    const key = arr[i];
    // Start comparing with the element before the current element
    let j = i - 1;
    
    // Optimization: Early termination if the element is already in the correct position
    if (j >= 0 && arr[j] <= key) {
      continue;
    }
    
    // Move elements that are greater than key one position ahead
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    
    // Insert the key at its correct position
    arr[j + 1] = key;
  }
  
  return arr;
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
  
  // Add initial state with compact representation
  steps.push({ type: 'init', array: [...arr] });
  
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    
    // Add step for key selection
    steps.push({ type: 'select', indices: [i] });
    
    // Move elements that are greater than key one position ahead
    while (j >= 0 && arr[j] > key) {
      stats.comparisons++;
      
      // Add step for comparison
      steps.push({ type: 'compare', indices: [j, j + 1] });
      
      arr[j + 1] = arr[j];
      stats.swaps++;
      
      // Add step for shift
      steps.push({ type: 'shift', index: j + 1, value: arr[j + 1] });
      
      j = j - 1;
    }
    
    // Place key at its correct position
    arr[j + 1] = key;
    
    // Count the final comparison that broke the while loop
    if (j >= 0) stats.comparisons++;
    
    // Add step for insertion
    steps.push({ type: 'insert', index: j + 1, value: arr[j + 1] });
  }
  
  const endTime = performance.now();
  stats.time = endTime - startTime;
  
  // Add final sorted state
  steps.push({ type: 'complete', array: [...arr] });
  
  return { steps, stats };
}

export default insertionSort;
