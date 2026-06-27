"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  UserCheck,
  TrendingUp,
  Sliders,
  Calendar,
  AlertTriangle,
  Heart,
  Activity,
  Award,
  Globe,
  PlusCircle,
  Building,
  CheckCircle,
  Database,
  Lock
} from "lucide-react";

export default function StakeholderPortals() {
  const [activePortal, setActivePortal] = useState<
    "admin" | "coach" | "athlete" | "government" | "academy"
  >("admin");

  // Admin states
  const [aiOverlay, setAiOverlay] = useState<boolean>(true);
  const [replication, setReplication] = useState<boolean>(true);
  const [sandboxing, setSandboxing] = useState<boolean>(false);
  const [globalNotice, setGlobalNotice] = useState<string>("Nominal platform performance active.");

  // Coach states
  const [coachAthlete, setCoachAthlete] = useState<string>("neeraj_chopra");
  const [workoutPlan, setWorkoutPlan] = useState<string>("Velocity Retention");
  const [coachNotes, setCoachNotes] = useState<string>("");
  const [coachLogs, setCoachLogs] = useState<string[]>([]);

  // Athlete states
  const [athleteSleep, setAthleteSleep] = useState<number>(8.2);
  const [athleteWater, setAthleteWater] = useState<number>(4.2);
  const [athleteStretch, setAthleteStretch] = useState<boolean>(true);
  const [athleteLogFeedback, setAthleteLogFeedback] = useState<string>("");

  // Government states
  const [kheloIndiaFund, setKheloIndiaFund] = useState<number>(240); // Cr
  const [stateFunding, setStateFunding] = useState<{ [key: string]: number }>({
    Haryana: 45,
    Punjab: 35,
    Maharashtra: 30,
    Kerala: 25,
    Karnataka: 20
  });

  // Academy states
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [bookingConfirmed, setBookingConfirmed] = useState<string>("");

  // Handle plan assignment
  const handleAssignPlan = (e: React.FormEvent) => {
    e.preventDefault();
    const athleteName = coachAthlete === "neeraj_chopra" ? "Neeraj Chopra" : coachAthlete === "manu_bhaker" ? "Manu Bhaker" : "Leon Marchand";
    const log = `Plan "${workoutPlan}" assigned to ${athleteName}. Note: "${coachNotes || "None"}"`;
    setCoachLogs(prev => [log, ...prev]);
    setCoachNotes("");
  };

  const handleStateFundChange = (state: string, val: number) => {
    setStateFunding(prev => ({
      ...prev,
      [state]: val
    }));
  };

  const handleBookSlot = (slot: string) => {
    setSelectedSlot(slot);
    setBookingConfirmed(`Facility reserved successfully for slot: ${slot}`);
    setTimeout(() => setBookingConfirmed(""), 4000);
  };

  return (
    <div className="glassmorphic rounded-2xl p-6 space-y-6 flex-1 flex flex-col min-h-[600px] text-[#f5f5f7]">
      {/* Portal switcher */}
      <div className="border-b border-white/[0.06] pb-3 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-sm font-bold tracking-wider text-white uppercase flex items-center">
            <Users className="w-4 h-4 mr-2 text-[#0a84ff]" />
            STAKEHOLDER PORTAL COCKPIT
          </h2>
          <p className="text-[10px] text-[#86868b] mt-0.5">Mock simulations for administrative, coaching, athlete, and state operators</p>
        </div>

        <div className="flex flex-wrap gap-1 bg-white/[0.03] p-1 rounded-lg border border-white/[0.04]">
          <button
            onClick={() => setActivePortal("admin")}
            className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
              activePortal === "admin" ? "bg-white text-black" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Admin Portal
          </button>
          <button
            onClick={() => setActivePortal("coach")}
            className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
              activePortal === "coach" ? "bg-white text-black" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Coach Portal
          </button>
          <button
            onClick={() => setActivePortal("athlete")}
            className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
              activePortal === "athlete" ? "bg-white text-black" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Athlete Portal
          </button>
          <button
            onClick={() => setActivePortal("government")}
            className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
              activePortal === "government" ? "bg-white text-black" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Government
          </button>
          <button
            onClick={() => setActivePortal("academy")}
            className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
              activePortal === "academy" ? "bg-white text-black" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Academy
          </button>
        </div>
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          {/* ================= ADMIN PORTAL ================= */}
          {activePortal === "admin" && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans text-xs"
            >
              {/* Toggles (2 columns) */}
              <div className="lg:col-span-2 p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/[0.04] pb-2 flex items-center">
                  <Sliders className="w-3.5 h-3.5 mr-2 text-[#0a84ff]" />
                  Global AI & System Overrides
                </h3>

                <div className="space-y-4">
                  {/* Toggle 1 */}
                  <div className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                    <div>
                      <strong className="text-white block">Real-time AI Overlay Inference</strong>
                      <span className="text-slate-400 text-[10px]">Overlays vector joint biomechanics on active browser canvases.</span>
                    </div>
                    <button
                      onClick={() => setAiOverlay(!aiOverlay)}
                      className={`w-10 h-5.5 rounded-full p-0.5 transition-colors cursor-pointer ${
                        aiOverlay ? "bg-[#30d158]" : "bg-white/10"
                      }`}
                    >
                      <div className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${aiOverlay ? "translate-x-4.5" : "translate-x-0"}`} />
                    </button>
                  </div>

                  {/* Toggle 2 */}
                  <div className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                    <div>
                      <strong className="text-white block">Database Multi-region Replication</strong>
                      <span className="text-slate-400 text-[10px]">Replicates transactional and telemetry logs to ap-south-2 (Hyderabad) synchronously.</span>
                    </div>
                    <button
                      onClick={() => setReplication(!replication)}
                      className={`w-10 h-5.5 rounded-full p-0.5 transition-colors cursor-pointer ${
                        replication ? "bg-[#30d158]" : "bg-white/10"
                      }`}
                    >
                      <div className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${replication ? "translate-x-4.5" : "translate-x-0"}`} />
                    </button>
                  </div>

                  {/* Toggle 3 */}
                  <div className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                    <div>
                      <strong className="text-white block">Strict Sandbox API Isolation</strong>
                      <span className="text-slate-400 text-[10px]">Restricts third-party API keys to mocked testing vectors rather than live DB clusters.</span>
                    </div>
                    <button
                      onClick={() => setSandboxing(!sandboxing)}
                      className={`w-10 h-5.5 rounded-full p-0.5 transition-colors cursor-pointer ${
                        sandboxing ? "bg-[#30d158]" : "bg-white/10"
                      }`}
                    >
                      <div className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${sandboxing ? "translate-x-4.5" : "translate-x-0"}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Status parameters (1 column) */}
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/[0.04] pb-2 flex items-center">
                  <Database className="w-3.5 h-3.5 mr-2 text-slate-400" />
                  Database Pool Status
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">DB Size:</span>
                    <span className="text-white font-bold">84.2 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Active connections:</span>
                    <span className="text-white font-bold">32 / 100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Avg Query Time:</span>
                    <span className="text-[#30d158] font-bold">1.22 ms</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/[0.04] space-y-2">
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Deploy Global Notice</span>
                  <input
                    type="text"
                    value={globalNotice}
                    onChange={(e) => setGlobalNotice(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.06] focus:border-white/20 outline-none rounded-xl p-2 text-xs text-white"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= COACH PORTAL ================= */}
          {activePortal === "coach" && (
            <motion.div
              key="coach"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans text-xs"
            >
              {/* Squad Assignment (2 columns) */}
              <div className="lg:col-span-2 p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/[0.04] pb-2 flex items-center">
                  <UserCheck className="w-3.5 h-3.5 mr-2 text-[#0a84ff]" />
                  Athlete training planner
                </h3>

                <form onSubmit={handleAssignPlan} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] text-slate-500 uppercase font-semibold">Select Athlete</span>
                    <select
                      value={coachAthlete}
                      onChange={(e) => setCoachAthlete(e.target.value)}
                      className="w-full bg-[#1c1c1e] border border-white/[0.06] rounded-xl px-3 py-2 text-slate-200 outline-none cursor-pointer"
                    >
                      <option value="neeraj_chopra">Neeraj Chopra (Javelin)</option>
                      <option value="manu_bhaker">Manu Bhaker (Shooting)</option>
                      <option value="leon_marchand">Leon Marchand (Swim)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] text-slate-500 uppercase font-semibold">Select Telemetry Plan</span>
                    <select
                      value={workoutPlan}
                      onChange={(e) => setWorkoutPlan(e.target.value)}
                      className="w-full bg-[#1c1c1e] border border-white/[0.06] rounded-xl px-3 py-2 text-slate-200 outline-none cursor-pointer"
                    >
                      <option value="Velocity Retention">Velocity Retention (Javelin)</option>
                      <option value="Breathing Stabilization">Breathing Stabilization (Shooting)</option>
                      <option value="Dolphin kick streamline">Dolphin kick streamline (Swim)</option>
                      <option value="Active rest cycle">Active rest cycle</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <span className="text-[9px] text-slate-500 uppercase font-semibold">Special Instructions</span>
                    <textarea
                      value={coachNotes}
                      onChange={(e) => setCoachNotes(e.target.value)}
                      placeholder="Ensure elbow extension limits are set to 160 degrees maximum today..."
                      className="w-full h-20 bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 text-xs text-slate-200 outline-none resize-none focus:border-white/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="md:col-span-2 py-2 bg-white text-black hover:bg-white/90 rounded-xl font-bold cursor-pointer transition-all"
                  >
                    Assign Telemetry Routine
                  </button>
                </form>
              </div>

              {/* Training Logs (1 column) */}
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] flex flex-col justify-between h-[300px] lg:h-auto">
                <div className="space-y-3.5 flex-1 flex flex-col overflow-hidden">
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/[0.04] pb-2">
                    Active Assignment Log
                  </h3>
                  <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-[10px]">
                    {coachLogs.length === 0 ? (
                      <span className="text-slate-500 italic">No plans assigned in this session.</span>
                    ) : (
                      coachLogs.map((log, idx) => (
                        <div key={idx} className="p-2.5 bg-white/[0.02] border border-white/[0.04] rounded-xl text-slate-300">
                          {log}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= ATHLETE PORTAL ================= */}
          {activePortal === "athlete" && (
            <motion.div
              key="athlete"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans text-xs"
            >
              {/* Telemetry Logger (2 columns) */}
              <div className="lg:col-span-2 p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/[0.04] pb-2 flex items-center">
                  <Heart className="w-3.5 h-3.5 mr-2 text-[#ff453a]" />
                  Athlete Daily Biometric Check-In
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Sliders */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between font-medium">
                        <span className="text-slate-400">Sleep Duration:</span>
                        <span className="text-white font-bold">{athleteSleep} hours</span>
                      </div>
                      <input
                        type="range"
                        min="4"
                        max="12"
                        step="0.1"
                        value={athleteSleep}
                        onChange={(e) => setAthleteSleep(parseFloat(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between font-medium">
                        <span className="text-slate-400">Hydration intake:</span>
                        <span className="text-white font-bold">{athleteWater} Liters</span>
                      </div>
                      <input
                        type="range"
                        min="1.5"
                        max="8"
                        step="0.1"
                        value={athleteWater}
                        onChange={(e) => setAthleteWater(parseFloat(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-slate-400">Joint Warmup / Stretch Routine:</span>
                      <button
                        onClick={() => setAthleteStretch(!athleteStretch)}
                        className={`w-10 h-5.5 rounded-full p-0.5 transition-colors cursor-pointer ${
                          athleteStretch ? "bg-[#30d158]" : "bg-white/10"
                        }`}
                      >
                        <div className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${athleteStretch ? "translate-x-4.5" : "translate-x-0"}`} />
                      </button>
                    </div>
                  </div>

                  {/* Log action */}
                  <div className="p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl flex flex-col justify-between">
                    <div>
                      <strong className="text-white block text-xs mb-1">Weekly target index</strong>
                      <span className="text-[10px] text-slate-400 leading-relaxed block">
                        Logging daily bio-parameters enables the AI engine to calibrate fatigue indexes and prevent injury.
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setAthleteLogFeedback(`Parameters logged successfully at ${new Date().toLocaleTimeString()}! Syncing to Coach Hub...`);
                        setTimeout(() => setAthleteLogFeedback(""), 4000);
                      }}
                      className="w-full mt-4 py-2 bg-white text-black hover:bg-white/90 rounded-xl font-bold cursor-pointer transition-all"
                    >
                      Submit Daily Check-In
                    </button>
                  </div>
                </div>

                {athleteLogFeedback && (
                  <div className="p-3 bg-[#30d158]/10 border border-[#30d158]/20 rounded-xl text-[11px] text-[#30d158] font-medium">
                    {athleteLogFeedback}
                  </div>
                )}
              </div>

              {/* Skeletal wear overlay (1 column) */}
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/[0.04] pb-2 flex items-center">
                  <Activity className="w-3.5 h-3.5 mr-2 text-[#ff9f0a]" />
                  Wear-and-Tear Analysis
                </h3>

                <div className="space-y-3 font-sans text-xs">
                  <div className="flex justify-between items-center p-2.5 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                    <span className="text-slate-400">Right Shoulder load:</span>
                    <span className="text-[#ff453a] font-bold">High (Rest Rec.)</span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                    <span className="text-slate-400">Knees stress index:</span>
                    <span className="text-[#30d158] font-bold">Nominal</span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                    <span className="text-slate-400">Ankle telemetry load:</span>
                    <span className="text-[#30d158] font-bold">Nominal</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= GOVERNMENT PORTAL ================= */}
          {activePortal === "government" && (
            <motion.div
              key="government"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans text-xs"
            >
              {/* Regional allocation (2 columns) */}
              <div className="lg:col-span-2 p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/[0.04] pb-2 flex items-center">
                  <Award className="w-3.5 h-3.5 mr-2 text-[#ff9f0a]" />
                  Sovereign Sports grants allocation
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Khelo India Central Budget:</span>
                    <span className="text-white font-bold text-sm">₹{kheloIndiaFund} Crores</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="25"
                    value={kheloIndiaFund}
                    onChange={(e) => setKheloIndiaFund(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                  />

                  {/* State items */}
                  <div className="pt-2 border-t border-white/[0.04] grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(stateFunding).map(([state, value]) => (
                      <div key={state} className="space-y-1">
                        <div className="flex justify-between font-medium">
                          <span className="text-slate-400">{state} state allocation:</span>
                          <span className="text-white">₹{value} Cr</span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="100"
                          step="5"
                          value={value}
                          onChange={(e) => handleStateFundChange(state, parseInt(e.target.value))}
                          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* State stats (1 column) */}
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/[0.04] pb-2 flex items-center">
                  <Globe className="w-3.5 h-3.5 mr-2 text-[#0a84ff]" />
                  Talent mapping index
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-white/[0.02] pb-1.5">
                    <span className="text-slate-400">Haryana:</span>
                    <span className="text-[#30d158] font-bold">92.4 SPI</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/[0.02] pb-1.5">
                    <span className="text-slate-400">Punjab:</span>
                    <span className="text-white font-medium">84.2 SPI</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/[0.02] pb-1.5">
                    <span className="text-slate-400">Maharashtra:</span>
                    <span className="text-white font-medium">78.5 SPI</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/[0.02] pb-1.5">
                    <span className="text-slate-400">Kerala:</span>
                    <span className="text-white font-medium">72.0 SPI</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= ACADEMY PORTAL ================= */}
          {activePortal === "academy" && (
            <motion.div
              key="academy"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans text-xs"
            >
              {/* Reservations Grid (2 columns) */}
              <div className="lg:col-span-2 p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/[0.04] pb-2 flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-2 text-[#0a84ff]" />
                  Facility reservation scheduler
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                  {[
                    "09:00 AM - Javelin Ring A",
                    "11:00 AM - Athletics Track 1",
                    "02:00 PM - Aquatics Lane 3",
                    "04:00 PM - Indoor Ring 2",
                    "09:00 AM - Fencing Piste B",
                    "11:00 AM - Shooting range C",
                    "02:00 PM - Wrestling arena A",
                    "04:00 PM - Javelin Ring B"
                  ].map((slot) => (
                    <button
                      key={slot}
                      onClick={() => handleBookSlot(slot)}
                      className={`p-3 border rounded-xl transition-all cursor-pointer ${
                        selectedSlot === slot
                          ? "bg-white text-black border-white"
                          : "bg-white/[0.01] border-white/[0.04] text-slate-300 hover:bg-white/[0.03] hover:border-white/[0.08]"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>

                {bookingConfirmed && (
                  <div className="p-3 bg-[#30d158]/10 border border-[#30d158]/20 rounded-xl text-[11px] text-[#30d158] font-medium flex items-center space-x-1.5">
                    <CheckCircle className="w-4 h-4" />
                    <span>{bookingConfirmed}</span>
                  </div>
                )}
              </div>

              {/* Stats parameters (1 column) */}
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/[0.04] pb-2 flex items-center">
                  <Building className="w-3.5 h-3.5 mr-2 text-slate-400" />
                  Academy metrics
                </h3>

                <div className="space-y-3.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Coaches:</span>
                    <span className="text-white font-bold">14 active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Registered Athletes:</span>
                    <span className="text-white font-bold">184 active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Facility utilization:</span>
                    <span className="text-[#30d158] font-bold">78.5% capacity</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Grassroots Scouting count:</span>
                    <span className="text-white font-bold">24 candidate profiles</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
