"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";
import {
  Compass,
  Layers,
  TrendingUp,
  FileText,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Target,
  Users,
  Coins,
  ShieldCheck,
  CheckCircle
} from "lucide-react";

export default function ExecutiveHub() {
  const [activeSubTab, setActiveSubTab] = useState<
    "vision" | "strategy" | "finance" | "pitch" | "roadmap"
  >("vision");

  // Finance multi-variables
  const [gdpGrants, setGdpGrants] = useState<number>(120); // In Cr
  const [subscriptionCost, setSubscriptionCost] = useState<number>(499); // Monthly
  const [enterpriseCount, setEnterpriseCount] = useState<number>(50); // Academies/Associations
  const [growthYoY, setGrowthYoY] = useState<number>(22); // YoY % Growth

  // Pitch Deck slideshow index
  const [pitchIndex, setPitchIndex] = useState<number>(0);

  // Financial model dynamic calculation
  const [financialData, setFinancialData] = useState<any[]>([]);

  useEffect(() => {
    const data = [];
    let subscriberCount = 10000;
    let academyRevenue = enterpriseCount * 250000; // Average annual enterprise deal
    let baseGrants = gdpGrants * 10000000; // Cr to Absolute
    
    for (let year = 2026; year <= 2047; year += 3) {
      const subRev = subscriberCount * subscriptionCost * 12;
      const totalRev = (subRev + academyRevenue + baseGrants) / 10000000; // in Crores
      data.push({
        year: year.toString(),
        "Subscriber Revenue (Cr)": Math.round(subRev / 10000000 * 100) / 100,
        "Enterprise Licensing (Cr)": Math.round(academyRevenue / 10000000 * 100) / 100,
        "Gov Grants & Subsidies (Cr)": Math.round(baseGrants / 10000000 * 100) / 100,
        "Total Projected Revenue (Cr)": Math.round(totalRev * 100) / 100
      });

      // Growth rate factors
      subscriberCount = Math.round(subscriberCount * (1 + growthYoY / 100));
      academyRevenue = Math.round(academyRevenue * (1 + (growthYoY * 0.75) / 100));
      baseGrants = Math.round(baseGrants * (1 + 0.05)); // 5% flat inflation adjustment for Gov budgets
    }
    setFinancialData(data);
  }, [gdpGrants, subscriptionCost, enterpriseCount, growthYoY]);

  // Slides data for Pitch Deck
  const pitchSlides = [
    {
      title: "The Problem",
      subtitle: "India's Sports Potential Gap",
      points: [
        "Inconsistent talent identification: Grassroots talent remains undiscovered in remote districts.",
        "Biomechanical friction: Lack of scientific training frameworks leads to early injury and plateauing.",
        "Uncalibrated training metrics: Traditional coaching methods rely on intuition rather than real-time data.",
        "Lack of central telemetry: Sports data is highly fragmented across states and academies."
      ],
      kpi: "Rank 17 in global SPI (un-normalized to population)"
    },
    {
      title: "The Solution",
      subtitle: "KHELAB: Olympic Intelligence Operating System (OIOS)",
      points: [
        "Sovereign multi-modal AI platform unifying athletic profiles nationwide.",
        "Biomechanical digital twin engines providing sub-millisecond motion metrics.",
        "Stochastic predictive modeling tracking injury parameters and podium likelihoods.",
        "Unified mobile, coach, government, and academy interfaces."
      ],
      kpi: "98.45% predictive model classification accuracy"
    },
    {
      title: "Market Opportunity (TAM/SAM/SOM)",
      subtitle: "Unlocking the Indian Sports Economy by 2047",
      points: [
        "Total Addressable Market (TAM): ₹98,000 Cr ($11.8B) comprising global sports tech, smart wearables, and professional analytics.",
        "Serviceable Addressable Market (SAM): ₹15,000 Cr comprising Indian athletic academy infrastructures, state leagues, and national preparation grants.",
        "Serviceable Obtainable Market (SOM): ₹2,500 Cr targeting primary Khelo India hubs, private corporate academies, and top-tier athletes by 2030."
      ],
      kpi: "TAM Growth Rate: 16.8% CAGR"
    },
    {
      title: "Product Ecosystem Structure",
      subtitle: "A Unified Tech Stack for Indian Sports",
      points: [
        "Khelab DNA Engine: Unified biological database for speed, fatigue, and recovery telemetry.",
        "Edge Ingestion: Direct WebSocket links to smart tracksuits, IoT shoes, and vision cameras.",
        "NationIQ Radar: Macro dashboard for state-level funding and asset auditing.",
        "Multilingual AI Commentary: Instant hyper-localized commentary to drive community engagement."
      ],
      kpi: "Low Latency Ingestion: <12ms telemetry updates"
    },
    {
      title: "Business Model & Monetization",
      subtitle: "Scalable Enterprise & Consumer Incomes",
      points: [
        "Consumer SaaS: ₹499/mo Pro and ₹1,999/mo Elite subscriptions for amateur/professional athletes.",
        "Enterprise Licensing: Dedicated digital twin modules for academies (recurring annual contracts).",
        "State Integrations: Sovereign contracts with SAI (Sports Authority of India) and State Councils.",
        "Broadcaster APIs: Low-latency telemetry telemetry streams for television overlays."
      ],
      kpi: "Target LTV:CAC Ratio: 5.4x by Year 3"
    },
    {
      title: "Milestones to 2047",
      subtitle: "Leading India's Sports Hegemony",
      points: [
        "2028 (LA Olympics): Complete integration with top-tier Indian national squads (Javelin, Archery, Shooting).",
        "2036 (Proposed India Olympics): Core telemetry partner for hosting operations and athlete scheduling.",
        "2047 (Centenary Independence): Unifying over 25 Million registered athletes across 50,000 academies."
      ],
      kpi: "Vision: Top 3 Olympic Medals Tally"
    }
  ];

  return (
    <div className="glassmorphic rounded-2xl p-6 space-y-6 flex-1 flex flex-col min-h-[600px] text-[#f5f5f7]">
      {/* Sub navigation bar */}
      <div className="border-b border-white/[0.06] pb-3 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-sm font-bold tracking-wider text-white uppercase flex items-center">
            <Compass className="w-4 h-4 mr-2 text-[#0a84ff]" />
            KHELAB EXECUTIVE SYSTEM
          </h2>
          <p className="text-[10px] text-[#86868b] mt-0.5">Corporate identity, financial modeling, and 2047 vision decks</p>
        </div>

        {/* Tab switchers */}
        <div className="flex flex-wrap gap-1 bg-white/[0.03] p-1 rounded-lg border border-white/[0.04]">
          <button
            onClick={() => setActiveSubTab("vision")}
            className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
              activeSubTab === "vision" ? "bg-white text-black" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Vision & Brand
          </button>
          <button
            onClick={() => setActiveSubTab("strategy")}
            className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
              activeSubTab === "strategy" ? "bg-white text-black" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            AI Strategy
          </button>
          <button
            onClick={() => setActiveSubTab("finance")}
            className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
              activeSubTab === "finance" ? "bg-white text-black" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Financial Engine
          </button>
          <button
            onClick={() => setActiveSubTab("pitch")}
            className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
              activeSubTab === "pitch" ? "bg-white text-black" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Investor Pitch
          </button>
          <button
            onClick={() => setActiveSubTab("roadmap")}
            className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
              activeSubTab === "roadmap" ? "bg-white text-black" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            2047 Roadmap
          </button>
        </div>
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          {/* ================= VISION & BRAND TAB ================= */}
          {activeSubTab === "vision" && (
            <motion.div
              key="vision"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Brand Identity details */}
              <div className="lg:col-span-2 space-y-6">
                <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/[0.04] pb-2 flex items-center">
                    <Target className="w-3.5 h-3.5 mr-2 text-[#0a84ff]" />
                    Corporate Vision & Mission
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                    <div className="space-y-2">
                      <h4 className="text-[11px] font-semibold text-[#0a84ff] uppercase">The Vision 2047</h4>
                      <p className="text-slate-300 leading-relaxed">
                        To construct India's sovereign sports analytics backbone, turning a nation of 1.4 billion people into a dominant global sports superpower. KHELAB aims to deliver the technological core that secures top 3 status in Olympic medals by India's centenary year of independence.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-[11px] font-semibold text-[#30d158] uppercase">The Core Mission</h4>
                      <p className="text-slate-300 leading-relaxed">
                        Democratize elite biomechanical data and AI performance forecasting. Unify local academies, national coaches, private sponsors, and government departments into one high-throughput analytics engine.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/[0.04] pb-2">
                    Brand Design Tokens (Futuristic Indian Tech)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-sans">
                    <div className="space-y-1.5">
                      <span className="text-[9px] text-slate-500 uppercase font-semibold">Primary Blue</span>
                      <div className="h-10 rounded-xl bg-[#0a84ff] flex items-center justify-center text-[10px] font-bold text-white shadow-md">
                        #0A84FF
                      </div>
                      <span className="text-[9px] text-slate-400 block text-center">Apple / High-Tech Neon</span>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[9px] text-slate-500 uppercase font-semibold">Ash Dark Gray</span>
                      <div className="h-10 rounded-xl bg-[#1c1c1e] border border-white/5 flex items-center justify-center text-[10px] font-bold text-[#86868b] shadow-md">
                        #1C1C1E
                      </div>
                      <span className="text-[9px] text-slate-400 block text-center">Material Foundation</span>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[9px] text-slate-500 uppercase font-semibold">Saffron Alert</span>
                      <div className="h-10 rounded-xl bg-[#ff9f0a] flex items-center justify-center text-[10px] font-bold text-black shadow-md">
                        #FF9F0A
                      </div>
                      <span className="text-[9px] text-slate-400 block text-center">Podium 1st / Warning</span>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[9px] text-slate-500 uppercase font-semibold">Sovereign India Blue</span>
                      <div className="h-10 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] flex items-center justify-center text-[10px] font-bold text-white shadow-md">
                        #2563EB &rarr; #8B5CF6
                      </div>
                      <span className="text-[9px] text-slate-400 block text-center">Corporate Identity</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side facts */}
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/[0.04] pb-2">
                    Brand Core Pillars
                  </h3>
                  <div className="space-y-3.5 text-xs font-sans">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-[#0a84ff] mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-white block">Apple-Level Aesthetics</strong>
                        <span className="text-slate-400 text-[11px]">Clean interfaces, minimal layouts, glassmorphism, responsive grid controls.</span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-[#30d158] mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-white block">Formula-1 Telemetry Precision</strong>
                        <span className="text-slate-400 text-[11px]">Zero latency updates, live skeletal vector graphs, exact biomechanics.</span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-[#ff9f0a] mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-white block">Sovereign Data Security</strong>
                        <span className="text-slate-400 text-[11px]">Strict compliance audits, local hosting architecture, athlete DNA isolation.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= AI STRATEGY & ARCHITECTURE TAB ================= */}
          {activeSubTab === "strategy" && (
            <motion.div
              key="strategy"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/[0.04] pb-2 flex items-center">
                  <Layers className="w-3.5 h-3.5 mr-2 text-[#8b5cf6]" />
                  Multi-Modal Sports AI Engine (Khelab DNA Pipeline)
                </h3>
                <p className="text-xs text-slate-400 max-w-3xl leading-relaxed font-sans">
                  The OIOS core implements a composite AI architecture. Telemetry streams from wearable micro-sensors (MQTT over TLS) and computer vision camera feeds are ingested synchronously. Sequential skeleton angles are evaluated using LSTM layers to flag fatigue and micro-deviations, which are then modeled alongside atmospheric factors using XGBoost decision forests to output medal and podium probabilities.
                </p>

                {/* AI Flowchart Schema */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-3 text-center text-xs font-sans">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-1">
                    <span className="text-[9px] text-[#0a84ff] uppercase font-bold tracking-wider">Step 1: Ingestion</span>
                    <strong className="text-white block text-xs mt-1">Multi-Modal Ingest</strong>
                    <span className="text-slate-400 text-[10px] block">WebSocket sensors, camera joint tracking, physiological metrics.</span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-1">
                    <span className="text-[9px] text-[#8b5cf6] uppercase font-bold tracking-wider">Step 2: Processing</span>
                    <strong className="text-white block text-xs mt-1">Biomechanical LSTM</strong>
                    <span className="text-slate-400 text-[10px] block">Sequential motion verification, fatigue analysis, joint-angle overlays.</span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-1">
                    <span className="text-[9px] text-[#ff9f0a] uppercase font-bold tracking-wider">Step 3: Stochastic</span>
                    <strong className="text-white block text-xs mt-1">Podium XGBoost</strong>
                    <span className="text-slate-400 text-[10px] block">Podium probability scoring based on historical tallies, GDP, and biomes.</span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-1">
                    <span className="text-[9px] text-[#30d158] uppercase font-bold tracking-wider">Step 4: LLM Layer</span>
                    <strong className="text-white block text-xs mt-1">Commentary Engine</strong>
                    <span className="text-slate-400 text-[10px] block">Generative translation layers producing high-velocity localized audio feeds.</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0a84ff]/10 border border-[#0a84ff]/20 space-y-1 flex flex-col justify-center">
                    <strong className="text-white block text-xs font-bold uppercase">Podium Prediction</strong>
                    <span className="text-slate-300 text-[10px] block">Actuating dynamic coaching corrections & talent mapping.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= FINANCIAL ENGINE TAB ================= */}
          {activeSubTab === "finance" && (
            <motion.div
              key="finance"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 xl:grid-cols-4 gap-6"
            >
              {/* Sliders (1 column) */}
              <div className="xl:col-span-1 p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] flex flex-col justify-between space-y-5 font-sans">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/[0.04] pb-2">
                    Revenue Variables
                  </h3>

                  {/* Gov Grants */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Gov grants & backing</span>
                      <span className="text-[#0a84ff] font-bold">₹{gdpGrants} Cr</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="500"
                      step="10"
                      value={gdpGrants}
                      onChange={(e) => setGdpGrants(parseInt(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                  </div>

                  {/* Subscriptions */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Pro Sub Cost (Month)</span>
                      <span className="text-white font-bold">₹{subscriptionCost}</span>
                    </div>
                    <input
                      type="range"
                      min="99"
                      max="1999"
                      step="50"
                      value={subscriptionCost}
                      onChange={(e) => setSubscriptionCost(parseInt(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                  </div>

                  {/* Enterprise Count */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Enterprise Academies</span>
                      <span className="text-[#ff9f0a] font-bold">{enterpriseCount} nodes</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="500"
                      step="5"
                      value={enterpriseCount}
                      onChange={(e) => setEnterpriseCount(parseInt(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ff9f0a]"
                    />
                  </div>

                  {/* YoY growth */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">ARR Growth Rate</span>
                      <span className="text-[#30d158] font-bold">{growthYoY}% YoY</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="75"
                      step="1"
                      value={growthYoY}
                      onChange={(e) => setGrowthYoY(parseInt(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#30d158]"
                    />
                  </div>
                </div>

                <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl text-[10px] text-slate-500">
                  Adjust sliders to simulate financial scaling patterns up to India's centenary year (2047).
                </div>
              </div>

              {/* Chart (3 columns) */}
              <div className="xl:col-span-3 p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-4 flex flex-col justify-between min-h-[400px]">
                <div className="flex justify-between items-center border-b border-white/[0.04] pb-2.5">
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center">
                    <TrendingUp className="w-3.5 h-3.5 mr-2 text-[#30d158]" />
                    Revenue Projections Engine (2026 - 2047)
                  </h3>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">INR in Crores</span>
                </div>

                <div className="flex-1 min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={financialData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                      <XAxis dataKey="year" stroke="#86868b" fontSize={10} tickLine={false} />
                      <YAxis stroke="#86868b" fontSize={10} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0d0d11",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: "12px",
                          fontSize: "11px",
                          color: "#f5f5f7"
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "10px", color: "#86868b" }} />
                      <Line
                        type="monotone"
                        dataKey="Subscriber Revenue (Cr)"
                        stroke="#0a84ff"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="Enterprise Licensing (Cr)"
                        stroke="#ff9f0a"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="Gov Grants & Subsidies (Cr)"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="Total Projected Revenue (Cr)"
                        stroke="#30d158"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= INVESTOR PITCH SLIDESHOW ================= */}
          {activeSubTab === "pitch" && (
            <motion.div
              key="pitch"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-3xl rounded-2xl bg-white/[0.01] border border-white/[0.04] overflow-hidden flex flex-col justify-between min-h-[380px] font-sans">
                {/* Slide content header */}
                <div className="p-6 bg-white/[0.01] border-b border-white/[0.04] flex justify-between items-center">
                  <div>
                    <span className="text-[9px] text-[#0a84ff] uppercase font-bold tracking-widest">
                      KHELAB Pitch Deck — Slide {pitchIndex + 1} of {pitchSlides.length}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">
                      {pitchSlides[pitchIndex].title}
                    </h3>
                    <p className="text-[11px] text-[#86868b] mt-0.5">
                      {pitchSlides[pitchIndex].subtitle}
                    </p>
                  </div>
                  <Coins className="w-5 h-5 text-slate-500" />
                </div>

                {/* Slide bullets body */}
                <div className="p-6 flex-1 space-y-4">
                  <ul className="space-y-3.5 text-xs text-slate-300 leading-relaxed pl-1">
                    {pitchSlides[pitchIndex].points.map((p, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-[#0a84ff] mr-2 font-bold">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Slide Footer navigation controls */}
                <div className="p-4 bg-white/[0.02] border-t border-white/[0.04] flex justify-between items-center text-xs">
                  <div className="p-2 px-3 rounded-lg bg-white/[0.03] border border-white/5 font-semibold text-[#30d158]">
                    Telemetry KPI Metric: {pitchSlides[pitchIndex].kpi}
                  </div>
                  
                  <div className="flex space-x-1.5">
                    <button
                      onClick={() => setPitchIndex(prev => Math.max(0, prev - 1))}
                      disabled={pitchIndex === 0}
                      className="p-2 rounded-full bg-white/[0.03] border border-white/5 hover:bg-white hover:text-black cursor-pointer disabled:opacity-30 disabled:hover:bg-white/[0.03] disabled:hover:text-white transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPitchIndex(prev => Math.min(pitchSlides.length - 1, prev + 1))}
                      disabled={pitchIndex === pitchSlides.length - 1}
                      className="p-2 rounded-full bg-white/[0.03] border border-white/5 hover:bg-white hover:text-black cursor-pointer disabled:opacity-30 disabled:hover:bg-white/[0.03] disabled:hover:text-white transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= ROADMAP GANTT TIMELINE TAB ================= */}
          {activeSubTab === "roadmap" && (
            <motion.div
              key="roadmap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 font-sans text-xs"
            >
              <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/[0.04] pb-2 flex items-center">
                <Clock className="w-3.5 h-3.5 mr-2 text-[#ff9f0a]" />
                2047 Long-Term Growth Roadmap
              </h3>

              <div className="relative border-l border-white/[0.08] ml-4 pl-6 space-y-6 py-2">
                {/* Node 1 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 w-3 h-3 rounded-full bg-[#0a84ff] border-2 border-[#08080a] shadow-[0_0_8px_rgba(10,132,255,0.8)]" />
                  <div>
                    <span className="text-[10px] text-[#0a84ff] font-bold block uppercase tracking-wider">Phase 1: Foundation (2026 - 2029)</span>
                    <strong className="text-white block mt-0.5 text-xs">Olympics Launch & Base Telemetry Ingestion</strong>
                    <p className="text-slate-400 text-[11px] mt-1 leading-relaxed max-w-2xl">
                      Integrate KHELAB sensor matrices with top-tier Indian national squads (Javelin, Archery, Shooting) ahead of LA28. Launch consumer portal subscriptions and deploy edge server hubs in major sports nodes across India.
                    </p>
                  </div>
                </div>

                {/* Node 2 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 w-3 h-3 rounded-full bg-[#8b5cf6] border-2 border-[#08080a]" />
                  <div>
                    <span className="text-[10px] text-[#8b5cf6] font-bold block uppercase tracking-wider">Phase 2: Scaling (2030 - 2035)</span>
                    <strong className="text-white block mt-0.5 text-xs">Grassroots Academy Expansion & Talent Search Mapping</strong>
                    <p className="text-slate-400 text-[11px] mt-1 leading-relaxed max-w-2xl">
                      Onboard 10,000+ local sports academies onto the Academy Portal. Launch state-level Government talent mapping indexing (NationIQ) in conjunction with Khelo India to systematically discover high-SPI grassroots athletes.
                    </p>
                  </div>
                </div>

                {/* Node 3 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 w-3 h-3 rounded-full bg-[#ff9f0a] border-2 border-[#08080a]" />
                  <div>
                    <span className="text-[10px] text-[#ff9f0a] font-bold block uppercase tracking-wider">Phase 3: Integration (2036 - 2042)</span>
                    <strong className="text-white block mt-0.5 text-xs">Central sovereign Sports Engine Partnership</strong>
                    <p className="text-slate-400 text-[11px] mt-1 leading-relaxed max-w-2xl">
                      Act as the primary sovereign software partner for hosting operations. Deploy real-time spectator commentary and F1-style live athlete biometric telemetry tracking on broadcast networks.
                    </p>
                  </div>
                </div>

                {/* Node 4 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 w-3 h-3 rounded-full bg-[#30d158] border-2 border-[#08080a]" />
                  <div>
                    <span className="text-[10px] text-[#30d158] font-bold block uppercase tracking-wider">Phase 4: Sovereignty (2043 - 2047)</span>
                    <strong className="text-white block mt-0.5 text-xs">Centenary Sports Superpower Status</strong>
                    <p className="text-slate-400 text-[11px] mt-1 leading-relaxed max-w-2xl">
                      Achieve 25 Million+ registered athlete profiles. Establish India's global monopoly on predictive sports data models, biological digital twin telemetry, and sovereign training frameworks.
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
