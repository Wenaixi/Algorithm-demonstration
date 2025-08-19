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
