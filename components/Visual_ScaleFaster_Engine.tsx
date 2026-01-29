import React, { useRef, useEffect } from 'react';

// --- Configuration & Constants ---
const COLORS = {
  bg: '#FFF2EC',    // Cream
  ink: '#1a1a1a',   // Black
  accent: '#C5A059',// Gold
  accentDim: 'rgba(197, 160, 89, 0.1)',
  inkDim: 'rgba(26, 26, 26, 0.05)',
  white: '#FFFFFF',
  grid: '#E5E5E5'
};

const STATES = [
  { id: 'VOICE', title: 'THE VOICE', sub: 'AI Assistants' },
  { id: 'PRESENCE', title: 'THE PRESENCE', sub: 'Content Systems' },
  { id: 'SOUL', title: 'THE SOUL', sub: 'Team Training' }
];

const TRANSITION_DURATION = 1500; // ms
const HOLD_DURATION = 3500;       // ms

// --- Helper Drawing Functions ---

const drawRoundedRect = (
  ctx: CanvasRenderingContext2D, 
  x: number, 
  y: number, 
  w: number, 
  h: number, 
  r: number
) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
};

const drawBrowserFrame = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
  // Frame Border
  ctx.strokeStyle = COLORS.ink;
  ctx.lineWidth = 3;
  ctx.strokeRect(0, 0, w, h);

  // Header Bar
  ctx.fillStyle = COLORS.white;
  ctx.fillRect(2, 2, w - 4, 40);
  ctx.beginPath();
  ctx.moveTo(0, 44);
  ctx.lineTo(w, 44);
  ctx.lineWidth = 2;
  ctx.stroke();

  // Traffic Lights
  ctx.fillStyle = COLORS.ink;
  ctx.beginPath(); ctx.arc(24, 22, 4, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(42, 22, 4, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(60, 22, 4, 0, Math.PI * 2); ctx.fill();

  // URL Bar placeholder
  ctx.fillStyle = '#F0F0F0';
  ctx.fillRect(90, 12, w - 110, 20);
};

// --- Specific Scene Drawers ---

const drawVoice = (ctx: CanvasRenderingContext2D, w: number, h: number, time: number) => {
  const availableH = h - 44;
  const contentCenterY = 44 + availableH / 2;
  
  // 1. Background Chart (Context - "like it's on a chart")
  const chartW = 400;
  const chartH = 180;
  const chartX = (w - chartW) / 2;
  const chartY = contentCenterY - (chartH / 2);
  
  ctx.save();
  ctx.globalAlpha = 0.05; // Very faint background
  ctx.strokeStyle = COLORS.ink;
  ctx.lineWidth = 3;
  
  ctx.beginPath();
  ctx.moveTo(chartX, chartY); 
  ctx.lineTo(chartX, chartY + chartH); // Y axis
  ctx.lineTo(chartX + chartW, chartY + chartH); // X axis
  ctx.stroke();
  
  // Graph line
  ctx.beginPath();
  ctx.moveTo(chartX, chartY + chartH);
  ctx.bezierCurveTo(
    chartX + chartW * 0.3, chartY + chartH,
    chartX + chartW * 0.4, chartY + chartH * 0.5,
    chartX + chartW, chartY
  );
  ctx.stroke();
  ctx.restore();

  // 2. Main Chat Widget Card
  const cardW = 340;
  const cardH = 220;
  const cardX = (w - cardW) / 2;
  const cardY = contentCenterY - (cardH / 2);

  // Card Shadow & Box
  ctx.fillStyle = COLORS.white;
  ctx.strokeStyle = COLORS.ink;
  ctx.lineWidth = 2;
  ctx.shadowColor = 'rgba(0,0,0,0.1)';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 10;
  
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 12);
  ctx.fill();
  ctx.shadowColor = 'transparent';
  ctx.stroke();

  // Header Area
  ctx.beginPath();
  ctx.moveTo(cardX, cardY + 44);
  ctx.lineTo(cardX + cardW, cardY + 44);
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#E5E5E5';
  ctx.stroke();

  // Header Title
  ctx.fillStyle = COLORS.ink;
  ctx.font = 'bold 14px Inter, sans-serif';
  ctx.fillText("AI Assistant", cardX + 20, cardY + 28);

  // Status Indicator
  const isTyping = (time % 3000) < 1500;
  
  ctx.fillStyle = '#10B981'; // Green dot
  ctx.beginPath();
  ctx.arc(cardX + 110, cardY + 24, 3, 0, Math.PI*2);
  ctx.fill();

  // Chat Content
  const chatAreaY = cardY + 44;
  
  // User Message (Left aligned)
  const userRowY = chatAreaY + 30;
  const userIconX = cardX + 20;
  
  // User Icon
  ctx.fillStyle = '#E5E5E5';
  ctx.beginPath(); ctx.arc(userIconX + 12, userRowY + 12, 12, 0, Math.PI*2); ctx.fill();
  
  // User Bubble
  ctx.fillStyle = '#F3F4F6';
  drawRoundedRect(ctx, userIconX + 35, userRowY - 8, 180, 40, 8);
  ctx.fill();
  
  ctx.fillStyle = COLORS.ink;
  ctx.font = '12px Inter, sans-serif';
  ctx.fillText("How do I scale?", userIconX + 45, userRowY + 16);

  // AI Message (Right aligned - Gold)
  const aiRowY = userRowY + 60;
  const aiIconX = cardX + cardW - 44; // Right side
  
  // AI Icon
  ctx.fillStyle = COLORS.accent;
  ctx.beginPath(); ctx.arc(aiIconX + 12, aiRowY + 12, 12, 0, Math.PI*2); ctx.fill();
  
  // AI Bubble
  const aiBubbleW = 180;
  const aiBubbleX = aiIconX - aiBubbleW - 10;
  
  ctx.fillStyle = COLORS.accent;
  drawRoundedRect(ctx, aiBubbleX, aiRowY - 8, aiBubbleW, 40, 8);
  ctx.fill();

  if (isTyping) {
     // Typing dots
     ctx.fillStyle = COLORS.white;
     const dotStart = aiBubbleX + aiBubbleW/2 - 14;
     for(let i=0; i<3; i++) {
        const dy = aiRowY + 12 + Math.sin((time * 0.01) + i) * 2;
        ctx.beginPath(); ctx.arc(dotStart + (i * 14), dy, 2.5, 0, Math.PI*2); ctx.fill();
     }
     
     // "Thinking" text
     ctx.fillStyle = '#9CA3AF';
     ctx.font = 'italic 10px Inter, sans-serif';
     ctx.fillText("AI is typing...", cardX + 20, cardH + cardY - 15);
  } else {
     // Text
     ctx.fillStyle = COLORS.white;
     ctx.font = '12px Inter, sans-serif';
     ctx.fillText("I've analyzed the data.", aiBubbleX + 12, aiRowY + 16);
  }
};

