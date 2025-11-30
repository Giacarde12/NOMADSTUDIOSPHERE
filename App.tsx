import React, { useState, Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload, Environment, ContactShadows } from '@react-three/drei';

import { AtmosphereMode } from './types';
import { SENSORY_CONFIGS } from './constants';
import BubbleSystem from './components/ResonantSphere';
import SensoryDock from './components/SensoryDock';
import HUD from './components/HUD';
import Cursor from './components/Cursor';
import PageModal from './components/PageModal';

const App: React.FC = () => {
  const [mode, setMode] = useState<AtmosphereMode>('SILENCE');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [volume, setVolume] = useState(0.3);
  const [started, setStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [openPage, setOpenPage] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Track time positions for each audio track
  const trackTimesRef = useRef<Record<AtmosphereMode, number>>({
    SILENCE: 0,
    WIND: 0,
    OCEAN: 0
  });

  // Initialize Audio Object
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    audioRef.current.volume = 0;

    return () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, []);

  // Audio Management Engine
  useEffect(() => {
    const config = SENSORY_CONFIGS[mode];
    const audio = audioRef.current;
    
    if (!audio) return;

    // Function to manage volume fading
    const fadeTo = (targetVol: number, onComplete?: () => void) => {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        
        fadeIntervalRef.current = setInterval(() => {
            if (!audio) return;
            
            const diff = targetVol - audio.volume;
            if (Math.abs(diff) < 0.05) {
                audio.volume = targetVol;
                if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
                fadeIntervalRef.current = null;
                onComplete?.();
            } else {
                audio.volume += diff > 0 ? 0.05 : -0.05;
            }
        }, 50);
    };

    if (!started) {
        // Just update source if not started, don't play
        if (audio.src !== config.audioUrl) {
            audio.src = config.audioUrl;
        }
        return;
    }

    // If started, manage transition: Fade Out -> Switch -> Play -> Fade In
    // If same track is already playing, just adjust volume
    if (audio.src === config.audioUrl && !audio.paused) {
        fadeTo(volume);
    } else {
        // Different track: save current time, fade out, switch, restore time, fade in
        fadeTo(0, () => {
            audio.src = config.audioUrl;
            // Restore the saved time position for this track
            audio.currentTime = trackTimesRef.current[mode] || 0;
            audio.play()
                .then(() => fadeTo(volume))
                .catch(e => console.warn("Audio play interrupted", e));
        });
    }

    return () => {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, [mode, started]);

  // Update track time when audio is playing
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !started) return;

    const updateTrackTime = setInterval(() => {
      if (audio && !audio.paused) {
        trackTimesRef.current[mode] = audio.currentTime;
      }
    }, 100);

    return () => clearInterval(updateTrackTime);
  }, [mode, started]);

  // Handle volume changes without restarting audio
  useEffect(() => {
    if (audioRef.current && started) {
        audioRef.current.volume = volume;
    }
  }, [volume, started]);

  const handleStart = () => {
      if (!started && audioRef.current) {
          setStarted(true);
          // logic inside useEffect will pick up 'started' change and trigger playback
      }
  };

  return (
    <div 
        className="w-full h-screen bg-white relative overflow-hidden selection:bg-black selection:text-white"
        onClick={() => {
          if (!started) {
            handleStart();
          }
        }}
    >
      <div className="grain-overlay" />
      <Cursor />
      
      <HUD volume={volume} setVolume={setVolume} audioRef={audioRef} isMuted={isMuted} setIsMuted={setIsMuted} setOpenPage={setOpenPage} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <SensoryDock currentMode={mode} setMode={setMode} audioRef={audioRef} started={started} />
      <PageModal isOpen={!!openPage} pageName={openPage} onClose={() => setOpenPage(null)} />

      {/* Start Overlay */}
      {!started && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm transition-opacity duration-700 pointer-events-none">
              <p className="text-black text-xs tracking-[0.3em] animate-pulse">CLICK TO START THE EXPERIENCE.</p>
          </div>
      )}

      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 35 }}
          dpr={[1, 2]}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          <color attach="background" args={['#ffffff']} />
          <fog attach="fog" args={['#ffffff', 10, 25]} />
          
          {/* Lighting for Bubbles */}
          <ambientLight intensity={0.8} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={4} />
          <pointLight position={[-10, -10, -10]} intensity={0.9} />

          {/* Environment for reflections (Crucial for bubbles) */}
          <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/kloppenheim_07_puresky_4k.hdr" background={false} />

          <Suspense fallback={null}>
            <BubbleSystem mode={mode} onBubbleClick={setOpenPage} menuOpen={menuOpen} started={started} />
            
            <ContactShadows 
                position={[0, -4, 0]} 
                opacity={0.4} 
                scale={20} 
                blur={1} 
                far={4.5} 
                color="#000000"
            />
            
            <Preload all />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default App;