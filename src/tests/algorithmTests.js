// Algorithm Tests

// Import all sorting algorithms with steps
import { quickSortSteps } from '../algorithms/quickSort.js';
import { mergeSortSteps } from '../algorithms/mergeSort.js';
import { heapSortSteps } from '../algorithms/heapSort.js';
import { shellSortSteps } from '../algorithms/shellSort.js';
import { bubbleSortSteps } from '../algorithms/bubbleSort.js';
import { selectionSortSteps } from '../algorithms/selectionSort.js';
import { insertionSortSteps } from '../algorithms/insertionSort.js';

// Test data sets
const testDataSets = [
  { name: 'Empty Array', data: [] },
  { name: 'Single Element', data: [42] },
  { name: 'Two Elements', data: [2, 1] },
  { name: 'Already Sorted', data: [1, 2, 3, 4, 5] },
  { name: 'Reverse Sorted', data: [5, 4, 3, 2, 1] },
  { name: 'Random Order', data: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3] },
  { name: 'Duplicates', data: [4, 2, 4, 2, 4, 2] },
  { name: 'All Same', data: [7, 7, 7, 7, 7] },
  { name: 'Negative Numbers', data: [-3, -1, -4, -1, -5] },
  { name: 'Mixed Numbers', data: [-2, 0, 3, -1, 4, -5, 2] }
];

// Algorithms to test
const algorithms = [
  { name: 'Quick Sort', fn: quickSortSteps },
  { name: 'Merge Sort', fn: mergeSortSteps },
  { name: 'Heap Sort', fn: heapSortSteps },
  { name: 'Shell Sort', fn: shellSortSteps },
  { name: 'Bubble Sort', fn: bubbleSortSteps },
  { name: 'Selection Sort', fn: selectionSortSteps },
  { name: 'Insertion Sort', fn: insertionSortSteps }
];

// Function to verify if an array is sorted
function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }
  return true;
}

// Function to run tests
function runTests() {
  console.log('Starting Algorithm Tests...\n');
  
  // Test each algorithm
  algorithms.forEach(algorithm => {
    console.log(`Testing ${algorithm.name}:`);
    let allPassed = true;
    
    // Test each data set
    testDataSets.forEach(dataSet => {
      // Create a copy of the test data
      const testData = [...dataSet.data];
      
      // Run the algorithm
      const result = algorithm.fn(testData);
      
      // Verify the result
      const isCorrect = isSorted(result.steps[result.steps.length - 1].array);
      
      // Log the result
      if (isCorrect) {
        console.log(`  ✓ ${dataSet.name}`);
      } else {
        console.log(`  ✗ ${dataSet.name}`);
        allPassed = false;
      }
      
      // Log performance stats
      console.log(`    Comparisons: ${result.stats.comparisons}, Swaps: ${result.stats.swaps}, Time: ${result.stats.time.toFixed(2)}ms`);
    });
    
    // Log overall result for the algorithm
    if (allPassed) {
      console.log(`  Overall: ✓ All tests passed\n`);
    } else {
      console.log(`  Overall: ✗ Some tests failed\n`);
    }
  });
  
  console.log('Algorithm Tests Completed.');
}

// Run the tests
runTests();