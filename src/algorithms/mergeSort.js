// Merge Sort Algorithm

export function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }
  
  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);
  
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

/**
 * Merge Sort Algorithm with Steps for Visualization
 * 
 * A version of merge sort that returns each step of the sorting process
 * for visualization purposes.
 * 
 * @param {number[]} array - Array of numbers to sort
 * @returns {Object} - Object containing array of steps and final stats
 */
export function mergeSortSteps(array) {
  const stats = {
    comparisons: 0,
    swaps: 0, // Merge sort doesn't do in-place swaps, so this will be 0
    time: 0
  };
  
  const startTime = performance.now();
  const steps = [];
  
  // Add initial state
  steps.push({ array: [...array], comparing: [], swapping: [] });
  
  // Create a copy of the array to avoid mutating the original
  const arr = [...array];
  
  // Internal recursive function
  function mergeSortRecursive(arr) {
    if (arr.length <= 1) {
      return arr;
    }
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSortRecursive(arr.slice(0, mid));
    const right = mergeSortRecursive(arr.slice(mid));
    
    return merge(left, right);
  }
  
  // Function to merge two sorted arrays
  function merge(left, right) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    while (leftIndex < left.length && rightIndex < right.length) {
      stats.comparisons++;
      
      // Add step for comparison
      const currentArr = [...result, ...left.slice(leftIndex), ...right.slice(rightIndex)];
      steps.push({ 
        array: currentArr, 
        comparing: [result.length, result.length + left.length - leftIndex], 
        swapping: [] 
      });
      
      if (left[leftIndex] <= right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
      
      // Add step for merge
      const mergedArr = [...result, ...left.slice(leftIndex), ...right.slice(rightIndex)];
      steps.push({ 
        array: mergedArr, 
        comparing: [], 
        swapping: [] 
      });
    }
    
    // Concat remaining elements
    const mergedResult = result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    
    // Add step for final merge
    steps.push({ array: [...mergedResult], comparing: [], swapping: [] });
    
    return mergedResult;
  }
  
  // Execute the merge sort
  const sortedArray = mergeSortRecursive(arr);
  
  const endTime = performance.now();
  stats.time = endTime - startTime;
  
  // Add final sorted state
  steps.push({ array: [...sortedArray], comparing: [], swapping: [] });
  
  return { steps, stats };
}

export default mergeSort;
