import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ArchitecturePageVisuals from './ArchitecturePageVisuals';

const TheArchitect: React.FC = () => {
  return (
    <section id="about" className="relative min-h-screen flex flex-col lg:flex-row bg-[#FFF2EC] overflow-hidden">

      {/* LEFT COLUMN: Image & Visuals */}
      <div className="w-full lg:w-1/2 relative h-[50vh] lg:h-auto border-b lg:border-b-0 lg:border-r border-[#1a1a1a]/10">
        <div className="absolute inset-0 bg-[#1a1a1a]">
           <ArchitecturePageVisuals />

           <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-60" />

           <div className="absolute bottom-8 left-8 z-10">
              <div className="flex items-center gap-3 mb-2">
                 <div className="w-8 h-[1px] bg-[#C5A059]" />
                 <span className="font-mono text-[10px] font-bold text-[#C5A059] tracking-[0.2em] uppercase">
                    The Operator
                 </span>
              </div>
              <h2 className="font-serif text-3xl text-white">
                 Felipe Chaparro
              </h2>
           </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 relative z-10">

         <div className="mb-12">
            <span className="font-mono text-[10px] font-bold text-[#1a1a1a]/40 tracking-[0.2em] uppercase mb-6 block">
               / Background
            </span>
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1a1a1a] leading-[1.1] mb-8">
               I don't just build systems. <br />
               <span className="text-[#C5A059] italic">I run them.</span>
            </h3>
            <div className="w-12 h-1 bg-[#1a1a1a] mb-8" />

            <div className="space-y-6 text-[#1a1a1a]/70 font-sans text-lg font-light leading-relaxed">
               <p>
                  Most "consultants" have never managed a P&L. They sell theory.
               </p>
               <p>
                  I come from the operations floor. I've managed teams, built logistics networks, and scaled revenue engines for real businesses in Sydney.
               </p>
               <p>
                  I learned that a pretty website is useless if the backend is chaos. That's why I became a <strong>Revenue Engine Architect</strong>. I bridge the gap between "looking good" and "working flawlessly."
               </p>
            </div>
         </div>

         {/* Credentials Grid */}
         <div className="grid grid-cols-2 gap-x-8 gap-y-12 border-t border-[#1a1a1a]/10 pt-12">
            <div>
               {/* FIX: Changed h4 to div to prevent accessibility error (skipped heading level) */}
               <div className="font-mono text-[10px] font-bold text-[#1a1a1a]/40 tracking-[0.2em] uppercase mb-2">
                  Focus
               </div>
               <p className="font-serif text-xl text-[#1a1a1a]">
                  System Architecture
               </p>
            </div>
            <div>
               {/* FIX: Changed h4 to div */}
               <div className="font-mono text-[10px] font-bold text-[#1a1a1a]/40 tracking-[0.2em] uppercase mb-2">
                  Location
               </div>
               <p className="font-serif text-xl text-[#1a1a1a]">
                  Sydney, Australia
               </p>
            </div>
         </div>

         {/* LinkedIn CTA */}
         <div className="mt-16">
            <div className="flex items-center gap-4 group cursor-pointer">
               <a
                 href="https://www.linkedin.com/in/felipe-chaparro-97a390176/"
                 target="_blank"
                 rel="noopener noreferrer"
                 aria-label="Visit Felipe Chaparro's LinkedIn Profile"
                 className="group/arrow flex items-center justify-center w-14 h-14 border border-[#1a1a1a]/20 rounded-full hover:bg-[#1a1a1a] hover:border-[#1a1a1a] transition-all duration-300"
               >
                  <ArrowUpRight className="w-5 h-5 text-[#1a1a1a] group-hover/arrow:text-white transition-colors" />
               </a>
               <div>
                  <div className="font-mono text-[10px] font-bold text-[#1a1a1a]/40 tracking-[0.2em] uppercase mb-1">
                     Connect
                  </div>
                  <a
                    href="https://www.linkedin.com/in/felipe-chaparro-97a390176/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-lg text-[#1a1a1a] group-hover:text-[#C5A059] transition-colors"
                  >
                     View LinkedIn Profile
                  </a>
               </div>
            </div>
         </div>

      </div>
    </section>
  );
};

export default TheArchitect;