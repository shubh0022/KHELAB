"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Terminal,
  Activity,
  Shield,
  HelpCircle,
  Code,
  Layers,
  Cpu
} from "lucide-react";

export default function SystemDocs() {
  const [activeDocSection, setActiveDocSection] = useState<
    "quickstart" | "ingestion" | "ai" | "security"
  >("quickstart");

  return (
    <div className="glassmorphic rounded-2xl p-6 space-y-6 flex-1 flex flex-col min-h-[600px] text-[#f5f5f7]">
      {/* Sub tabs switcher */}
      <div className="border-b border-white/[0.06] pb-3 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-sm font-bold tracking-wider text-white uppercase flex items-center">
            <FileText className="w-4 h-4 mr-2 text-[#0a84ff]" />
            KHELAB SYSTEM DOCUMENTATION
          </h2>
          <p className="text-[10px] text-[#86868b] mt-0.5">Developer guides, engineering workflows, and system setup guides</p>
        </div>

        <div className="flex flex-wrap gap-1 bg-white/[0.03] p-1 rounded-lg border border-white/[0.04]">
          <button
            onClick={() => setActiveDocSection("quickstart")}
            className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
              activeDocSection === "quickstart" ? "bg-white text-black" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Quickstart
          </button>
          <button
            onClick={() => setActiveDocSection("ingestion")}
            className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
              activeDocSection === "ingestion" ? "bg-white text-black" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Ingestion Pipeline
          </button>
          <button
            onClick={() => setActiveDocSection("ai")}
            className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
              activeDocSection === "ai" ? "bg-white text-black" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            AI Mechanics
          </button>
          <button
            onClick={() => setActiveDocSection("security")}
            className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
              activeDocSection === "security" ? "bg-white text-black" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Security & Sovereignty
          </button>
        </div>
      </div>

      <div className="flex-1 font-sans text-xs">
        <AnimatePresence mode="wait">
          {/* ================= QUICKSTART ================= */}
          {activeDocSection === "quickstart" && (
            <motion.div
              key="quickstart"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/[0.04] pb-2 flex items-center">
                  <Terminal className="w-3.5 h-3.5 mr-2 text-[#30d158]" />
                  Local Development Setup
                </h3>
                
                <div className="space-y-4">
                  <p className="text-slate-300 leading-relaxed">
                    Follow these commands to deploy the OIOS dashboard and mock ingestion telemetry locally.
                  </p>

                  <div className="space-y-1.5">
                    <span className="text-[9px] text-slate-500 uppercase font-bold">1. Install Dependencies</span>
                    <pre className="p-3 bg-[#0a0a0c] border border-white/[0.04] rounded-xl font-mono text-[10px] text-slate-300">
                      npm install
                    </pre>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[9px] text-slate-500 uppercase font-bold">2. Run Local Development Server</span>
                    <pre className="p-3 bg-[#0a0a0c] border border-white/[0.04] rounded-xl font-mono text-[10px] text-slate-300">
                      npm run dev
                    </pre>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[9px] text-slate-500 uppercase font-bold">3. Database Schema Migration</span>
                    <pre className="p-3 bg-[#0a0a0c] border border-white/[0.04] rounded-xl font-mono text-[10px] text-slate-300">
                      npm run db:migrate
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= INGESTION PIPELINE ================= */}
          {activeDocSection === "ingestion" && (
            <motion.div
              key="ingestion"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/[0.04] pb-2 flex items-center">
                  <Activity className="w-3.5 h-3.5 mr-2 text-[#0a84ff]" />
                  Edge Telemetry Ingestion In-Depth
                </h3>

                <p className="text-slate-300 leading-relaxed">
                  Ingestion protocols process data from IoT smart garments and high-frequency video capture streams. Micro-sensors record muscle electrical activation (sEMG), heart rate, and joint rotation matrices, wrapping them in an MQTT payload structured as follows:
                </p>

                <pre className="p-3 bg-[#0a0a0c] border border-white/[0.04] rounded-xl font-mono text-[10px] text-slate-300 overflow-x-auto">
{`TOPIC: khelab/telemetry/{athlete_id}
PAYLOAD:
{
  "timestamp": 1782490100,
  "sensors": {
    "heartRate": 164,
    "bloodOxygen": 96,
    "jointAngles": {
      "rightShoulderFlexion": 112.5,
      "leftElbowExtension": 168.2
    },
    "impactForceNewtons": 845.2
  }
}`}
                </pre>

                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Data streams into our Kafka message broker, triggering a stateless serverless consumer function which pushes to our multi-region Postgres telemetry log clusters in less than 12 milliseconds.
                </p>
              </div>
            </motion.div>
          )}

          {/* ================= AI MECHANICS ================= */}
          {activeDocSection === "ai" && (
            <motion.div
              key="ai"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/[0.04] pb-2 flex items-center">
                  <Cpu className="w-3.5 h-3.5 mr-2 text-[#8b5cf6]" />
                  Biomechanical AI & Trajectory Models
                </h3>

                <p className="text-slate-300 leading-relaxed">
                  Our core predictive modules operate in three layered networks:
                </p>

                <div className="space-y-3 pt-1">
                  <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                    <strong className="text-white block">1. Biomechanical LSTM Calibration</strong>
                    <span className="text-slate-400 text-[10px] block mt-0.5">
                      Skeletal motion files are structured as sequence arrays. An LSTM network processes sequence frames to detect variations in posture, fatigue factors, and biomechanical strain indicators.
                    </span>
                  </div>

                  <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                    <strong className="text-white block">2. XGBoost Stochastic Classifier</strong>
                    <span className="text-slate-400 text-[10px] block mt-0.5">
                      Integrates structural indicators alongside external parameters (air drag coefficients, GDP allocations, and historical tallies) to calculate final gold medal winning probabilities.
                    </span>
                  </div>

                  <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                    <strong className="text-white block">3. Localized Generative Commentary Transformer</strong>
                    <span className="text-slate-400 text-[10px] block mt-0.5">
                      Processes quantitative metrics into live, natural language sports commentary, automatically translating and vocalizing the output across multiple regional languages.
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= SECURITY & SOVEREIGNTY ================= */}
          {activeDocSection === "security" && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/[0.04] pb-2 flex items-center">
                  <Shield className="w-3.5 h-3.5 mr-2 text-[#ff9f0a]" />
                  Data Sovereignty & Security Compliance
                </h3>

                <p className="text-slate-300 leading-relaxed font-sans">
                  KHELAB implements strict security models to protect athlete health records and proprietary biomechanical telemetry vectors. Core regulatory compliance principles include:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-semibold text-[#0a84ff] uppercase">Data Sovereignty</h4>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      All local athlete telemetry logs are hosted within geographic borders (AWS AP-SOUTH-1 and AP-SOUTH-2 centers) to align strictly with Indian sovereign data policies. No biometric files are routed to external cloud repositories.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-semibold text-[#30d158] uppercase">ISO 27001 & GDPR compliance</h4>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Biometric records are pseudonymized and encrypted using AES-256-GCM keys. Third-party developers utilize OAuth2 JWT tokens with narrow scopes to access specific segments of the database sandbox.
                    </p>
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
