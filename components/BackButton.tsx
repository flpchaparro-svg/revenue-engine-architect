import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  label?: string; // Default: "Return Home"
  onClick: () => void;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ 
  label = "Return Home", 
  onClick, 
  className = "" 
}) => {
  return (
    <button 
      onClick={onClick}
      className={`group flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/80 hover:text-[#8B6914] transition-colors ${className}`}
    >
      {/* Arrow moves slightly left on hover */}
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
      <span className="relative top-[1px]">/ {label}</span>
    </button>
  );
};

export default BackButton;
