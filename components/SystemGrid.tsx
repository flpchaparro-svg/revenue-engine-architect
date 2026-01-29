import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import GridItem from './SystemGridItem';
import { getAllPillars } from '../constants/systemPillars';

// Get merged pillar data once
const ALL_PILLARS = getAllPillars();

interface SystemGridProps {
  onNavigate: (path: string) => void;
}

const SystemGrid: React.FC<SystemGridProps> = ({ onNavigate }) => {
  const [selectedPillarId, setSelectedPillarId] = useState<string | null>(null);
  const gridSectionRef = useRef<HTMLDivElement>(null);

  // --- THE FORMULA ---
  // This calculates the exact width (span) of every card based on which one is active.
  // Goal: Ensure rows always add up to 3 columns so there are no empty slots.
  const getSpan = (currentId: string, selectedId: string | null) => {
    // 1. If this card is the selected one, it takes FULL width.
    if (currentId === selectedId) {
      return 'md:col-span-2 lg:col-span-3';
    }

    // 2. The Last Card (Pillar 7) is ALWAYS full width (unless another logic overrides it, but usually it sits at bottom).
    if (currentId === 'pillar7') {
      return 'md:col-span-2 lg:col-span-3';
    }

    // 3. ROW 1 LOGIC (Pillars 1, 2, 3)
    // If any card in Row 1 is expanded, the remaining two must fill a row (2+1=3).
    if (['pillar1', 'pillar2', 'pillar3'].includes(selectedId || '')) {
      // If 1 is selected -> 2 gets big.
      if (selectedId === 'pillar1' && currentId === 'pillar2') return 'md:col-span-1 lg:col-span-2';
      // If 2 is selected -> 1 gets big.
      if (selectedId === 'pillar2' && currentId === 'pillar1') return 'md:col-span-1 lg:col-span-2';
      // If 3 is selected -> 1 gets big.
      if (selectedId === 'pillar3' && currentId === 'pillar1') return 'md:col-span-1 lg:col-span-2';
    }

    // 4. ROW 2 LOGIC (Pillars 4, 5, 6)
    // This fixes the "Voice/Card 4" Bug.
    // If any card in Row 2 is expanded, the remaining two must fill a row.
    if (['pillar4', 'pillar5', 'pillar6'].includes(selectedId || '')) {
      // If 4 is selected -> 5 gets big.
      if (selectedId === 'pillar4' && currentId === 'pillar5') return 'md:col-span-1 lg:col-span-2';
      // If 5 is selected -> 4 gets big.
      if (selectedId === 'pillar5' && currentId === 'pillar4') return 'md:col-span-1 lg:col-span-2';
      // If 6 is selected -> 4 gets big.
      if (selectedId === 'pillar6' && currentId === 'pillar4') return 'md:col-span-1 lg:col-span-2';
    }

    // Default: Standard 1 column width
    return 'col-span-1';
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
      
      {/* HEADER SECTION */}
      <div className="text-center max-w-2xl mx-auto mb-20 pt-10">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-6 flex items-center justify-center gap-2">
             <div className="w-2 h-2 rounded-sm bg-[#C5A059]" />
             / THE 7 PILLARS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-[#1a1a1a] mb-6">
            Pick What You <span className="italic font-serif text-[#C5A059]">Need.</span>
          </h2>
          <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl mx-auto">
            Click any pillar to see how it works and how it connects to the others.
          </p>
      </div>

      {/* INTERACTIVE GRID */}
      {/* Note: 'grid-flow-dense' is REMOVED to keep cards in logical order (1,2,3,4...) */}
      <motion.div 
        ref={gridSectionRef}
        layout 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[#1a1a1a]/20 bg-[#1a1a1a]/10"
      >
        {ALL_PILLARS.map((pillar) => (
          <motion.div 
            layout
            key={pillar.id}
            className={`
              relative
              ${getSpan(pillar.id, selectedPillarId)}
            `}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          >
            <GridItem 
              pillar={pillar}
              isSelected={selectedPillarId === pillar.id}
              selectedId={selectedPillarId}
              onToggle={() => {
                const newId = selectedPillarId === pillar.id ? null : pillar.id;
                setSelectedPillarId(newId);
              }}
              onNavigate={onNavigate}
            />
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
};

export default SystemGrid;
