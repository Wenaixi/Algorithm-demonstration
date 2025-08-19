// src/utils/dataGenerator.js
// Wenxi Developer Signature

/**
 * Generates an array of random integers
 * 
 * @param {number} size - Size of the array
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (inclusive)
 * @returns {number[]} - Array of random integers
 */
export function generateRandomArray(size, min = 1, max = 100) {
  return Array.from({ length: size }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}

/**
 * Generates a sorted array in ascending order
 * 
 * @param {number} size - Size of the array
 * @returns {number[]} - Sorted array
 */
export function generateSortedArray(size) {
  return Array.from({ length: size }, (_, i) => i + 1);
}

/**
 * Generates a sorted array in descending order
 * 
 * @param {number} size - Size of the array
 * @returns {number[]} - Reverse sorted array
 */
export function generateReverseSortedArray(size) {
  return Array.from({ length: size }, (_, i) => size - i);
}

/**
 * Generates an array with many duplicate values
 * 
 * @param {number} size - Size of the array
 * @param {number} numUnique - Number of unique values
 * @returns {number[]} - Array with duplicates
 */
export function generateArrayWithDuplicates(size, numUnique = 5) {
  const uniqueValues = Array.from({ length: numUnique }, (_, i) => i + 1);
  return Array.from({ length: size }, () => 
    uniqueValues[Math.floor(Math.random() * numUnique)]
  );
}

/**
 * Generates a nearly sorted array (mostly sorted with a few random swaps)
 * 
 * @param {number} size - Size of the array
 * @param {number} swaps - Number of random swaps to perform
 * @returns {number[]} - Nearly sorted array
 */
export function generateNearlySortedArray(size, swaps = 3) {
  const arr = generateSortedArray(size);
  
  for (let i = 0; i < swaps; i++) {
    const index1 = Math.floor(Math.random() * size);
    let index2 = Math.floor(Math.random() * size);
    
    // Ensure we're swapping with a different index
    while (index2 === index1) {
      index2 = Math.floor(Math.random() * size);
    }
    
    // Swap elements
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
  }
  
  return arr;
}

export default {
  generateRandomArray,
  generateSortedArray,
  generateReverseSortedArray,
  generateArrayWithDuplicates,
  generateNearlySortedArray
};