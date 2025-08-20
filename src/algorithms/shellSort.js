// Shell Sort Algorithm

// Generate Sedgewick's sequence for gaps
function generateSedgewickGaps(n) {
  const gaps = [];
  let i = 0;
  let gap = 1;
  
  while (gap < n) {
    // Sedgewick's sequence: 4^i + 3 * 2^(i-1) + 1
    if (i % 2 === 0) {
      gap = 9 * (2 ** i - 2 ** (i / 2)) + 1;
    } else {
      gap = 8 * 2 ** i - 6 * 2 ** ((i + 1) / 2) + 1;
    }
    
    if (gap < n) {
      gaps.push(gap);
    }
    i++;
  }
  
  return gaps.reverse();
}

export function shellSort(array) {
  // Create a copy of the array to avoid mutating the original
  const arr = [...array];
  const n = arr.length;
  
  // Generate gaps using Sedgewick's sequence for better performance
  const gaps = generateSedgewickGaps(n);
  
  // Perform gapped insertion sort for each gap
  for (const gap of gaps) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      
      // Shift earlier gap-sorted elements up until the correct location for arr[i] is found
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      
      // Put temp (the original arr[i]) in its correct location
      arr[j] = temp;
    }
  }
  
  return arr;
}

/**
 * Shell Sort Algorithm with Steps for Visualization
 * 
 * A version of shell sort that returns each step of the sorting process
 * for visualization purposes.
 * 
 * @param {number[]} array - Array of numbers to sort
 * @returns {Object} - Object containing array of steps and final stats
 */
export function shellSortSteps(array) {
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
  
  // Generate Sedgewick's sequence for better performance
  const gaps = generateSedgewickGaps(n);
  
  // Perform gapped insertion sort for each gap
  for (const gap of gaps) {
    // Add step for gap change
    steps.push({ type: 'gapChange', value: gap });
    
    // Do a gapped insertion sort for this gap size
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j;
      
      // Add step for selection
      steps.push({ type: 'select', indices: [i] });
      
      // Shift earlier gap-sorted elements up until the correct location for arr[i] is found
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        stats.comparisons++;
        
        // Add step for comparison
        steps.push({ type: 'compare', indices: [j, j - gap] });
        
        arr[j] = arr[j - gap];
        stats.swaps++;
        
        // Add step for shift
        steps.push({ type: 'shift', index: j, value: arr[j] });
      }
      
      // Put temp (the original arr[i]) in its correct location
      arr[j] = temp;
      
      // Add step for insertion
      steps.push({ type: 'insert', index: j, value: arr[j] });
    }
    
  }
  
  const endTime = performance.now();
  stats.time = endTime - startTime;
  
  // Add final sorted state
  steps.push({ type: 'complete', array: [...arr] });
  
  return { steps, stats };
}

export default shellSort;