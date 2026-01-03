
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, CheckCircle2 } from 'lucide-react';

const BookingCTA: React.FC = () => {
  return (
    <section className="w-full bg-[#FFF2EC] text-[#1a1a1a] py-24 px-6 md:px-12 lg:px-20 border-t border-black/10 relative overflow-hidden z-30">
      
      {/* Background Decor (Subtle Grid) - Darkened slightly to be visible on cream */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-50 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
        
        {/* LEFT: THE ARGUMENT (High Contrast Text) */}
        <div className="w-full md:w-1/2">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 bg-[#E21E3F] rounded-full animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E21E3F] font-bold">
              System_Status: Online
            </span>
          </div>
          
          <h2 className="font-serif text-5xl md:text-7xl leading-[0.9] mb-6 tracking-tight text-[#1a1a1a]">
            Logic beats <br />
            <span className="italic text-[#C5A059]">pure luck.</span>
          </h2>
          
          <p className="font-sans text-lg text-[#1a1a1a]/60 leading-relaxed max-w-lg border-l-2 border-[#1a1a1a]/10 pl-6">
            You have seen the evidence. You know the cost of the 'Grind'. There is no strategic benefit to waiting. I accept limited new builds per quarter to maintain surgical standards.
          </p>

          <div className="flex items-center gap-8 mt-8 font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/40">
             <span className="flex items-center gap-2"><Clock className="w-3 h-3 text-[#C5A059]" /> EST_Timeline: 3-4 Weeks</span>
             <span className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-[#C5A059]" /> ROI_Focus: 100%</span>
          </div>
        </div>

        {/* RIGHT: THE ACTION PORTAL (Dark Box) */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="w-full max-w-md bg-[#1a1a1a] p-8 border border-black/10 shadow-2xl relative">
             
             <div className="mb-8 flex justify-between items-end text-[#FFF2EC]">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 block">Current_Intake</span>
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="font-mono text-xl">OPEN_FOR_BUSINESS</span>
                </div>
             </div>
             
             {/* THE HERO-PHYSICS BUTTON */}
             <a 
                href="https://meetings-ap1.hubspot.com/felipe" 
                target="_blank"
                className="group relative flex items-center justify-center w-full py-6 bg-[#C5A059] text-[#1a1a1a] font-mono text-xs uppercase tracking-[0.3em] font-bold overflow-hidden border-none"
              >
                {/* The Cream Overlay that slides UP (Lift Off) on hover */}
                <div className="absolute inset-0 bg-[#FFF2EC] group-hover:-translate-y-full transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                
                <span className="relative z-10 flex items-center gap-4 group-hover:text-[#1a1a1a] transition-colors duration-500">
                  [ INITIATE 15-MIN AUDIT ]
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
             </a>
             
             <p className="text-center mt-4 font-mono text-[9px] text-white/30 uppercase tracking-widest">
                No Sales Pitch. Just Engineering.
             </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BookingCTA;
