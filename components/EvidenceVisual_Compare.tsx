
import React, { useState, useRef } from 'react';
import { MoveHorizontal } from 'lucide-react';

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

  return (
    <div 
      ref={containerRef}
      className="w-full h-[500px] relative overflow-hidden cursor-col-resize select-none border border-black/10 bg-white"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* --- AFTER IMAGE (Background / Clean) --- */}
      <div className="absolute inset-0">
        <img 
          src="/images/group7-after.webp" 
          alt={afterLabel}
          className="w-full h-full object-cover"
        />
      </div>

      {/* --- BEFORE IMAGE (Clipped Overlay / Messy) --- */}
      <div 
        className="absolute inset-0 border-r-2 border-white overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src="/images/group7-before.webp" 
          alt={beforeLabel}
          className="w-full h-full object-cover"
          style={{ width: '100vw' }}
        />
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
    </div>
  );
};

export default EvidenceVisual_Compare;
