import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  theme?: 'light' | 'dark'; // light = Cream background (Black Button). dark = Black background (Gold Button).
  className?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ 
  children, 
  onClick, 
  theme = 'light',
  className = "" 
}) => {
  
  // LOGIC: Determines colors based on the background it sits on.
  const isLightTheme = theme === 'light'; 

  // Default State (Idle)
  const initialBg = isLightTheme ? 'bg-[#1a1a1a]' : 'bg-[#C5A059]';
  const initialText = isLightTheme ? 'text-[#FFF2EC]' : 'text-[#1a1a1a]';
  const initialBorder = isLightTheme ? 'border-[#1a1a1a]' : 'border-[#C5A059]';
  
  // Hover State (Fill Up)
  const hoverBg = isLightTheme ? 'bg-[#C5A059]' : 'bg-[#FFF2EC]';
  // Text always goes dark on hover because both Gold and Cream are light colors.
  const hoverText = 'group-hover:text-[#1a1a1a]'; 

  return (
    <button 
      onClick={onClick}
      className={`group relative px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] overflow-hidden transition-all duration-300 border ${initialBorder} ${initialBg} ${initialText} ${className}`}
    >
      {/* LAYER 1: Initial Background (Slides UP and OUT) */}
      <div className={`absolute inset-0 ${initialBg} group-hover:-translate-y-full transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)`} />
      
      {/* LAYER 2: Hover Background (Slides UP and IN) */}
      <div className={`absolute inset-0 ${hoverBg} translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)`} />
      
      {/* CONTENT (Z-Index to stay on top) */}
      <span className={`relative z-10 flex items-center justify-center gap-3 transition-colors duration-500 ${hoverText}`}>
        {children}
        <ArrowRight className="w-4 h-4" />
      </span>
    </button>
  );
};

export default CTAButton;