import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Activity, Terminal, Target, Zap, BarChart3, Shield } from 'lucide-react';

interface GlobalFooterProps {
  onNavigate: (view: string, sectionId?: string) => void;
}

const GlobalFooter: React.FC<GlobalFooterProps> = ({ onNavigate }) => {
  
  const systems = [
    {
      label: 'GET CLIENTS',
      icon: Target,
      color: 'text-[#E21E3F]',
      links: [
        { name: '01 // Websites & E-commerce', id: 'pillar1' },
        { name: '02 // CRM & Lead Tracking', id: 'pillar2' },
        { name: '03 // Automation', id: 'pillar3' }
      ]
    },
    {
      label: 'SCALE FASTER',
      icon: Zap,
      color: 'text-[#C5A059]',
      links: [
        { name: '04 // AI Assistants', id: 'pillar4' },
        { name: '05 // Content Systems', id: 'pillar5' },
        { name: '06 // Team Training', id: 'pillar6' }
      ]
    },
    {
      label: 'SEE CLEARLY',
      icon: BarChart3,
      color: 'text-[#1a1a1a]',
      links: [
        { name: '07 // Dashboards & Reporting', id: 'pillar7' }
      ]
    }
  ];

  return (
    <footer id="footer" className="w-full bg-[#1a1a1a] text-[#FFF2EC] border-t border-white/10 relative z-50 pt-24 pb-12 px-6 md:px-12 lg:px-20 overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* TOP ROW: HEADLINE & CTA */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
               <span className="w-2 h-2 bg-[#E21E3F] rounded-full animate-pulse" />
               <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E21E3F] font-bold">
                 Let's Talk
               </span>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl leading-[0.9] tracking-tighter">
              Ready to fix <br />
              <span className="italic text-white/30">the chaos?</span>
            </h2>
          </div>
          
          <div className="flex flex-col items-end gap-6 self-start lg:self-end">
             {/* HERO PHYSICS BUTTON (INVERTED FOR DARK MODE) */}
             <button 
                onClick={() => onNavigate('contact')}
                className="group relative flex items-center justify-center px-8 py-6 bg-transparent border border-white/20 text-[#FFF2EC] font-mono text-xs uppercase tracking-[0.3em] font-bold overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-[#FFF2EC] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                <span className="relative z-10 flex items-center gap-4 group-hover:text-[#1a1a1a] transition-colors duration-500">
                  [ BOOK A CALL ]
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
             </button>
             <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">
               Response Time: &lt;24hrs
             </span>
          </div>
        </div>

        {/* MIDDLE ROW: SYSTEM DIRECTORY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-16 mb-24">
          {systems.map((sys) => (
            <div key={sys.label} className="flex flex-col gap-6">
              <div className={`flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.3em] ${sys.color}`}>
                <sys.icon className="w-3 h-3" /> {sys.label}
              </div>
              <div className="flex flex-col gap-4">
                {sys.links.map((link) => (
                  <button 
                    key={link.id}
                    onClick={() => onNavigate(link.id)}
                    className="text-left font-mono text-[10px] text-white/40 uppercase tracking-[0.2em] hover:text-[#C5A059] hover:pl-2 transition-all duration-300"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM ROW: METADATA */}
        <div className="flex flex-col md:flex-row justify-between items-end pt-12 border-t border-white/5 opacity-40">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[9px] text-white uppercase tracking-[0.4em] font-bold">[FC) Felipe Consultancy</span>
            <span className="font-mono text-[9px] text-white/60 uppercase tracking-[0.4em]">Engineered in Sydney</span>
          </div>
          
          <div className="flex gap-8 font-mono text-[9px] text-white/60 uppercase tracking-[0.4em] mt-8 md:mt-0">
              <span className="flex items-center gap-2"><Globe className="w-3 h-3"/> Sydney, Australia</span>
              <span className="flex items-center gap-2"><Terminal className="w-3 h-3"/> v5.4.0</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default GlobalFooter;