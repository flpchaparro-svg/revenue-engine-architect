import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useInView } from 'framer-motion';

interface ViewportVizProps {
  type: string;
  color?: string;
}

const ViewportViz: React.FC<ViewportVizProps> = ({ type, color = '#C5A059' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Keep the InView optimization
  const isInView = useInView(containerRef, { margin: "0px 0px 100px 0px" });

  useEffect(() => {
    // 1. Setup Canvas & Context
    if (!containerRef.current || !canvasRef.current || !isInView) return;
    
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle High DPI (Retina) Displays for crisp lines
    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    
    // Set actual size in memory (scaled to account for extra pixel density)
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    // Normalize coordinate system to use CSS pixels
    ctx.scale(dpr, dpr);
    
    // Set visible size
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const width = rect.width;
    const height = rect.height;
    
    // Helper: Convert Hex to RGB for opacity handling
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 197, g: 160, b: 89 }; // Default Gold
    };
    const rgb = hexToRgb(color);

    let timer: d3.Timer;

    // --- RENDERERS (Canvas Version) ---

    // 1. GEOMETRIC
    const renderGeometric = () => {
      const cx = width / 2;
      const cy = height / 2;
      const count = 5;
      const lineGen = d3.line().context(ctx); // Use D3 to draw to Context

      timer = d3.timer((elapsed) => {
        ctx.clearRect(0, 0, width, height); // Clear frame
        const t = elapsed * 0.0003;

        for (let i = 0; i < count; i++) {
          const r = 60 + i * 40;
          const angle = (i % 2 === 0 ? t : -t) * (1 + i * 0.1);
          const sides = 3 + i;
          
          const points: [number, number][] = [];
          for (let j = 0; j <= sides; j++) {
            const theta = angle + (j / sides) * Math.PI * 2;
            points.push([
              cx + Math.cos(theta) * r,
              cy + Math.sin(theta) * r
            ]);
          }

          // Draw Path
          ctx.beginPath();
          lineGen(points);
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.globalAlpha = 0.6 - (i * 0.05);
          ctx.stroke();

          // Draw Dots
          ctx.fillStyle = color;
          ctx.globalAlpha = 0.8;
          points.forEach(p => {
            ctx.beginPath();
            ctx.arc(p[0], p[1], 3, 0, 2 * Math.PI);
            ctx.fill();
          });
        }
      });
    };

    // 2. NETWORK
    const renderNetwork = () => {
      const cx = width / 2;
      const cy = height / 2;
      const satelliteCount = 8;

      timer = d3.timer((elapsed) => {
        ctx.clearRect(0, 0, width, height);
        const t = elapsed * 0.0002;

        // Center Dot
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.9;
        ctx.fill();

        // Inner Ring
        ctx.beginPath();
        ctx.arc(cx, cy, 16, 0, 2 * Math.PI);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.5;
        ctx.stroke();

        // Outer Rings (Dashed)
        [100, 180].forEach(r => {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, 2 * Math.PI);
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 5]); // Dashed
          ctx.globalAlpha = 0.3;
          ctx.stroke();
          ctx.setLineDash([]); // Reset
        });

        // Satellites
        for (let i = 0; i < satelliteCount; i++) {
          const r = 100 + (i % 2) * 80;
          const speed = (i % 2 === 0 ? 1 : -0.7);
          const angle = i * (Math.PI * 2 / satelliteCount) + t * speed;
          
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;

          // Line to center
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(x, y);
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = 0.2;
          ctx.stroke();

          // Dot
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, 2 * Math.PI);
          ctx.fillStyle = color;
          ctx.globalAlpha = 0.9;
          ctx.fill();
        }
      });
    };

    // 3. FLOW
    const renderFlow = () => {
      const gridSize = 40;
      const paths: [number, number][][] = [];
      const lineGen = d3.line().context(ctx);

      // Generate paths once
      for (let i = 0; i < 8; i++) {
        let cx = width / 2;
        let cy = height / 2;
        const path: [number, number][] = [[cx, cy]];
        for (let j = 0; j < 6; j++) {
          if (Math.random() > 0.5) cx += (Math.random() > 0.5 ? gridSize : -gridSize);
          else cy += (Math.random() > 0.5 ? gridSize : -gridSize);
          path.push([cx, cy]);
        }
        paths.push(path);
      }

      timer = d3.timer((elapsed) => {
        ctx.clearRect(0, 0, width, height);

        paths.forEach((p, i) => {
          // Background static line
          ctx.beginPath();
          lineGen(p);
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.globalAlpha = 0.4;
          ctx.setLineDash([]);
          ctx.stroke();

          // Moving Dash
          const progress = (elapsed * 0.1 + (i * 100)) % 1000 / 1000;
          ctx.beginPath();
          lineGen(p);
          ctx.strokeStyle = color;
          ctx.lineWidth = 4;
          ctx.globalAlpha = 1;
          ctx.setLineDash([30, 1000]); // Dash length 30, Gap 1000
          ctx.lineDashOffset = -progress * 1000; // Animate offset
          ctx.stroke();
          ctx.setLineDash([]); // Reset
        });
      });
    };

    // 4. NEURAL
    const renderNeural = () => {
      const nodeCount = 45;
      const nodes = d3.range(nodeCount).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4
      }));

      timer = d3.timer(() => {
        ctx.clearRect(0, 0, width, height);

        // Update positions
        nodes.forEach(n => {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        });

        // Draw Connections
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        for (let i = 0; i < nodeCount; i++) {
          for (let j = i + 1; j < nodeCount; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 120) {
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.globalAlpha = (1 - d / 120) * 0.7;
              ctx.stroke();
            }
          }
        }

        // Draw Nodes
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.8;
        nodes.forEach(n => {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 3, 0, 2 * Math.PI);
          ctx.fill();
        });
      });
    };

    // 5. SEQUENTIAL
    const renderSequential = () => {
      const bars = 24;
      const barW = width / bars;
      
      timer = d3.timer((elapsed) => {
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.0;
        ctx.globalAlpha = 0.4;

        for (let i = 0; i < bars; i++) {
          const h = 40 + Math.sin(i * 0.4 + elapsed * 0.003) * 30 + Math.sin(i * 0.1 - elapsed * 0.002) * 20;
          const x = i * barW;
          const centerY = height / 2;
          
          ctx.strokeRect(x + 2, centerY - h / 2, barW - 4, h);
        }
      });
    };

    // 6. WAVES
    const renderWaves = () => {
      const lineGen = d3.line().curve(d3.curveBasis).context(ctx);
      const layers = 6;

      timer = d3.timer((elapsed) => {
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.0;

        for (let i = 0; i < layers; i++) {
          const points: [number, number][] = [];
          for (let x = 0; x <= width + 50; x += 40) {
            const y = height / 2 + Math.sin(x * 0.015 + elapsed * 0.002 + (i * 0.5)) * (30 + i * 8);
            points.push([x, y]);
          }
          
          ctx.beginPath();
          lineGen(points);
          ctx.globalAlpha = 0.2 + (i * 0.05);
          ctx.stroke();
        }
      });
    };

    // 7. DASHBOARD
    const renderDashboard = () => {
      const cx = width / 2;
      const cy = height / 2;
      const maxR = Math.min(width, height) * 0.35;

      timer = d3.timer((elapsed) => {
        ctx.clearRect(0, 0, width, height);

        // Static Rings
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.3;
        [0.33, 0.66, 1].forEach(scale => {
          ctx.beginPath();
          ctx.arc(cx, cy, maxR * scale, 0, 2 * Math.PI);
          ctx.stroke();
        });

        // Crosshairs
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.25;
        ctx.beginPath();
        ctx.moveTo(cx - maxR, cy);
        ctx.lineTo(cx + maxR, cy);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(cx, cy - maxR);
        ctx.lineTo(cx, cy + maxR);
        ctx.stroke();

        // Radar Sweep
        const angle = elapsed * 0.0015;
        const lx = cx + Math.cos(angle) * maxR;
        const ly = cy + Math.sin(angle) * maxR;
        
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(lx, ly);
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.8;
        ctx.stroke();
      });
    };

    // Switcher
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

    // Handle Resize
    const observer = new ResizeObserver(() => {
      if (timer) timer.stop();
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      // Restart animation with new dimensions
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
    });
    observer.observe(container);

    return () => {
      if (timer) timer.stop();
      observer.disconnect();
    };

  }, [type, color, isInView]);

  return (
    <div ref={containerRef} className="w-full h-full bg-transparent relative overflow-hidden">
      {/* Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

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
