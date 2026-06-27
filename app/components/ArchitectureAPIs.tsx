"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Database,
  Globe,
  Lock,
  GitBranch,
  Layers,
  Server,
  Cloud,
  ChevronRight,
  Code
} from "lucide-react";

export default function ArchitectureAPIs() {
  const [activeSubTab, setActiveSubTab] = useState<
    "api" | "database" | "topology"
  >("api");

  // OpenAPI selections
  const [selectedApi, setSelectedApi] = useState<string>("GET /v1/athletes");

  const apiSpecs: { [key: string]: any } = {
    "GET /v1/athletes": {
      summary: "Retrieve a paginated list of athlete profiles matching specific sport filters.",
      headers: {
        "Authorization": "Bearer <API_JWT_TOKEN> (Required)",
        "Accept": "application/json"
      },
      queryParams: [
        { name: "sport", type: "string", desc: "Filter by sports category (e.g. Athletics, Swimming)." },
        { name: "countryId", type: "string", desc: "Filter by ISO 3-letter country code (e.g. IND, CHN)." },
        { name: "page", type: "integer", desc: "Page offset index (Default: 1)." }
      ],
      response: {
        status: 200,
        body: `{
  "status": "success",
  "data": [
    {
      "id": "neeraj_chopra",
      "name": "Neeraj Chopra",
      "countryId": "IND",
      "sport": "Athletics",
      "discipline": "Men's Javelin Throw",
      "rank": 1
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 12
  }
}`
      }
    },
    "GET /v1/countries": {
      summary: "Retrieve national statistics and Sports Power Index (SPI) configurations.",
      headers: {
        "Authorization": "Bearer <API_JWT_TOKEN> (Required)"
      },
      queryParams: [
        { name: "ranked", type: "boolean", desc: "Sort by Sports Power Index ranking (Default: true)." }
      ],
      response: {
        status: 200,
        body: `{
  "status": "success",
  "data": [
    {
      "id": "IND",
      "name": "India",
      "flag": "🇮🇳",
      "sportsPowerIndex": 67.5,
      "growthPotential": 94
    }
  ]
}`
      }
    },
    "POST /v1/simulations/predict": {
      summary: "Compute stochastic trajectory and medal forecast curves.",
      headers: {
        "Authorization": "Bearer <API_JWT_TOKEN> (Required)",
        "Content-Type": "application/json"
      },
      bodyParams: [
        { name: "athleteId", type: "string", desc: "Unique identifier for the target athlete." },
        { name: "gdpMultiplier", type: "float", desc: "What-if GDP funding multiplier coefficient [0.5 - 2.0]." },
        { name: "recoveryMultiplier", type: "float", desc: "What-if recovery boost coefficient [0.5 - 2.0]." }
      ],
      response: {
        status: 202,
        body: `{
  "status": "accepted",
  "simulationId": "sim_84f923b0a2",
  "results": {
    "goldProbability": 0.85,
    "injuryRiskFactor": 0.12,
    "projectedOutcomes": [
      { "attempt": 1, "predictedDistance": "88.42m" },
      { "attempt": 5, "predictedDistance": "91.24m" }
    ]
  }
}`
      }
    },
    "GET /v1/records": {
      summary: "Query the real-time world/Olympic record vault caches.",
      headers: {},
      queryParams: [
        { name: "recordType", type: "string", desc: "Filter by 'World Record' or 'Olympic Record'." }
      ],
      response: {
        status: 200,
        body: `{
  "status": "success",
  "records": [
    {
      "discipline": "Men's 100m Sprint",
      "athleteName": "Noah Lyles",
      "recordValue": "9.56s",
      "recordType": "World Record",
      "yearSet": 2026
    }
  ]
}`
      }
    }
  };

  return (
    <div className="glassmorphic rounded-2xl p-6 space-y-6 flex-1 flex flex-col min-h-[600px] text-[#f5f5f7]">
      {/* Sub tabs switcher */}
      <div className="border-b border-white/[0.06] pb-3 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-sm font-bold tracking-wider text-white uppercase flex items-center">
            <Layers className="w-4 h-4 mr-2 text-[#0a84ff]" />
            KHELAB TECH BLUEPRINTS
          </h2>
          <p className="text-[10px] text-[#86868b] mt-0.5">Interactive schemas, API specs, and multi-region deployment maps</p>
        </div>

        <div className="flex flex-wrap gap-1 bg-white/[0.03] p-1 rounded-lg border border-white/[0.04]">
          <button
            onClick={() => setActiveSubTab("api")}
            className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
              activeSubTab === "api" ? "bg-white text-black" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            API Reference
          </button>
          <button
            onClick={() => setActiveSubTab("database")}
            className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
              activeSubTab === "database" ? "bg-white text-black" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Database Schema
          </button>
          <button
            onClick={() => setActiveSubTab("topology")}
            className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
              activeSubTab === "topology" ? "bg-white text-black" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Cloud Topology
          </button>
        </div>
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          {/* ================= API REFERENCE ================= */}
          {activeSubTab === "api" && (
            <motion.div
              key="api"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-sans text-xs"
            >
              {/* Left pane: selector (4 cols) */}
              <div className="lg:col-span-4 p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-3.5">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/[0.04] pb-2">
                  Endpoints List
                </h3>
                
                <div className="space-y-2">
                  {Object.keys(apiSpecs).map((endpoint) => (
                    <button
                      key={endpoint}
                      onClick={() => setSelectedApi(endpoint)}
                      className={`w-full text-left p-3 rounded-xl border text-[11px] font-mono transition-all cursor-pointer ${
                        selectedApi === endpoint
                          ? "bg-white text-black border-white"
                          : "bg-white/[0.01] border-white/[0.04] text-slate-300 hover:bg-white/[0.03] hover:border-white/[0.08]"
                      }`}
                    >
                      <span className={endpoint.startsWith("GET") ? "text-green-500 font-bold" : "text-[#0a84ff] font-bold"}>
                        {endpoint.split(" ")[0]}
                      </span>{" "}
                      {endpoint.split(" ")[1]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right pane: documentation (8 cols) */}
              <div className="lg:col-span-8 p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-4">
                <div className="border-b border-white/[0.06] pb-3">
                  <h3 className="text-sm font-semibold tracking-tight text-white font-mono flex items-center">
                    <Code className="w-4 h-4 mr-2 text-slate-400" />
                    {selectedApi}
                  </h3>
                  <p className="text-[11px] text-[#86868b] mt-1">
                    {apiSpecs[selectedApi].summary}
                  </p>
                </div>

                {/* Headers */}
                {Object.keys(apiSpecs[selectedApi].headers).length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Request Headers</span>
                    <pre className="p-3 bg-[#0a0a0c] border border-white/[0.04] rounded-xl text-[10px] font-mono text-slate-300">
                      {Object.entries(apiSpecs[selectedApi].headers).map(([k, v]) => `${k}: ${v}`).join("\n")}
                    </pre>
                  </div>
                )}

                {/* Query parameters */}
                {apiSpecs[selectedApi].queryParams && (
                  <div className="space-y-1.5">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Query Parameters</span>
                    <table className="w-full border-collapse text-[10px] text-left">
                      <thead>
                        <tr className="border-b border-white/[0.06] text-slate-500">
                          <th className="pb-1.5 font-semibold">NAME</th>
                          <th className="pb-1.5 font-semibold">TYPE</th>
                          <th className="pb-1.5 font-semibold">DESCRIPTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {apiSpecs[selectedApi].queryParams.map((p: any) => (
                          <tr key={p.name} className="border-b border-white/[0.02]">
                            <td className="py-2 font-semibold text-white font-mono">{p.name}</td>
                            <td className="text-slate-400 font-mono">{p.type}</td>
                            <td className="text-slate-300">{p.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Body parameters */}
                {apiSpecs[selectedApi].bodyParams && (
                  <div className="space-y-1.5">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Request Body Attributes</span>
                    <table className="w-full border-collapse text-[10px] text-left">
                      <thead>
                        <tr className="border-b border-white/[0.06] text-slate-500">
                          <th className="pb-1.5 font-semibold">NAME</th>
                          <th className="pb-1.5 font-semibold">TYPE</th>
                          <th className="pb-1.5 font-semibold">DESCRIPTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {apiSpecs[selectedApi].bodyParams.map((p: any) => (
                          <tr key={p.name} className="border-b border-white/[0.02]">
                            <td className="py-2 font-semibold text-white font-mono">{p.name}</td>
                            <td className="text-slate-400 font-mono">{p.type}</td>
                            <td className="text-slate-300">{p.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Response payload */}
                <div className="space-y-1.5">
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                    Response JSON Schema ({apiSpecs[selectedApi].response.status} OK)
                  </span>
                  <pre className="p-3 bg-[#0a0a0c] border border-white/[0.04] rounded-xl text-[10px] font-mono text-slate-300 overflow-x-auto">
                    {apiSpecs[selectedApi].response.body}
                  </pre>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= DATABASE ERD SCHEMA ================= */}
          {activeSubTab === "database" && (
            <motion.div
              key="database"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans text-xs"
            >
              {/* Table 1: countries */}
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-3">
                <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
                  <strong className="text-white font-mono text-xs">Table: countries</strong>
                  <span className="text-[8px] bg-slate-500/10 text-slate-400 border border-slate-500/20 px-2 py-0.5 rounded-full font-bold">PRIMARY KEY: id</span>
                </div>
                <div className="space-y-2 text-[10px] font-mono text-slate-400">
                  <div className="flex justify-between"><span className="text-white font-semibold">id: VARCHAR(3)</span><span>[PK]</span></div>
                  <div className="flex justify-between"><span>name: VARCHAR(100)</span></div>
                  <div className="flex justify-between"><span>gdp_usd: NUMERIC(20,2)</span></div>
                  <div className="flex justify-between"><span>population: BIGINT</span></div>
                  <div className="flex justify-between"><span>sports_power_index: REAL</span></div>
                  <div className="flex justify-between"><span>growth_potential: REAL</span></div>
                </div>
              </div>

              {/* Table 2: athletes */}
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-3">
                <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
                  <strong className="text-white font-mono text-xs">Table: athletes</strong>
                  <span className="text-[8px] bg-slate-500/10 text-slate-400 border border-slate-500/20 px-2 py-0.5 rounded-full font-bold">PRIMARY KEY: id</span>
                </div>
                <div className="space-y-2 text-[10px] font-mono text-slate-400">
                  <div className="flex justify-between"><span className="text-white font-semibold">id: VARCHAR(100)</span><span>[PK]</span></div>
                  <div className="flex justify-between"><span>name: VARCHAR(200)</span></div>
                  <div className="flex justify-between"><span className="text-[#0a84ff]">country_id: VARCHAR(3)</span><span>[FK &rarr; countries.id]</span></div>
                  <div className="flex justify-between"><span>sport: VARCHAR(100)</span></div>
                  <div className="flex justify-between"><span>rank: INT</span></div>
                  <div className="flex justify-between"><span>height: NUMERIC(5,2)</span></div>
                  <div className="flex justify-between"><span>weight: NUMERIC(5,2)</span></div>
                  <div className="flex justify-between"><span>injury_risk: REAL</span></div>
                </div>
              </div>

              {/* Table 3: telemetry_logs */}
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-3">
                <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
                  <strong className="text-white font-mono text-xs">Table: telemetry_logs</strong>
                  <span className="text-[8px] bg-slate-500/10 text-slate-400 border border-slate-500/20 px-2 py-0.5 rounded-full font-bold">PRIMARY KEY: id</span>
                </div>
                <div className="space-y-2 text-[10px] font-mono text-slate-400">
                  <div className="flex justify-between"><span className="text-white font-semibold">id: BIGSERIAL</span><span>[PK]</span></div>
                  <div className="flex justify-between"><span className="text-[#0a84ff]">athlete_id: VARCHAR(100)</span><span>[FK &rarr; athletes.id]</span></div>
                  <div className="flex justify-between"><span>heart_rate: INT</span></div>
                  <div className="flex justify-between"><span>oxygen_saturation: INT</span></div>
                  <div className="flex justify-between"><span>muscle_fatigue_index: REAL</span></div>
                  <div className="flex justify-between"><span>recorded_at: TIMESTAMP</span></div>
                </div>
              </div>

              {/* Table 4: academies */}
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-3">
                <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
                  <strong className="text-white font-mono text-xs">Table: academies</strong>
                  <span className="text-[8px] bg-slate-500/10 text-slate-400 border border-slate-500/20 px-2 py-0.5 rounded-full font-bold">PRIMARY KEY: id</span>
                </div>
                <div className="space-y-2 text-[10px] font-mono text-slate-400">
                  <div className="flex justify-between"><span className="text-white font-semibold">id: VARCHAR(100)</span><span>[PK]</span></div>
                  <div className="flex justify-between"><span>name: VARCHAR(200)</span></div>
                  <div className="flex justify-between"><span>location: VARCHAR(200)</span></div>
                  <div className="flex justify-between"><span>license_level: INT</span></div>
                </div>
              </div>

              {/* Table 5: facilities */}
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-3">
                <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
                  <strong className="text-white font-mono text-xs">Table: facilities</strong>
                  <span className="text-[8px] bg-slate-500/10 text-slate-400 border border-slate-500/20 px-2 py-0.5 rounded-full font-bold">PRIMARY KEY: id</span>
                </div>
                <div className="space-y-2 text-[10px] font-mono text-slate-400">
                  <div className="flex justify-between"><span className="text-white font-semibold">id: BIGSERIAL</span><span>[PK]</span></div>
                  <div className="flex justify-between"><span className="text-[#0a84ff]">academy_id: VARCHAR(100)</span><span>[FK &rarr; academies.id]</span></div>
                  <div className="flex justify-between"><span>name: VARCHAR(100)</span></div>
                  <div className="flex justify-between"><span>capacity: INT</span></div>
                  <div className="flex justify-between"><span>reserved_slots: JSONB</span></div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= CLOUD TOPOLOGY MAP ================= */}
          {activeSubTab === "topology" && (
            <motion.div
              key="topology"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 font-sans text-xs"
            >
              <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/[0.04] pb-2">
                Unified Cloud Ingestion & Security Topologies
              </h3>

              {/* Network flow diagram */}
              <div className="grid grid-cols-1 md:grid-cols-7 gap-3 text-center text-[10px] font-sans">
                {/* Node 1 */}
                <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl flex flex-col justify-center items-center">
                  <Globe className="w-5 h-5 text-slate-400 mb-1" />
                  <span className="text-[9px] uppercase font-bold text-slate-500">Source Ingest</span>
                  <strong className="text-white mt-0.5">Biometric Devices</strong>
                  <span className="text-[8px] text-slate-500 mt-0.5 block">Smart suit sensors / IP Cameras</span>
                </div>
                
                <div className="flex items-center justify-center text-slate-500 font-semibold"><ChevronRight className="w-4 h-4" /></div>

                {/* Node 2 */}
                <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl flex flex-col justify-center items-center">
                  <Lock className="w-5 h-5 text-[#ff453a] mb-1" />
                  <span className="text-[9px] uppercase font-bold text-[#ff453a]">Security Edge</span>
                  <strong className="text-white mt-0.5">Cloudflare WAF</strong>
                  <span className="text-[8px] text-slate-500 mt-0.5 block">DDoS Scrubbing & IP limiting</span>
                </div>

                <div className="flex items-center justify-center text-slate-500 font-semibold"><ChevronRight className="w-4 h-4" /></div>

                {/* Node 3 */}
                <div className="p-3 bg-[#0a84ff]/10 border border-[#0a84ff]/20 rounded-xl flex flex-col justify-center items-center">
                  <Cpu className="w-5 h-5 text-[#0a84ff] mb-1" />
                  <span className="text-[9px] uppercase font-bold text-[#0a84ff]">Ingress API</span>
                  <strong className="text-white mt-0.5">EKS Gateway Cluster</strong>
                  <span className="text-[8px] text-slate-400 mt-0.5 block">Docker pods scaling dynamically</span>
                </div>

                <div className="flex items-center justify-center text-slate-500 font-semibold"><ChevronRight className="w-4 h-4" /></div>

                {/* Node 4 */}
                <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl flex flex-col justify-center items-center">
                  <Database className="w-5 h-5 text-[#30d158] mb-1" />
                  <span className="text-[9px] uppercase font-bold text-[#30d158]">Data Vault</span>
                  <strong className="text-white mt-0.5">PostgreSQL Cluster</strong>
                  <span className="text-[8px] text-slate-500 mt-0.5 block">AP-SOUTH-1 replication setup</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
