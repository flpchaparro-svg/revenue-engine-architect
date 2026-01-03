
import React, { useEffect, useRef } from 'react';
import * as d3 from 'https://esm.sh/d3@7';

interface ViewportVizProps {
  type: string;
}

const ViewportViz: React.FC<ViewportVizProps> = ({ type }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (!svgRef.current) {
      const svg = d3.select(container)
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', `0 0 ${width} ${height}`);
      svgRef.current = svg.node() as SVGSVGElement;
    }

    const svg = d3.select(svgRef.current);
    const gold = '#C5A059';
    const strokeW = 1.25; // Increased stroke weight slightly (+~5% from previous 1.15-1.2) for better clarity

    // Clear and fade in new scene
    svg.selectAll('g').transition().duration(400).style('opacity', 0).remove();
    const g = svg.append('g').style('opacity', 0);
    g.transition().duration(600).style('opacity', 1);

    let timer: d3.Timer;

    const renderGeometric = () => {
      const mainG = g.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);
      const rings = 6;
      const circles = mainG.selectAll('circle')
        .data(d3.range(rings))
        .enter().append('circle')
        .attr('fill', 'none')
        .attr('stroke', gold)
        .attr('stroke-width', strokeW)
        .attr('opacity', (d) => 0.7 - (d * 0.08));

      timer = d3.timer((elapsed) => {
        const mx = (mouseRef.current.x - width / 2) * 0.08;
        const my = (mouseRef.current.y - height / 2) * 0.08;
        mainG.attr('transform', `translate(${width / 2 + mx}, ${height / 2 + my})`);
        circles.attr('r', (d) => (d + 1) * 45 + Math.sin(elapsed * 0.0025 + d) * 7);
      });
    };

    const renderNetwork = () => {
      const nodes = d3.range(40).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1
      }));

      const lineG = g.append('g');
      const nodeG = g.append('g');

      timer = d3.timer(() => {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        nodes.forEach(n => {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;

          const dx = mx - n.x;
          const dy = my - n.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 200) {
            n.x -= dx * 0.03;
            n.y -= dy * 0.03;
          }
        });

        const links: any[] = [];
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 130) links.push({ s: nodes[i], t: nodes[j], o: 1 - dist/130 });
          }
        }

        const lines = lineG.selectAll('line').data(links);
        lines.enter().append('line')
          .merge(lines as any)
          .attr('x1', d => d.s.x).attr('y1', d => d.s.y)
          .attr('x2', d => d.t.x).attr('y2', d => d.t.y)
          .attr('stroke', gold).attr('stroke-width', strokeW).attr('opacity', d => d.o * 0.5);
        lines.exit().remove();

        const dots = nodeG.selectAll('circle').data(nodes);
        dots.enter().append('circle').attr('r', 2.5).attr('fill', gold)
          .merge(dots as any)
          .attr('cx', d => d.x).attr('cy', d => d.y);
        dots.exit().remove();
      });
    };

    const renderFlow = () => {
      const cols = 22;
      const rows = 14;
      const cellW = width / cols;
      const cellH = height / rows;

      timer = d3.timer((elapsed) => {
        g.selectAll('*').remove();
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = c * cellW + cellW/2;
            const y = r * cellH + cellH/2;
            const dx = mx - x;
            const dy = my - y;
            const angle = Math.atan2(dy, dx) + elapsed * 0.0015;
            const len = 15;

            g.append('line')
              .attr('x1', x).attr('y1', y)
              .attr('x2', x + Math.cos(angle) * len)
              .attr('y2', y + Math.sin(angle) * len)
              .attr('stroke', gold)
              .attr('stroke-width', strokeW)
              .attr('opacity', 0.32);
          }
        }
      });
    };

    const renderNeural = () => {
      const points = d3.range(65).map(i => ({
        id: i,
        angle: Math.random() * Math.PI * 2,
        r: 60 + Math.random() * 170,
        speed: 0.03 + Math.random() * 0.04
      }));

      timer = d3.timer((elapsed) => {
        g.selectAll('*').remove();
        const mx = (mouseRef.current.x - width/2) * 0.15;
        const my = (mouseRef.current.y - height/2) * 0.15;

        points.forEach(p => {
          const x = width/2 + mx + Math.cos(elapsed * 0.0012 * p.speed + p.angle) * p.r;
          const y = height/2 + my + Math.sin(elapsed * 0.0012 * p.speed + p.angle) * p.r;
          
          g.append('circle')
            .attr('cx', x).attr('cy', y)
            .attr('r', 1.8)
            .attr('fill', gold)
            .attr('opacity', 0.7);

          if (Math.random() > 0.94) {
            g.append('line')
              .attr('x1', width/2 + mx).attr('y1', height/2 + my)
              .attr('x2', x).attr('y2', y)
              .attr('stroke', gold).attr('stroke-width', strokeW * 0.45).attr('opacity', 0.2);
          }
        });
      });
    };

    const renderSequential = () => {
      const bars = 18;
      const barW = width / bars;
      const data = d3.range(bars).map(() => Math.random());

      timer = d3.timer((elapsed) => {
        g.selectAll('rect').remove();
        const mx = mouseRef.current.x;

        data.forEach((d, i) => {
          const x = i * barW;
          const dist = Math.abs(mx - (x + barW/2));
          const h = 50 + (1 - Math.min(dist/300, 1)) * 140 + Math.sin(elapsed * 0.005 + i) * 20;
          
          g.append('rect')
            .attr('x', x + 6)
            .attr('y', height/2 - h/2)
            .attr('width', barW - 12)
            .attr('height', h)
            .attr('fill', 'none')
            .attr('stroke', gold)
            .attr('stroke-width', strokeW)
            .attr('opacity', 0.6);
        });
      });
    };

    const renderWaves = () => {
      timer = d3.timer((elapsed) => {
        g.selectAll('path').remove();
        const my = mouseRef.current.y * 0.15;
        
        const line = d3.line().curve(d3.curveBasis);
        for (let i = 0; i < 4; i++) {
          const points = d3.range(0, width + 80, 80).map(x => [
            x, 
            height/2 + Math.sin(x * 0.012 + elapsed * 0.0025 + i) * (40 + my + i * 15)
          ]);
          g.append('path')
            .attr('d', line(points as any))
            .attr('fill', 'none')
            .attr('stroke', gold)
            .attr('stroke-width', strokeW)
            .attr('opacity', 0.7 - i * 0.15);
        }
      });
    };

    const renderDashboard = () => {
      timer = d3.timer((elapsed) => {
        g.selectAll('*').remove();
        const mx = (mouseRef.current.x - width/2) * 0.05;
        const my = (mouseRef.current.y - height/2) * 0.05;

        const center = { x: width/2 + mx, y: height/2 + my };
        
        for (let i = 0; i < 5; i++) {
          const r = 60 + i * 40;
          const arc = d3.arc()
            .innerRadius(r)
            .outerRadius(r + 1.5)
            .startAngle(elapsed * 0.0012 * (i+1))
            .endAngle(elapsed * 0.0012 * (i+1) + Math.PI * 0.8);
          
          g.append('path')
            .attr('d', arc as any)
            .attr('fill', gold)
            .attr('opacity', 0.6)
            .attr('transform', `translate(${center.x}, ${center.y})`);
        }
        
        g.append('line').attr('x1', 0).attr('y1', center.y).attr('x2', width).attr('y2', center.y).attr('stroke', gold).attr('opacity', 0.22);
        g.append('line').attr('x1', center.x).attr('y1', 0).attr('x2', center.x).attr('y2', height).attr('stroke', gold).attr('opacity', 0.22);
      });
    };

    switch (type) {
      case 'network': renderNetwork(); break;
      case 'flow': renderFlow(); break;
      case 'neural': renderNeural(); break;
      case 'sequential': renderSequential(); break;
      case 'waves': renderWaves(); break;
      case 'dashboard': renderDashboard(); break;
      default: renderGeometric(); break;
    }

    return () => { if (timer) timer.stop(); };
  }, [type]);

  return (
    <div ref={containerRef} className="w-full h-full bg-[#1a1a1a] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(197,160,89,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(197,160,89,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
    </div>
  );
};

export default ViewportViz;
