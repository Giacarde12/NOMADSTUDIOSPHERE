import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, MeshDistortMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { SENSORY_CONFIGS, NAV_ITEMS, MANIFESTO_TEXT } from '../constants';
import { AtmosphereMode } from '../types';

interface BubbleSystemProps {
  mode: AtmosphereMode;
  onBubbleClick?: (itemName: string) => void;
  menuOpen?: boolean;
  started?: boolean;
}

const BubbleSystem: React.FC<BubbleSystemProps> = ({ mode, onBubbleClick, menuOpen, started }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  return (
    <group ref={groupRef}>
        {/* Central Manifesto Bubble */}
        <CentralBubble mode={mode} onBubbleClick={onBubbleClick} started={started} />
        
        {/* Orbiting Categories */}
        <SolarSystem mode={mode} onBubbleClick={onBubbleClick} menuOpen={menuOpen} started={started} />
    </group>
  );
};

const CentralBubble: React.FC<{ mode: AtmosphereMode; onBubbleClick?: (itemName: string) => void; started?: boolean }> = ({ mode, onBubbleClick, started }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const distortRef = useRef(0);
    const speedRef = useRef(0);
    const { mouse, viewport } = useThree();
    
    const config = SENSORY_CONFIGS[mode];
    
    useFrame((state) => {
        if (meshRef.current) {
            // Mouse influence
            const x = (mouse.x * viewport.width) / 2;
            const y = (mouse.y * viewport.height) / 2;
            
            // Look gently at mouse
            meshRef.current.lookAt(x, y, 5);
            
            // Pulse scale
            const breath = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
            const targetScale = hovered ? 2.1 : 2.0;
            // Smooth lerp for scale
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale + breath, targetScale + breath, targetScale + breath), 0.02);
            
            // Update material
            if (meshRef.current.material instanceof THREE.Material && 'distort' in meshRef.current.material) {
                (meshRef.current.material as any).distort = distortRef.current;
                (meshRef.current.material as any).speed = speedRef.current;
            }
        }
    });

    const handleClick = () => {
        if (started) {
            onBubbleClick?.('Manifesto');
        }
    };

    return (
        <group>
            <mesh 
                ref={meshRef} 
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={handleClick}
            >
                <sphereGeometry args={[1, 64, 64]} />
                <MeshDistortMaterial
                    color={config.color}
                    envMapIntensity={1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    metalness={config.metalness}
                    roughness={config.roughness}
                    distort={distortRef.current}
                    speed={speedRef.current}
                    transparent
                    opacity={0.6}
                    transmission={0.5}
                    toneMapped={false}
                />
            </mesh>
            
            {/* Floating Manifesto Text - Front Layer */}
            <group position={[0, 0, 3.5]}>
                 <Text
                    color="black"
                    fontSize={0.12}
                    maxWidth={2}
                    lineHeight={1.4}
                    font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                    textAlign="center"
                    anchorX="center"
                    anchorY="middle"
                    fillOpacity={0.8}
                    // Prevent script error from troika-three-text worker
                    onSync={() => {}} 
                 >
                    {MANIFESTO_TEXT}
                 </Text>
            </group>
        </group>
    );
};

const SolarSystem: React.FC<{ mode: AtmosphereMode; onBubbleClick?: (itemName: string) => void; menuOpen?: boolean; started?: boolean }> = ({ mode, onBubbleClick, menuOpen, started }) => {
    const groupRef = useRef<THREE.Group>(null);
    const config = SENSORY_CONFIGS[mode];

    useFrame((state) => {
        if (groupRef.current) {
            // Rotate entire system slowly
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {NAV_ITEMS.map((item, i) => (
                <OrbitingBubble 
                    key={i} 
                    item={item} 
                    config={config}
                    index={i}
                    onBubbleClick={onBubbleClick}
                    menuOpen={menuOpen}
                    started={started}
                />
            ))}
        </group>
    );
};

const OrbitingBubble: React.FC<{ 
    item: typeof NAV_ITEMS[0]; 
    config: typeof SENSORY_CONFIGS['SILENCE']; 
    index: number;
    onBubbleClick?: (itemName: string) => void;
    menuOpen?: boolean;
    started?: boolean;
}> = ({ item, config, index, onBubbleClick, menuOpen, started }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const containerRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);
    const distortRef = useRef(0.3);
    
    // Load texture for Raw Pantelleria bubble
    const texturePath = item.label === 'Raw Pantelleria' 
        ? '/assets/photos/claudio-schwarz-Zlxs7gEM-Ic-unsplash.jpg'
        : null;
    
    let texture = null;
    try {
        if (texturePath) {
            texture = useTexture(texturePath);
        }
    } catch (e) {
        // Texture load failed, will use color instead
    }
    
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        
        if (containerRef.current) {
            // Orbital mechanics
            const angle = t * item.orbitSpeed + (index * (Math.PI * 2) / NAV_ITEMS.length);
            const x = Math.cos(angle) * item.orbitRadius;
            const z = Math.sin(angle) * item.orbitRadius;
            
            containerRef.current.position.set(x, item.yOffset + Math.sin(t * 0.3 + index) * 0.5, z);
        }
        
        // Smooth distort transition
        const targetDistort = hovered ? 0.8 : 0.3;
        distortRef.current += (targetDistort - distortRef.current) * 0.1;
        
        if (meshRef.current?.material && 'distort' in meshRef.current.material) {
            (meshRef.current.material as any).distort = distortRef.current;
        }
    });

    const handleClick = () => {
        if (started && !menuOpen) {
            onBubbleClick?.(item.label);
        }
    };

    return (
        <group ref={containerRef}>
            <mesh 
                ref={meshRef}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={handleClick}
            >
                <sphereGeometry args={[item.scale, 32, 32]} />
                <MeshDistortMaterial
                    map={texture}
                    color={texture ? '#ffffff' : config.color}
                    speed={config.speed}
                    distort={distortRef.current}
                    roughness={0.2}
                    metalness={0.5}
                    transparent
                    opacity={0.8}
                    transmission={0.2}
                />
            </mesh>
            
            {/* Label - now only shows label with opacity on hover */}
            <group position={[0, item.scale + 0.2, 0]}>
                 <BillboardText label={item.label} hovered={hovered} />
            </group>
        </group>
    );
};

const BillboardText: React.FC<{ label: string; hovered: boolean }> = ({ label, hovered }) => {
    const ref = useRef<THREE.Group>(null);
    
    useFrame(({ camera }) => {
        if(ref.current) {
            ref.current.lookAt(camera.position);
        }
    })

    return (
        <group ref={ref}>
            <Text
                color="black"
                fontSize={0.18}
                anchorX="center"
                anchorY="middle"
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                fillOpacity={0.8}
                onSync={() => {}}
            >
                {label}
            </Text>
        </group>
    )
}

export default BubbleSystem;