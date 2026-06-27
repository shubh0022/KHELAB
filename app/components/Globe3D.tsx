"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { countriesData } from "../../data/countries";
import { calculateCountrySPI } from "../../utils/spi";

// Coordinates mapping for countries with Apple Premium Color Scheme
const COUNTRY_COORDS: { [key: string]: { lat: number; lon: number; color: string } } = {
  USA: { lat: 37.0902, lon: -95.7129, color: "#0a84ff" }, // Apple Blue
  CHN: { lat: 35.8617, lon: 104.1954, color: "#ff453a" }, // Apple Red
  IND: { lat: 20.5937, lon: 78.9629, color: "#ff9f0a" }, // Apple Orange
  GBR: { lat: 55.3781, lon: -3.4360, color: "#bf5af2" }, // Apple Purple
  FRA: { lat: 46.2276, lon: 2.2137, color: "#64d2ff" }, // Apple Teal
  KEN: { lat: -0.0236, lon: 37.9062, color: "#ff3b30" }, // Apple Dark Red
  JAM: { lat: 18.1096, lon: -77.2975, color: "#30d158" }, // Apple Green
  AUS: { lat: -25.2744, lon: 133.7751, color: "#ffd60a" } // Apple Yellow
};

// Convert Lat/Lon to 3D Cartesian coordinates on a sphere
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.sin(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.cos(theta);

  return new THREE.Vector3(x, y, z);
}

// Procedural Globe Texture Generator - Apple Minimalist Dark Style
function createGlobeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Background - space gray
  ctx.fillStyle = "#121214";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw grid pattern (meridians and parallels)
  ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
  ctx.lineWidth = 1;
  const numGridLines = 36;
  for (let i = 0; i <= numGridLines; i++) {
    const x = (canvas.width / numGridLines) * i;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  const numParallelLines = 18;
  for (let i = 0; i <= numParallelLines; i++) {
    const y = (canvas.height / numParallelLines) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Draw simple stylized outlines of continental landmasses - soft translucent silver
  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  ctx.shadowColor = "rgba(255, 255, 255, 0.05)";
  ctx.shadowBlur = 6;
  
  // North America
  ctx.beginPath();
  ctx.arc(260, 160, 70, 0, Math.PI * 2);
  ctx.fill();

  // South America
  ctx.beginPath();
  ctx.arc(340, 320, 50, 0, Math.PI * 2);
  ctx.fill();

  // Eurasia
  ctx.beginPath();
  ctx.arc(680, 140, 90, 0, Math.PI * 2);
  ctx.fill();

  // Africa
  ctx.beginPath();
  ctx.arc(550, 260, 60, 0, Math.PI * 2);
  ctx.fill();

  // Australia
  ctx.beginPath();
  ctx.arc(880, 340, 40, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Sub-component: The Globe Sphere itself
function EarthSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    setTexture(createGlobeTexture());
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.035; // Gentle rotation
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.5, 64, 64]} />
      {texture ? (
        <meshStandardMaterial
          map={texture}
          roughness={0.7}
          metalness={0.2}
          bumpScale={0.05}
        />
      ) : (
        <meshStandardMaterial color="#121214" wireframe />
      )}
    </mesh>
  );
}

// Sub-component: Particle gliding on the bezier arc
function FlowParticle({ curve, color, delay }: { curve: THREE.QuadraticBezierCurve3; color: string; delay: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const speed = 0.25;
    const t = ((state.clock.getElapsedTime() * speed) + delay) % 1;
    const pos = curve.getPointAt(t);
    ref.current.position.copy(pos);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.032, 8, 8]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}

// Sub-component: Glowing pins and curves showing flows
interface FlowArcProps {
  from: string;
  to: string;
  color: string;
}

function FlowArc({ from, to, color }: FlowArcProps) {
  const fromCoords = COUNTRY_COORDS[from];
  const toCoords = COUNTRY_COORDS[to];
  if (!fromCoords || !toCoords) return null;

  const start = latLonToVector3(fromCoords.lat, fromCoords.lon, 2.5);
  const end = latLonToVector3(toCoords.lat, toCoords.lon, 2.5);

  // Compute mid point slightly extruded to make an arc
  const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  const distance = start.distanceTo(end);
  mid.normalize().multiplyScalar(2.5 + distance * 0.35); // Extrude height proportional to distance

  const curve = React.useMemo(() => new THREE.QuadraticBezierCurve3(start, mid, end), [start, mid, end]);
  const points = React.useMemo(() => curve.getPoints(30), [curve]);
  const geometry = React.useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  const lineObj = React.useMemo(() => {
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3 });
    return new THREE.Line(geometry, mat);
  }, [geometry, color]);

  return (
    <group>
      {/* Arc line */}
      <primitive object={lineObj} />

      {/* Dynamic gliding flow particles */}
      <FlowParticle curve={curve} color={color} delay={0} />
      <FlowParticle curve={curve} color={color} delay={0.5} />
    </group>
  );
}

