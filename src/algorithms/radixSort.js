// Radix Sort Algorithm

/**
 * Basic radix sort implementation
 * 
 * @param {number[]} array - Array of non-negative integers to sort
 * @returns {number[]} - Sorted array
 */
export function radixSort(array) {
  if (array.length === 0) {
    return array;
  }
  
  // Find the maximum number to know number of digits
  const max = Math.max(...array);
  
  // Do counting sort for every digit. Note that instead of passing digit number,
  // exp is passed. exp is 10^i where i is current digit number
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(array, exp);
  }
  
  return array;
}

/**
 * A utility function to do counting sort of array[] according to
 * the digit represented by exp.
 * 
 * @param {number[]} array - Array of numbers to sort
 * @param {number} exp - Exponent representing the digit position
 */
function countingSortByDigit(array, exp) {
  const n = array.length;
  const output = new Array(n).fill(0); // Output array
  const count = new Array(10).fill(0); // Count array for digits 0-9
  
  // Store count of occurrences in count[]
  for (let i = 0; i < n; i++) {
    const index = Math.floor(array[i] / exp) % 10;
    count[index]++;
  }
  
  // Change count[i] so that count[i] now contains actual
  // position of this digit in output[]
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  // Build the output array
  for (let i = n - 1; i >= 0; i--) {
    const index = Math.floor(array[i] / exp) % 10;
    output[count[index] - 1] = array[i];
    count[index]--;
  }
  
  // Copy the output array to array[], so that array[] now
  // contains sorted numbers according to current digit
  for (let i = 0; i < n; i++) {
    array[i] = output[i];
  }
}

/**
 * Radix Sort Algorithm with Steps for Visualization
 * 
 * A version of radix sort that returns each step of the sorting process
 * for visualization purposes.
 * 
 * @param {number[]} array - Array of non-negative integers to sort
 * @returns {Object} - Object containing array of steps and final stats
 */
export function radixSortSteps(array) {
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
  
  // Find the maximum number to know number of digits
  const max = Math.max(...arr);
  
  // Do counting sort for every digit. Note that instead of passing digit number,
  // exp is passed. exp is 10^i where i is current digit number
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigitSteps(arr, exp, stats, steps);
  }
  
  const endTime = performance.now();
  stats.time = endTime - startTime;
  
  // Add final sorted state
  steps.push({ type: 'complete', array: [...arr] });
  
  return { steps, stats };
}

/**
 * A utility function to do counting sort of array[] according to
 * the digit represented by exp with steps for visualization.
 * 
 * @param {number[]} array - Array of numbers to sort
 * @param {number} exp - Exponent representing the digit position
 * @param {Object} stats - Object to track comparisons and swaps
 * @param {Array} steps - Array to store visualization steps
 */
function countingSortByDigitSteps(array, exp, stats, steps) {
  const n = array.length;
  const output = new Array(n).fill(0); // Output array
  const count = new Array(10).fill(0); // Count array for digits 0-9
  
  // Store count of occurrences in count[]
  for (let i = 0; i < n; i++) {
    const index = Math.floor(array[i] / exp) % 10;
    count[index]++;
    stats.comparisons++; // Counting access as a comparison
    
    // Add step for counting digit (compact representation)
    steps.push({ type: 'count', index: index, value: count[index] });
  }
  
  // Change count[i] so that count[i] now contains actual
  // position of this digit in output[]
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
    stats.comparisons++; // Counting addition as a comparison
  }
  
  // Build the output array
  for (let i = n - 1; i >= 0; i--) {
    const index = Math.floor(array[i] / exp) % 10;
    output[count[index] - 1] = array[i];
    count[index]--;
    stats.swaps++; // Counting placement as a swap
    
    // Add step for placement (compact representation)
    steps.push({ type: 'place', index: count[index], value: array[i] });
  }
  
  // Copy the output array to array[], so that array[] now
  // contains sorted numbers according to current digit
  for (let i = 0; i < n; i++) {
    array[i] = output[i];
    
    // Add step for copy (compact representation)
    steps.push({ type: 'copy', index: i, value: array[i] });
  }
}

export default radixSort;