"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface AthleteAvatar3DProps {
  sport: string;
  discipline: string;
  playbackSpeed: number; // 0.1 to 2
  showJointAngles: boolean;
  intensityMultiplier: number; // For force/recovery boost
}

// Biomechanical wireframe avatar skeleton component
function BiomechanicalSkeleton({ sport, discipline, playbackSpeed, showJointAngles, intensityMultiplier }: AthleteAvatar3DProps) {
  const jointsRef = useRef<THREE.Group>(null);

  // Joints positions for base skeletal structure
  const headPos = new THREE.Vector3(0, 1.6, 0);
  const neckPos = new THREE.Vector3(0, 1.4, 0);
  const spinePos = new THREE.Vector3(0, 1.0, 0);
  const pelvisPos = new THREE.Vector3(0, 0.8, 0);
  
  const leftShoulderPos = new THREE.Vector3(-0.25, 1.35, 0);
  const rightShoulderPos = new THREE.Vector3(0.25, 1.35, 0);
  
  const leftHipPos = new THREE.Vector3(-0.15, 0.78, 0);
  const rightHipPos = new THREE.Vector3(0.15, 0.78, 0);

  // References to meshes for animation
  const rElbowRef = useRef<THREE.Mesh>(null);
  const rWristRef = useRef<THREE.Mesh>(null);
  const lElbowRef = useRef<THREE.Mesh>(null);
  const lWristRef = useRef<THREE.Mesh>(null);

  const rKneeRef = useRef<THREE.Mesh>(null);
  const rAnkleRef = useRef<THREE.Mesh>(null);
  const lKneeRef = useRef<THREE.Mesh>(null);
  const lAnkleRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!jointsRef.current) return;
    const time = state.clock.getElapsedTime() * playbackSpeed * 2.5;

    // Default static or default walking positions
    let rElbow = new THREE.Vector3(0.45, 1.1, -0.1);
    let rWrist = new THREE.Vector3(0.6, 0.85, -0.2);
    let lElbow = new THREE.Vector3(-0.45, 1.1, 0.1);
    let lWrist = new THREE.Vector3(-0.6, 0.85, 0.2);

    let rKnee = new THREE.Vector3(0.2, 0.4, 0);
    let rAnkle = new THREE.Vector3(0.2, 0.0, 0);
    let lKnee = new THREE.Vector3(-0.2, 0.4, 0);
    let lAnkle = new THREE.Vector3(-0.2, 0.0, 0);

    const normalSport = sport.toLowerCase();

    // 1. Sport specific animation cycles
    if (normalSport.includes("athletics") && discipline.toLowerCase().includes("javelin")) {
      // Javelin throw motion: pull back arm, plant block foot, launch
      const phase = time % Math.PI; // throw cycle
      const isThrowing = phase > Math.PI * 0.6;

      if (!isThrowing) {
        // Arm pulled back
        const pullback = (phase / (Math.PI * 0.6));
        rElbow.set(0.1, 1.45, -0.5 * pullback);
        rWrist.set(0.15, 1.6, -1.1 * pullback);
        
        // Torso lean back
        jointsRef.current.rotation.x = -0.15 * pullback;
        jointsRef.current.position.z = -0.1 * pullback;
      } else {
        // Exploding release follow-through
        const follow = ((phase - Math.PI * 0.6) / (Math.PI * 0.4));
        rElbow.set(0.3, 1.65, 0.3 * follow);
        rWrist.set(0.45, 1.9 * (1 - follow * 0.2), 0.9 * follow);
        
        // Pelvis and chest forward tilt
        jointsRef.current.rotation.x = 0.2 * follow;
        jointsRef.current.position.z = 0.25 * follow;
      }
      // Running kick legs
      lKnee.set(-0.2, 0.4 + Math.sin(time * 3) * 0.15, Math.cos(time * 3) * 0.2);
      lAnkle.set(-0.2, 0.0 + Math.sin(time * 3) * 0.15, Math.cos(time * 3) * 0.3);
      rKnee.set(0.2, 0.4 - Math.sin(time * 3) * 0.15, -Math.cos(time * 3) * 0.2);
      rAnkle.set(0.2, 0.0 - Math.sin(time * 3) * 0.15, -Math.cos(time * 3) * 0.3);

    } else if (normalSport.includes("swimming")) {
      // Swimming cycle: Undulating dolphin kick / crawl arm pull
      // Body horizontal
      jointsRef.current.rotation.x = Math.PI / 2.2;
      jointsRef.current.position.y = 0.5;

      const undulation = Math.sin(time * 2) * 0.2 * intensityMultiplier;
      headPos.y = 1.6 + undulation * 0.3;
      neckPos.y = 1.4 + undulation * 0.2;
      pelvisPos.y = 0.8 - undulation * 0.5;

      // Swimming arm strokes
      const armCycle = time;
      rElbow.set(0.35, 1.55 + Math.sin(armCycle) * 0.3, Math.cos(armCycle) * 0.5);
      rWrist.set(0.4, 1.7 + Math.sin(armCycle + 0.3) * 0.4, Math.cos(armCycle + 0.3) * 0.6);

      lElbow.set(-0.35, 1.55 + Math.sin(armCycle + Math.PI) * 0.3, Math.cos(armCycle + Math.PI) * 0.5);
      lWrist.set(-0.4, 1.7 + Math.sin(armCycle + Math.PI + 0.3) * 0.4, Math.cos(armCycle + Math.PI + 0.3) * 0.6);

      // Swimming kick legs
      lKnee.set(-0.15, 0.4 - undulation * 0.5, -0.15);
      lAnkle.set(-0.15, 0.0 - undulation * 0.9, -0.3);
      rKnee.set(0.15, 0.4 + undulation * 0.5, -0.15);
      rAnkle.set(0.15, 0.0 + undulation * 0.9, -0.3);

    } else if (normalSport.includes("athletics") && discipline.toLowerCase().includes("sprint")) {
      // Running cycle (Noah Lyles)
      const cycle = time * 3;
      jointsRef.current.position.y = 0.15 + Math.abs(Math.sin(cycle)) * 0.12;

      // Arms swinging opposite to legs
      const swingR = Math.sin(cycle) * 0.6 * intensityMultiplier;
      rElbow.set(0.35, 1.25 - swingR * 0.2, swingR * 0.4);
      rWrist.set(0.45, 0.95 - swingR * 0.4, swingR * 0.7);

      lElbow.set(-0.35, 1.25 + swingR * 0.2, -swingR * 0.4);
      lWrist.set(-0.45, 0.95 + swingR * 0.4, -swingR * 0.7);

      // Running legs
      const legR = Math.sin(cycle);
      rKnee.set(0.2, 0.35 + legR * 0.2, legR * 0.35);
      rAnkle.set(0.2, Math.max(0, -legR * 0.3), legR * 0.5);

      lKnee.set(-0.2, 0.35 - legR * 0.2, -legR * 0.35);
      lAnkle.set(-0.2, Math.max(0, legR * 0.3), -legR * 0.5);

    } else if (normalSport.includes("shooting")) {
      // Shooting still posture (Manu Bhaker): micro movements
      jointsRef.current.rotation.set(0, 0, 0);
      jointsRef.current.position.set(0, 0, 0);

      // Micro heartbeat breathing drift
      const drift = Math.sin(time) * 0.005;
      
      // Pistol Arm locked straight out (right arm)
      rElbow.set(0.35 + drift, 1.35, 0.4);
      rWrist.set(0.35 + drift * 2, 1.35, 0.85);

      // Left arm resting by hip
      lElbow.set(-0.25, 0.95, -0.05);
      lWrist.set(-0.2, 0.75, 0);

      rKnee.set(0.18, 0.4, 0.02);
      rAnkle.set(0.18, 0, 0.02);
      lKnee.set(-0.18, 0.4, -0.02);
      lAnkle.set(-0.18, 0, -0.02);
    } else {
      // Gymnastics tumble and spin
      jointsRef.current.rotation.y = time * 0.5;
      jointsRef.current.rotation.z = Math.sin(time * 0.5) * 0.25;

      const offset = Math.sin(time * 2) * 0.2;
      rElbow.set(0.4, 1.5 + offset, 0);
      rWrist.set(0.55, 1.8 + offset * 1.5, 0);
      lElbow.set(-0.4, 1.5 - offset, 0);
      lWrist.set(-0.55, 1.8 - offset * 1.5, 0);
    }

    // Update mesh position refs dynamically
    if (rElbowRef.current) rElbowRef.current.position.copy(rElbow);
    if (rWristRef.current) rWristRef.current.position.copy(rWrist);
    if (lElbowRef.current) lElbowRef.current.position.copy(lElbow);
    if (lWristRef.current) lWristRef.current.position.copy(lWrist);

    if (rKneeRef.current) rKneeRef.current.position.copy(rKnee);
    if (rAnkleRef.current) rAnkleRef.current.position.copy(rAnkle);
    if (lKneeRef.current) lKneeRef.current.position.copy(lKnee);
    if (lAnkleRef.current) lAnkleRef.current.position.copy(lAnkle);
  });

  return (
    <group ref={jointsRef}>
      {/* SKELETON NODES (Joint spheres) */}
      {/* Head */}
      <mesh position={headPos}>
        <sphereGeometry args={[0.11, 16, 16]} />
        <meshBasicMaterial color="#ffffff" wireframe />
      </mesh>
      
      {/* Spine & Pelvis */}
      <mesh position={neckPos}><sphereGeometry args={[0.035, 8, 8]} /><meshBasicMaterial color="#86868b" /></mesh>
      <mesh position={spinePos}><sphereGeometry args={[0.035, 8, 8]} /><meshBasicMaterial color="#86868b" /></mesh>
      <mesh position={pelvisPos}><sphereGeometry args={[0.045, 8, 8]} /><meshBasicMaterial color="#ffffff" /></mesh>

      {/* Shoulders & Hips */}
      <mesh position={leftShoulderPos}><sphereGeometry args={[0.04, 8, 8]} /><meshBasicMaterial color="#0a84ff" /></mesh>
      <mesh position={rightShoulderPos}><sphereGeometry args={[0.04, 8, 8]} /><meshBasicMaterial color="#0a84ff" /></mesh>
      <mesh position={leftHipPos}><sphereGeometry args={[0.04, 8, 8]} /><meshBasicMaterial color="#86868b" /></mesh>
      <mesh position={rightHipPos}><sphereGeometry args={[0.04, 8, 8]} /><meshBasicMaterial color="#86868b" /></mesh>

      {/* Dynamic Joints */}
      <mesh ref={rElbowRef}><sphereGeometry args={[0.035, 8, 8]} /><meshBasicMaterial color="#ff9f0a" /></mesh>
      <mesh ref={rWristRef}><sphereGeometry args={[0.03, 8, 8]} /><meshBasicMaterial color="#ff453a" /></mesh>
      <mesh ref={lElbowRef}><sphereGeometry args={[0.035, 8, 8]} /><meshBasicMaterial color="#ff9f0a" /></mesh>
      <mesh ref={lWristRef}><sphereGeometry args={[0.03, 8, 8]} /><meshBasicMaterial color="#ff453a" /></mesh>

      <mesh ref={rKneeRef}><sphereGeometry args={[0.038, 8, 8]} /><meshBasicMaterial color="#30d158" /></mesh>
      <mesh ref={rAnkleRef}><sphereGeometry args={[0.03, 8, 8]} /><meshBasicMaterial color="#ff453a" /></mesh>
      <mesh ref={lKneeRef}><sphereGeometry args={[0.038, 8, 8]} /><meshBasicMaterial color="#30d158" /></mesh>
      <mesh ref={lAnkleRef}><sphereGeometry args={[0.03, 8, 8]} /><meshBasicMaterial color="#ff453a" /></mesh>

      {/* Biomechanical force indicators (Vectors) */}
      {showJointAngles && (
        <group>
          {/* Shoulder-Force Vector Arrow */}
          <mesh position={[0.28, 1.45, 0.1]}>
            <coneGeometry args={[0.03, 0.12, 8]} />
            <meshBasicMaterial color="#ff453a" toneMapped={false} />
          </mesh>
          <mesh position={[0.28, 1.35, 0.1]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.15, 8]} />
            <meshBasicMaterial color="#ff453a" />
          </mesh>

          {/* Core stability indicator circle */}
          <mesh position={[0, 1.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.18, 0.006, 8, 32]} />
            <meshBasicMaterial color="#30d158" transparent opacity={0.6} />
          </mesh>
        </group>
      )}
    </group>
  );
}

