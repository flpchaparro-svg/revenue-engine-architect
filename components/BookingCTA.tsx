import React from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';
import CTAButton from './CTAButton'; // IMPORT

const BookingCTA: React.FC = () => {
  return (
    <section className="w-full bg-[#FFF2EC] text-[#1a1a1a] py-24 px-6 md:px-12 lg:px-20 border-t border-black/10 relative overflow-hidden z-30">
      
      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
        
        {/* LEFT: TEXT */}
        <div className="w-full md:w-1/2">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 bg-[#C5A059] rounded-full animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#7A5D12]">
              Now Accepting Projects
            </span>
          </div>
          
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.9] mb-6 tracking-tight text-[#1a1a1a]">
            Ready to stop <br />
            <span className="italic text-[#9A1730]">the grind?</span>
          </h2>
          
          <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/80 border-l-2 border-[#1a1a1a]/10 pl-6 max-w-lg">
            You've seen how it works. You know what the chaos is costing you. I take on a limited number of projects each quarter so every build gets my full attention.
          </p>

          <div className="flex items-center gap-8 mt-8 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/70">
             <span className="flex items-center gap-2"><Clock className="w-3 h-3 text-[#8B6914]" /> Timeline: 3-4 Weeks</span>
             <span className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-[#8B6914]" /> Focus: Results Only</span>
          </div>
        </div>

        {/* RIGHT: DARK ACTION BOX */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="w-full max-w-md bg-[#1a1a1a] p-8 border border-black/10 shadow-2xl relative">
             
             <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-2 md:gap-0 text-[#FFF2EC]">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/70 block">Availability</span>
                <div className="flex items-center gap-2">
                    {/* Gold Pulse Status */}
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A059]"></span>
                    </span>
                    <span className="font-mono text-xl">TAKING PROJECTS</span>
                </div>
             </div>
             
             {/* STANDARDIZED BUTTON (Dark Theme) */}
             <div className="w-full">
                <CTAButton 
                  theme="dark" 
                  onClick={() => window.open("https://meetings-ap1.hubspot.com/felipe", "_blank")}
                  className="w-full"
                >
                  [ BOOK A 15-MIN CALL ]
                </CTAButton>
             </div>
             
             <p className="text-center mt-4 font-mono text-xs font-bold text-white/60 uppercase tracking-[0.2em]">
                No sales pitch. Just a conversation about your system.
             </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BookingCTA;