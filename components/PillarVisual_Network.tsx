import React, { useEffect, useRef } from 'react';

const PillarVisual_Network: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 600;
    let height = canvas.height = 600;
    
    // Configuration
    const nodeCount = 40;
    const coreX = width / 2;
    const coreY = height / 2;

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }

    const nodes: Node[] = [];

    // Init Nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw Central Hub
      ctx.beginPath();
      ctx.arc(coreX, coreY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#C5A059'; // Gold
      ctx.fill();
      
      // Pulse Effect for Core
      ctx.beginPath();
      ctx.arc(coreX, coreY, 20 + Math.sin(Date.now() / 500) * 5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(197, 160, 89, 0.2)';
      ctx.stroke();

      nodes.forEach(node => {
        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Draw Node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = '#1a1a1a';
        ctx.fill();

        // Connect to Core
        const dx = coreX - node.x;
        const dy = coreY - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 250) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(coreX, coreY);
          ctx.strokeStyle = `rgba(26, 26, 26, ${1 - dist / 250})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        // Connect to Neighbors
        nodes.forEach(otherNode => {
            const ndx = node.x - otherNode.x;
            const ndy = node.y - otherNode.y;
            const ndist = Math.sqrt(ndx * ndx + ndy * ndy);

            if (ndist < 80) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(otherNode.x, otherNode.y);
                ctx.strokeStyle = `rgba(26, 26, 26, ${0.2 * (1 - ndist / 80)})`;
                ctx.lineWidth = 0.2;
                ctx.stroke();
            }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || 600;
      // height remains constant or can be adjusted
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  return (
    <div className="w-full h-[500px] flex items-center justify-center overflow-hidden cursor-crosshair relative">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#1a1a1a]/30 uppercase tracking-widest pointer-events-none">
        [ DATA_TOPOLOGY // SYNCHRONIZED ]
      </div>
    </div>
  );
};

export default PillarVisual_Network;