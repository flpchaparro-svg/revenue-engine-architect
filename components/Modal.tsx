import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { ServiceDetail } from '../types';
import ViewportViz from './ViewportViz';

interface ModalProps {
  service: ServiceDetail | null;
  isOpen: boolean;
  onClose: () => void;
  theme?: {
    bg: string;
    text: string;
    accent: string;
    dark: boolean;
  };
}

const Modal: React.FC<ModalProps> = ({ service, isOpen, onClose, theme }) => {
  if (!service) return null;

  // Use the passed theme, or fall back to default dark if missing
  const currentTheme = theme || { 
    bg: 'bg-[#1a1a1a]', 
    text: 'text-white', 
    accent: 'text-[#C5A059]', 
    dark: true 
  };

  const accentColor = currentTheme.dark ? '#C5A059' : '#E21E3F';
  const borderColor = currentTheme.dark ? 'border-[#C5A059]/20' : 'border-black/10';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 pointer-events-none"
          >
            <div 
              className={`pointer-events-auto w-full max-w-6xl max-h-[90vh] rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl border ${borderColor} ${currentTheme.bg}`}
            >
              
              {/* LEFT: VISUALIZATION (Thick Lines) */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative border-b md:border-b-0 md:border-r border-current/10 bg-black/5">
                 <div className="absolute top-6 left-6 z-20">
                    <span className={`font-mono text-xs uppercase tracking-widest opacity-60 ${currentTheme.text}`}>
                      [ {service.subtitle || 'SYSTEM MODULE'} ]
                    </span>
                 </div>
                 
                 {/* FIX: Scale=3 for heavy, visible lines */}
                 <ViewportViz 
                    type={service.visualPrompt} 
                    color={accentColor} 
                    lineWidthScale={3} 
                 />
              </div>

              {/* RIGHT: CONTENT (Original Structure Only) */}
              <div className={`w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto ${currentTheme.text}`}>
                <div className="flex justify-between items-start mb-8">
                   <h2 className="font-serif text-3xl md:text-5xl leading-none tracking-tight">
                     {service.title}
                   </h2>
                   <button onClick={onClose} className="p-2 hover:bg-current/5 rounded-full transition-colors">
                     <X className="w-6 h-6" />
                   </button>
                </div>

                {/* Just the original description, no fake bullets */}
                <div className="space-y-6 flex-1">
                   <p className="font-sans text-lg opacity-80 leading-relaxed">
                     {service.description}
                   </p>
                </div>

                <div className="mt-8 pt-6 border-t border-current/10">
                   <button 
                     onClick={() => window.location.href='/system'}
                     className={`group flex items-center justify-between w-full p-4 border transition-all duration-300
                       ${currentTheme.dark 
                         ? 'border-[#C5A059] hover:bg-[#C5A059] hover:text-black' 
                         : 'border-[#E21E3F] hover:bg-[#E21E3F] hover:text-white'}
                     `}
                   >
                     <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase">
                       View Full System
                     </span>
                     <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                   </button>
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
