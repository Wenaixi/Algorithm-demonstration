// Merge Sort Algorithm

// Threshold for switching to insertion sort
const INSERTION_SORT_THRESHOLD = 10;

// Insertion sort for small arrays
function insertionSort(arr, left, right) {
  for (let i = left + 1; i <= right; i++) {
    const temp = arr[i];
    let j = i - 1;
    while (j >= left && arr[j] > temp) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = temp;
  }
}

// Insertion sort for small arrays with steps
function insertionSortSteps(arr, left, right, steps, stats, startIdx = 0) {
  for (let i = left + 1; i <= right; i++) {
    const temp = arr[i];
    let j = i - 1;
    
    // Add step for comparison
    steps.push({ 
      type: 'compare',
      indices: [startIdx + i, startIdx + j]
    });
    
    while (j >= left && arr[j] > temp) {
      arr[j + 1] = arr[j];
      stats.swaps++;
      
      // Add step for shift operation
      steps.push({ 
        type: 'shift',
        indices: [startIdx + j, startIdx + j + 1]
      });
      
      j--;
      
      // Add step for next comparison if applicable
      if (j >= left) {
        steps.push({ 
          type: 'compare',
          indices: [startIdx + i, startIdx + j]
        });
      }
    }
    
    arr[j + 1] = temp;
    
    // Add step for insertion
    if (j + 1 !== i) {
      stats.swaps++;
      steps.push({ 
        type: 'insert',
        indices: [startIdx + i, startIdx + j + 1]
      });
    }
  }
}

export function mergeSort(array) {
  // Create a copy of the array to avoid mutating the original
  const arr = [...array];
  
  // Call the optimized merge sort function
  mergeSortOptimized(arr, 0, arr.length - 1);
  
  return arr;
}

// Optimized merge sort implementation
function mergeSortOptimized(arr, left, right) {
  if (left < right) {
    // Use insertion sort for small subarrays
    if (right - left + 1 < INSERTION_SORT_THRESHOLD) {
      insertionSort(arr, left, right);
      return;
    }
    
    const mid = Math.floor((left + right) / 2);
    
    // Recursively sort first and second halves
    mergeSortOptimized(arr, left, mid);
    mergeSortOptimized(arr, mid + 1, right);
    
    // Merge the sorted halves only if needed
    if (arr[mid] > arr[mid + 1]) {
      mergeInPlace(arr, left, mid, right);
    }
  }
}

// In-place merge function
function mergeInPlace(arr, left, mid, right) {
  // Create temporary arrays for the two subarrays
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);
  
  let i = 0, j = 0, k = left;
  
  // Merge the temporary arrays back into arr[left..right]
  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }
    k++;
  }
  
  // Copy the remaining elements of leftArr[], if any
  while (i < leftArr.length) {
    arr[k] = leftArr[i];
    i++;
    k++;
  }
  
  // Copy the remaining elements of rightArr[], if any
  while (j < rightArr.length) {
    arr[k] = rightArr[j];
    j++;
    k++;
  }
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
  
  // Optimized recursive function with insertion sort for small arrays
  function mergeSortRecursiveOptimized(arr, startIdx = 0) {
    if (arr.length <= 1) {
      return { result: arr, startIdx };
    }
    
    // Use insertion sort for small subarrays
    if (arr.length < INSERTION_SORT_THRESHOLD) {
      // Create a copy of the subarray to sort
      const subArray = [...arr];
      
      // Add step for insertion sort
      steps.push({ 
        type: 'info',
        message: `Using insertion sort for small subarray [${startIdx}, ${startIdx + arr.length - 1}]`
      });
      
      // Sort the subarray with steps
      insertionSortSteps(subArray, 0, subArray.length - 1, steps, stats, startIdx);
      
      // Add step for completion of insertion sort
      steps.push({ 
        type: 'info',
        message: `Completed insertion sort for subarray [${startIdx}, ${startIdx + arr.length - 1}]`
      });
      
      return { result: subArray, startIdx };
    }
    
    const mid = Math.floor(arr.length / 2);
    const leftObj = mergeSortRecursiveOptimized(arr.slice(0, mid), startIdx);
    const rightObj = mergeSortRecursiveOptimized(arr.slice(mid), startIdx + mid);
    
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
  
  // Execute the optimized merge sort
  const sortedObj = mergeSortRecursiveOptimized(arr);
  const sortedArray = sortedObj.result;
  
  const endTime = performance.now();
  stats.time = endTime - startTime;
  
  // Add final sorted state
  steps.push({ type: 'complete', array: [...sortedArray] });
  
  return { steps, stats };
}

export default mergeSort;
