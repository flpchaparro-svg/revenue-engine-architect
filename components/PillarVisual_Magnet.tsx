import React, { useEffect, useRef } from 'react';

// --- 3D MATH UTILS ---
const FL = 1200; // Focal Length (Higher = flatter, more architectural perspective)

interface Point3D { x: number; y: number; z: number; }

const rotateY = (p: Point3D, angle: number): Point3D => ({
  x: p.x * Math.cos(angle) - p.z * Math.sin(angle),
  y: p.y,
  z: p.x * Math.sin(angle) + p.z * Math.cos(angle),
});

const rotateX = (p: Point3D, angle: number): Point3D => ({
  x: p.x,
  y: p.y * Math.cos(angle) - p.z * Math.sin(angle),
  z: p.y * Math.sin(angle) + p.z * Math.cos(angle),
});

const project = (p: Point3D, width: number, height: number) => {
  const scale = FL / (FL + p.z);
  return {
    x: width / 2 + p.x * scale,
    y: height / 2 + p.y * scale,
    scale,
    z: p.z // Keep Z for sorting
  };
};

const PillarVisual_Magnet: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 600;
    let height = canvas.height = 450;

    // --- CORE GEOMETRY (Sphere Lat/Long) ---
    const sphereRadius = 60;
    const spherePoints: Point3D[][] = []; // Array of rings (arrays of points)
    
    // Longitude lines (Vertical)
    const meridianCount = 12;
    for (let i = 0; i < meridianCount; i++) {
        const theta = (i / meridianCount) * Math.PI * 2;
        const ring: Point3D[] = [];
        for (let j = 0; j <= 20; j++) {
            const phi = (j / 20) * Math.PI;
            ring.push({
                x: sphereRadius * Math.sin(phi) * Math.cos(theta),
                y: sphereRadius * Math.cos(phi),
                z: sphereRadius * Math.sin(phi) * Math.sin(theta)
            });
        }
        spherePoints.push(ring);
    }
    
    // Latitude lines (Horizontal rings)
    const parallelCount = 8;
    for (let i = 1; i < parallelCount; i++) {
        const phi = (i / parallelCount) * Math.PI;
        const ring: Point3D[] = [];
        for (let j = 0; j <= 30; j++) {
            const theta = (j / 30) * Math.PI * 2;
            ring.push({
                x: sphereRadius * Math.sin(phi) * Math.cos(theta),
                y: sphereRadius * Math.cos(phi),
                z: sphereRadius * Math.sin(phi) * Math.sin(theta)
            });
        }
        spherePoints.push(ring);
    }

    // --- INCOMING DATA PANES (3D Rectangles) ---
    class DataPane {
        x: number;
        y: number;
        z: number;
        width: number;
        height: number;
        speed: number;
        angleX: number;
        angleY: number;
        color: string;

        constructor() {
            this.reset(true);
            this.z = Math.random() * 800; // Scatter initially
            this.width = 30;
            this.height = 20;
            this.speed = 0; // Set in reset
            this.angleX = 0; // Set in reset
            this.angleY = 0; // Set in reset
            this.color = '';
        }

        reset(initial = false) {
            // Spawn far away in spherical coordinates
            const spawnRadius = initial ? 100 + Math.random() * 400 : 600 + Math.random() * 200;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;

            this.x = spawnRadius * Math.sin(phi) * Math.cos(theta);
            this.y = spawnRadius * Math.cos(phi);
            this.z = spawnRadius * Math.sin(phi) * Math.sin(theta); // Start behind or in front

            // Orient pane to face center roughly
            this.angleY = -theta;
            this.angleX = -phi + Math.PI/2;

            this.speed = 1.5 + Math.random() * 1.5;
            this.color = Math.random() > 0.8 ? '#C5A059' : '#1a1a1a'; // Ink with Gold accents
        }

        update() {
            // Move towards (0,0,0)
            const dist = Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
            
            if (dist < sphereRadius) {
                this.reset(); // Absorbed
            } else {
                const dx = -this.x / dist;
                const dy = -this.y / dist;
                const dz = -this.z / dist;
                
                this.x += dx * this.speed;
                this.y += dy * this.speed;
                this.z += dz * this.speed;
            }
        }

        draw(ctx: CanvasRenderingContext2D, globalRotY: number, globalRotX: number) {
            // 4 Corners of the pane
            const w = this.width / 2;
            const h = this.height / 2;
            
            // Local shape
            const corners = [
                { x: -w, y: -h, z: 0 },
                { x: w, y: -h, z: 0 },
                { x: w, y: h, z: 0 },
                { x: -w, y: h, z: 0 }
            ];

            // Transform Local -> World -> Camera
            const transformed = corners.map(p => {
                // 1. Rotate Pane Local
                // (Simplified: Just position it for now, rotation adds complexity)
                // Let's just treat x,y,z as center and draw a small billboard for performance/cleanliness
                // Or better: Assume pane is facing center.
                
                // Actual position in world space
                let wx = this.x + p.x;
                let wy = this.y + p.y;
                let wz = this.z + p.z;

                // 2. Global Scene Rotation
                let p3d = { x: wx, y: wy, z: wz };
                p3d = rotateY(p3d, globalRotY);
                p3d = rotateX(p3d, globalRotX);

                return p3d;
            });

            // Calculate center depth for sorting
            const center3d = rotateX(rotateY({x:this.x, y:this.y, z:this.z}, globalRotY), globalRotX);
            
            // Project
            const proj = transformed.map(p => project(p, width, height));
            const centerProj = project(center3d, width, height);

            // Draw
            ctx.beginPath();
            ctx.moveTo(proj[0].x, proj[0].y);
            ctx.lineTo(proj[1].x, proj[1].y);
            ctx.lineTo(proj[2].x, proj[2].y);
            ctx.lineTo(proj[3].x, proj[3].y);
            ctx.closePath();

            // Style
            // Distance fade
            const alpha = Math.min(1, (centerProj.scale - 0.5) * 2);
            
            if (this.color === '#C5A059') {
                ctx.fillStyle = `rgba(197, 160, 89, ${0.8 * alpha})`;
                ctx.strokeStyle = `rgba(197, 160, 89, ${1 * alpha})`;
            } else {
                ctx.fillStyle = `rgba(26, 26, 26, ${0.1 * alpha})`;
                ctx.strokeStyle = `rgba(26, 26, 26, ${0.4 * alpha})`;
            }
            
            ctx.lineWidth = 1;
            ctx.fill();
            ctx.stroke();

            // Draw connecting line to center (The "Tether")
            const centerScreen = { x: width/2, y: height/2 };
            ctx.beginPath();
            ctx.moveTo(centerProj.x, centerProj.y);
            // Draw only a segment towards center to look like a trail
            const trailX = centerProj.x + (centerScreen.x - centerProj.x) * 0.2;
            const trailY = centerProj.y + (centerScreen.y - centerProj.y) * 0.2;
            ctx.lineTo(trailX, trailY);
            
            ctx.strokeStyle = this.color;
            ctx.globalAlpha = 0.2 * alpha;
            ctx.stroke();
            ctx.globalAlpha = 1;

            return centerProj.z; // Return depth for Z-sorting if needed
        }
    }

    const panes: DataPane[] = [];
    for(let i=0; i<15; i++) panes.push(new DataPane());

    let time = 0;

    const render = () => {
        ctx.clearRect(0, 0, width, height);
        time += 0.005;

        const globalRotY = time;
        const globalRotX = Math.sin(time * 0.5) * 0.2; // Gentle tilt

        // --- 1. DRAW BACK SPHERE (Wireframe) ---
        ctx.strokeStyle = 'rgba(26, 26, 26, 0.15)';
        ctx.lineWidth = 1.5;

        spherePoints.forEach(ring => {
            ctx.beginPath();
            let first = true;
            ring.forEach(p => {
                // Rotate
                let p3d = rotateY(p, globalRotY);
                p3d = rotateX(p3d, globalRotX);
                
                // Project
                const proj = project(p3d, width, height);
                
                if (first) {
                    ctx.moveTo(proj.x, proj.y);
                    first = false;
                } else {
                    ctx.lineTo(proj.x, proj.y);
                }
            });
            ctx.closePath();
            ctx.stroke();
        });

        // --- 2. DRAW CENTRAL PULSE ---
        // A solid core inside
        const coreP = project({x:0, y:0, z:0}, width, height);
        const pulseSize = sphereRadius * coreP.scale * 0.4 + Math.sin(time * 5) * 5;
        
        const grad = ctx.createRadialGradient(coreP.x, coreP.y, 5, coreP.x, coreP.y, pulseSize);
        grad.addColorStop(0, '#1a1a1a');
        grad.addColorStop(1, 'rgba(26, 26, 26, 0)');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(coreP.x, coreP.y, pulseSize, 0, Math.PI*2);
        ctx.fill();

        // --- 3. DRAW DATA PANES ---
        // Sort by Z to draw back-to-front roughly (simple sort)
        panes.sort((a, b) => b.z - a.z); // Far to near? No, in 3D painter's algo is complex. 
        // Actually, for this simple scene, just drawing them on top is okay as they are translucent.
        
        panes.forEach(pane => {
            pane.update();
            pane.draw(ctx, globalRotY, globalRotX);
        });

        requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
        if (canvas.parentElement) {
            width = canvas.width = canvas.parentElement.clientWidth;
            height = canvas.height = canvas.parentElement.clientHeight;
        }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default PillarVisual_Magnet;

