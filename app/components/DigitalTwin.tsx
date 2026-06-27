"use client";

import React, { useState, useEffect } from "react";
import { Wind, Activity, Zap, Play, Layers, Heart, Cpu, Compass } from "lucide-react";
import { AthleteData } from "../../data/athletes";
import AthleteAvatar3D from "./AthleteAvatar3D";
import Stadium3D from "./Stadium3D";

interface DigitalTwinProps {
  activeAthlete: AthleteData;
}

export default function DigitalTwin({ activeAthlete }: DigitalTwinProps) {
  // Twin controls state
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [showJointAngles, setShowJointAngles] = useState<boolean>(true);
  const [intensityMultiplier, setIntensityMultiplier] = useState<number>(1.0);
  const [windSpeed, setWindSpeed] = useState<number>(4); // knots
  const [friction, setFriction] = useState<number>(0.12); // surface friction coefficient
  const [biomePreset, setBiomePreset] = useState<string>("paris");

  // Real-time telemetry coordinates stream states
  const [liveAngles, setLiveAngles] = useState<{ [joint: string]: number }>({});
  const [liveHeartRate, setLiveHeartRate] = useState<number>(72);
  const [latency, setLatency] = useState<number>(4.8);

  useEffect(() => {
    const interval = setInterval(() => {
      const baselineAngles = activeAthlete.biomechanics.jointAnglesDeg || {
        "Elbow Extension": 165,
        "Hip Rotation": 45,
        "Ankle Plantarflexion": 30
      };
      
      const updated: { [joint: string]: number } = {};
      Object.entries(baselineAngles).forEach(([joint, angle]) => {
        const drift = (Math.random() - 0.5) * 4 * intensityMultiplier;
        updated[joint] = Math.round((angle + drift) * 10) / 10;
      });
      setLiveAngles(updated);

      // Heart rate simulation (Shooting is lower, sprinters/swimmers are higher)
      const baseHR = activeAthlete.sport === "Shooting" ? 52 : 124;
      const targetHR = baseHR * intensityMultiplier + (Math.random() - 0.5) * 8 * playbackSpeed;
      setLiveHeartRate(Math.round(Math.min(195, Math.max(45, targetHR))));
      
      // Jitter latency
      setLatency(parseFloat((4.0 + Math.random() * 1.5).toFixed(1)));
    }, 180);

    return () => clearInterval(interval);
  }, [activeAthlete, intensityMultiplier, playbackSpeed]);

  const applyBiomePreset = (presetName: string) => {
    setBiomePreset(presetName);
    if (presetName === "paris") {
      setWindSpeed(3);
      setFriction(0.12);
    } else if (presetName === "chamonix") {
      setWindSpeed(8);
      setFriction(0.06);
    } else if (presetName === "tokyo") {
      setWindSpeed(12);
      setFriction(0.18);
    } else if (presetName === "la") {
      setWindSpeed(1);
      setFriction(0.08);
    }
  };

  return (
    <div className="glassmorphic rounded-2xl p-6 space-y-6 flex-1 flex flex-col min-h-[600px] text-[#f5f5f7]">
      {/* Header controls info */}
      <div className="border-b border-white/[0.06] pb-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-white flex items-center">
            <Layers className="w-4 h-4 mr-2 text-white animate-pulse" />
            Biomechanical & Environmental Digital Twin
          </h3>
          <p className="text-[10px] text-[#86868b] mt-0.5">
            Real-time skeletal movement simulation matching physics model coefficients.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs bg-white/[0.04] px-3 py-1.5 rounded-full border border-white/[0.06] text-slate-300">
          <Activity className="w-3.5 h-3.5 text-[#30d158] mr-1" />
          <span>Active Subject: <strong className="text-white font-bold">{activeAthlete.name}</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 flex-1">
        
        {/* Visual Simulators (Left 3 Columns) */}
        <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[400px]">
          {/* Panel 1: Biomechanical Skeleton */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#86868b] tracking-wider uppercase">
              <span>1. Biomechanical Avatar</span>
              <span className="text-[#30d158] text-[10px]">VERIFIED MODEL</span>
            </div>
            <div className="flex-1 min-h-[350px]">
              <AthleteAvatar3D
                sport={activeAthlete.sport}
                discipline={activeAthlete.discipline}
                playbackSpeed={playbackSpeed}
                showJointAngles={showJointAngles}
                intensityMultiplier={intensityMultiplier}
              />
            </div>
          </div>

          {/* Panel 2: Stadium Arena Environment */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#86868b] tracking-wider uppercase">
              <span>2. Environmental Grid</span>
              <span className="text-[#0a84ff] text-[10px]">ATMOSPHERE SIMULATOR</span>
            </div>
            <div className="flex-1 min-h-[350px]">
              <Stadium3D
                sport={activeAthlete.sport}
                windSpeed={windSpeed}
                friction={friction}
                intensityMultiplier={intensityMultiplier}
              />
            </div>
          </div>
        </div>

        {/* Sliders Control Panel (Right 1 Column) */}
        <div className="xl:col-span-1 p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] flex flex-col justify-between space-y-6 font-sans">
          
          <div className="space-y-5">
            {/* Atmospheric Presets */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-white/[0.04] pb-2 flex items-center justify-between">
                <span>Biome Presets</span>
                <Compass className="w-3 h-3 text-[#0a84ff]" />
              </h4>
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {[
                  { name: "Paris", id: "paris" },
                  { name: "Chamonix", id: "chamonix" },
                  { name: "Tokyo", id: "tokyo" },
                  { name: "L.A. Fast", id: "la" }
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => applyBiomePreset(p.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all text-center border cursor-pointer ${
                      biomePreset === p.id
                        ? "bg-white/10 text-white border-white/20 shadow-md"
                        : "bg-white/[0.02] text-slate-400 border-white/[0.03] hover:bg-white/[0.04]"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-white/[0.04] pb-2">
              Simulation Coefficients
            </h4>

            {/* Playback speed */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 flex items-center"><Play className="w-3.5 h-3.5 mr-1.5" /> Playback Speed</span>
                <span className="text-white font-bold">{playbackSpeed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="2.0"
                step="0.1"
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>

            {/* Force Intensity Multiplier */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 flex items-center"><Zap className="w-3.5 h-3.5 mr-1.5" /> Force Multiplier</span>
                <span className="text-[#ff9f0a] font-bold">{(intensityMultiplier * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.8"
                step="0.05"
                value={intensityMultiplier}
                onChange={(e) => setIntensityMultiplier(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ff9f0a]"
              />
            </div>

            {/* Wind speed slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 flex items-center"><Wind className="w-3.5 h-3.5 mr-1.5" /> Wind Velocity</span>
                <span className="text-white font-bold">{windSpeed} knots</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={windSpeed}
                onChange={(e) => setWindSpeed(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>

            {/* Surface friction coefficient slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 flex items-center"><Layers className="w-3.5 h-3.5 mr-1.5" /> Surface Friction</span>
                <span className="text-[#0a84ff] font-bold">{friction.toFixed(3)} μ</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.4"
                step="0.01"
                value={friction}
                onChange={(e) => setFriction(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#0a84ff]"
              />
            </div>

            {/* Joint Angles toggle */}
            <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
              <span className="text-xs text-slate-400">Overlay Joint Vectors</span>
              <button
                onClick={() => setShowJointAngles(!showJointAngles)}
                className={`w-10 h-5.5 rounded-full p-0.5 transition-colors cursor-pointer ${
                  showJointAngles ? "bg-[#30d158]" : "bg-white/10"
                }`}
              >
                <div
                  className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                    showJointAngles ? "translate-x-4.5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Dynamic Live IoT Telemetry Board */}
          <div className="space-y-3.5 pt-4 border-t border-white/[0.04]">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between">
              <span>Live IoT Stream</span>
              <span className="flex items-center text-[#30d158] animate-pulse"><Cpu className="w-3 h-3 mr-1" /> ONLINE</span>
            </h4>
            
            {/* Heart Rate Display */}
            <div className="flex items-center justify-between bg-white/[0.02] border border-white/[0.04] p-2.5 rounded-xl">
              <span className="text-[11px] text-slate-400 flex items-center"><Heart className="w-3.5 h-3.5 text-[#ff3b30] mr-2 animate-[pulse_1s_infinite]" /> Cardio Pulse</span>
              <span className="text-white font-mono text-xs font-bold">{liveHeartRate} bpm</span>
            </div>

            {/* Joint Angles Readout */}
            <div className="p-3 bg-white/[0.01] border border-white/[0.04] rounded-xl text-[10px] text-slate-400 space-y-1.5">
              <span className="text-[8px] text-slate-500 font-semibold block uppercase tracking-wider">Joint Angular Readout</span>
              {Object.keys(liveAngles).length > 0 ? (
                Object.entries(liveAngles).map(([joint, angle]) => (
                  <div key={joint} className="flex justify-between font-mono">
                    <span>{joint}:</span>
                    <span className="text-slate-200">{angle.toFixed(1)}°</span>
                  </div>
                ))
              ) : (
                <div className="text-[9px] text-slate-500 italic">Reading sensor array...</div>
              )}
            </div>

            {/* Energy metrics and latency */}
            <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl text-[10px] text-slate-400 space-y-1 font-mono">
              <div className="flex justify-between">
                <span>Energy Cost:</span>
                <span className="text-white font-medium">{(340 * intensityMultiplier * playbackSpeed).toFixed(1)} kcal/h</span>
              </div>
              <div className="flex justify-between">
                <span>Friction Force:</span>
                <span className="text-white font-medium">{(9.81 * friction * activeAthlete.weight * 0.1).toFixed(2)} N</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-white/[0.04] text-[9px]">
                <span>Telemetry Latency:</span>
                <span className="text-slate-300 font-bold">{latency} ms</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
