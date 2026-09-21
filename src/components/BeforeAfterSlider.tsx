import React, { useState, useRef } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export default function BeforeAfterSlider({ beforeImage, afterImage }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    let clientX = 0;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = (e as React.MouseEvent).clientX;
    }
    
    let pos = ((clientX - left) / width) * 100;
    pos = Math.max(0, Math.min(pos, 100));
    setPosition(pos);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[320px] sm:h-[450px] md:h-[580px] overflow-hidden select-none group border border-[#D4AF37]/30 rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(212,175,55,0.1)] cursor-ew-resize touch-none"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* Before Image (Background) */}
      <div className="absolute inset-0">
        <img src={beforeImage} alt="Antes do Procedimento" className="w-full h-full object-cover" draggable={false} />
      </div>
      
      {/* After Image (Clipped Foreground) */}
      <div 
        className="absolute inset-0 border-r-2 border-[#D4AF37]"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img src={afterImage} alt="Depois do Procedimento" className="w-full h-full object-cover" draggable={false} />
      </div>
      
      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#D4AF37] via-amber-200 to-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.8)] -ml-px"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-stone-950/90 border border-[#D4AF37] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] backdrop-blur-md">
          <div className="flex gap-1">
            <div className="w-0.5 h-3 sm:h-3.5 bg-[#D4AF37] rounded-full"></div>
            <div className="w-0.5 h-3 sm:h-3.5 bg-[#D4AF37] rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute top-3.5 sm:top-6 left-3.5 sm:left-6 px-3 sm:px-4 py-1.5 sm:py-2 bg-black/70 backdrop-blur-md border border-white/10 rounded-full font-mono text-[9px] sm:text-[10px] uppercase text-stone-200 tracking-wider sm:tracking-widest pointer-events-none shadow-lg">
        Antes
      </div>
      <div className="absolute top-3.5 sm:top-6 right-3.5 sm:right-6 px-3 sm:px-4 py-1.5 sm:py-2 bg-black/70 backdrop-blur-md border border-[#D4AF37]/40 rounded-full font-mono text-[9px] sm:text-[10px] uppercase text-[#D4AF37] tracking-wider sm:tracking-widest pointer-events-none shadow-lg">
        Depois ✨
      </div>
    </div>
  );
}