const drawPresence = (ctx: CanvasRenderingContext2D, w: number, h: number, time: number) => {
  const availableH = h - 44;
  const contentCenterY = 44 + availableH / 2;
  
  const viewH = 260; // Increased view height for better visibility
  const clipTop = contentCenterY - (viewH / 2);
  
  const cardSize = 100;
  const gap = 15;
  const rowH = cardSize + gap; // 115
  
  const totalContentW = (cardSize * 2) + gap; // 215
  // Perfectly center the grid content
  const startX = (w - totalContentW) / 2;

  // Mask area
  ctx.save();
  ctx.beginPath();
  ctx.rect(startX - 10, clipTop, totalContentW + 20, viewH);
  ctx.clip();

  // Infinite Scroll Logic
  // We loop every 2 rows (230px) to ensure the 'Viral' pattern repeats seamlessly
  const loopHeight = 2 * rowH; 
  const scrollSpeed = 0.08;
  const loopOffset = (time * scrollSpeed) % loopHeight; 
  
  // Calculate which rows are currently visible
  // We render rows relative to clipTop, shifted up by loopOffset
  // Row Y = clipTop + (rowIndex * rowH) - loopOffset
  // We need rows that overlap [clipTop, clipTop + viewH]
  const startRowIndex = Math.floor((loopOffset - cardSize) / rowH);
  const endRowIndex = Math.ceil((loopOffset + viewH) / rowH);

  for (let i = startRowIndex; i <= endRowIndex; i++) {
    const y = clipTop + (i * rowH) - loopOffset;
    
    // Pattern Logic: Repeat every 2 rows
    // Row 0: Viral post on right
    // Row 1: Normal posts
    // Use abs() to handle potential negative indices safely for pattern matching
    const patternIdx = Math.abs(i) % 2; 

    // Draw Columns
    const x1 = startX;
    const x2 = startX + cardSize + gap;

    [x1, x2].forEach((x, colIdx) => {
        // Highlight specific card: Pattern 0, Col 1
        const isViral = (patternIdx === 0 && colIdx === 1);
        
        ctx.fillStyle = isViral ? COLORS.accent : COLORS.white;
        ctx.strokeStyle = COLORS.ink;
        ctx.lineWidth = 1;
        
        // Post Box
        ctx.fillRect(x, y, cardSize, cardSize);
        ctx.strokeRect(x, y, cardSize, cardSize);
        
        // Inner Content
        ctx.fillStyle = isViral ? COLORS.white : '#E5E5E5';
        ctx.fillRect(x + 10, y + 10, cardSize - 20, cardSize - 40);
        
        // Actions
        ctx.fillStyle = isViral ? COLORS.white : COLORS.ink;
        ctx.beginPath(); ctx.arc(x + 15, y + cardSize - 15, 4, 0, Math.PI*2); ctx.fill();
        ctx.fillRect(x + 25, y + cardSize - 18, 40, 6);
    });
  }

  ctx.restore();
};

