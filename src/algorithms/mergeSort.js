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
  
  // Add initial state with compact representation
  steps.push({ type: 'init', array: [...array] });
  
  // Create a copy of the array to avoid mutating the original
  const arr = [...array];
  
  // Internal recursive function
  function mergeSortRecursive(arr, startIdx = 0) {
    if (arr.length <= 1) {
      return { result: arr, startIdx };
    }
    
    const mid = Math.floor(arr.length / 2);
    const leftObj = mergeSortRecursive(arr.slice(0, mid), startIdx);
    const rightObj = mergeSortRecursive(arr.slice(mid), startIdx + mid);
    
    return merge(leftObj, rightObj);
  }
  
  // Function to merge two sorted arrays
  function merge(leftObj, rightObj) {
    const left = leftObj.result;
    const right = rightObj.result;
    const leftStart = leftObj.startIdx;
    const rightStart = rightObj.startIdx;
    
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    while (leftIndex < left.length && rightIndex < right.length) {
      stats.comparisons++;
      
      // Add step for comparison (compact representation)
      steps.push({ 
        type: 'compare',
        indices: [leftStart + leftIndex, rightStart + rightIndex]
      });
      
      if (left[leftIndex] <= right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
      
      // Add step for merge (compact representation)
      steps.push({ 
        type: 'merge',
        index: leftStart + leftIndex + rightIndex - 1,
        value: result[result.length - 1]
      });
    }
    
    // Concat remaining elements
    while (leftIndex < left.length) {
      result.push(left[leftIndex]);
      steps.push({ 
        type: 'merge',
        index: leftStart + leftIndex,
        value: left[leftIndex]
      });
      leftIndex++;
    }
    
    while (rightIndex < right.length) {
      result.push(right[rightIndex]);
      steps.push({ 
        type: 'merge',
        index: rightStart + rightIndex,
        value: right[rightIndex]
      });
      rightIndex++;
    }
    
    return { result, startIdx: leftStart };
  }
  
  // Execute the merge sort
  const sortedObj = mergeSortRecursive(arr);
  const sortedArray = sortedObj.result;
  
  const endTime = performance.now();
  stats.time = endTime - startTime;
  
  // Add final sorted state
  steps.push({ type: 'complete', array: [...sortedArray] });
  
  return { steps, stats };
}

export default mergeSort;
