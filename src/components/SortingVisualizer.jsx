// src/components/SortingVisualizer.jsx
// Wenxi Developer Signature

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SortingVisualizer = ({ data, algorithm }) => {
  const svgRef = useRef();
  
  useEffect(() => {
    if (!data || data.length === 0) return;
    
    // Set up dimensions and margins
    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    
    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Create SVG element
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);
    
    // Create scales
    const xScale = d3.scaleBand()
      .domain(data.map((d, i) => i))
      .range([margin.left, width - margin.right])
      .padding(0.1);
      
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([height - margin.bottom, margin.top]);
    
    // Create bars
    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => xScale(i))
      .attr("y", d => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - margin.bottom - yScale(d))
      .attr("fill", "#4caf50");
    
    // Add x-axis
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));
      
    // Add y-axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));
      
  }, [data, algorithm]);
  
  return (
    <div className="sorting-visualizer">
      <h2>{algorithm || 'Sorting Visualization'}</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default SortingVisualizer;