export default function AthleteAvatar3D(props: AthleteAvatar3DProps) {
  return (
    <div className="w-full h-full bg-[#0a0a0c] border border-white/[0.04] rounded-2xl relative overflow-hidden flex flex-col justify-between">
      
      {/* Diagnostic Overlay */}
      <div className="absolute top-4 left-4 z-10 p-3 rounded-lg border border-white/[0.05] bg-black/60 backdrop-blur-md font-sans">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Biomechanical Skeleton Scan</h4>
        <div className="text-[9px] text-[#f5f5f7] mt-1 space-y-0.5">
          <div className="flex space-x-2">
            <span className="text-slate-500">Subject:</span>
            <span className="font-semibold">{props.sport} / {props.discipline}</span>
          </div>
          <div className="flex space-x-2">
            <span className="text-slate-500">Angle Resolution:</span>
            <span className="text-[#30d158]">±0.15° Telemetry verified</span>
          </div>
          <div className="flex space-x-2">
            <span className="text-slate-500">State:</span>
            <span className="text-[#0a84ff] animate-pulse">Running cycle matching</span>
          </div>
        </div>
      </div>

      <Canvas camera={{ position: [0, 1.0, 3.2], fov: 45 }} className="w-full flex-1 cursor-grab active:cursor-grabbing">
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        
        {/* Draw a subtle circular alignment floor grid */}
        <gridHelper args={[6, 12, "rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 0.03)"]} position={[0, -0.1, 0]} />
        
        <BiomechanicalSkeleton {...props} />
        <OrbitControls enableZoom={true} minDistance={1.5} maxDistance={6} enablePan={true} target={[0, 1.0, 0]} />
      </Canvas>

      <div className="p-3 bg-black/40 border-t border-white/[0.04] text-[9px] font-sans text-slate-500 flex justify-between">
        <span>SENSOR STATUS: ONLINE</span>
        <span>LATENCY: 4.8ms</span>
      </div>
    </div>
  );
}
