"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface Stadium3DProps {
  sport: string;
  windSpeed: number; // 0 to 20 knots
  friction: number; // 0.01 to 0.5
  intensityMultiplier: number;
}

// Sub-component: Weather vectors & grid arena
function EnvironmentTelemetry({ sport, windSpeed, friction, intensityMultiplier }: Stadium3DProps) {
  const particlesRef = useRef<THREE.Points>(null);

  // Generate random particles for atmospheric wind flow
  const particleCount = 180;
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const spd = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      // Box range: x from -3 to 3, y from 0.1 to 3, z from -5 to 5
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = Math.random() * 3 + 0.1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      spd[i] = Math.random() * 0.05 + 0.02;
    }
    return [pos, spd];
  }, []);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;
    const geo = particlesRef.current.geometry;
    const posArr = geo.attributes.position.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      // Particles slide forward along Z-axis mimicking wind direction, pushed sideways by windSpeed
      const windPushX = (windSpeed / 20) * 0.02;
      
      posArr[i * 3 + 2] += speeds[i] * (1 + windSpeed * 0.1); // Move Z forward
      posArr[i * 3] += windPushX; // Drift X

      // Recycle particles when they go out of bounds
      if (posArr[i * 3 + 2] > 5) {
        posArr[i * 3 + 2] = -5;
        posArr[i * 3] = (Math.random() - 0.5) * 6;
        posArr[i * 3 + 1] = Math.random() * 3 + 0.1;
      }
    }
    geo.attributes.position.needsUpdate = true;
  });

  // Calculate release trajectory for Javelin throw or diving jump
  const trajectoryPoints = useMemo(() => {
    const pts = [];
    const gravity = 9.81 * friction * 4; // simulated friction decay
    const velocity = 28 * intensityMultiplier; // Release speed
    const angle = 35 * (Math.PI / 180); // 35 deg angle
    
    // Y position offset
    let t = 0;
    for (let step = 0; step < 40; step++) {
      t = step * 0.035;
      const z = velocity * Math.cos(angle) * t - 2.5; // Start back slightly
      const y = 1.6 + (velocity * Math.sin(angle) * t) - (0.5 * gravity * t * t);
      
      if (y >= 0) {
        pts.push(new THREE.Vector3(0, y, z));
      } else {
        pts.push(new THREE.Vector3(0, 0, z));
        break;
      }
    }
    return pts;
  }, [friction, intensityMultiplier]);

  const trajectoryGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(trajectoryPoints);
  }, [trajectoryPoints]);

  const trajectoryLine = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({ color: "#ff9f0a", transparent: true, opacity: 0.8 });
    return new THREE.Line(trajectoryGeometry, mat);
  }, [trajectoryGeometry]);

  return (
    <group>
      {/* 1. Wireframe Floor (Grid representation of field or pool lanes) */}
      {sport.toLowerCase().includes("swimming") ? (
        // Swimming pool blue lanes representation
        <group>
          {Array.from({ length: 6 }).map((_, idx) => {
            const xOffset = -1.5 + idx * 0.6;
            return (
              <group key={idx}>
                {/* Lane separator line */}
                <gridHelper args={[10, 10, "#0a84ff", "rgba(10, 132, 255, 0.25)"]} position={[xOffset, 0, 0]} rotation={[0, 0, 0]} />
              </group>
            );
          })}
        </group>
      ) : (
        // Athletics track grid lanes
        <group>
          <gridHelper args={[12, 12, "rgba(255, 255, 255, 0.25)", "rgba(255, 255, 255, 0.05)"]} position={[0, 0, 0]} />
          {/* Release Trajectory Path */}
          {sport.toLowerCase().includes("javelin") && trajectoryPoints.length > 0 && (
            <group>
              <primitive object={trajectoryLine} />
              {/* Highlight impact point */}
              <mesh position={trajectoryPoints[trajectoryPoints.length - 1]}>
                <cylinderGeometry args={[0.15, 0, 0.02, 16]} />
                <meshBasicMaterial color="#ff453a" />
              </mesh>
            </group>
          )}
        </group>
      )}

      {/* 2. Atmospheric telemetry particles (Wind vectors) */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#64d2ff" size={0.025} transparent opacity={0.65} />
      </points>
    </group>
  );
}

export default function Stadium3D(props: Stadium3DProps) {
  return (
    <div className="w-full h-full bg-[#0a0a0c] border border-white/[0.04] rounded-2xl relative overflow-hidden flex flex-col justify-between">
      
      {/* Telemetry HUD */}
      <div className="absolute top-4 left-4 z-10 p-3 rounded-lg border border-white/[0.05] bg-black/60 backdrop-blur-md font-sans">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Atmospheric twin telemetry</h4>
        <div className="text-[9px] text-[#f5f5f7] mt-1 space-y-0.5">
          <div className="flex space-x-2">
            <span className="text-slate-500">Active Wind:</span>
            <span className="font-semibold text-white">{props.windSpeed} knots</span>
          </div>
          <div className="flex space-x-2">
            <span className="text-slate-500">Surface Friction:</span>
            <span className="text-[#ff9f0a] font-semibold">{props.friction} μ</span>
          </div>
          <div className="flex space-x-2">
            <span className="text-slate-500">Air Density Index:</span>
            <span className="text-[#30d158]">{(1.225 - (props.windSpeed * 0.003)).toFixed(3)} kg/m³</span>
          </div>
        </div>
      </div>

      <Canvas camera={{ position: [4, 3, 5], fov: 50 }} className="w-full flex-1 cursor-grab active:cursor-grabbing">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        
        <EnvironmentTelemetry {...props} />
        
        <OrbitControls enableZoom={true} minDistance={2} maxDistance={10} enablePan={true} target={[0, 0.5, 0]} />
      </Canvas>

      <div className="p-3 bg-black/40 border-t border-white/[0.04] text-[9px] font-sans text-slate-500 flex justify-between">
        <span>ARENA: VIRTUAL TWIN GRID</span>
        <span>RESOLUTION: DYNAMIC MATRIX</span>
      </div>
    </div>
  );
}
