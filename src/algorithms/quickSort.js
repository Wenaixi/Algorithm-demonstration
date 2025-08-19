// Quick Sort Algorithm

export function quickSort(array) {
  if (array.length <= 1) {
    return array;
  }
  
  const pivot = array[Math.floor(array.length / 2)];
  const left = [];
  const right = [];
  const equal = [];
  
  for (let element of array) {
    if (element < pivot) {
      left.push(element);
    } else if (element > pivot) {
      right.push(element);
    } else {
      equal.push(element);
    }
  }
  
  return [...quickSort(left), ...equal, ...quickSort(right)];
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
  
  // Add initial state
  steps.push({ array: [...arr], comparing: [], swapping: [] });
  
  // Internal recursive function
  function quickSortRecursive(low, high) {
    if (low < high) {
      // Partition the array and get the pivot index
      const pivotIndex = partition(low, high);
      
      // Recursively sort elements before and after partition
      quickSortRecursive(low, pivotIndex - 1);
      quickSortRecursive(pivotIndex + 1, high);
    }
  }
  
  // Function to partition the array
  function partition(low, high) {
    const pivot = arr[high]; // Choosing the last element as pivot
    let i = low - 1; // Index of smaller element
    
    for (let j = low; j < high; j++) {
      stats.comparisons++;
      // If current element is smaller than or equal to pivot
      if (arr[j] <= pivot) {
        i++;
        // Swap elements
        if (i !== j) {
          // Add step for comparison
          steps.push({ array: [...arr], comparing: [i, j], swapping: [] });
          
          [arr[i], arr[j]] = [arr[j], arr[i]];
          stats.swaps++;
          
          // Add step for swap
          steps.push({ array: [...arr], comparing: [], swapping: [i, j] });
        } else {
          // Add step for comparison (no swap)
          steps.push({ array: [...arr], comparing: [i, j], swapping: [] });
        }
      } else {
        // Add step for comparison (no swap)
        steps.push({ array: [...arr], comparing: [i, j], swapping: [] });
      }
    }
    
    // Swap the pivot element with the element at i+1
    if (i + 1 !== high) {
      // Add step for pivot swap
      steps.push({ array: [...arr], comparing: [i + 1, high], swapping: [] });
      
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      stats.swaps++;
      
      // Add step for pivot swap
      steps.push({ array: [...arr], comparing: [], swapping: [i + 1, high] });
    }
    
    return i + 1;
  }
  
  // Call the recursive function
  quickSortRecursive(0, arr.length - 1);
  
  const endTime = performance.now();
  stats.time = endTime - startTime;
  
  // Add final sorted state
  steps.push({ array: [...arr], comparing: [], swapping: [] });
  
  return { steps, stats };
}

export default quickSort;
