import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  theme?: 'light' | 'dark';
  variant?: 'solid' | 'bracket';
  size?: 'default' | 'sm';
  className?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ 
  children, 
  onClick, 
  type = 'button',
  theme = 'light',
  variant = 'solid',
  size = 'default',
  className = "" 
}) => {
  
  const isLightTheme = theme === 'light'; 

  // ============================================
  // VARIANT: BRACKET (Fixed for Responsive)
  // ============================================
  if (variant === 'bracket') {
    // idleText: Black on Cream, White on Black.
    const idleText = isLightTheme ? 'text-[#1a1a1a]' : 'text-white';
    
    // Size Logic
    const fontSize = size === 'sm' ? 'text-[10px]' : 'text-xs';
    const padding = size === 'sm' ? 'px-1 py-1' : 'px-3 py-2';

    return (
      <button 
        type={type}
        onClick={onClick}
        className={`
          group relative inline-flex items-center justify-center gap-[2px]
          font-mono font-bold uppercase tracking-[0.2em] 
          bg-transparent border-none
          transition-colors duration-300
          max-w-full whitespace-normal text-center leading-tight
          ${idleText} ${fontSize} ${padding} ${className}
          hover:text-[#C5A059]
        `}
      >
        {/* Left Bracket - Squeezes In */}
        <span className="transition-transform duration-300 group-hover:translate-x-[2px] shrink-0">
          [
        </span>
        
        {/* The Text - Allows Wrapping */}
        <span className="mx-1 break-words">
          {children}
        </span>
        
        {/* Right Bracket - Squeezes In */}
        <span className="transition-transform duration-300 group-hover:-translate-x-[2px] shrink-0">
          ]
        </span>
      </button>
    );
  }

  // ============================================
  // VARIANT: SOLID (Fixed for Responsive)
  // ============================================
  const initialBg = isLightTheme ? 'bg-[#1a1a1a]' : 'bg-[#C5A059]';
  const initialText = isLightTheme ? 'text-[#FFF2EC]' : 'text-[#1a1a1a]';
  const initialBorder = isLightTheme ? 'border-[#1a1a1a]' : 'border-[#C5A059]';
  const hoverBg = isLightTheme ? 'bg-[#C5A059]' : 'bg-[#FFF2EC]';
  const solidSize = size === 'sm' ? 'px-6 py-3 text-[10px]' : 'px-8 py-4 text-xs';

  return (
    <button 
      type={type}
      onClick={onClick}
      className={`
        group relative ${solidSize} 
        font-mono font-bold uppercase tracking-[0.2em] 
        overflow-hidden transition-all duration-300 
        border ${initialBorder} ${initialBg} ${initialText} 
        max-w-full w-auto h-auto min-h-[3rem]
        ${className}
      `}
    >
      <div className={`absolute inset-0 ${initialBg} group-hover:-translate-y-full transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)`} />
      <div className={`absolute inset-0 ${hoverBg} translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)`} />
      
      <span className={`relative z-10 flex items-center justify-center gap-3 transition-colors duration-500 group-hover:text-[#1a1a1a] flex-wrap text-center`}>
        <span className="whitespace-normal leading-relaxed">{children}</span>
        <ArrowRight className="w-4 h-4 shrink-0" />
      </span>
    </button>
  );
};

export default CTAButton;