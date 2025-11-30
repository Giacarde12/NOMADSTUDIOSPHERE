import { AtmosphereMode, SensoryConfig, NavigationItem } from './types';

// Base visual configuration to keep appearance constant across modes
const BASE_VISUALS = {
  color: '#e2e8f0', // Slate 200 (Silvery White)
  distort: 0.3,
  speed: 1.5,
  roughness: 0.1,
  metalness: 0.8,
};

export const SENSORY_CONFIGS: Record<AtmosphereMode, SensoryConfig> = {
  SILENCE: {
    ...BASE_VISUALS,
    // Ambient Drone
    audioUrl: '/assets/Patrick Sebag - Hours.wav' 
  },
  WIND: {
    ...BASE_VISUALS, // Visuals remain consistent
    // Wind sound
    audioUrl: '/assets/wind.wav'
  },
  OCEAN: {
    ...BASE_VISUALS, // Visuals remain consistent
    // Ocean waves
    audioUrl: '/assets/ocean.wav'
  },
};

// Orbiting "Planets"
export const NAV_ITEMS: NavigationItem[] = [
  { 
    label: 'Creative & Editorial Services', 
    description: 'Design, consulting, and content curations',
    orbitRadius: 3.2, 
    orbitSpeed: 0.1, 
    yOffset: 0.5,
    scale: 0.6
  },
  { 
    label: 'Workshops', 
    description: 'Hands-on creative and editorial labs',
    orbitRadius: 4.5, 
    orbitSpeed: 0.075, 
    yOffset: -1.2,
    scale: 0.7
  },
  { 
    label: 'Raw Pantelleria', 
    description: 'Residency & Retreat',
    orbitRadius: 3.8, 
    orbitSpeed: 0.125, 
    yOffset: 1.5,
    scale: 0.5
  },
  {
    label: 'Educational Programs',
    description: 'Collaborations with schools and universities',
    orbitRadius: 5.2,
    orbitSpeed: 0.05,
    yOffset: 0,
    scale: 0.4
  },
  {
    label: 'Publishing & Product Sales',
    description: 'Limited editions, zines, and art objects',
    orbitRadius: 4.0,
    orbitSpeed: 0.09,
    yOffset: -0.5,
    scale: 0.55
  },
  {
    label: 'Artist & Research Residencies',
    description: 'Temporary labs for publishing experimentation',
    orbitRadius: 3.5,
    orbitSpeed: 0.11,
    yOffset: 2.0,
    scale: 0.6
  }
];

export const MANIFESTO_TEXT = "RAW MATTER\nalive, not yet interpreted.";