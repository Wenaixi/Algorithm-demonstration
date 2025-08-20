// Counting Sort Algorithm

/**
 * Basic counting sort implementation
 * 
 * @param {number[]} array - Array of numbers to sort (non-negative integers)
 * @returns {number[]} - Sorted array
 */
export function countingSort(array) {
  if (array.length === 0) {
    return array;
  }
  
  // Find the maximum value in the array
  const max = Math.max(...array);
  
  // Create a count array to store the count of each unique object
  const count = new Array(max + 1).fill(0);
  
  // Store the count of each element
  for (let i = 0; i < array.length; i++) {
    count[array[i]]++;
  }
  
  // Build the output array
  const output = [];
  for (let i = 0; i < count.length; i++) {
    for (let j = 0; j < count[i]; j++) {
      output.push(i);
    }
  }
  
  return output;
}

/**
 * Counting Sort Algorithm with Steps for Visualization
 * 
 * A version of counting sort that returns each step of the sorting process
 * for visualization purposes.
 * 
 * @param {number[]} array - Array of numbers to sort (non-negative integers)
 * @returns {Object} - Object containing array of steps and final stats
 */
export function countingSortSteps(array) {
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
  
  if (arr.length === 0) {
    const endTime = performance.now();
    stats.time = endTime - startTime;
    steps.push({ type: 'complete', array: [...arr] });
    return { steps, stats };
  }
  
  // Find the maximum value in the array
  const max = Math.max(...arr);
  
  // Create a count array to store the count of each unique object
  const count = new Array(max + 1).fill(0);
  
  // Store the count of each element
  for (let i = 0; i < arr.length; i++) {
    count[arr[i]]++;
    stats.comparisons++; // Counting access as a comparison
    
    // Add step for counting (compact representation)
    steps.push({ type: 'count', index: arr[i], value: count[arr[i]] });
  }
  
  // Build the output array
  const output = [];
  for (let i = 0; i < count.length; i++) {
    for (let j = 0; j < count[i]; j++) {
      output.push(i);
      stats.swaps++; // Counting placement as a swap
      
      // Add step for placement (compact representation)
      steps.push({ type: 'place', index: output.length - 1, value: i });
    }
  }
  
  const endTime = performance.now();
  stats.time = endTime - startTime;
  
  // Add final sorted state
  steps.push({ type: 'complete', array: [...output] });
  
  return { steps, stats };
}

export default countingSort;