const drawSoul = (ctx: CanvasRenderingContext2D, w: number, h: number, time: number) => {
  const cardW = 280;
  const cardH = 300;
  
  const availableH = h - 44;
  const contentCenterY = 44 + availableH / 2;
  const y = contentCenterY - (cardH / 2);
  const x = (w - cardW) / 2;

  // Main Card
  ctx.fillStyle = COLORS.white;
  ctx.strokeStyle = COLORS.ink;
  ctx.lineWidth = 2;
  ctx.shadowColor = 'rgba(0,0,0,0.1)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 5;
  drawRoundedRect(ctx, x, y, cardW, cardH, 8);
  ctx.fill();
  ctx.shadowColor = 'transparent';
  ctx.stroke();

  // Profile Header
  const profileRad = 20;
  ctx.fillStyle = COLORS.ink;
  ctx.beginPath();
  ctx.arc(x + 40, y + 40, profileRad, 0, Math.PI*2);
  ctx.fill();
  
  ctx.fillStyle = COLORS.ink;
  ctx.font = 'bold 16px Inter, sans-serif';
  ctx.fillText("Onboarding SOP", x + 75, y + 45);

  // Task List
  const tasks = ["Review Guidelines", "Setup Accounts", "Shadow Call", "First Assignment"];
  const listStartY = y + 90;
  const rowH = 40;
  
  // Animation Cycle
  const cycleDur = 4000;
  const localTime = time % cycleDur;
  const progress = Math.min(localTime / 3000, 1); // 0 to 1 over 3s
  const completedCount = Math.floor(progress * 4.5); // 0 to 4

  tasks.forEach((task, i) => {
    const taskY = listStartY + (i * rowH);
    const isDone = i < completedCount;

    // Checkbox
    ctx.strokeStyle = COLORS.ink;
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 30, taskY - 10, 16, 16);
    
    if (isDone) {
        ctx.fillStyle = COLORS.accent;
        ctx.font = 'bold 16px Inter, sans-serif';
        ctx.fillText("✓", x + 32, taskY + 4);
    }

    // Text
    ctx.fillStyle = isDone ? COLORS.ink : '#999';
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText(task, x + 60, taskY + 3);
  });

  // Progress Bar
  const barW = cardW - 60;
  const barH = 6;
  const barX = x + 30;
  const barY = y + cardH - 30;

  // Background
  ctx.fillStyle = '#EEE';
  ctx.fillRect(barX, barY, barW, barH);
  
  // Fill
  ctx.fillStyle = COLORS.accent;
  ctx.fillRect(barX, barY, barW * progress, barH);
};


// --- Main Component ---

const Visual_ScaleFaster_Engine: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const currentStateIdx = useRef(0);
  const nextStateIdx = useRef(1);
  const startTimeRef = useRef<number>(0);
  const isTransitioningRef = useRef(false);
  const transitionStartTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = (timestamp: number) => {
      if (startTimeRef.current === 0) startTimeRef.current = timestamp;
      
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      const w = rect.width;
      const h = rect.height;

      const elapsed = timestamp - startTimeRef.current;
      
      if (!isTransitioningRef.current) {
        if (elapsed > HOLD_DURATION) {
          isTransitioningRef.current = true;
          transitionStartTimeRef.current = timestamp;
        }
      }

      let transitionProgress = 0;

      if (isTransitioningRef.current) {
        const tElapsed = timestamp - transitionStartTimeRef.current;
        transitionProgress = Math.min(tElapsed / TRANSITION_DURATION, 1);
        
        if (transitionProgress >= 1) {
          isTransitioningRef.current = false;
          startTimeRef.current = timestamp;
          currentStateIdx.current = nextStateIdx.current;
          nextStateIdx.current = (currentStateIdx.current + 1) % STATES.length;
          transitionProgress = 0;
        }
      }

      // --- DRAWING ---
      
      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(0, 0, w, h);

      const ease = (t: number) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      // Elevator Slide Offset
      // If transitioning, we slide everything up.
      // Offset goes from 0 to h.
      const slideOffset = isTransitioningRef.current ? ease(transitionProgress) * h : 0;

      // 1. Draw CURRENT State (Moves from 0 to -h)
      ctx.save();
      // Translate Upwards
      ctx.translate(0, -slideOffset);
      const drawCurrent = [drawVoice, drawPresence, drawSoul][currentStateIdx.current];
      drawCurrent(ctx, w, h, timestamp);
      ctx.restore();

      // 2. Draw NEXT State (Moves from h to 0)
      if (isTransitioningRef.current) {
        ctx.save();
        // Starts at h, moves to 0
        ctx.translate(0, h - slideOffset);
        
        // Separator Line
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(w, 0);
        ctx.strokeStyle = COLORS.ink;
        ctx.lineWidth = 2;
        ctx.stroke();

        const drawNext = [drawVoice, drawPresence, drawSoul][nextStateIdx.current];
        drawNext(ctx, w, h, timestamp);
        ctx.restore();
      }

      // Always draw browser frame on top (static)
      drawBrowserFrame(ctx, w, h);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full block"
      style={{ 
        cursor: 'default',
        background: COLORS.bg 
      }}
    />
  );
};

export default Visual_ScaleFaster_Engine;