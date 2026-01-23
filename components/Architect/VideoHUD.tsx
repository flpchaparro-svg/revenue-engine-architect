import React from 'react';
import { Scan } from 'lucide-react';

const VideoHUD: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none z-20 p-4 md:p-6 flex flex-col justify-between">
    {/* TOP BAR */}
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-1">
         <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-sm w-fit">
            <div className="w-1.5 h-1.5 bg-red-500 animate-pulse rounded-full" />
            <span className="font-mono text-[10px] text-white/90 tracking-widest">REC</span>
         </div>
      </div>
      <Scan className="w-5 h-5 text-white/60" />
    </div>
    
    {/* CENTER TARGET */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 border border-white/10 rounded-full flex items-center justify-center opacity-50">
       <div className="w-1 h-1 bg-white/50 rounded-full" />
    </div>

    {/* BOTTOM DATA */}
    <div className="flex justify-between items-end">
      <div className="space-y-1 font-mono text-[10px] text-white/60 tracking-widest">
         <div>ISO: 800</div>
         <div>FPS: 60</div>
      </div>
      <div className="border border-white/20 px-2 py-1 bg-black/20 backdrop-blur-sm">
         <span className="font-mono text-[10px] text-[#E21E3F] tracking-widest uppercase font-bold">System Active</span>
      </div>
    </div>
  </div>
);

export default VideoHUD;
