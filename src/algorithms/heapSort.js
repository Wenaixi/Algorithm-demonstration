// Heap Sort Algorithm

/**
 * Basic heap sort implementation
 * 
 * @param {number[]} array - Array of numbers to sort
 * @returns {number[]} - Sorted array
 */
export function heapSort(array) {
  const arr = [...array];
  const n = arr.length;
  
  // Build a max heap using iterative approach
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapifyIterative(arr, n, i);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]];
    
    // Call heapify on the reduced heap
    heapifyIterative(arr, i, 0);
  }
  
  return arr;
}

// Iterative function to heapify a subtree rooted with node i
function heapifyIterative(arr, n, i) {
  let parent = i;
  
  while (true) {
    let largest = parent;
    const left = 2 * parent + 1;
    const right = 2 * parent + 2;
    
    // If left child is larger than root
    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }
    
    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }
    
    // If largest is still parent, stop
    if (largest === parent) {
      break;
    }
    
    // Swap and continue heapifying
    [arr[parent], arr[largest]] = [arr[largest], arr[parent]];
    parent = largest;
  }
}

/**
 * Heap Sort Algorithm with Steps for Visualization
 * 
 * A version of heap sort that returns each step of the sorting process
 * for visualization purposes.
 * 
 * @param {number[]} array - Array of numbers to sort
 * @returns {Object} - Object containing array of steps and final stats
 */
export function heapSortSteps(array) {
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
  
  const n = arr.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapifySteps(arr, n, i, stats, steps);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]];
    stats.swaps++;
    
    // Add step for swap (compact representation)
    steps.push({ type: 'swap', indices: [0, i] });
    
    // Call heapify on the reduced heap
    heapifySteps(arr, i, 0, stats, steps);
  }
  
  const endTime = performance.now();
  stats.time = endTime - startTime;
  
  // Add final sorted state
  steps.push({ type: 'complete', array: [...arr] });
  
  return { steps, stats };
}

/**
 * Heapify a subtree rooted at index i with steps for visualization using iterative approach
 * 
 * @param {number[]} arr - Array representation of the heap
 * @param {number} n - Size of the heap
 * @param {number} i - Index of the root node
 * @param {Object} stats - Object to track comparisons and swaps
 * @param {Array} steps - Array to store visualization steps
 */
function heapifySteps(arr, n, i, stats, steps) {
  let parent = i;
  
  while (true) {
    let largest = parent;
    const left = 2 * parent + 1;
    const right = 2 * parent + 2;
    
    // Add step for heapify start
    steps.push({ type: 'heapifyStart', index: parent });
    
    // If left child is larger than root
    if (left < n && arr[left] > arr[largest]) {
      stats.comparisons++;
      // Add step for comparison
      steps.push({ type: 'compare', indices: [left, largest] });
      largest = left;
    }
    
    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest]) {
      stats.comparisons++;
      // Add step for comparison
      steps.push({ type: 'compare', indices: [right, largest] });
      largest = right;
    }
    
    // If largest is still parent, stop
    if (largest === parent) {
      // Add step for heapify end
      steps.push({ type: 'heapifyEnd', index: parent });
      break;
    }
    
    // Swap and continue heapifying
    [arr[parent], arr[largest]] = [arr[largest], arr[parent]];
    stats.swaps++;
    
    // Add step for swap
    steps.push({ type: 'swap', indices: [parent, largest] });
    
    parent = largest;
  }
}

export default heapSort;