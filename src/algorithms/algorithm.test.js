// src/algorithms/algorithm.test.js
// Wenxi Developer Signature

import { bubbleSort } from './bubbleSort';
import { selectionSort } from './selectionSort';
import { insertionSort } from './insertionSort';
import { quickSort } from './quickSort';
import { mergeSort } from './mergeSort';

// Test data
const testData = [64, 34, 25, 12, 22, 11, 90];
const expectedSorted = [11, 12, 22, 25, 34, 64, 90];

// Test for Bubble Sort
console.log('Testing Bubble Sort...');
const bubbleResult = bubbleSort(testData);
console.log('Sorted Array:', bubbleResult.sortedArray);
console.log('Stats:', bubbleResult.stats);
console.log('Correctly Sorted:', JSON.stringify(bubbleResult.sortedArray) === JSON.stringify(expectedSorted));

// Test for Selection Sort
console.log('\nTesting Selection Sort...');
const selectionResult = selectionSort(testData);
console.log('Sorted Array:', selectionResult.sortedArray);
console.log('Stats:', selectionResult.stats);
console.log('Correctly Sorted:', JSON.stringify(selectionResult.sortedArray) === JSON.stringify(expectedSorted));

// Test for Insertion Sort
console.log('\nTesting Insertion Sort...');
const insertionResult = insertionSort(testData);
console.log('Sorted Array:', insertionResult.sortedArray);
console.log('Stats:', insertionResult.stats);
console.log('Correctly Sorted:', JSON.stringify(insertionResult.sortedArray) === JSON.stringify(expectedSorted));

// Test for Quick Sort
console.log('\nTesting Quick Sort...');
const quickResult = quickSort(testData);
console.log('Sorted Array:', quickResult.sortedArray);
console.log('Stats:', quickResult.stats);
console.log('Correctly Sorted:', JSON.stringify(quickResult.sortedArray) === JSON.stringify(expectedSorted));

// Test for Merge Sort
console.log('\nTesting Merge Sort...');
const mergeResult = mergeSort(testData);
console.log('Sorted Array:', mergeResult.sortedArray);
console.log('Stats:', mergeResult.stats);
console.log('Correctly Sorted:', JSON.stringify(mergeResult.sortedArray) === JSON.stringify(expectedSorted));

console.log('\nAll tests completed!');