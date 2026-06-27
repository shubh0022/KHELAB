"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Server,
  ShieldAlert,
  Terminal,
  Play,
  RotateCw,
  RefreshCw,
  Cpu,
  Database,
  Globe,
  Wifi,
  Lock
} from "lucide-react";

export default function FounderCommandCenter() {
  const [activeSubTab, setActiveSubTab] = useState<
    "business" | "infrastructure" | "security" | "sandbox"
  >("business");

  // Tickers state
  const [arr, setArr] = useState<number>(124562912);
  const [mau, setMau] = useState<number>(1245910);
  const [transactedVolume, setTransactedVolume] = useState<number>(84501239);

  // Cloud infrastructure states
  const [cpuUsage, setCpuUsage] = useState<number>(38);
  const [memoryUsage, setMemoryUsage] = useState<number>(56);
  const [latency, setLatency] = useState<number>(14);

  // API Sandbox states
  const [apiEndpoint, setApiEndpoint] = useState<string>("GET /v1/athletes/neeraj_chopra");
  const [apiPayload, setApiPayload] = useState<string>("{\n  \"gdpMultiplier\": 1.0,\n  \"recoveryMultiplier\": 1.0\n}");
  const [apiResponse, setApiResponse] = useState<string>("// Send a request to see the response payload");
  const [apiResponseHeaders, setApiResponseHeaders] = useState<string>("");
  const [apiLoading, setApiLoading] = useState<boolean>(false);

  // Security scrolling log
  const [securityLogs, setSecurityLogs] = useState<string[]>([
    "SECURE: WAF blocked SQL Injection attempt from IP 184.22.105.12",
    "DEPLOY: Automated canary release v1.2.5 promoted to 10% traffic",
    "AUDIT: DB transaction logs replication completed successfully in 0.8s",
    "SECURE: Sentinel micro-agent verified checksum integrity for /v1/telemetry"
  ]);

  const securityLogsEndRef = useRef<HTMLDivElement>(null);

  // Auto-tickers simulate live business
  useEffect(() => {
    const timer = setInterval(() => {
      setArr(prev => prev + Math.floor(Math.random() * 45));
      setMau(prev => prev + (Math.random() > 0.7 ? 1 : 0));
      setTransactedVolume(prev => prev + Math.floor(Math.random() * 20));
      
      // Randomize Cloud metrics slightly
      setCpuUsage(prev => Math.min(95, Math.max(20, prev + Math.floor(Math.random() * 7) - 3)));
      setMemoryUsage(prev => Math.min(90, Math.max(40, prev + Math.floor(Math.random() * 3) - 1)));
      setLatency(prev => Math.min(30, Math.max(8, prev + Math.floor(Math.random() * 5) - 2)));
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  // Simulate security logging ticker
  useEffect(() => {
    const timer = setInterval(() => {
      const logs = [
        "SECURE: WAF blocked Cross-Site Scripting (XSS) payload from IP 91.102.32.184",
        "SECURE: SSL/TLS Handshake completed successfully for client-node Edge-Calcutta-03",
        "AUDIT: Automated key rotation completed for cryptographic telemetry store",
        "MONITOR: API Gateway registered 1,200 concurrent ingress requests/sec (AP-SOUTH-1)",
        "DEPLOY: Canary deployment v1.2.5 successfully promoted to 100% traffic (Nominal)",
        "MONITOR: Edge-node Singapore health index 99.8%"
      ];
      const selected = logs[Math.floor(Math.random() * logs.length)];
      const time = new Date().toLocaleTimeString();
      setSecurityLogs(prev => [...prev.slice(-15), `[${time}] ${selected}`]);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  // Auto-scroll logs
  useEffect(() => {
    if (securityLogsEndRef.current) {
      securityLogsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [securityLogs]);

  // Handle Sandbox Trigger
  const handleSendApiRequest = () => {
    setApiLoading(true);
    setApiResponse("// Awaiting socket release...");
    
    setTimeout(() => {
      setApiResponseHeaders(
        `HTTP/1.1 200 OK\nDate: ${new Date().toUTCString()}\nContent-Type: application/json\nServer: KhelabSovereignGateway/1.4\nX-Inference-Time: ${Math.floor(Math.random() * 8) + 4}ms`
      );

      if (apiEndpoint === "GET /v1/athletes/neeraj_chopra") {
        setApiResponse(JSON.stringify({
          status: "success",
          data: {
            id: "neeraj_chopra",
            name: "Neeraj Chopra",
            countryId: "IND",
            sport: "Athletics",
            biomechanics: {
              peakVelocityMs: 31.8,
              movementEfficiency: 96,
              jointAngles: {
                shoulderAbduction: 110,
                elbowExtension: 165
              }
            },
            injuryRisk: 12,
            podiumProbability: {
              gold: 85,
              any: 98
            }
          }
        }, null, 2));
      } else if (apiEndpoint === "GET /v1/countries/IND/spi") {
        setApiResponse(JSON.stringify({
          status: "success",
          data: {
            countryId: "IND",
            name: "India",
            sportsPowerIndex: 67.5,
            rank: 6,
            growthPotentialPercentage: 94,
            projectedMedals2028: {
              min: 12,
              max: 18
            }
          }
        }, null, 2));
      } else if (apiEndpoint === "POST /v1/simulations/live") {
        let payloadParsed = {};
        try {
          payloadParsed = JSON.parse(apiPayload);
        } catch(e) {}
        setApiResponse(JSON.stringify({
          status: "success",
          simulationId: "sim_" + Math.random().toString(36).substr(2, 9),
          parameters: payloadParsed,
          stochasticPodiumWinner: {
            athleteId: "neeraj_chopra",
            projectedValue: "90.25m",
            confidenceIndex: 0.94
          }
        }, null, 2));
      } else if (apiEndpoint === "GET /v1/records/vault") {
        setApiResponse(JSON.stringify({
          status: "success",
          totalRecords: 140,
          brokenThisCycle: 2,
          lastDetected: {
            athleteName: "Leon Marchand",
            discipline: "Men's 400m IM Swim",
            recordValue: "4:02.50"
          }
        }, null, 2));
      }
      setApiLoading(false);
    }, 1000);
  };

  // Preset payload updates
  const handleEndpointChange = (val: string) => {
    setApiEndpoint(val);
    if (val === "POST /v1/simulations/live") {
      setApiPayload("{\n  \"sport\": \"Javelin Throw\",\n  \"gdpMultiplier\": 1.2,\n  \"recoveryMultiplier\": 1.4\n}");
    } else {
      setApiPayload("{\n  \"gdpMultiplier\": 1.0,\n  \"recoveryMultiplier\": 1.0\n}");
    }
  };

  return (
    <div className="glassmorphic rounded-2xl p-6 space-y-6 flex-1 flex flex-col min-h-[600px] text-[#f5f5f7]">
      {/* Tab navigation */}
      <div className="border-b border-white/[0.06] pb-3 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-sm font-bold tracking-wider text-white uppercase flex items-center">
            <Terminal className="w-4 h-4 mr-2 text-[#ff9f0a]" />
            FOUNDER COMMAND CENTER
          </h2>
          <p className="text-[10px] text-[#86868b] mt-0.5">Corporate business statistics, telemetry sandboxes, and node health dashboards</p>
        </div>

        <div className="flex flex-wrap gap-1 bg-white/[0.03] p-1 rounded-lg border border-white/[0.04]">
          <button
            onClick={() => setActiveSubTab("business")}
            className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
              activeSubTab === "business" ? "bg-white text-black" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Business KPIs
          </button>
          <button
            onClick={() => setActiveSubTab("infrastructure")}
            className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
              activeSubTab === "infrastructure" ? "bg-white text-black" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Cloud Nodes
          </button>
          <button
            onClick={() => setActiveSubTab("security")}
            className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
              activeSubTab === "security" ? "bg-white text-black" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Security & DevOps
          </button>
          <button
            onClick={() => setActiveSubTab("sandbox")}
            className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
              activeSubTab === "sandbox" ? "bg-white text-black" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            API Sandbox
          </button>
        </div>
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          {/* ================= BUSINESS KPIS TAB ================= */}
          {activeSubTab === "business" && (
            <motion.div
              key="business"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans text-xs"
            >
              {/* Box 1 */}
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-2 relative overflow-hidden">
                <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">Annual Recurring Revenue (ARR)</span>
                <h4 className="text-xl font-bold text-white tracking-tight">
                  ₹{(arr / 10000000).toFixed(4)} Cr
                </h4>
                <span className="text-[#30d158] text-[10px] font-bold flex items-center">
                  +14.82% Year-to-Date
                </span>
              </div>

              {/* Box 2 */}
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-2">
                <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">Monthly Active Users (MAU)</span>
                <h4 className="text-xl font-bold text-white tracking-tight">
                  {mau.toLocaleString()}
                </h4>
                <span className="text-[#30d158] text-[10px] font-bold flex items-center">
                  +8.4% MoM Growth
                </span>
              </div>

              {/* Box 3 */}
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-2">
                <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">LTV / CAC Ratio</span>
                <h4 className="text-xl font-bold text-white tracking-tight">
                  5.42x
                </h4>
                <span className="text-slate-400 text-[10px]">CAC Average: ₹182 per user</span>
              </div>

              {/* Box 4 */}
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-2">
                <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">Platform Transactions Volume</span>
                <h4 className="text-xl font-bold text-[#ff9f0a] tracking-tight">
                  ₹{(transactedVolume / 10000000).toFixed(4)} Cr
                </h4>
                <span className="text-[#30d158] text-[10px] font-bold">
                  99.98% Gateway Success Rate
                </span>
              </div>
            </motion.div>
          )}

          {/* ================= CLOUD INFRASTRUCTURE TAB ================= */}
          {activeSubTab === "infrastructure" && (
            <motion.div
              key="infrastructure"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans text-xs"
            >
              {/* Macro Node Map Simulator */}
              <div className="lg:col-span-2 p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/[0.04] pb-2 flex items-center">
                  <Globe className="w-3.5 h-3.5 mr-2 text-[#0a84ff]" />
                  Global Ingest Nodes Topology
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* node 1 */}
                  <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <Server className="w-4 h-4 text-[#30d158]" />
                      <div>
                        <h4 className="font-semibold text-white">ap-south-1a (Mumbai Main)</h4>
                        <span className="text-[9px] text-slate-500 uppercase">Kubernetes Pod Pool</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-white block">42% Load</span>
                      <span className="text-[9px] text-[#30d158] uppercase font-bold">Healthy</span>
                    </div>
                  </div>

                  {/* node 2 */}
                  <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <Server className="w-4 h-4 text-[#30d158]" />
                      <div>
                        <h4 className="font-semibold text-white">ap-south-2a (Hyderabad Replica)</h4>
                        <span className="text-[9px] text-slate-500 uppercase">Postgres Main DB</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-white block">56% Load</span>
                      <span className="text-[9px] text-[#30d158] uppercase font-bold">Healthy</span>
                    </div>
                  </div>

                  {/* node 3 */}
                  <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <Globe className="w-4 h-4 text-[#0a84ff]" />
                      <div>
                        <h4 className="font-semibold text-white">eu-central-1 (Frankfurt Edge)</h4>
                        <span className="text-[9px] text-slate-500 uppercase">CDN Cache Node</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-white block">18% Load</span>
                      <span className="text-[9px] text-[#0a84ff] uppercase font-bold">Latency 104ms</span>
                    </div>
                  </div>

                  {/* node 4 */}
                  <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <Globe className="w-4 h-4 text-[#0a84ff]" />
                      <div>
                        <h4 className="font-semibold text-white">us-east-1 (Virginia Edge)</h4>
                        <span className="text-[9px] text-slate-500 uppercase">CDN Cache Node</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-white block">24% Load</span>
                      <span className="text-[9px] text-[#0a84ff] uppercase font-bold">Latency 118ms</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Telemetry charts column */}
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/[0.04] pb-2 flex items-center">
                  <Cpu className="w-3.5 h-3.5 mr-2 text-slate-400" />
                  Primary Node Telemetry
                </h3>
                
                <div className="space-y-4 pt-1">
                  <div className="space-y-1.5">
                    <div className="flex justify-between font-medium">
                      <span className="text-slate-400">Total CPU Utilization</span>
                      <span className="text-white font-bold">{cpuUsage}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="bg-[#30d158] h-full transition-all duration-1000" style={{ width: `${cpuUsage}%` }}></div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between font-medium">
                      <span className="text-slate-400">Primary Database Memory</span>
                      <span className="text-white font-bold">{memoryUsage}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="bg-[#0a84ff] h-full transition-all duration-1000" style={{ width: `${memoryUsage}%` }}></div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between font-medium">
                      <span className="text-slate-400">Ingress Gateway Latency</span>
                      <span className="text-white font-bold">{latency} ms</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="bg-[#ff9f0a] h-full transition-all duration-1000" style={{ width: `${latency * 3.3}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= SECURITY & DEVOPS TAB ================= */}
          {activeSubTab === "security" && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-4 gap-6 font-sans text-xs"
            >
              {/* KPIs (1 column) */}
              <div className="lg:col-span-1 space-y-4">
                <div className="p-4 bg-white/[0.01] border border-white/[0.04] rounded-2xl text-center space-y-1">
                  <Lock className="w-6 h-6 text-[#30d158] mx-auto" />
                  <span className="text-[8px] text-slate-500 block uppercase font-bold tracking-wider">Firewall Status</span>
                  <span className="text-sm font-semibold text-white">Active & Scrubbing</span>
                </div>

                <div className="p-4 bg-white/[0.01] border border-white/[0.04] rounded-2xl text-center space-y-1">
                  <ShieldAlert className="w-6 h-6 text-[#ff9f0a] mx-auto animate-pulse" />
                  <span className="text-[8px] text-slate-500 block uppercase font-bold tracking-wider">WAF blocks today</span>
                  <span className="text-base font-bold text-white">12,402 attempts</span>
                </div>
              </div>

              {/* Logs terminal (3 columns) */}
              <div className="lg:col-span-3 p-5 rounded-2xl bg-[#0a0a0c] border border-white/[0.04] flex flex-col h-[280px]">
                <div className="flex justify-between items-center border-b border-white/[0.06] pb-2 mb-2">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    SecOps & Deployment Stream log
                  </h4>
                  <span className="text-[8px] bg-[#30d158]/10 text-[#30d158] px-2 py-0.5 rounded-full font-bold">MONITOR ACTIVE</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-1.5 text-[9px] font-mono text-slate-400 pr-1.5 leading-relaxed">
                  {securityLogs.map((log, idx) => (
                    <div key={idx} className="border-b border-white/[0.02] pb-1">
                      <span className={log.includes("SECURE") ? "text-green-400" : log.includes("DEPLOY") ? "text-[#0a84ff] font-semibold" : "text-yellow-500"}>
                        {log}
                      </span>
                    </div>
                  ))}
                  <div ref={securityLogsEndRef} />
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= API SANDBOX TAB ================= */}
          {activeSubTab === "sandbox" && (
            <motion.div
              key="sandbox"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-sans text-xs"
            >
              {/* Config panel (5 columns) */}
              <div className="lg:col-span-5 p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] flex flex-col justify-between space-y-4">
                <div className="space-y-3.5">
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/[0.04] pb-2">
                    Request Configurator
                  </h3>

                  <div className="space-y-1">
                    <span className="text-[9px] text-slate-500 uppercase font-semibold">Select Endpoint</span>
                    <select
                      value={apiEndpoint}
                      onChange={(e) => handleEndpointChange(e.target.value)}
                      className="w-full bg-[#1c1c1e] border border-white/[0.06] rounded-xl px-3 py-2 text-slate-200 outline-none cursor-pointer"
                    >
                      <option value="GET /v1/athletes/neeraj_chopra">GET /v1/athletes/neeraj_chopra</option>
                      <option value="GET /v1/countries/IND/spi">GET /v1/countries/IND/spi</option>
                      <option value="POST /v1/simulations/live">POST /v1/simulations/live</option>
                      <option value="GET /v1/records/vault">GET /v1/records/vault</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] text-slate-500 uppercase font-semibold">JSON Request Payload (Editable)</span>
                    <textarea
                      value={apiPayload}
                      onChange={(e) => setApiPayload(e.target.value)}
                      className="w-full h-24 bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 text-[10px] font-mono text-slate-200 focus:border-white/20 outline-none resize-none"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSendApiRequest}
                  disabled={apiLoading}
                  className="w-full py-2 bg-white text-black hover:bg-white/90 disabled:opacity-40 rounded-xl font-bold cursor-pointer transition-all flex items-center justify-center space-x-1.5"
                >
                  {apiLoading ? (
                    <>
                      <RotateCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-black" />
                      <span>Execute Sandbox Request</span>
                    </>
                  )}
                </button>
              </div>

              {/* Terminal panel (7 columns) */}
              <div className="lg:col-span-7 p-5 rounded-2xl bg-[#0a0a0c] border border-white/[0.04] flex flex-col justify-between h-[360px] lg:h-auto font-mono text-[10px]">
                <div className="space-y-3.5 flex-1 flex flex-col overflow-hidden">
                  <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/[0.06] pb-2 flex-shrink-0">
                    HTTP RESPONSE
                  </h4>
                  
                  {/* Response headers */}
                  {apiResponseHeaders && (
                    <pre className="text-[9px] text-slate-500 border-b border-white/[0.02] pb-1.5 flex-shrink-0 select-none whitespace-pre-wrap leading-relaxed">
                      {apiResponseHeaders}
                    </pre>
                  )}

                  {/* Response body */}
                  <div className="flex-1 overflow-y-auto pr-1">
                    <pre className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {apiResponse}
                    </pre>
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
