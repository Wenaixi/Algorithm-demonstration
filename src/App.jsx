// src/App.jsx
// Wenxi Developer Signature

import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import SortingVisualizer from './components/SortingVisualizer';
import { generateRandomArray } from './utils/dataGenerator';
import { bubbleSortSteps } from './algorithms/bubbleSort';
import { selectionSortSteps } from './algorithms/selectionSort';
import { insertionSortSteps } from './algorithms/insertionSort';
import { quickSortSteps } from './algorithms/quickSort';
import { mergeSortSteps } from './algorithms/mergeSort';

function App() {
  const [data, setData] = useState([]);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [dataArraySize, setDataArraySize] = useState(20);
  const [speed, setSpeed] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0, time: 0 });
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [steps, setSteps] = useState([]);
  
  const sortingTimeoutRef = useRef(null);
  
  const resetData = useCallback(() => {
    const newData = generateRandomArray(dataArraySize);
    setData(newData);
    setStats({ comparisons: 0, swaps: 0, time: 0 });
    // Removed unused state setters
    setCurrentStep(0);
    setTotalSteps(0);
    setSteps([]);
    setIsSorting(false);
    setIsPaused(false);
    
    // Clear any existing timeouts
    if (sortingTimeoutRef.current) {
      clearTimeout(sortingTimeoutRef.current);
      sortingTimeoutRef.current = null;
    }
  }, [dataArraySize]);
  
  // Initialize with random data
  useEffect(() => {
    resetData();
  }, [resetData]);
  

  
  const handleAlgorithmChange = (e) => {
    setAlgorithm(e.target.value);
  };
  
  const handleDataSizeChange = (e) => {
    const size = parseInt(e.target.value);
    if (size >= 5 && size <= 1000) {
      setDataArraySize(size);
    }
  };
  
  const handleSpeedChange = (e) => {
    setSpeed(parseInt(e.target.value));
  };
  
  const handleSort = () => {
    if (isSorting && !isPaused) return;
    
    // If we're paused, resume sorting
    if (isPaused) {
      setIsPaused(false);
      visualizeSorting();
      return;
    }
    
    setIsSorting(true);
    setIsPaused(false);
    setCurrentStep(0);
    
    // Select the appropriate sorting algorithm with steps
    let sortFunction;
    switch (algorithm) {
      case 'bubble':
        sortFunction = bubbleSortSteps;
        break;
      case 'selection':
        sortFunction = selectionSortSteps;
        break;
      case 'insertion':
        sortFunction = insertionSortSteps;
        break;
      case 'quick':
        sortFunction = quickSortSteps;
        break;
      case 'merge':
        sortFunction = mergeSortSteps;
        break;
      default:
        sortFunction = bubbleSortSteps;
    }
    
    // Execute the sorting algorithm with steps
    const result = sortFunction(data);
    setSteps(result.steps);
    setTotalSteps(result.steps.length);
    setStats(result.stats);
    
    // Start visualization
    visualizeSorting();
  };
  
  const visualizeSorting = useCallback(() => {
    if (currentStep < totalSteps && !isPaused) {
      // Update data with current step
      setData(steps[currentStep].array);
      
      // Schedule next step
      sortingTimeoutRef.current = setTimeout(() => {
        setCurrentStep(prevStep => prevStep + 1);
      }, Math.max(0, speed)); // Invert speed so higher value means faster, with minimum delay of 0ms at max speed (500ms at min speed of 0ms)
    } else if (currentStep >= totalSteps) {
      // Sorting is complete
      setIsSorting(false);
      setIsPaused(false);
    }
  }, [currentStep, isPaused, speed, steps, totalSteps]);
  
  // Effect to handle step changes
  useEffect(() => {
    if (isSorting && !isPaused && currentStep < totalSteps) {
      visualizeSorting();
    }
    
    // Cleanup timeout on unmount or when dependencies change
    return () => {
      if (sortingTimeoutRef.current) {
        clearTimeout(sortingTimeoutRef.current);
      }
    };
  }, [currentStep, isSorting, isPaused, totalSteps, steps, speed, visualizeSorting]);
  
  const handlePause = () => {
    setIsPaused(true);
    
    // Clear any existing timeouts
    if (sortingTimeoutRef.current) {
      clearTimeout(sortingTimeoutRef.current);
      sortingTimeoutRef.current = null;
    }
  };
  
  const handleReset = () => {
    resetData();
  };
  

  
  const getAlgorithmName = () => {
    switch (algorithm) {
      case 'bubble':
        return 'Bubble Sort';
      case 'selection':
        return 'Selection Sort';
      case 'insertion':
        return 'Insertion Sort';
      case 'quick':
        return 'Quick Sort';
      case 'merge':
        return 'Merge Sort';
      default:
        return 'Bubble Sort';
    }
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Algorithm Demonstration</h1>
        <p>Interactive visualization of sorting algorithms</p>
      </header>
      <main>
        <div className="controls">
          <div className="control-group">
            <label htmlFor="algorithm-select">Algorithm:</label>
            <select 
              id="algorithm-select" 
              value={algorithm} 
              onChange={handleAlgorithmChange}
              disabled={isSorting && !isPaused}
            >
              <option value="bubble">Bubble Sort</option>
              <option value="selection">Selection Sort</option>
              <option value="insertion">Insertion Sort</option>
              <option value="quick">Quick Sort</option>
              <option value="merge">Merge Sort</option>
            </select>
          </div>
          
          <div className="control-group">
            <label htmlFor="data-size">Data Size: {dataArraySize}</label>
            <input 
              type="range" 
              id="data-size" 
              min="5" 
              max="1000" 
              value={dataArraySize} 
              onChange={handleDataSizeChange}
              disabled={isSorting && !isPaused}
            />
          </div>
          
          <div className="control-group">
            <label htmlFor="speed">Speed: {speed}ms</label>
            <input 
              type="range" 
              id="speed" 
              min="0" 
              max="500" 
              value={speed} 
              onChange={handleSpeedChange}
              disabled={isSorting && !isPaused}
            />
          </div>
          
          <div className="control-group buttons">
            <button onClick={handleSort} disabled={isSorting && !isPaused}>
              {isSorting && !isPaused ? 'Sorting...' : isPaused ? 'Resume' : 'Sort'}
            </button>
            <button onClick={handlePause} disabled={!isSorting || isPaused}>
              Pause
            </button>
            <button onClick={handleReset} disabled={isSorting && !isPaused}>
              Reset Data
            </button>

          </div>
        </div>
        
        <div className="stats">
          <h3>Performance Statistics</h3>
          <p>Comparisons: {stats.comparisons}</p>
          <p>Swaps: {stats.swaps}</p>
          <p>Time: {stats.time.toFixed(2)}ms</p>
          <p>Step: {currentStep} / {totalSteps}</p>
        </div>
        
        <SortingVisualizer data={data} algorithm={getAlgorithmName()} currentStep={steps[currentStep] || { comparing: [], swapping: [] }} />
        

      </main>
    </div>
  );
}

export default App;
