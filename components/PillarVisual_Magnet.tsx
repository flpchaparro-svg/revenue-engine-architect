
import React, { useEffect, useRef } from 'react';

const PillarVisual_Magnet: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 500;
    let height = canvas.height = 450;

    // --- CONFIG ---
    const CARD_W = 220;
    const CARD_H = 300;
    const CENTER_X = width / 2;
    const CENTER_Y = height / 2;
    
    // State Variables
    let cardOpacity = 0;    // 0 to 1 (Frame visibility)
    let contentOpacity = 0; // 0 to 1 (Data visibility)
    let fillLevel = 0;      // 0 to 1 (Progress of data filling)
    
    // Lifecycle State
    type AnimState = 'INIT' | 'IDLE_EMPTY' | 'BUILDING' | 'COMPLETE' | 'CLEARING';
    let currentState: AnimState = 'INIT';
    
    let timer = 0;
    let cardId = 1001; 
    
    interface Particle {
        x: number; y: number;
        tx: number; ty: number; 
        speed: number;
        color: string;
        size: number;
        dead: boolean;
    }
    
    let particles: Particle[] = [];

    // Helper to spawn data particles
    const spawnParticle = () => {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.max(width, height) * 0.7; 
        
        // Target specific zones
        const zone = Math.random();
        let tx = 0, ty = 0;
        
        if(zone < 0.2) { // Photo Area
            const r = Math.random() * 30;
            const a = Math.random() * Math.PI * 2;
            tx = Math.cos(a) * r;
            ty = Math.sin(a) * r - 70;
        } else if (zone < 0.6) { // Text lines
            tx = (Math.random() - 0.5) * 160;
            ty = Math.random() * 80;
        } else { // Score/Badge
            tx = 80;
            ty = -120;
        }

        particles.push({
            x: CENTER_X + Math.cos(angle) * dist,
            y: CENTER_Y + Math.sin(angle) * dist,
            tx: tx,
            ty: ty,
            speed: 0.03 + Math.random() * 0.03, // Slower particle speed
            // Much more transparent colors
            color: Math.random() > 0.7 ? 'rgba(197, 160, 89, 0.3)' : 'rgba(26, 26, 26, 0.2)',
            size: 1.5 + Math.random() * 1.5,
            dead: false
        });
    };

    const drawCard = (frameAlpha: number, dataAlpha: number, progress: number) => {
        const x = CENTER_X - CARD_W / 2;
        const y = CENTER_Y - CARD_H / 2;
        
        ctx.save();
        
        // --- 1. CARD FRAME (Permanent Fixture) ---
        ctx.globalAlpha = frameAlpha;
        
        // Shadow & Body
        ctx.shadowColor = 'rgba(197, 160, 89, 0.1)';
        ctx.shadowBlur = 30;
        ctx.shadowOffsetY = 15;
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'; 
        ctx.beginPath();
        ctx.roundRect(x, y, CARD_W, CARD_H, 6);
        ctx.fill();
        
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        
        // Border
        ctx.strokeStyle = 'rgba(26, 26, 26, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Corner Accents (Tech look)
        ctx.strokeStyle = 'rgba(197, 160, 89, 0.3)';
        const cornerSize = 12;
        ctx.beginPath(); 
        ctx.moveTo(x, y+cornerSize); ctx.lineTo(x, y); ctx.lineTo(x+cornerSize, y); // TL
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x+CARD_W-cornerSize, y); ctx.lineTo(x+CARD_W, y); ctx.lineTo(x+CARD_W, y+cornerSize); // TR
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y+CARD_H-cornerSize); ctx.lineTo(x, y+CARD_H); ctx.lineTo(x+cornerSize, y+CARD_H); // BL
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x+CARD_W-cornerSize, y+CARD_H); ctx.lineTo(x+CARD_W, y+CARD_H); ctx.lineTo(x+CARD_W, y+CARD_H-cornerSize); // BR
        ctx.stroke();

        // --- 2. STATIC PLACEHOLDERS (The "Form") ---
        const photoCX = x + CARD_W/2;
        const photoCY = y + 70;
        const startY = y + 130;

        // Photo Ring Placeholder
        ctx.strokeStyle = 'rgba(26, 26, 26, 0.05)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(photoCX, photoCY, 35, 0, Math.PI*2);
        ctx.stroke();

        // Text Line Placeholders
        ctx.fillStyle = 'rgba(26, 26, 26, 0.03)';
        ctx.fillRect(x + 40, startY + 4, CARD_W - 80, 8); // Name
        
        for(let i=0; i<3; i++) {
            const ly = startY + 60 + (i * 25);
            ctx.fillRect(x + 50, ly + 4, CARD_W - 90, 8); // Rows
            ctx.strokeStyle = 'rgba(26, 26, 26, 0.05)';
            ctx.strokeRect(x + 25, ly, 16, 16); // Icons
        }

        // --- 3. DYNAMIC DATA (The "Content") ---
        const activeAlpha = frameAlpha * dataAlpha;
        
        if (activeAlpha > 0.01) {
            ctx.globalAlpha = activeAlpha;

            // A. Profile Photo Fill
            if (progress > 0) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(photoCX, photoCY, 35, 0, Math.PI*2);
                ctx.clip();
                
                // Silhouette build up
                const fillH = 70 * progress;
                ctx.fillStyle = 'rgba(26, 26, 26, 0.1)';
                ctx.fillRect(photoCX - 35, photoCY + 35 - fillH, 70, fillH);
                
                if (progress > 0.6) {
                    ctx.fillStyle = '#1a1a1a';
                    // Head
                    ctx.beginPath(); ctx.arc(photoCX, photoCY - 5, 12, 0, Math.PI*2); ctx.fill();
                    // Body
                    ctx.beginPath(); ctx.arc(photoCX, photoCY + 35, 25, Math.PI, 0); ctx.fill();
                }
                ctx.restore();
                
                // Active Ring
                ctx.strokeStyle = '#C5A059';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(photoCX, photoCY, 35, -Math.PI/2, (-Math.PI/2) + (Math.PI*2 * progress));
                ctx.stroke();
            }

            // B. Text Lines Fill
            if (progress > 0.2) {
                // Name
                ctx.fillStyle = '#1a1a1a';
                ctx.fillRect(x + 40, startY, (CARD_W - 80) * Math.min(1, (progress - 0.2)*3), 2);
            }
            if (progress > 0.3) {
                // Subtitle (Gold)
                ctx.fillStyle = '#C5A059';
                ctx.fillRect(x + 70, startY + 24, (CARD_W - 140) * Math.min(1, (progress - 0.3)*3), 2);
            }

            // C. Data Rows
            for(let i=0; i<3; i++) {
                const ly = startY + 60 + (i * 25);
                const threshold = 0.4 + (i * 0.15);
                
                if (progress > threshold) {
                    // Icon active
                    ctx.fillStyle = '#C5A059';
                    ctx.fillRect(x + 27, ly + 2, 12, 12);
                    
                    // Bar Fill
                    ctx.fillStyle = '#1a1a1a';
                    const barProg = Math.min(1, (progress - threshold) * 5);
                    ctx.fillRect(x + 50, ly + 6, (CARD_W - 90) * barProg, 4);
                }
            }

            // D. Verified Stamp (Bottom)
            if (progress >= 0.9) {
                ctx.save();
                ctx.translate(CENTER_X, CENTER_Y);
                ctx.rotate(-0.15);
                
                ctx.strokeStyle = '#C5A059';
                ctx.lineWidth = 2;
                const sw = 140; const sh = 40;
                
                ctx.beginPath();
                ctx.moveTo(-sw/2 + 10, -sh/2); ctx.lineTo(-sw/2, -sh/2); ctx.lineTo(-sw/2, sh/2); ctx.lineTo(-sw/2 + 10, sh/2);
                ctx.moveTo(sw/2 - 10, -sh/2); ctx.lineTo(sw/2, -sh/2); ctx.lineTo(sw/2, sh/2); ctx.lineTo(sw/2 - 10, sh/2);
                ctx.stroke();
                
                ctx.fillStyle = '#C5A059';
                ctx.font = 'bold 12px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(`PROFILE_ID [${cardId}]`, 0, 0);
                
                ctx.restore();
            }

            // E. HOT LEAD BADGE (Top Right Red Circle)
            if (progress > 0.7) {
                const badgeAlpha = Math.min(1, (progress - 0.7) * 4);
                ctx.globalAlpha = activeAlpha * badgeAlpha;
                
                const badgeX = x + CARD_W - 25;
                const badgeY = y + 25;
                
                ctx.beginPath();
                ctx.arc(badgeX, badgeY, 14, 0, Math.PI*2);
                ctx.fillStyle = 'rgba(226, 30, 63, 0.1)'; // Faint Red Background
                ctx.fill();
                
                ctx.strokeStyle = '#E21E3F';
                ctx.lineWidth = 1;
                ctx.stroke();
                
                ctx.fillStyle = '#E21E3F';
                ctx.font = 'bold 8px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText("HOT", badgeX, badgeY);
            }
        }

        ctx.restore();
    };

    const animate = () => {
        // Handle Resize
        if (canvas.parentElement) {
             const pWidth = canvas.parentElement.clientWidth;
             const pHeight = canvas.parentElement.clientHeight;
             if(canvas.width !== pWidth || canvas.height !== pHeight){
                 width = canvas.width = pWidth;
                 height = canvas.height = pHeight;
             }
        }

        ctx.clearRect(0, 0, width, height);

        // --- STATE MACHINE ---
        
        switch (currentState) {
            case 'INIT':
                cardOpacity += 0.02;
                if (cardOpacity >= 1) {
                    cardOpacity = 1;
                    currentState = 'IDLE_EMPTY';
                    timer = 0;
                }
                break;

            case 'IDLE_EMPTY':
                timer++;
                if (timer > 60) { // Longer pause on blank (1s)
                    currentState = 'BUILDING';
                    contentOpacity = 1; 
                }
                break;

            case 'BUILDING':
                // MUCH SLOWER BUILD
                if (fillLevel < 1) {
                    fillLevel += 0.0015; // Slowed down from 0.006
                    
                    // Spawn fewer particles for cleaner look
                    if (Math.random() > 0.8) spawnParticle(); 
                } else {
                    fillLevel = 1;
                    currentState = 'COMPLETE';
                    timer = 0;
                }
                break;

            case 'COMPLETE':
                timer++;
                // Longer hold to read the card
                if (timer > 200) { // ~3.5 seconds hold
                    currentState = 'CLEARING';
                }
                break;

            case 'CLEARING':
                // Slower fade out
                contentOpacity -= 0.01; 
                if (contentOpacity <= 0) {
                    contentOpacity = 0;
                    fillLevel = 0;
                    cardId++;
                    currentState = 'IDLE_EMPTY';
                    timer = 0;
                }
                break;
        }

        // Draw Card Layer
        drawCard(cardOpacity, contentOpacity, fillLevel);

        // --- PARTICLE PHYSICS ---
        // Particles only visible when content is building or complete
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            
            const dx = (CENTER_X + p.tx) - p.x;
            const dy = (CENTER_Y + p.ty) - p.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if (!p.dead) {
                p.x += dx * p.speed;
                p.y += dy * p.speed;
                
                if (dist < 10) {
                    p.dead = true;
                }
                
                // Fade out particles with content opacity
                let pAlpha = 1;
                if (currentState === 'CLEARING') pAlpha = contentOpacity;
                
                if (pAlpha > 0.01) {
                    ctx.save();
                    ctx.globalAlpha = pAlpha;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
                    ctx.fillStyle = p.color;
                    ctx.fill();
                    
                    // Faint Trail
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p.x - dx*0.2, p.y - dy*0.2);
                    ctx.strokeStyle = p.color;
                    ctx.lineWidth = p.size * 0.5;
                    ctx.stroke();
                    ctx.restore();
                }
            } else {
                particles.splice(i, 1);
            }
        }

        requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
        cancelAnimationFrame(animId);
    };

  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden relative bg-[#FFF2EC] border border-[#1a1a1a]/5 rounded-sm">
      <canvas ref={canvasRef} className="block" />
    </div>
  );
};

export default PillarVisual_Magnet;

