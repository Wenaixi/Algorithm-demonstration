// Selection Sort Algorithm

export function selectionSort(array) {
  const arr = [...array];
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
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
  
  // Add initial state
  steps.push({ array: [...arr], comparing: [], swapping: [] });
  
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    // Find the minimum element in the remaining unsorted array
    for (let j = i + 1; j < n; j++) {
      stats.comparisons++;
      
      // Add step for comparison
      steps.push({ array: [...arr], comparing: [j, minIndex], swapping: [] });
      
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    // Swap the found minimum element with the first element
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      stats.swaps++;
      
      // Add step for swap
      steps.push({ array: [...arr], comparing: [], swapping: [i, minIndex] });
    }
    
    // Add step for selection
    steps.push({ array: [...arr], comparing: [], swapping: [] });
  }
  
  const endTime = performance.now();
  stats.time = endTime - startTime;
  
  // Add final sorted state
  steps.push({ array: [...arr], comparing: [], swapping: [] });
  
  return { steps, stats };
}

export default selectionSort;
