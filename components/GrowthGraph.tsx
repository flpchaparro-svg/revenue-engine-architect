import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GrowthGraph: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const width = 400; const height = 240;
    const margin = { top: 40, right: 60, bottom: 40, left: 20 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    d3.select(containerRef.current).selectAll('*').remove();
    const svg = d3.select(containerRef.current).append('svg').attr('width', '100%').attr('height', '100%').attr('viewBox', `0 0 ${width} ${height}`).attr('preserveAspectRatio', 'xMidYMid meet');
    const chart = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);
    const xTicks = [0, 0.25, 0.5, 0.75, 1];
    chart.selectAll('.grid-line').data(xTicks).enter().append('line').attr('x1', d => d * chartWidth).attr('x2', d => d * chartWidth).attr('y1', -10).attr('y2', chartHeight + 10).attr('stroke', '#1a1a1a').attr('stroke-opacity', 0.05).attr('stroke-dasharray', '2,2');
    const barHeight = 12;
    const statG = chart.append('g').attr('transform', `translate(0, ${chartHeight / 2})`);
    statG.append('text').attr('y', -12).attr('class', 'font-mono text-[9px] uppercase tracking-[0.2em] fill-[#1a1a1a] opacity-40').text('AVERAGE TIME LOST');
    statG.append('rect').attr('width', chartWidth).attr('height', barHeight).attr('fill', '#1a1a1a').attr('opacity', 0.03);
    const statBar = statG.append('rect').attr('width', 0).attr('height', barHeight).attr('fill', '#C5A059');
    const statVal = statG.append('text').attr('x', 0).attr('y', barHeight / 2 + 4).attr('class', 'font-mono text-[10px] font-bold fill-[#C5A059]').attr('dx', 8).text('0 HRS/WEEK');
    const statSubtext = statG.append('text').attr('x', chartWidth).attr('y', barHeight + 20).attr('class', 'font-mono text-[8px] uppercase tracking-[0.2em] fill-[#1a1a1a] opacity-40').attr('text-anchor', 'end').text('ON MANUAL ADMIN');
    
    let timer: d3.Timer | null = null;

    function animate() {
      const duration = 4000; const ease = d3.easeCubicInOut;
      statBar.attr('width', 0); statVal.attr('x', 0).text('0 HRS/WEEK');
      statBar.transition().duration(duration).ease(ease).attr('width', chartWidth * 0.75);
      statVal.transition().duration(duration).ease(ease).attr('x', chartWidth * 0.75).tween('text', function() { const i = d3.interpolate(0, 15); return (t) => { statVal.text(`${Math.round(i(t))} HRS/WEEK`); }; }).on('end', () => { timer = d3.timeout(animate, 2000); });
    }
    
    animate();

    return () => {
      // Cleanup SVG to prevent memory leaks
      if (containerRef.current) {
        d3.select(containerRef.current).selectAll('*').remove();
      }
      // Stop the recursion
      if (timer) timer.stop();
    };
  }, []);
  return <div ref={containerRef} className="w-full h-full min-h-[300px] flex items-center justify-center bg-transparent" />;
};

export default GrowthGraph;
