// Quick Sort Algorithm

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

export function quickSort(array) {
  if (array.length <= 1) {
    return array;
  }
  
  // Create a copy of the array to avoid mutating the original
  const arr = [...array];
  
  // Use iterative quicksort to reduce recursion overhead
  const stack = [{ low: 0, high: arr.length - 1 }];
  
  while (stack.length > 0) {
    const { low, high } = stack.pop();
    
    if (low < high) {
      // Use insertion sort for small subarrays
      if (high - low + 1 < INSERTION_SORT_THRESHOLD) {
        insertionSort(arr, low, high);
        continue;
      }
      
      // Partition the array and get the pivot index
      const pivotIndex = partition(arr, low, high);
      
      // Push subarrays to stack
      stack.push({ low: low, high: pivotIndex - 1 });
      stack.push({ low: pivotIndex + 1, high: high });
    }
  }
  
  return arr;
}

// Function to partition the array using median-of-three pivot selection
function partition(arr, low, high) {
  // Median-of-three pivot selection
  const mid = Math.floor((low + high) / 2);
  if (arr[mid] < arr[low]) {
    [arr[low], arr[mid]] = [arr[mid], arr[low]];
  }
  if (arr[high] < arr[low]) {
    [arr[low], arr[high]] = [arr[high], arr[low]];
  }
  if (arr[high] < arr[mid]) {
    [arr[mid], arr[high]] = [arr[high], arr[mid]];
  }
  
  // Swap the median element with the last element
  [arr[mid], arr[high]] = [arr[high], arr[mid]];
  
  const pivot = arr[high]; // Choosing the median element as pivot
  let i = low - 1; // Index of smaller element
  
  for (let j = low; j < high; j++) {
    // If current element is smaller than or equal to pivot
    if (arr[j] <= pivot) {
      i++;
      // Swap elements
      if (i !== j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  
  // Swap the pivot element with the element at i+1
  if (i + 1 !== high) {
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  }
  
  return i + 1;
}

// Insertion sort for small arrays with steps
function insertionSortSteps(arr, low, high, steps, stats) {
  for (let i = low + 1; i <= high; i++) {
    const temp = arr[i];
    let j = i - 1;
    
    // Add step for comparison
    steps.push({ type: 'compare', indices: [i, j] });
    
    while (j >= low && arr[j] > temp) {
      arr[j + 1] = arr[j];
      stats.swaps++;
      
      // Add step for shift operation
      steps.push({ type: 'shift', indices: [j, j + 1] });
      
      j--;
      
      // Add step for next comparison if applicable
      if (j >= low) {
        steps.push({ type: 'compare', indices: [i, j] });
      }
    }
    
    arr[j + 1] = temp;
    
    // Add step for insertion
    if (j + 1 !== i) {
      stats.swaps++;
      steps.push({ type: 'insert', indices: [i, j + 1] });
    }
  }
}

/**
 * Quick Sort Algorithm with Steps for Visualization
 * 
 * A version of quick sort that returns each step of the sorting process
 * for visualization purposes.
 * 
 * @param {number[]} array - Array of numbers to sort
 * @returns {Object} - Object containing array of steps and final stats
 */
export function quickSortSteps(array) {
  const stats = {
    comparisons: 0,
    swaps: 0,
    time: 0
  };
  
  const startTime = performance.now();
  
  // Create a copy of the array to avoid mutating the original
  const arr = [...array];
  const steps = [];
  
  // Add initial state with compact representation
  steps.push({ type: 'init', array: [...arr] });
  
  // Iterative quicksort function
  function quickSortIterative() {
    const stack = [{ low: 0, high: arr.length - 1 }];
    
    while (stack.length > 0) {
      const { low, high } = stack.pop();
      
      if (low < high) {
        // Use insertion sort for small subarrays
        if (high - low + 1 < INSERTION_SORT_THRESHOLD) {
          // Add step for insertion sort
          steps.push({ type: 'info', message: `Using insertion sort for small subarray [${low}, ${high}]` });
          
          insertionSortSteps(arr, low, high, steps, stats);
          
          // Add step for completion of insertion sort
          steps.push({ type: 'info', message: `Completed insertion sort for subarray [${low}, ${high}]` });
          
          continue;
        }
        
        // Partition the array and get the pivot index
        const pivotIndex = partition(low, high);
        
        // Push subarrays to stack
        stack.push({ low: low, high: pivotIndex - 1 });
        stack.push({ low: pivotIndex + 1, high: high });
      }
    }
  }
  
  // Function to partition the array using median-of-three pivot selection
  function partition(low, high) {
    // Median-of-three pivot selection
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] < arr[low]) {
      [arr[low], arr[mid]] = [arr[mid], arr[low]];
      // Add step for median-of-three swap
      steps.push({ type: 'swap', indices: [low, mid] });
    }
    if (arr[high] < arr[low]) {
      [arr[low], arr[high]] = [arr[high], arr[low]];
      // Add step for median-of-three swap
      steps.push({ type: 'swap', indices: [low, high] });
    }
    if (arr[high] < arr[mid]) {
      [arr[mid], arr[high]] = [arr[high], arr[mid]];
      // Add step for median-of-three swap
      steps.push({ type: 'swap', indices: [mid, high] });
    }
    
    // Swap the median element with the last element
    [arr[mid], arr[high]] = [arr[high], arr[mid]];
    // Add step for pivot selection
    steps.push({ type: 'swap', indices: [mid, high] });
    
    const pivot = arr[high]; // Choosing the median element as pivot
    let i = low - 1; // Index of smaller element
    
    for (let j = low; j < high; j++) {
      stats.comparisons++;
      // Add step for comparison
      steps.push({ type: 'compare', indices: [j, high] });
      
      // If current element is smaller than or equal to pivot
      if (arr[j] <= pivot) {
        i++;
        // Swap elements
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          stats.swaps++;
          
          // Add step for element swap
          steps.push({ type: 'swap', indices: [i, j] });
        }
      }
    }
    
    // Swap the pivot element with the element at i+1
    if (i + 1 !== high) {
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      stats.swaps++;
      
      // Add step for pivot placement
      steps.push({ type: 'swap', indices: [i + 1, high] });
    }
    
    return i + 1;
  }
  
  // Call the iterative function
  quickSortIterative();
  
  const endTime = performance.now();
  stats.time = endTime - startTime;
  
  // Add final sorted state
  steps.push({ type: 'complete', array: [...arr] });
  
  return { steps, stats };
}

export default quickSort;
