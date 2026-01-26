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
      <motion.div 
        ref={gridSectionRef}
        layout 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[#1a1a1a]/20 bg-[#1a1a1a]/10"
      >
        {ALL_PILLARS.map((pillar) => (
          <GridItem 
            key={pillar.id}
            pillar={pillar}
            isSelected={selectedPillarId === pillar.id}
            selectedId={selectedPillarId}
            onToggle={() => {
              const newId = selectedPillarId === pillar.id ? null : pillar.id;
              setSelectedPillarId(newId);
            }}
            onNavigate={onNavigate}
          />
        ))}
      </motion.div>

    </div>
  );
};

export default SystemGrid;
