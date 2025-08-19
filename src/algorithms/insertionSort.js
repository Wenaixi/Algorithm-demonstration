// Insertion Sort Algorithm

export function insertionSort(array) {
  const arr = [...array];
  const n = arr.length;
  
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    
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
    
    // Add step for key selection (compact representation)
    steps.push({ type: 'select', indices: [i] });
    
    // Move elements that are greater than key one position ahead
    while (j >= 0 && arr[j] > key) {
      stats.comparisons++;
      
      // Add step for comparison (compact representation)
      steps.push({ type: 'compare', indices: [j, j + 1] });
      
      arr[j + 1] = arr[j];
      stats.swaps++;
      
      // Add step for shift (compact representation)
      steps.push({ type: 'shift', index: j + 1, value: arr[j + 1] });
      
      j = j - 1;
    }
    
    // Place key at its correct position
    arr[j + 1] = key;
    
    // Count the final comparison that broke the while loop
    if (j >= 0) stats.comparisons++;
    
    // Add step for insertion (compact representation)
    steps.push({ type: 'insert', index: j + 1, value: arr[j + 1] });
  }
  
  const endTime = performance.now();
  stats.time = endTime - startTime;
  
  // Add final sorted state
  steps.push({ type: 'complete', array: [...arr] });
  
  return { steps, stats };
}

export default insertionSort;
