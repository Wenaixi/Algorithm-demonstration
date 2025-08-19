import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const StockChart = ({ data }) => {
  const chartRef = useRef();
  
  useEffect(() => {
    if (!data || data.length === 0) return;
    
    // Clear previous chart
    d3.select(chartRef.current).selectAll('*').remove();
    
    // Set dimensions and margins
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    // Create SVG
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);
    
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Process data
    const parsedData = data.map(d => ({
      date: new Date(d.date),
      price: +d.price
    }));
    
    // Set scales
    const x = d3.scaleTime()
      .domain(d3.extent(parsedData, d => d.date))
      .range([0, width]);
    
    const y = d3.scaleLinear()
      .domain([0, d3.max(parsedData, d => d.price)])
      .nice()
      .range([height, 0]);
    
    // Add axes
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));
    
    g.append('g')
      .call(d3.axisLeft(y));
    
    // Add line
    const line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.price));
    
    g.append('path')
      .datum(parsedData)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);
    
    // Add points
    g.selectAll('.dot')
      .data(parsedData)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', d => x(d.date))
      .attr('cy', d => y(d.price))
      .attr('r', 3)
      .attr('fill', 'steelblue');
  }, [data]);
  
  return (
    <div ref={chartRef}>
      <h2>Stock Market Visualization</h2>
    </div>
  );
};

export default StockChart;