// Pins on the countries
function CountryPins({ onSelect, selectedId }: { onSelect: (id: string) => void; selectedId: string }) {
  return (
    <>
      {Object.entries(COUNTRY_COORDS).map(([id, coords]) => {
        const pos = latLonToVector3(coords.lat, coords.lon, 2.52);
        const isSelected = id === selectedId;

        // Calculate alignment to normal
        const quaternion = React.useMemo(() => {
          const q = new THREE.Quaternion();
          const up = new THREE.Vector3(0, 0, 1);
          const normal = pos.clone().normalize();
          q.setFromUnitVectors(up, normal);
          return q;
        }, [pos]);

        return (
          <group key={id} position={pos} quaternion={quaternion}>
            {/* The interactive pin node */}
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onSelect(id);
              }}
            >
              <sphereGeometry args={[isSelected ? 0.08 : 0.05, 16, 16]} />
              <meshBasicMaterial color={coords.color} toneMapped={false} />
            </mesh>

            {/* Glowing normal-aligned target rings */}
            {isSelected && (
              <mesh position={[0, 0, 0]}>
                <ringGeometry args={[0.09, 0.14, 32]} />
                <meshBasicMaterial color={coords.color} side={THREE.DoubleSide} transparent opacity={0.8} />
              </mesh>
            )}
          </group>
        );
      })}
    </>
  );
}

interface Globe3DProps {
  onCountryClick: (id: string) => void;
  selectedCountryId: string;
}

export default function Globe3D({ onCountryClick, selectedCountryId }: Globe3DProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeCountry = countriesData.find((c) => c.id === selectedCountryId);
  const spiScore = activeCountry ? calculateCountrySPI(activeCountry) : 0;

  if (!mounted) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0a0c] border border-white/[0.04] rounded-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-white/[0.02] via-transparent to-transparent"></div>
        <div className="w-64 h-64 rounded-full border-2 border-dashed border-white/[0.05] animate-[spin_60s_linear_infinite] flex items-center justify-center">
          <div className="w-48 h-48 rounded-full border border-white/[0.08] animate-[spin_30s_linear_infinite] flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-white/[0.01] flex items-center justify-center">
              <span className="text-[#86868b] font-sans tracking-widest text-[10px] font-medium">KHELAB CORE</span>
            </div>
          </div>
        </div>
        <span className="text-slate-500 text-xs font-sans tracking-wider mt-8">INITIALIZING 3D ENGINE...</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#0a0a0c] border border-white/[0.04] rounded-2xl relative overflow-hidden">
      {/* Control HUD Overlay */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="p-4 rounded-xl border border-white/[0.05] bg-black/60 backdrop-blur-xl">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#30d158]"></span>
            <h3 className="text-xs font-sans font-semibold text-white tracking-wide">Khelab Orbit Scanner</h3>
          </div>
          <p className="text-[10px] text-slate-400 font-sans mt-1">Rotate or select country pins for metrics</p>
        </div>
      </div>

      {/* Floating Dynamic Telemetry HUD */}
      {activeCountry && (
        <div className="absolute top-4 right-4 z-10 p-4 rounded-xl border border-white/[0.08] bg-black/75 backdrop-blur-xl w-60 shadow-2xl font-sans text-[#f5f5f7]">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 mb-2">
            <span className="text-xs font-semibold text-white flex items-center space-x-1.5">
              <span className="text-sm">{activeCountry.flag}</span>
              <span className="tracking-tight">{activeCountry.name}</span>
            </span>
            <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-bold uppercase tracking-wider">
              {activeCountry.id}
            </span>
          </div>
          
          <div className="space-y-2 text-[10px] font-medium">
            <div className="flex justify-between">
              <span className="text-slate-400">Sports Power Index:</span>
              <span className="text-[#0a84ff] font-bold">{spiScore}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Growth Trajectory:</span>
              <span className="text-[#30d158] font-bold">+{activeCountry.growthPotential}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Dominant Biome:</span>
              <span className="text-slate-200">{activeCountry.biomeDominance}</span>
            </div>
            <div className="flex justify-between pt-1.5 border-t border-white/5">
              <span className="text-slate-400">Projected 2028 LA:</span>
              <span className="text-[#ff9f0a] font-bold">{activeCountry.expectedMedals2028.min} - {activeCountry.expectedMedals2028.max} Medals</span>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
        <div className="px-3 py-1.5 rounded-lg border border-white/[0.05] bg-black/60 backdrop-blur-xl text-[9px] font-sans text-slate-400 tracking-wider">
          60 FPS STATUS: ACTIVE
        </div>
      </div>

      <Canvas camera={{ position: [0, 0, 5.5], fov: 60 }} className="w-full h-full cursor-grab active:cursor-grabbing">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        
        <Stars radius={100} depth={50} count={600} factor={3} saturation={0.1} fade speed={1.2} />
        
        <group>
          <EarthSphere />
          <CountryPins onSelect={onCountryClick} selectedId={selectedCountryId} />
          
          {/* Active Medal Flow Arcs targeting France for 2024 / current cycle */}
          <FlowArc from="USA" to="FRA" color="#0a84ff" />
          <FlowArc from="CHN" to="FRA" color="#ff453a" />
          <FlowArc from="IND" to="FRA" color="#ff9f0a" />
          <FlowArc from="KEN" to="FRA" color="#ff3b30" />
          <FlowArc from="AUS" to="FRA" color="#ffd60a" />
        </group>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3.5}
          maxDistance={8}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
