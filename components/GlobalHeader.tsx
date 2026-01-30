import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Target, Zap, BarChart3 } from 'lucide-react';
import CTAButton from './CTAButton';

interface GlobalHeaderProps {
  currentView: string;
  onNavigate: (view: string, sectionId?: string) => void;
  scrolled: boolean;
}

const GlobalHeader: React.FC<GlobalHeaderProps> = ({ currentView, onNavigate, scrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isArchHovered, setIsArchHovered] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [isMobileSystemOpen, setIsMobileSystemOpen] = useState(false);

  // --- DATA ---
  const navItems = [
    { id: 'architect', label: 'ABOUT', fullLabel: 'THE ARCHITECT' },
    { id: 'system', label: 'SYSTEM', fullLabel: 'THE SYSTEM', hasDropdown: true },
    { id: 'process', label: 'PROCESS', fullLabel: 'THE PROCESS' },
    { id: 'proof', label: 'PROOF', fullLabel: 'THE PROOF' },
  ];

  const archPillars = [
    { 
      system: 'GET CLIENTS', 
      icon: Target, 
      color: 'text-[#E21E3F]', 
      hoverClass: 'hover:text-[#E21E3F]',
      items: [
        { id: 'pillar1', name: '01 / Websites & E-commerce' },
        { id: 'pillar2', name: '02 / CRM & Lead Tracking' },
        { id: 'pillar3', name: '03 / Automation' }
      ]
    },
    { 
      system: 'SCALE FASTER', 
      icon: Zap, 
      color: 'text-[#C5A059]', 
      hoverClass: 'hover:text-[#C5A059]',
      items: [
        { id: 'pillar4', name: '04 / AI Assistants' },
        { id: 'pillar5', name: '05 / Content Systems' },
        { id: 'pillar6', name: '06 / Team Training' }
      ]
    },
    { 
      system: 'SEE CLEARLY', 
      icon: BarChart3, 
      color: 'text-[#1a1a1a]', 
      hoverClass: 'hover:text-black',
      items: [
        { id: 'pillar7', name: '07 / Dashboards & Reporting' }
      ]
    }
  ];

  return (
    <>
      {/* =======================
          1. TOP NAVIGATION
      ======================== */}
      <AnimatePresence>
        {!scrolled && (
          <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 w-full z-[300] px-6 md:px-12 h-20 md:h-24 flex justify-between items-center bg-transparent pointer-events-none md:pointer-events-auto"
            onMouseLeave={() => { setIsArchHovered(false); setHoveredNav(null); }}
          >
            {/* LOGO */}
            <button 
              onClick={() => onNavigate('homepage')} 
              aria-label="Go to Homepage"
              className="flex items-center gap-3 group z-[310] pointer-events-auto"
            >
              <div className="font-mono text-[10px] font-bold border border-[#1a1a1a] px-1.5 py-0.5 bg-[#1a1a1a] text-[#FFF2EC] transition-colors whitespace-nowrap">
                [FC)
              </div>
              <div className="hidden md:flex items-center h-4 text-[#1a1a1a]">
                 <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap">
                   Felipe
                 </span>
                 <div className="relative h-4 overflow-hidden ml-2 w-[120px]">
                   <span className="absolute inset-0 font-mono text-[10px] font-bold uppercase tracking-[0.2em] flex items-center group-hover:-translate-y-full transition-transform duration-300 whitespace-nowrap">
                     Consultancy
                   </span>
                   <span className="absolute inset-0 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059] flex items-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 whitespace-nowrap">
                     Home
                   </span>
                 </div>
              </div>
            </button>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-4 lg:gap-8 pointer-events-auto">
               {navItems.map((item) => {
                 const isActive = currentView === item.id;
                 const isHovered = hoveredNav === item.id;

                 return (
                   <div 
                     key={item.id}
                     className="relative px-4 py-2"
                     onMouseEnter={() => {
                       setHoveredNav(item.id);
                       if (item.hasDropdown) setIsArchHovered(true);
                       else setIsArchHovered(false);
                     }}
                     onMouseLeave={() => {
                       if (!item.hasDropdown) setHoveredNav(null);
                     }}
                     onFocus={() => {
                       setHoveredNav(item.id);
                       if (item.hasDropdown) setIsArchHovered(true);
                       else setIsArchHovered(false);
                     }}
                     onBlur={(e) => {
                       if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                         setHoveredNav(null);
                         setIsArchHovered(false);
                       }
                     }}
                   >
                     {isHovered && (
                       <motion.div 
                         layoutId="nav-bg"
                         className="absolute inset-0 bg-[#1a1a1a]/5 rounded-sm z-0"
                         transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                       />
                     )}

                     <button 
                       onClick={() => onNavigate(item.id)}
                       className="relative z-10 flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a] whitespace-nowrap"
                     >
                       <span className={`w-1.5 h-1.5 rounded-full bg-[#C5A059] transition-all duration-300 ${isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
                       {item.fullLabel}
                       {item.hasDropdown && (
                         <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isArchHovered ? 'rotate-180' : ''}`} />
                       )}
                     </button>

                     {/* MEGA MENU */}
                     {item.hasDropdown && (
                        <AnimatePresence>
                          {isArchHovered && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10, clipPath: 'inset(0% 0% 100% 0%)' }}
                              animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
                              exit={{ opacity: 0, y: 10, clipPath: 'inset(0% 0% 100% 0%)' }}
                              transition={{ duration: 0.3, ease: 'circOut' }}
                              className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[700px] bg-white border border-[#1a1a1a]/10 shadow-2xl p-8 grid grid-cols-3 gap-8 cursor-default z-[400]"
                            >
                              {archPillars.map((group) => (
                                <div key={group.system} className="space-y-4">
                                  {/* FIX: Changed <h4> to <div> to prevent Accessibility "Skipped Heading Level" Error */}
                                  <div className={`flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] ${group.color} border-b border-black/5 pb-2`}>
                                     <group.icon className="w-3 h-3" /> {group.system}
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    {group.items.map((subItem) => (
                                      <button 
                                        key={subItem.id} 
                                        onClick={(e) => { e.stopPropagation(); onNavigate(subItem.id); setIsArchHovered(false); }}
                                        className={`text-left font-serif text-lg text-[#1a1a1a]/80 hover:pl-2 transition-all duration-200 ${group.hoverClass}`}
                                      >
                                        {subItem.name}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                     )}
                   </div>
                 );
               })}
            </div>

            {/* DESKTOP CTA */}
            <div className="hidden lg:flex items-center pointer-events-auto">
               <CTAButton 
                 theme="light" 
                 onClick={() => onNavigate('contact')}
                 className="py-3 px-6 whitespace-nowrap"
               >
                 [ TALK ]
               </CTAButton>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* =======================
          2. SIDE DOCK (Desktop Scroll)
      ======================== */}
      <AnimatePresence>
        {scrolled && (
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-[20vh] z-[300] hidden lg:flex flex-col bg-[#1a1a1a] border-l border-y border-white/10 rounded-l-lg shadow-2xl overflow-hidden w-[54px]"
            style={{ maxHeight: 'calc(100vh - 20vh - 4rem)' }}
          >
             <button 
               onClick={() => onNavigate('homepage')} 
               aria-label="Go to Homepage"
               className={`p-4 transition-all duration-300 border-b border-white/10 ${
                 currentView === 'homepage' 
                   ? 'bg-[#C5A059] text-[#1a1a1a]' 
                   : 'text-[#FFF2EC] hover:bg-white/5'
               }`}
             >
                <span className="font-mono text-[10px] font-bold whitespace-nowrap">[FC)</span>
             </button>

             <div className="flex flex-col">
                {navItems.map((item) => {
                  const isActive = currentView === item.id;
                  return (
                    <button 
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className={`group relative h-24 w-full flex items-center justify-center transition-all duration-300 border-b border-white/5 ${
                        isActive 
                          ? 'bg-white/10 text-[#C5A059]' 
                          : 'text-[#FFF2EC]/60 hover:text-[#FFF2EC] hover:bg-white/5'
                      }`}
                    >
                       {isActive && <div className="absolute left-1 w-1 h-1 rounded-full bg-[#C5A059]" />}
                       <span className="block -rotate-90 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] font-bold">
                         {item.label}
                       </span>
                    </button>
                  );
                })}
             </div>

             <button 
               onClick={() => onNavigate('contact')}
               className="h-32 w-full bg-[#C5A059] flex items-center justify-center hover:bg-white hover:text-[#1a1a1a] transition-colors duration-300 group"
             >
                <span className="block -rotate-90 whitespace-nowrap font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">
                   [ TALK ]
                </span>
             </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =======================
          3. MOBILE NAVIGATION
      ======================== */}
      <div className={`lg:hidden fixed top-0 w-full z-[310] h-20 flex items-center justify-end px-6 pointer-events-none transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}>
         <div className="flex items-center gap-3 pointer-events-auto">
            <button 
              onClick={() => onNavigate('contact')}
              className={`px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] border border-[#1a1a1a] bg-[#1a1a1a] text-[#FFF2EC] whitespace-nowrap ${scrolled ? 'shadow-lg' : ''}`}
            >
              [ TALK ]
            </button>
            <button 
              onClick={() => setIsMenuOpen(true)} 
              aria-label="Open main menu"
              className={`p-2 bg-white/80 backdrop-blur-md border border-[#1a1a1a]/10 rounded-full text-[#1a1a1a] ${scrolled ? 'shadow-lg' : ''}`}
            >
              <Menu className="w-5 h-5" />
            </button>
         </div>
      </div>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }} 
            animate={{ opacity: 1, x: '0%' }} 
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            style={{ willChange: "transform" }}
            className="fixed inset-0 bg-[#FFF2EC] z-[400] flex flex-col px-8 overflow-y-auto"
          >
             <div className="h-20 w-full flex items-center justify-between shrink-0">
               <button onClick={() => { setIsMenuOpen(false); onNavigate('homepage'); }} aria-label="Go to Homepage">
                  <div className="font-mono text-[10px] font-bold border border-[#1a1a1a] px-1.5 py-0.5 bg-[#1a1a1a] text-[#FFF2EC] whitespace-nowrap">
                    [FC)
                  </div>
               </button>
               <button 
                 onClick={() => setIsMenuOpen(false)} 
                 aria-label="Close menu"
                 className="p-2 text-[#1a1a1a] bg-white rounded-full border border-[#1a1a1a]/10"
               >
                 <X className="w-6 h-6" />
               </button>
             </div>

             <div className="flex flex-col gap-8 flex-grow pt-12">
               {navItems.map((item) => (
                 <div key={item.id} className="flex flex-col">
                   <div className="flex items-center justify-between w-full group">
                     <button 
                       onClick={() => { 
                         onNavigate(item.id); 
                         setIsMenuOpen(false); 
                       }} 
                       className="flex items-center gap-4 text-4xl font-serif text-[#1a1a1a] text-left hover:text-[#C5A059] transition-colors"
                     >
                       {currentView === item.id && <div className="w-2 h-2 rounded-full bg-[#C5A059]" />}
                       {item.fullLabel}
                     </button>

                     {item.hasDropdown && (
                       <button 
                         onClick={() => setIsMobileSystemOpen(!isMobileSystemOpen)}
                         aria-label="Toggle system menu"
                         aria-expanded={isMobileSystemOpen}
                         className="p-2 -mr-2 text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors"
                       >
                         <ChevronDown className={`w-8 h-8 transition-transform duration-300 ${isMobileSystemOpen ? 'rotate-180' : ''}`} />
                       </button>
                     )}
                   </div>

                   {item.hasDropdown && (
                     <AnimatePresence>
                       {isMobileSystemOpen && (
                         <motion.div
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: 'auto', opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           className="overflow-hidden"
                         >
                           <div className="pt-6 pb-2 pl-6 space-y-6 border-l border-[#1a1a1a]/10 ml-2 mt-2">
                             {archPillars.map((group) => (
                               <div key={group.system}>
                                 <span className={`font-mono text-[9px] uppercase tracking-widest font-bold mb-3 block ${group.color}`}>
                                   {group.system}
                                 </span>
                                 <div className="flex flex-col gap-3">
                                   {group.items.map((sub) => (
                                     <button
                                       key={sub.id}
                                       onClick={() => { onNavigate(sub.id); setIsMenuOpen(false); }}
                                       className="text-left font-serif text-lg text-[#1a1a1a]/70 hover:text-[#1a1a1a] active:text-[#C5A059] transition-colors"
                                     >
                                       {sub.name}
                                     </button>
                                   ))}
                                 </div>
                               </div>
                             ))}
                           </div>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   )}
                 </div>
               ))}
               
               <div className="mt-auto w-full flex justify-center pb-8 pt-12">
                 <CTAButton 
                   theme="light" 
                   onClick={() => { onNavigate('contact'); setIsMenuOpen(false); }}
                   className="w-full whitespace-nowrap"
                 >
                   [ LET'S TALK ]
                 </CTAButton>
               </div>
             </div>
             
             <div className="mb-8 border-t border-[#1a1a1a]/10 pt-4 shrink-0">
               <div className="flex justify-between items-center">
                 <span className="font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/40">Response Time</span>
                 <div className="flex items-center gap-2 text-[#C5A059] font-mono text-xs uppercase tracking-widest">
                   <div className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
                   &lt; 24 HRS
                 </div>
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalHeader;