// src/components/SortingVisualizer.jsx
// Wenxi Developer Signature

import React, { useEffect, useRef, useLayoutEffect, useState } from 'react';
import * as d3 from 'd3';
import '../styles/SortingVisualizer.css';

const SortingVisualizer = ({ data, algorithm, currentStep }) => {
  const svgRef = useRef();
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 400 });
  
  // Handle window resize
  useLayoutEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({ 
          width: containerRef.current.clientWidth, 
          height: 400 
        });
      }
    };
    
    // Initial dimensions
    updateDimensions();
    
    // Add resize event listener
    window.addEventListener('resize', updateDimensions);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Visualization effect
  useEffect(() => {
    if (!data || data.length === 0) return;
    
    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Get container dimensions
    const containerWidth = dimensions.width;
    const containerHeight = dimensions.height;
    const margin = { top: 20, right: 30, bottom: 60, left: 40 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;
    
    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr("width", containerWidth)
      .attr("height", containerHeight)
      .attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`)
      .attr("preserveAspectRatio", "xMidYMid meet");
    
    // Create group element for margins
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Find max value for scaling
    const maxValue = Math.max(...data);
    
    // X scale for bar positions
    const xScale = d3.scaleBand()
      .domain(d3.range(data.length))
      .range([0, width])
      .padding(0.1);
    
    // Y scale for bar heights
    const yScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([height, 0]);
    
    // Color scale for bars
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    
    // Create bars
    const bars = g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => xScale(i))
      .attr("y", d => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - yScale(d))
      .attr("fill", (d, i) => {
        // Highlight elements based on step type
        if (currentStep.type === 'compare' && currentStep.indices.includes(i)) {
          return "#ff9800"; // Orange for comparing
        }
        // Highlight swapping elements
        else if (currentStep.type === 'swap' && currentStep.indices.includes(i)) {
          return "#f44336"; // Red for swapping
        }
        // Highlight selected elements
        else if (currentStep.type === 'select' && currentStep.indices.includes(i)) {
          return "#2196f3"; // Blue for selecting
        }
        // Default color
        else {
          return colorScale(i);
        }
      });
    
    // Add X axis
    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat(i => i + 1));
    
    // Add Y axis
    g.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale));
    
    // Add algorithm title
    svg.append("text")
      .attr("x", containerWidth / 2)
      .attr("y", margin.top)
      .attr("text-anchor", "middle")
      .attr("class", "chart-title")
      .text(algorithm);
    
    // Update bar colors when currentStep changes
    bars.attr("fill", (d, i) => {
      // Highlight elements based on step type
      if (currentStep.type === 'compare' && currentStep.indices.includes(i)) {
        return "#ff9800"; // Orange for comparing
      }
      // Highlight swapping elements
      else if (currentStep.type === 'swap' && currentStep.indices.includes(i)) {
        return "#f44336"; // Red for swapping
      }
      // Highlight selected elements
      else if (currentStep.type === 'select' && currentStep.indices.includes(i)) {
        return "#2196f3"; // Blue for selecting
      }
      // Default color
      else {
        return colorScale(i);
      }
    });
  }, [data, algorithm, currentStep, dimensions]); // Re-run when data, algorithm, currentStep, or dimensions change
  
  return (
    <div className="sorting-visualizer" ref={containerRef}>
      <h2>Sorting Visualization</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default SortingVisualizer;