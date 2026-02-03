import React, { useEffect, useRef, useState } from 'react';
import { select, easeCubicInOut } from 'd3';
import { useInView } from 'framer-motion';
import { colors } from '../constants/theme';

export type GraphState = 'idle' | 'bottleneck' | 'tax' | 'grind' | 'cost' | 'fix';

interface GrowthGraphProps {
  currentState: GraphState;
}

const GrowthGraph: React.FC<GrowthGraphProps> = ({ currentState }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<any>(null);
  const previousStateRef = useRef<GraphState | null>(null);
  const hasAnimatedRef = useRef(false);
  const [shouldRender, setShouldRender] = useState(false);
  
  // Detect when graph appears on screen
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Delay D3 initialization to let main thread finish critical work
  useEffect(() => {
    const timer = setTimeout(() => setShouldRender(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // 1. SETUP (Runs once after delay)
  useEffect(() => {
    if (!containerRef.current || !shouldRender) return;
    
    // FIX 2: Use specific 'select' instead of 'd3.select'
    select(containerRef.current).selectAll('*').remove();

    const width = 400; 
    const height = 240;
    const margin = { top: 80, right: 20, bottom: 40, left: 20 };
    const chartWidth = width - margin.left - margin.right;
    
    const svg = select(containerRef.current)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');
      
    const chart = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    // --- THE ELEMENTS ---
    const barY = 60; 
    
    // 1. The Track
    chart.append('rect')
        .attr('x', 0)
        .attr('y', barY + 10) 
        .attr('width', chartWidth)
        .attr('height', 1) 
        .attr('fill', colors.dark)
        .attr('opacity', 0.1);

    // 2. The Active Bar
    const activeBar = chart.append('rect')
        .attr('x', 0)
        .attr('y', barY)
        .attr('height', 20)
        .attr('width', 0)
        .attr('opacity', 1);

    // 3. The Label
    const labelText = chart.append('text')
        .attr('x', 0)
        .attr('y', barY - 30) 
        .attr('class', 'font-mono text-xs font-bold uppercase tracking-[0.2em]') 
        .style('fill', colors.dark);

    // 4. The Value
    const valueText = chart.append('text')
        .attr('x', 0)
        .attr('y', barY + 60) 
        .attr('class', 'font-mono text-xl md:text-2xl font-bold tracking-tight') 
        .style('fill', colors.dark);

    svgRef.current = { activeBar, valueText, labelText, chartWidth };

    return () => { select(containerRef.current).selectAll('*').remove(); };
  }, [shouldRender]);

  // 2. UPDATE (Runs on hover and initial appearance)
  useEffect(() => {
    if (!svgRef.current) return;
    
    const { activeBar, valueText, labelText, chartWidth } = svgRef.current;

    const config = {
        idle: { label: 'Average Admin Load', value: 65, color: colors.redSolid, text: '15 hrs/wk' },
        bottleneck: { label: 'Deep Work Lost', value: 40, color: colors.redSolid, text: '-20% Focus' },
        tax: { label: 'Redundant Labor', value: 30, color: colors.redSolid, text: 'Double Entry' },
        grind: { label: 'Weekend Sacrifice', value: 80, color: colors.redSolid, text: '0 Hrs Off' },
        cost: { label: 'Capital Burn', value: 95, color: colors.redSolid, text: '$120k / yr' },
        fix: { label: 'System Efficiency', value: 5, color: colors.gold, text: 'Optimized' }
    };

    const target = config[currentState] || config.idle;
    const targetWidth = (target.value / 100) * chartWidth;

    const duration = 900;
    // FIX 3: Use specific ease function import
    const ease = easeCubicInOut;

    const isInitialAnimation = !hasAnimatedRef.current && isInView;
    const isStateChange = previousStateRef.current !== currentState && previousStateRef.current !== null;
    
    if (isInitialAnimation || isStateChange) {
      previousStateRef.current = currentState;
      if (isInitialAnimation) {
        hasAnimatedRef.current = true;
      }

      // 1. Label
      labelText
          .text(target.label)
          .transition().duration(duration).ease(ease)
          .style('fill', target.color === colors.gold ? colors.gold : colors.dark);

      // 2. Bar
      if (isInitialAnimation) {
        activeBar
            .attr('width', 0)
            .attr('fill', target.color)
            .transition().duration(duration).ease(ease)
            .attr('width', targetWidth);
      } else {
        activeBar
            .transition().duration(duration).ease(ease)
            .attr('width', targetWidth)
            .attr('fill', target.color);
      }

      // 3. Value
      valueText
          .text(target.text)
          .transition().duration(duration).ease(ease)
          .style('fill', target.color);
    }

  }, [currentState, isInView]);

  return <div ref={containerRef} className="w-full h-full min-h-[300px] flex items-center justify-center pointer-events-none" />;
};

export default GrowthGraph;
