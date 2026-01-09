import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useInView } from 'framer-motion';

interface ViewportVizProps {
  type: string;
  color?: string;
}

const ViewportViz: React.FC<ViewportVizProps> = ({ type, color = '#C5A059' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  
  // PERFORMANCE FIX: Detect if component is visible
  // We add a margin so it starts slightly before coming on screen
  const isInView = useInView(containerRef, { margin: "0px 0px 50px 0px" });

  // Visualization Logic
  useEffect(() => {
    // If the component is not in view or container is missing, do not run the expensive D3 logic
    if (!containerRef.current || !isInView) return;
    
    const container = containerRef.current;
    let timer: d3.Timer;

    const initViz = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      // Ensure dimensions are valid
      if (width === 0 || height === 0) return;

      // Init SVG
      if (!svgRef.current) {
        const svg = d3.select(container)
          .append('svg')
          .attr('width', '100%')
          .attr('height', '100%')
          // Using preserveAspectRatio to help scaling on resize without rebuild
          .attr('viewBox', `0 0 ${width} ${height}`);
        svgRef.current = svg.node() as SVGSVGElement;
      } else {
        // Update viewBox on resize
        d3.select(svgRef.current).attr('viewBox', `0 0 ${width} ${height}`);
      }

      const svg = d3.select(svgRef.current);
      const strokeColor = color; 

      // Cleanup previous renders
      svg.selectAll('*').remove();
      
      const g = svg.append('g'); // Main group

      // --- 1. GEOMETRIC (Acquisition) - "The Blueprint"
      const renderGeometric = () => {
        const cx = width / 2;
        const cy = height / 2;
        const count = 5;
        
        timer = d3.timer((elapsed) => {
          g.selectAll('*').remove();
          const t = elapsed * 0.0003;
          
          for(let i=0; i<count; i++) {
              const r = 60 + i * 40;
              const angle = (i % 2 === 0 ? t : -t) * (1 + i * 0.1);
              const sides = 3 + i; 
              
              const points = [];
              for(let j=0; j<=sides; j++) {
                  const theta = angle + (j/sides) * Math.PI * 2;
                  points.push([
                      cx + Math.cos(theta) * r,
                      cy + Math.sin(theta) * r
                  ]);
              }
              
              g.append('path')
               .attr('d', d3.line()(points as any))
               .attr('fill', 'none')
               .attr('stroke', strokeColor)
               .attr('stroke-width', 2) // Thicker for mobile visibility
               .attr('opacity', 0.6 - (i * 0.05)); 
               
               points.forEach(p => {
                   g.append('circle').attr('cx', p[0]).attr('cy', p[1]).attr('r', 3).attr('fill', strokeColor).attr('opacity', 0.8);
               });
          }
        });
      };

      // --- 2. NETWORK (CRM) - "The Hub"
      const renderNetwork = () => {
          const cx = width / 2;
          const cy = height / 2;
          const satelliteCount = 8;
          
          timer = d3.timer((elapsed) => {
              g.selectAll('*').remove();
              const t = elapsed * 0.0002;

              g.append('circle').attr('cx', cx).attr('cy', cy).attr('r', 6).attr('fill', strokeColor).attr('opacity', 0.9);
              g.append('circle').attr('cx', cx).attr('cy', cy).attr('r', 16).attr('stroke', strokeColor).attr('stroke-width', 2).attr('fill', 'none').attr('opacity', 0.5);

              [100, 180].forEach(r => {
                  g.append('circle').attr('cx', cx).attr('cy', cy).attr('r', r).attr('stroke', strokeColor).attr('fill', 'none').attr('opacity', 0.3).attr('stroke-dasharray', '3 5');
              });

              for(let i=0; i<satelliteCount; i++) {
                  const r = 100 + (i % 2) * 80;
                  const speed = (i % 2 === 0 ? 1 : -0.7);
                  const angle = i * (Math.PI * 2 / satelliteCount) + t * speed;
                  
                  const x = cx + Math.cos(angle) * r;
                  const y = cy + Math.sin(angle) * r;
                  
                  g.append('line').attr('x1', cx).attr('y1', cy).attr('x2', x).attr('y2', y).attr('stroke', strokeColor).attr('opacity', 0.2).attr('stroke-width', 1.5);
                  g.append('circle').attr('cx', x).attr('cy', y).attr('r', 4).attr('fill', strokeColor).attr('opacity', 0.9);
              }
          });
      };

      // --- 3. FLOW (Automation) - "The Circuit"
      const renderFlow = () => {
          const gridSize = 40;
          const paths: any[] = [];
          for(let i=0; i<8; i++) {
              let cx = width/2; // Start center ish
              let cy = height/2;
              const path = [[cx, cy]];
              for(let j=0; j<6; j++) {
                  if(Math.random() > 0.5) cx += (Math.random() > 0.5 ? gridSize : -gridSize);
                  else cy += (Math.random() > 0.5 ? gridSize : -gridSize);
                  path.push([cx, cy]);
              }
              paths.push(path);
          }

          timer = d3.timer((elapsed) => {
              g.selectAll('*').remove();
              
              paths.forEach((p, i) => {
                  g.append('path')
                   .attr('d', d3.line()(p))
                   .attr('fill', 'none')
                   .attr('stroke', strokeColor)
                   .attr('stroke-width', 2)
                   .attr('opacity', 0.4);

                  const progress = (elapsed * 0.1 + (i * 100)) % 1000 / 1000;
                  g.append('path')
                   .attr('d', d3.line()(p))
                   .attr('fill', 'none')
                   .attr('stroke', strokeColor)
                   .attr('stroke-width', 4)
                   .attr('stroke-dasharray', `30 ${1000}`)
                   .attr('stroke-dashoffset', -progress * 1000)
                   .attr('opacity', 1);
              });
          });
      };

      // --- 4. NEURAL (Cognitive) - "The Synapse"
      const renderNeural = () => {
          const nodeCount = 45;
          const nodes = d3.range(nodeCount).map(() => ({
              x: Math.random() * width,
              y: Math.random() * height,
              vx: (Math.random() - 0.5) * 0.4,
              vy: (Math.random() - 0.5) * 0.4
          }));

          timer = d3.timer(() => {
              g.selectAll('*').remove();
              
              nodes.forEach(n => {
                  n.x += n.vx;
                  n.y += n.vy;
                  if(n.x < 0 || n.x > width) n.vx *= -1;
                  if(n.y < 0 || n.y > height) n.vy *= -1;
              });

              for(let i=0; i<nodeCount; i++) {
                  for(let j=i+1; j<nodeCount; j++) {
                      const dx = nodes[i].x - nodes[j].x;
                      const dy = nodes[i].y - nodes[j].y;
                      const d = Math.sqrt(dx*dx+dy*dy);
                      if(d < 120) {
                          g.append('line')
                           .attr('x1', nodes[i].x).attr('y1', nodes[i].y)
                           .attr('x2', nodes[j].x).attr('y2', nodes[j].y)
                           .attr('stroke', strokeColor)
                           .attr('stroke-width', 1.5) 
                           .attr('opacity', (1 - d/120) * 0.7); 
                      }
                  }
              }
              nodes.forEach(n => {
                  g.append('circle').attr('cx', n.x).attr('cy', n.y).attr('r', 3).attr('fill', strokeColor).attr('opacity', 0.8);
              });
          });
      };

      // --- 5. SEQUENTIAL (Media) - "The Equalizer"
      const renderSequential = () => {
          const bars = 24;
          const barW = width / bars;
          timer = d3.timer((elapsed) => {
              g.selectAll('*').remove();
              for(let i=0; i<bars; i++) {
                  // HEIGHT MODIFIED: Made simpler/smaller
                  const h = 40 + Math.sin(i * 0.4 + elapsed * 0.003) * 30 + Math.sin(i * 0.1 - elapsed * 0.002) * 20;
                  const x = i * barW;
                  const centerY = height/2;
                  g.append('rect')
                   .attr('x', x + 2).attr('y', centerY - h/2)
                   .attr('width', barW - 4).attr('height', h)
                   .attr('fill', 'none')
                   .attr('stroke', strokeColor)
                   .attr('stroke-width', 1.0) // REDUCED from 1.5
                   .attr('opacity', 0.4);     // REDUCED from 0.6
              }
          });
      };

      // --- 6. WAVES (Adoption) - "The Frequency"
      const renderWaves = () => {
          timer = d3.timer((elapsed) => {
              g.selectAll('*').remove();
              const line = d3.line().curve(d3.curveBasis);
              const layers = 6;
              for(let i=0; i<layers; i++) {
                  const points = [];
                  for(let x=0; x<=width + 50; x+=40) {
                      const y = height/2 + Math.sin(x * 0.015 + elapsed * 0.002 + (i * 0.5)) * (30 + i*8);
                      points.push([x, y]);
                  }
                  g.append('path')
                   .attr('d', line(points as any))
                   .attr('fill', 'none')
                   .attr('stroke', strokeColor)
                   .attr('stroke-width', 1.0) // REDUCED from 1.5
                   .attr('opacity', 0.2 + (i * 0.05)); // REDUCED BASE from 0.3
              }
          });
      };

      // --- 7. DASHBOARD (Intelligence) - "The Radar"
      const renderDashboard = () => {
          const cx = width/2;
          const cy = height/2;
          const maxR = Math.min(width, height) * 0.35;
          timer = d3.timer((elapsed) => {
              g.selectAll('*').remove();
              [0.33, 0.66, 1].forEach(scale => {
                  g.append('circle').attr('cx', cx).attr('cy', cy).attr('r', maxR * scale).attr('fill', 'none').attr('stroke', strokeColor).attr('stroke-width', 2).attr('opacity', 0.3);
              });
              g.append('line').attr('x1', cx - maxR).attr('y1', cy).attr('x2', cx + maxR).attr('y2', cy).attr('stroke', strokeColor).attr('stroke-width', 1.5).attr('opacity', 0.25);
              g.append('line').attr('x1', cx).attr('y1', cy - maxR).attr('x2', cx).attr('y2', cy + maxR).attr('stroke', strokeColor).attr('stroke-width', 1.5).attr('opacity', 0.25);
              const angle = elapsed * 0.0015;
              const lx = cx + Math.cos(angle) * maxR;
              const ly = cy + Math.sin(angle) * maxR;
              g.append('line').attr('x1', cx).attr('y1', cy).attr('x2', lx).attr('y2', ly).attr('stroke', strokeColor).attr('stroke-width', 3).attr('opacity', 0.8);
          });
      };

      switch (type) {
        case 'geometric': renderGeometric(); break;
        case 'network': renderNetwork(); break;
        case 'flow': renderFlow(); break;
        case 'neural': renderNeural(); break;
        case 'sequential': renderSequential(); break;
        case 'waves': renderWaves(); break;
        case 'dashboard': renderDashboard(); break;
        default: renderGeometric(); break;
      }
    };

    // Initial render
    initViz();

    // Handle Resize
    const observer = new ResizeObserver(() => {
        if (timer) timer.stop();
        initViz();
    });
    observer.observe(container);

    return () => { 
        if (timer) timer.stop(); 
        observer.disconnect();
    };
  }, [type, color, isInView]); // Re-run when view status changes

  return (
    <div ref={containerRef} className="w-full h-full bg-transparent relative overflow-hidden">
      {/* Optional: Very subtle background grid for texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
            backgroundImage: `linear-gradient(${color}0D 1px, transparent 1px), linear-gradient(90deg, ${color}0D 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
        }} 
      />
    </div>
  );
};

export default ViewportViz;
