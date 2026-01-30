import React, { useRef, useEffect, useState } from 'react';

const VideoHUD: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // 1. Only load video when this component is actually visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Load when it's 200px away from view
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // 2. Play only when loaded
    if (shouldLoad && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay prevented (common in browsers), silence error
      });
    }
  }, [shouldLoad]);

  return (
    <div className="relative w-full h-full rounded-sm overflow-hidden bg-black/10">
      {/* SCANLINES OVERLAY */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] bg-repeat" />
      
      {/* VIDEO ELEMENT */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        // CRITICAL: Stop the 2.5MB download on page load
        preload="none" 
        className="w-full h-full object-cover opacity-60 grayscale mix-blend-screen"
        // Only add src if we are ready to load
        src={shouldLoad ? "/videos/revenue-engine-architecture-system-About-video.webm" : undefined}
      >
        {/* Fallback poster or color while loading */}
      </video>

      {/* RETICLE UI (Keep your existing UI) */}
      <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
         <div className="w-2 h-2 bg-[#E21E3F] rounded-full animate-pulse" />
         <span className="font-mono text-[10px] text-[#E21E3F] tracking-widest">LIVE FEED</span>
      </div>
    </div>
  );
};

export default VideoHUD;
