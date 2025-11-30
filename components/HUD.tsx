
import React, { useEffect, useState } from 'react';
import { Coordinates } from '../types';

interface HUDProps {
  volume?: number;
  setVolume?: (volume: number) => void;
  audioRef?: React.MutableRefObject<HTMLAudioElement | null>;
  isMuted?: boolean;
  setIsMuted?: (muted: boolean) => void;
  setOpenPage?: (page: string | null) => void;
  menuOpen?: boolean;
  setMenuOpen?: (open: boolean) => void;
}

const HUD: React.FC<HUDProps> = ({ volume = 0.3, setVolume, audioRef, isMuted = false, setIsMuted, setOpenPage, menuOpen = false, setMenuOpen }) => {
  const [coords, setCoords] = useState<Coordinates>({ lat: 36.7843, lng: 11.9832, sys: 'STABLE' });
  
  const menuItems = ['Cinema', 'Exhibitions', 'Raw Pantelleria', 'Journal'];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Simulate coordinate changes based on mouse interaction
      const latOffset = (e.clientY / window.innerHeight) * 0.01;
      const lngOffset = (e.clientX / window.innerWidth) * 0.01;
      
      setCoords(prev => ({
        lat: 36.7843 + latOffset,
        lng: 11.9832 + lngOffset,
        sys: e.movementX > 5 || e.movementY > 5 ? 'RESONATING' : 'STABLE'
      }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume?.(newVolume);
    if (audioRef?.current) {
      audioRef.current.volume = isMuted ? 0 : newVolume;
    }
  };

  const handleMuteToggle = () => {
    setIsMuted?.(!isMuted);
    if (audioRef?.current) {
      audioRef.current.volume = isMuted ? volume ?? 0.3 : 0;
    }
  };

  return (
    <>
      {/* Header Bar / Logo */}
      <div className="absolute top-0 left-0 w-full p-8 z-40 flex justify-between items-start">
        <div className="w-5 md:w-7">
          <img 
            src="https://static.wixstatic.com/media/2e0b3c_43a62993021449fb8a1767ba83372cac~mv2.png" 
            alt="Nomad Studio" 
            className="w-full h-auto object-contain"
          />
        </div>
        
        {/* Menu Lines - Now Functional */}
        <button 
          onClick={() => setMenuOpen?.(!menuOpen)}
          className="flex flex-col gap-1.5 items-end w-8 cursor-pointer group relative"
        >
            <div className="w-full h-[1px] bg-black/80 transition-all group-hover:w-1/2"></div>
            <div className="w-3/4 h-[1px] bg-black/80 transition-all group-hover:w-full"></div>
            <div className="w-1/2 h-[1px] bg-black/80 transition-all group-hover:w-3/4"></div>
            
            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute top-12 right-0 z-50 min-w-max animate-in fade-in slide-in-from-top-2 duration-200">
                {menuItems.map((item, index) => (
                  <button
                    key={item}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenPage?.(item);
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-xs font-light text-black hover:opacity-60 transition-opacity"
                    style={{
                      animation: `fadeInUp 0.3s ease-out ${index * 0.05}s both`
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
        </button>
      </div>

      {/* Bottom Left Coordinates */}
      <div className="absolute bottom-8 left-8 z-40 font-mono text-[10px] text-black/60 flex flex-col gap-1">
        <div className="flex gap-4">
            <p>LAT {coords.lat.toFixed(4)}° N</p>
            <p>LNG {coords.lng.toFixed(4)}° E</p>
        </div>
        <div className="flex items-center gap-2 mt-2">
            <div className={`w-1.5 h-1.5 rounded-full ${coords.sys === 'RESONATING' ? 'bg-emerald-500 animate-pulse' : 'bg-black/30'}`}></div>
            <p className="text-black/40 tracking-widest">SYS.{coords.sys}</p>
        </div>
      </div>

      {/* Decorative Lines */}
      <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-black/20 z-30"></div>
      <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-black/20 z-30"></div>
      
      {/* Volume Slider with Mute Button */}
      <div className="absolute bottom-8 right-16 z-40 flex items-center gap-3">
        <button
          onClick={handleMuteToggle}
          className="text-[9px] font-light text-black transition-opacity hover:opacity-60 tracking-wider"
          title={isMuted ? "Unmute" : "Mute"}
        >
          V - {isMuted ? 'off' : 'on'}
        </button>
        <span className="text-[10px] text-black/60 tracking-widest font-mono">VOL</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 h-1 bg-black/10 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #000 0%, #000 ${volume * 100}%, #e5e5e5 ${volume * 100}%, #e5e5e5 100%)`
          }}
        />
      </div>
      
      {/* Center Crosshair - very subtle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-black/[0.03] rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-black/[0.02] rounded-full pointer-events-none z-0"></div>
    </>
  );
};

export default HUD;
