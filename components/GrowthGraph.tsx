import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export type GraphState = 'idle' | 'bottleneck' | 'tax' | 'grind' | 'cost' | 'fix';

interface GrowthGraphProps {
  currentState: GraphState;
}

const GrowthGraph: React.FC<GrowthGraphProps> = ({ currentState }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<any>(null);
  const previousStateRef = useRef<GraphState | null>(null);

  // 1. SETUP (Runs once)
  useEffect(() => {
    if (!containerRef.current) return;
    
    d3.select(containerRef.current).selectAll('*').remove();

    const width = 400; 
    const height = 240;
    const margin = { top: 80, right: 20, bottom: 40, left: 20 };
    const chartWidth = width - margin.left - margin.right;
    
    const svg = d3.select(containerRef.current)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');
      
    const chart = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    // --- THE ELEMENTS ---
    const barY = 60; 
    
    // 1. The Track (Simple, thin grey line)
    chart.append('rect')
        .attr('x', 0)
        .attr('y', barY + 10) 
        .attr('width', chartWidth)
        .attr('height', 1) 
        .attr('fill', '#1a1a1a')
        .attr('opacity', 0.1);

    // 2. The Active Bar (Clean solid bar)
    const activeBar = chart.append('rect')
        .attr('x', 0)
        .attr('y', barY)
        .attr('height', 20)
        .attr('width', 0)
        .attr('opacity', 1);

    // 3. The Label - Use font-mono to match Friction Audit section
    const labelText = chart.append('text')
        .attr('x', 0)
        .attr('y', barY - 30) 
        .attr('class', 'font-mono text-xs font-bold uppercase tracking-widest') 
        .style('fill', '#1a1a1a');

    // 4. The Value - Use font-mono to match Friction Audit section
    const valueText = chart.append('text')
        .attr('x', 0)
        .attr('y', barY + 60) 
        .attr('class', 'font-mono text-xl md:text-2xl font-bold tracking-tight') 
        .style('fill', '#1a1a1a');

    svgRef.current = { activeBar, valueText, labelText, chartWidth };

    return () => { d3.select(containerRef.current).selectAll('*').remove(); };
  }, []);

  // 2. UPDATE (Runs on hover)
  useEffect(() => {
    if (!svgRef.current) return;
    if (previousStateRef.current === currentState) return;
    previousStateRef.current = currentState;
    
    const { activeBar, valueText, labelText, chartWidth } = svgRef.current;

    const config = {
        // IDLE: The Baseline
        idle: { label: 'Average Admin Load', value: 65, color: '#E21E3F', text: '15 hrs/wk' },
        
        // SYMPTOMS
        bottleneck: { 
            label: 'Deep Work Lost',   
            value: 40, 
            color: '#E21E3F', 
            text: '-20% Focus' 
        },
        tax: { 
            label: 'Redundant Labor',  
            value: 30, 
            color: '#E21E3F', 
            text: 'Double Entry' 
        },
        grind: { 
            label: 'Weekend Sacrifice', 
            value: 80, 
            color: '#E21E3F', 
            text: '0 Hrs Off' 
        },
        
        // COST
        cost: { label: 'Capital Burn', value: 95, color: '#E21E3F', text: '$120k / yr' },
        
        // FIX
        fix: { label: 'System Efficiency', value: 5, color: '#C5A059', text: 'Optimized' }
    };

    const target = config[currentState] || config.idle;
    const targetWidth = (target.value / 100) * chartWidth;

    const duration = 500;
    const ease = d3.easeCubicOut;

    // 1. Label
    labelText.text(target.label)
        .transition().duration(duration)
        .style('fill', target.color === '#C5A059' ? '#C5A059' : '#1a1a1a');

    // 2. Bar
    activeBar
        .transition().duration(duration).ease(ease)
        .attr('width', targetWidth)
        .attr('fill', target.color);

    // 3. Value
    valueText
        .text(target.text)
        .transition().duration(duration)
        .style('fill', target.color);

  }, [currentState]);

  return <div ref={containerRef} className="w-full h-full min-h-[300px] flex items-center justify-center pointer-events-none" />;
};

export default GrowthGraph;
