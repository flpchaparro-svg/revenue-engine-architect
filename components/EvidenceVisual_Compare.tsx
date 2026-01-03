
import React, { useState, useRef } from 'react';
import { MoveHorizontal, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

interface EvidenceVisualCompareProps {
  beforeLabel?: string;
  afterLabel?: string;
}

const EvidenceVisual_Compare: React.FC<EvidenceVisualCompareProps> = ({ 
  beforeLabel = "CURRENT_STATE: FRICTION", 
  afterLabel = "TARGET_STATE: FLOW" 
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  // Color Constants
  const THEME_COLOR = '#C5A059'; // Gold instead of Teal
  const THEME_BG = 'rgba(197, 160, 89, 0.05)';
  const THEME_BORDER = 'rgba(197, 160, 89, 0.2)';

  return (
    <div 
      ref={containerRef}
      className="w-full h-[500px] relative overflow-hidden cursor-col-resize select-none border border-black/10 bg-white"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* --- AFTER IMAGE (Background / Clean) --- */}
      <div className="absolute inset-0 flex items-center justify-center p-12" style={{ backgroundColor: THEME_BG }}>
         {/* CSS Wireframe: The "Perfect" Architecture */}
         <div className="w-full h-full border grid grid-cols-12 gap-4 p-8 relative" style={{ borderColor: THEME_BORDER }}>
            <div className="absolute top-4 right-4 text-white font-mono text-[10px] px-2 py-1 flex items-center gap-2" style={{ backgroundColor: THEME_COLOR }}>
               <CheckCircle2 className="w-3 h-3" /> SCORE: 100
            </div>
            {/* Header */}
            <div className="col-span-12 h-12" style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', borderColor: THEME_BORDER, borderWidth: '1px' }} />
            {/* Hero Content */}
            <div className="col-span-6 h-64 border flex items-center justify-center" style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', borderColor: THEME_BORDER }}>
               <div className="font-mono text-xs" style={{ color: 'rgba(197, 160, 89, 0.6)' }}>IMG_OPTIMIZED.WEBP</div>
            </div>
            <div className="col-span-6 h-64 flex flex-col gap-4">
               <div className="h-8 w-3/4" style={{ backgroundColor: 'rgba(197, 160, 89, 0.2)' }} />
               <div className="h-4 w-full" style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)' }} />
               <div className="h-4 w-5/6" style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)' }} />
               <div className="h-12 w-1/3 mt-auto" style={{ backgroundColor: THEME_COLOR }} />
            </div>
         </div>
      </div>

      {/* --- BEFORE IMAGE (Clipped Overlay / Messy) --- */}
      <div 
        className="absolute inset-0 bg-red-50/80 border-r-2 border-white overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
         <div className="w-full h-full absolute inset-0 p-12" style={{ width: '100vw' }}> 
            {/* CSS Wireframe: The "Broken" Architecture */}
            <div className="w-full max-w-[900px] h-full border border-red-200 relative p-8">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                  <Loader2 className="w-12 h-12 text-red-400 animate-spin mb-4" />
                  <span className="font-mono text-xs text-red-500 bg-white px-2 py-1 border border-red-200">LOADING_SCRIPTS...</span>
               </div>
               
               {/* Disjointed Elements */}
               <div className="absolute top-8 left-8 w-[120%] h-16 bg-red-200/20 rotate-1 border border-red-300/50" />
               <div className="absolute top-32 left-12 w-64 h-64 bg-gray-200 blur-sm border border-red-300 border-dashed flex items-center justify-center">
                  <span className="text-xs text-red-400 font-mono">IMG_TOO_LARGE.PNG</span>
               </div>
               <div className="absolute top-40 right-20 w-48 h-96 bg-red-100/50 -rotate-2 border border-red-200" />
               
               <div className="absolute bottom-12 left-12 flex items-center gap-2 text-red-600 font-mono text-xs bg-red-100 px-3 py-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>LCP_FAILURE: 4.2s</span>
               </div>
            </div>
         </div>
      </div>

      {/* --- SLIDER HANDLE --- */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-50 flex items-center justify-center shadow-xl"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-black/10">
          <MoveHorizontal className="w-4 h-4 text-black/60" />
        </div>
      </div>
      
      {/* LABELS */}
      <div className="absolute bottom-4 left-4 font-mono text-[9px] bg-red-100 text-red-600 px-2 py-1 border border-red-200">
         [ {beforeLabel} ]
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[9px] px-2 py-1 border" style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', color: THEME_COLOR, borderColor: THEME_BORDER }}>
         [ {afterLabel} ]
      </div>
    </div>
  );
};

export default EvidenceVisual_Compare;
