// src/App.jsx
// Wenxi Developer Signature

import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import SortingVisualizer from './components/SortingVisualizer';
import PerformanceChart from './components/PerformanceChart';
import StockChart from './components/StockChart';
import { generateRandomArray } from './utils/dataGenerator';
import { bubbleSort } from './algorithms/bubbleSort';
import { selectionSort } from './algorithms/selectionSort';
import { insertionSort } from './algorithms/insertionSort';
import { quickSort } from './algorithms/quickSort';
import { mergeSort } from './algorithms/mergeSort';

function App() {
  const [data, setData] = useState([]);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [dataArraySize, setDataArraySize] = useState(20);
  const [speed, setSpeed] = useState(100);
  const [isSorting, setIsSorting] = useState(false);
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0, time: 0 });
  const [performanceData, setPerformanceData] = useState([]);
  const [showPerformanceChart, setShowPerformanceChart] = useState(false);
  const [stockData, setStockData] = useState([]);
  
  const resetData = useCallback(() => {
    const newData = generateRandomArray(dataArraySize);
    setData(newData);
    setStats({ comparisons: 0, swaps: 0, time: 0 });
    setPerformanceData([]);
    setShowPerformanceChart(false);
  }, [dataArraySize]);
  
  // Initialize with random data
  useEffect(() => {
    resetData();
    generateStockData();
  }, [resetData]);
  
  const generateStockData = () => {
    // Generate sample stock data for the last 30 days
    const today = new Date();
    const stockData = [];
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Generate a random price between 100 and 200
      const price = (Math.random() * 100 + 100).toFixed(2);
      
      stockData.push({
        date: date.toISOString().split('T')[0],
        price: price
      });
    }
    
    setStockData(stockData);
  };
  
  const handleAlgorithmChange = (e) => {
    setAlgorithm(e.target.value);
  };
  
  const handleDataSizeChange = (e) => {
    const size = parseInt(e.target.value);
    if (size >= 5 && size <= 100) {
      setDataArraySize(size);
    }
  };
  
  const handleSpeedChange = (e) => {
    setSpeed(parseInt(e.target.value));
  };
  
  const handleSort = () => {
    if (isSorting) return;
    
    setIsSorting(true);
    
    // Select the appropriate sorting algorithm
    let sortFunction;
    switch (algorithm) {
      case 'bubble':
        sortFunction = bubbleSort;
        break;
      case 'selection':
        sortFunction = selectionSort;
        break;
      case 'insertion':
        sortFunction = insertionSort;
        break;
      case 'quick':
        sortFunction = quickSort;
        break;
      case 'merge':
        sortFunction = mergeSort;
        break;
      default:
        sortFunction = bubbleSort;
    }
    
    // Execute the sorting algorithm
    const result = sortFunction(data);
    setData(result.sortedArray);
    setStats(result.stats);
    setIsSorting(false);
  };
  
  const compareAlgorithms = () => {
    if (isSorting) return;
    
    setIsSorting(true);
    
    // Create a copy of the data for consistent comparison
    const dataCopy = [...data];
    
    // Run all algorithms and collect performance data
    const bubbleResult = bubbleSort(dataCopy);
    const selectionResult = selectionSort(dataCopy);
    const insertionResult = insertionSort(dataCopy);
    const quickResult = quickSort(dataCopy);
    const mergeResult = mergeSort(dataCopy);
    
    // Create performance data array
    const perfData = [
      { algorithm: 'Bubble', time: bubbleResult.stats.time },
      { algorithm: 'Selection', time: selectionResult.stats.time },
      { algorithm: 'Insertion', time: insertionResult.stats.time },
      { algorithm: 'Quick', time: quickResult.stats.time },
      { algorithm: 'Merge', time: mergeResult.stats.time }
    ];
    
    setPerformanceData(perfData);
    setShowPerformanceChart(true);
    setIsSorting(false);
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
              disabled={isSorting}
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
              max="100" 
              value={dataArraySize} 
              onChange={handleDataSizeChange}
              disabled={isSorting}
            />
          </div>
          
          <div className="control-group">
            <label htmlFor="speed">Speed: {speed}ms</label>
            <input 
              type="range" 
              id="speed" 
              min="10" 
              max="1000" 
              value={speed} 
              onChange={handleSpeedChange}
              disabled={isSorting}
            />
          </div>
          
          <div className="control-group buttons">
            <button onClick={handleSort} disabled={isSorting}>
              {isSorting ? 'Sorting...' : 'Sort'}
            </button>
            <button onClick={compareAlgorithms} disabled={isSorting}>
              Compare Algorithms
            </button>
            <button onClick={resetData} disabled={isSorting}>
              Reset Data
            </button>
          </div>
        </div>
        
        <div className="stats">
          <h3>Performance Statistics</h3>
          <p>Comparisons: {stats.comparisons}</p>
          <p>Swaps: {stats.swaps}</p>
          <p>Time: {stats.time.toFixed(2)}ms</p>
        </div>
        
        <SortingVisualizer data={data} algorithm={getAlgorithmName()} />
        
        {showPerformanceChart && (
          <PerformanceChart performanceData={performanceData} />
        )}
        
        <StockChart data={stockData} />
      </main>
    </div>
  );
}

export default App;
