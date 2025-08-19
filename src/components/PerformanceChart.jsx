// src/components/PerformanceChart.jsx
// Wenxi Developer Signature

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PerformanceChart = ({ performanceData }) => {
  const svgRef = useRef();
  
  useEffect(() => {
    if (!performanceData || performanceData.length === 0) return;
    
    // Set up dimensions and margins
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    
    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Create SVG element
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);
    
    // Create scales
    const xScale = d3.scaleBand()
      .domain(performanceData.map(d => d.algorithm))
      .range([margin.left, width - margin.right])
      .padding(0.2);
      
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(performanceData, d => d.time)])
      .range([height - margin.bottom, margin.top]);
    
    // Create bars
    svg.selectAll(".bar")
      .data(performanceData)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.algorithm))
      .attr("y", d => yScale(d.time))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - margin.bottom - yScale(d.time))
      .attr("fill", "#4caf50");
      
    // Add x-axis
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end")
      .attr("dx", "-0.8em")
      .attr("dy", "-0.1em");
      
    // Add y-axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));
      
    // Add axis labels
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .text("Algorithms");
      
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .text("Execution Time (ms)");
      
  }, [performanceData]);
  
  return (
    <div className="performance-chart">
      <h2>Algorithm Performance Comparison</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default PerformanceChart;