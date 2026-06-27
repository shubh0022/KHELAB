"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Activity,
  Globe,
  Award,
  Zap,
  TrendingUp,
  BrainCircuit,
  Search,
  Download,
  AlertTriangle,
  Flame,
  Volume2,
  FileSpreadsheet,
  Coins,
  ChevronRight,
  Shield,
  Clock,
  Sparkles,
  Layers,
  Scale,
  RefreshCw
} from "lucide-react";

// Mock Databases
import { countriesData, CountryData } from "../data/countries";
import { athletesData, AthleteData } from "../data/athletes";
import { liveEventsData, recordsVaultData, LiveEvent } from "../data/events";

// Utilities
import { getRankedCountries, calculateCountrySPI } from "../utils/spi";
import { KhelabOracle } from "../utils/oracleModel";

// Components
import Globe3D from "./components/Globe3D";
import RadarChart from "./components/RadarChart";
import ReportModal from "./components/ReportModal";
import DigitalTwin from "./components/DigitalTwin";
import ExecutiveHub from "./components/ExecutiveHub";
import FounderCommandCenter from "./components/FounderCommandCenter";
import StakeholderPortals from "./components/StakeholderPortals";
import ArchitectureAPIs from "./components/ArchitectureAPIs";
import SystemDocs from "./components/SystemDocs";

function renderTextWithBold(text: string): React.ReactNode[] {
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return <strong key={i} className="text-white font-bold">{part}</strong>;
    }
    const italicParts = part.split(/\*([^*]+)\*/g);
    return italicParts.map((ip, j) => {
      if (j % 2 === 1) {
        return <em key={j} className="text-slate-400 italic">{ip}</em>;
      }
      return ip;
    }) as any;
  }) as any;
}

function renderFormattedAnswer(text: string): React.ReactNode {
  const lines = text.split("\n");
  return (
    <div className="space-y-2 text-[11px] leading-relaxed font-sans text-slate-200">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        
        if (trimmed.startsWith("### ")) {
          return <h4 key={idx} className="text-xs font-bold text-white border-b border-white/[0.08] pb-1.5 mt-3">{trimmed.replace("### ", "")}</h4>;
        }
        if (trimmed.startsWith("#### ")) {
          return <h5 key={idx} className="text-[10px] font-semibold text-slate-300 mt-2 flex items-center"><span className="w-1.5 h-1.5 bg-[#0a84ff] rounded-full mr-1.5"></span>{trimmed.replace("#### ", "")}</h5>;
        }
        
        if (trimmed.startsWith("- ")) {
          const content = trimmed.replace("- ", "");
          return (
            <div key={idx} className="pl-3 flex items-start space-x-1.5">
              <span className="text-[#0a84ff] font-bold">•</span>
              <span>{renderTextWithBold(content)}</span>
            </div>
          );
        }

        if (trimmed.startsWith("|")) {
          if (trimmed.includes("---")) return null;
          const cells = trimmed.split("|").map(c => c.trim()).filter(c => c !== "");
          const isHeader = idx === 0 || (lines[idx - 1] && lines[idx - 1].trim() === "" && lines[idx + 1] && lines[idx + 1].trim().includes("---"));
          
          return (
            <div key={idx} className={`grid grid-cols-4 gap-1.5 px-2 py-1 text-[10px] font-mono border-b border-white/[0.03] ${isHeader ? "text-slate-400 font-bold bg-white/[0.02]" : "text-slate-300"}`}>
              {cells.map((cell, cIdx) => (
                <span key={cIdx} className="truncate">{renderTextWithBold(cell)}</span>
              ))}
            </div>
          );
        }

        if (trimmed === "") return <div key={idx} className="h-0.5" />;
        
        return <p key={idx}>{renderTextWithBold(trimmed)}</p>;
      })}
    </div>
  );
}

function MedalProjectionChart({ data, countryName }: { data: { year: number; projectedGold: number; projectedTotal: number }[]; countryName: string }) {
  const chartData = data.filter(d => d.year >= 2028);
  if (chartData.length === 0) return null;

  const width = 500;
  const height = 150;
  const padding = 25;

  const maxTotal = Math.max(...chartData.map(d => d.projectedTotal), 10);
  
  const getX = (idx: number) => padding + (idx * (width - padding * 2) / (chartData.length - 1));
  const getY = (val: number) => height - padding - (val * (height - padding * 2) / (maxTotal || 1));

  let goldPath = "";
  let totalPath = "";
  
  chartData.forEach((d, idx) => {
    const x = getX(idx);
    const goldY = getY(d.projectedGold);
    const totalY = getY(d.projectedTotal);
    
    if (idx === 0) {
      goldPath = `M ${x} ${goldY}`;
      totalPath = `M ${x} ${totalY}`;
    } else {
      goldPath += ` L ${x} ${goldY}`;
      totalPath += ` L ${x} ${totalY}`;
    }
  });

  return (
    <div className="w-full bg-[#121214]/60 border border-white/[0.04] p-4 rounded-2xl flex flex-col justify-between space-y-3 font-sans">
      <div className="flex justify-between items-center text-[10px] text-slate-400">
        <span className="font-bold uppercase tracking-wider text-slate-300">Medal Projection ({countryName})</span>
        <div className="flex space-x-3 font-semibold text-[9px]">
          <span className="flex items-center text-[#ff9f0a]"><span className="w-1.5 h-1.5 rounded-full bg-[#ff9f0a] mr-1"></span>Golds</span>
          <span className="flex items-center text-[#0a84ff]"><span className="w-1.5 h-1.5 rounded-full bg-[#0a84ff] mr-1"></span>Totals</span>
        </div>
      </div>
      <div className="relative w-full h-[155px] pt-1">
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
          {/* Grid lines */}
          {Array.from({ length: 4 }).map((_, i) => {
            const yVal = (maxTotal / 3) * i;
            const y = getY(yVal);
            return (
              <g key={i}>
                <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="rgba(255, 255, 255, 0.04)" strokeDasharray="3 3" />
                <text x={padding - 6} y={y + 2.5} fill="rgba(255, 255, 255, 0.35)" fontSize="8" textAnchor="end" fontFamily="monospace">
                  {Math.round(yVal)}
                </text>
              </g>
            );
          })}
          
          {/* Paths */}
          <path d={totalPath} fill="none" stroke="#0a84ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d={goldPath} fill="none" stroke="#ff9f0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Dots */}
          {chartData.map((d, idx) => {
            const x = getX(idx);
            const goldY = getY(d.projectedGold);
            const totalY = getY(d.projectedTotal);
            return (
              <g key={idx}>
                <circle cx={x} cy={totalY} r="3.5" fill="#0c0c0e" stroke="#0a84ff" strokeWidth="2" />
                <circle cx={x} cy={goldY} r="3.5" fill="#0c0c0e" stroke="#ff9f0a" strokeWidth="2" />
                <text x={x} y={height - 4} fill="rgba(255, 255, 255, 0.5)" fontSize="8" textAnchor="middle">
                  {d.year}
                </text>
                {/* Value tags above top dot */}
                <text x={x} y={totalY - 8} fill="#0a84ff" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  {d.projectedTotal}
                </text>
                <text x={x} y={goldY - 8} fill="#ff9f0a" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  {d.projectedGold}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default function Home() {
  // Application State
  const [selectedCountryId, setSelectedCountryId] = useState<string>("IND");
  const [selectedAthleteId, setSelectedAthleteId] = useState<string>("neeraj_chopra");
  const [gptQuery, setGptQuery] = useState<string>("");
  const [gptChat, setGptChat] = useState<{ query: string; answer: string }[]>([
    {
      query: "Why is China dominating diving?",
      answer: "China's diving dominance is built on: 1. Core biomechanical training (early entry wrist flexion locks) reducing entry splash. 2. High-density specialized diving academies. 3. Psychological conditioning programs to manage state anxiety under pressure. Data models show China holds a 91% probability of retaining diving sweeps in 2028."
    }
  ]);
  const [gptLoading, setGptLoading] = useState<boolean>(false);
  const [commentaryText, setCommentaryText] = useState<string>("Neeraj Chopra achieves an 89.94m throw to secure position 1.");
  const [commentaryLang, setCommentaryLang] = useState<"en" | "hi" | "gu" | "fr" | "es">("en");
  const [generatedCommentary, setGeneratedCommentary] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("sports_os");
  const [sportsOsTab, setSportsOsTab] = useState<"dashboard" | "oracle" | "twin" | "records" | "pricing">("dashboard");
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [recordAlert, setRecordAlert] = useState<string | null>(null);

  // Left Sidebar Tabs
  const [leftSidebarTab, setLeftSidebarTab] = useState<"live" | "spi">("live");

  // Country Comparison Selection
  const [compareIdA, setCompareIdA] = useState<string>("IND");
  const [compareIdB, setCompareIdB] = useState<string>("CHN");

  // What-If Simulation Coefficients (OIOS Telemetry Sliders)
  const [gdpMultiplier, setGdpMultiplier] = useState<number>(1.0); // Funding boost
  const [recoveryMultiplier, setRecoveryMultiplier] = useState<number>(1.0); // Recovery rate
  const [frictionMultiplier, setFrictionMultiplier] = useState<number>(1.0); // Environmental drag

  // Oracle specific states
  const [predictedTimeline, setPredictedTimeline] = useState<{ year: number; projectedGold: number; projectedTotal: number }[]>([]);
  const [simulationWinner, setSimulationWinner] = useState<any[]>([]);

  // Interactive Live Event Simulator State
  const [simSport, setSimSport] = useState<"Javelin Throw" | "100m Sprint" | "400m Swim">("Javelin Throw");
  const [simStatus, setSimStatus] = useState<"idle" | "running" | "completed">("idle");
  const [simCurrentRound, setSimCurrentRound] = useState<number>(0);
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [simProgress, setSimProgress] = useState<{ [athleteId: string]: number }>({});
  const [simBestResults, setSimBestResults] = useState<{ athleteId: string; name: string; countryId: string; resultValue: number; formattedResult: string }[]>([]);

  // Screen Flash Effect state for record breaks
  const [showFlash, setShowFlash] = useState<boolean>(false);

  // Scroll ref for logs
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Computed Ranked Countries
  const rankedCountries = getRankedCountries(countriesData);
  const activeCountry = countriesData.find((c: CountryData) => c.id === selectedCountryId) || countriesData[0];
  const activeAthlete = athletesData.find((a: AthleteData) => a.id === selectedAthleteId) || athletesData[0];

  // Compare countries computed references
  const compCountryA = countriesData.find(c => c.id === compareIdA) || countriesData[0];
  const compCountryB = countriesData.find(c => c.id === compareIdB) || countriesData[1];

  // Recalculate predictions when country or what-if sliders change
  useEffect(() => {
    if (activeCountry) {
      const timeline = KhelabOracle.predictMedalsTimeline(activeCountry, {
        gdpMultiplier,
        recoveryMultiplier,
        frictionMultiplier
      });
      setPredictedTimeline(timeline);
    }
  }, [selectedCountryId, activeCountry, gdpMultiplier, recoveryMultiplier, frictionMultiplier]);

  // Recalculate competition simulator when what-if sliders change
  useEffect(() => {
    const results = KhelabOracle.simulateCompetition(athletesData, {
      gdpMultiplier,
      recoveryMultiplier,
      frictionMultiplier
    });
    setSimulationWinner(results);
  }, [gdpMultiplier, recoveryMultiplier, frictionMultiplier]);

  // Auto-scroll simulation logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [simLogs]);

  // Simulate automatic new record alarm after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setRecordAlert("NEW RECORD DETECTED: Leon Marchand sets a new Olympic Record of 4:02.50 in Men's 400m IM Swim!");
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const triggerRecordBreakEvent = () => {
    // Generate flash effect
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 800);
    setTimeout(() => setShowFlash(true), 1200);
    setTimeout(() => setShowFlash(false), 2000);

    const recordShakes = [
      "NEW WORLD RECORD: Leon Marchand shatters Men's 400m IM Swim by 0.42 seconds at 4:02.08!",
      "NEW WORLD RECORD: Noah Lyles hits top velocity 12.35 m/s to clock 9.56s in Men's 100m Sprint!",
      "NEW OLYMPIC RECORD: Neeraj Chopra registers an epic 91.24m throw in attempt 5!"
    ];
    const pickedAlert = recordShakes[Math.floor(Math.random() * recordShakes.length)];
    setRecordAlert(pickedAlert);
  };

  const startLiveSimulation = () => {
    setSimStatus("running");
    setSimCurrentRound(1);
    setSimLogs([`[SIMULATION INIT] Loading parameters for event: ${simSport}`, `Adjusting friction coefficient to ${(frictionMultiplier * 0.12).toFixed(3)} μ...`, `Synchronizing muscle biomechanics matching recovery factors...`]);
    setSimProgress({});
    
    // Initialize results array
    const competitors = athletesData.filter(a => {
      if (simSport === "Javelin Throw") return a.sport === "Athletics" && a.discipline.includes("Javelin");
      if (simSport === "100m Sprint") return a.sport === "Athletics" && a.discipline.includes("Sprint");
      if (simSport === "400m Swim") return a.sport === "Swimming";
      return false;
    });

    const initBest = competitors.map(c => ({
      athleteId: c.id,
      name: c.name,
      countryId: c.countryId,
      resultValue: 0,
      formattedResult: simSport === "Javelin Throw" ? "0.00m" : simSport === "100m Sprint" ? "0.00s" : "0:00.00"
    }));
    setSimBestResults(initBest);

    let round = 1;
    const maxRounds = simSport === "Javelin Throw" ? 6 : 5; // 6 attempts or 5 progress ticks

    const interval = setInterval(() => {
      if (simSport === "Javelin Throw") {
        setSimLogs(prev => [
          ...prev,
          `--- ATTEMPT ${round} / 6 ---`
        ]);

        setSimBestResults(currentBest => {
          return currentBest.map(comp => {
            const athleteInfo = athletesData.find(a => a.id === comp.athleteId)!;
            const releaseVel = (athleteInfo.biomechanics.peakVelocityMs || 30) * (2 - frictionMultiplier) * (1 + (Math.random() - 0.5) * 0.05);
            const efficiency = athleteInfo.biomechanics.movementEfficiency * recoveryMultiplier;
            const throwVal = 78 + (releaseVel * 0.25) + (efficiency * 0.05) + (Math.random() * 4);
            const roundedVal = Math.round(throwVal * 100) / 100;
            
            const isNewBest = roundedVal > comp.resultValue;

            setSimLogs(prev => [
              ...prev,
              `${athleteInfo.name} (${comp.countryId}): Releases at ${releaseVel.toFixed(1)} m/s, distance: ${roundedVal}m ${isNewBest ? "🔥 [NEW BEST]" : ""}`
            ]);

            return {
              ...comp,
              resultValue: isNewBest ? roundedVal : comp.resultValue,
              formattedResult: isNewBest ? `${roundedVal}m` : comp.formattedResult
            };
          });
        });
      } else {
        // Track progress ticks for Sprint / Swim
        setSimLogs(prev => [
          ...prev,
          `[Progress Update] Time elapsed: ${(round * (simSport === "100m Sprint" ? 2.0 : 45)).toFixed(1)}s`
        ]);

        setSimProgress(currentProg => {
          const nextProg = { ...currentProg };
          initBest.forEach(comp => {
            const athleteInfo = athletesData.find(a => a.id === comp.athleteId)!;
            const speed = (athleteInfo.biomechanics.peakVelocityMs || 8) * (2 - frictionMultiplier) * (1 + (Math.random() - 0.5) * 0.03);
            const current = currentProg[comp.athleteId] || 0;
            const added = speed * (simSport === "100m Sprint" ? 2.0 : 45) * 0.1; // scaling factor
            nextProg[comp.athleteId] = Math.min(100, Math.round(current + added));
          });
          return nextProg;
        });

        // Log athlete positions
        initBest.forEach(comp => {
          const athleteInfo = athletesData.find(a => a.id === comp.athleteId)!;
          setSimLogs(prev => [
            ...prev,
            `  > ${athleteInfo.name} (${comp.countryId}) current progress: ${Math.min(100, Math.round((round/maxRounds) * 100))}%`
          ]);
        });
      }

      round++;
      setSimCurrentRound(round);

      if (round > maxRounds) {
        clearInterval(interval);
        setSimStatus("completed");
        
        // Finalize finish values for sprints/swim
        if (simSport !== "Javelin Throw") {
          setSimBestResults(currentBest => {
            const finalTimes = currentBest.map(comp => {
              const athleteInfo = athletesData.find(a => a.id === comp.athleteId)!;
              const baseTime = simSport === "100m Sprint" ? 9.8 : 240; // baseline seconds
              const velocityScale = athleteInfo.biomechanics.peakVelocityMs || 10;
              const finishTime = baseTime * (12 / velocityScale) * frictionMultiplier * (2 - recoveryMultiplier) + (Math.random() * 0.15);
              const formatted = simSport === "100m Sprint" 
                ? `${finishTime.toFixed(2)}s`
                : `${Math.floor(finishTime / 60)}:${(finishTime % 60).toFixed(2).padStart(5, "0")}`;
              return {
                ...comp,
                resultValue: finishTime,
                formattedResult: formatted
              };
            });

            // Sort times (lower is better for sprints/swimming)
            const sortedTimes = [...finalTimes].sort((a, b) => a.resultValue - b.resultValue);
            
            setSimLogs(prev => [
              ...prev,
              "🥇 --- SIMULATION COMPLETED --- 🥇",
              `🥇 1st: ${sortedTimes[0].name} (${sortedTimes[0].countryId}) - ${sortedTimes[0].formattedResult}`,
              `🥈 2nd: ${sortedTimes[1].name} (${sortedTimes[1].countryId}) - ${sortedTimes[1].formattedResult}`,
              `🥉 3rd: ${sortedTimes[2].name} (${sortedTimes[2].countryId}) - ${sortedTimes[2].formattedResult}`
            ]);

            return sortedTimes;
          });
        } else {
          setSimBestResults(currentBest => {
            const sortedThrows = [...currentBest].sort((a, b) => b.resultValue - a.resultValue);
            setSimLogs(prev => [
              ...prev,
              "🥇 --- SIMULATION COMPLETED --- 🥇",
              `🥇 1st: ${sortedThrows[0].name} (${sortedThrows[0].countryId}) - ${sortedThrows[0].formattedResult}`,
              `🥈 2nd: ${sortedThrows[1].name} (${sortedThrows[1].countryId}) - ${sortedThrows[1].formattedResult}`,
              `🥉 3rd: ${sortedThrows[2].name} (${sortedThrows[2].countryId}) - ${sortedThrows[2].formattedResult}`
            ]);
            return sortedThrows;
          });
        }
      }
    }, 1000);
  };

  const handleGptSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gptQuery.trim()) return;

    setGptLoading(true);
    const query = gptQuery;
    setGptQuery("");

    setTimeout(() => {
      const answer = KhelabOracle.evaluateOracleQuery(query, selectedCountryId, selectedAthleteId);
      setGptChat((prev) => [...prev, { query, answer }]);
      setGptLoading(false);
    }, 800);
  };

  const handleGenerateCommentary = () => {
    const output = KhelabOracle.generateCommentary(
      commentaryText,
      commentaryLang,
      {
        velocity: activeAthlete.biomechanics.peakVelocityMs,
        efficiency: activeAthlete.biomechanics.movementEfficiency
      }
    );
    setGeneratedCommentary(output);
  };

  // Convert radar values, dynamically adjusted by what-if recovery and friction
  const radarData = activeAthlete.biomechanics.jointAnglesDeg
    ? Object.entries(activeAthlete.biomechanics.jointAnglesDeg).map(([key, val]: [string, any]) => {
        const baseVal = Math.min(100, Math.max(10, Math.round(((val as number) / 180) * 100)));
        return {
          label: key,
          value: Math.min(100, Math.round(baseVal * recoveryMultiplier))
        };
      })
    : [
        { label: "Speed", value: Math.min(100, Math.round((activeAthlete.biomechanics.peakVelocityMs ? 90 : 70) * (2 - frictionMultiplier))) },
        { label: "Endurance", value: Math.min(100, Math.round(activeAthlete.biomechanics.enduranceIndex * recoveryMultiplier)) },
        { label: "Efficiency", value: activeAthlete.biomechanics.movementEfficiency },
        { label: "Reaction", value: Math.max(20, Math.round(100 - (activeAthlete.biomechanics.reactionTimeMs || 0) / 10)) }
      ];

  const adjustedInjuryRisk = Math.round(Math.max(0, Math.min(100, activeAthlete.injuryRisk * (2.0 - recoveryMultiplier))));

  return (
    <div className="flex-1 min-h-screen bg-[#08080a] text-[#f5f5f7] flex flex-col relative overflow-hidden font-sans">
      {/* Visual Flash Screen Effect for Record Breaks */}
      {showFlash && (
        <div className="fixed inset-0 bg-yellow-500/10 border-8 border-yellow-500/50 pointer-events-none z-50 animate-pulse transition-opacity duration-1000" />
      )}
      
      {/* Apple-style background soft glow */}
      <div className="apple-bg-glow" />

      {/* Global Toast Alert for New Records */}
      {recordAlert && (
        <div className="bg-white/[0.04] border-b border-white/[0.08] backdrop-blur-md text-[#f5f5f7] px-4 py-2.5 text-center text-xs font-sans font-medium flex items-center justify-center space-x-2 z-40 relative shadow-lg">
          <Award className="w-3.5 h-3.5 text-[#ff9f0a] animate-pulse" />
          <span>{recordAlert}</span>
          <button onClick={() => setRecordAlert(null)} className="ml-4 text-[10px] text-[#86868b] hover:text-white transition-colors cursor-pointer">[Dismiss]</button>
        </div>
      )}

      {/* Header Banner */}
      <header className="border-b border-white/[0.06] px-6 py-4 flex flex-col md:flex-row items-center justify-between bg-[#08080a]/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <svg className="w-8 h-8 filter drop-shadow-[0_0_4px_rgba(6,182,212,0.4)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <style>{`
              @keyframes drawRibbon {
                0% { stroke-dashoffset: 350; }
                100% { stroke-dashoffset: 0; }
              }
              .animated-ribbon {
                stroke-dasharray: 350;
                animation: drawRibbon 4.5s linear infinite;
              }
            `}</style>
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="30%" stopColor="#06B6D4" />
                <stop offset="65%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#ff453a" />
              </linearGradient>
            </defs>
            <path
              className="animated-ribbon"
              d="M 50,50 C 15,15 15,5 50,5 C 85,5 85,15 50,50 C 15,85 15,95 50,95 C 85,95 85,85 50,50 Z"
              stroke="url(#logoGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <div>
            <h1 className="text-sm font-bold tracking-[0.18em] flex items-center text-white uppercase font-sans">
              khel<span className="text-[#0a84ff]">λ</span>b <span className="text-[9px] text-slate-400 border border-white/10 px-1.5 py-0.5 rounded-full ml-2 font-normal normal-case tracking-normal">OS</span>
            </h1>
            <p className="text-[10px] text-[#86868b] tracking-wider uppercase font-medium mt-0.5">The Intelligence of Sports</p>
          </div>
        </div>

        {/* Global Navigation Tabs (Apple Segmented Control Style) */}
        <nav className="flex space-x-1 bg-white/[0.04] p-1 rounded-full border border-white/[0.06] backdrop-blur-xl my-3 md:my-0">
          <button
            onClick={() => setActiveTab("sports_os")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer tab-transition ${
              activeTab === "sports_os"
                ? "bg-white text-black shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Sports OS
          </button>
          <button
            onClick={() => setActiveTab("executive_hub")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer tab-transition ${
              activeTab === "executive_hub"
                ? "bg-white text-black shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Executive Hub
          </button>
          <button
            onClick={() => setActiveTab("founder_command")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer tab-transition ${
              activeTab === "founder_command"
                ? "bg-white text-black shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Founder Command
          </button>
          <button
            onClick={() => setActiveTab("stakeholders")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer tab-transition ${
              activeTab === "stakeholders"
                ? "bg-white text-black shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Portals
          </button>
          <button
            onClick={() => setActiveTab("tech_architecture")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer tab-transition ${
              activeTab === "tech_architecture"
                ? "bg-white text-black shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Blueprints
          </button>
          <button
            onClick={() => setActiveTab("system_docs")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer tab-transition ${
              activeTab === "system_docs"
                ? "bg-white text-black shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Docs
          </button>
        </nav>

        {/* Global Action items */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsReportOpen(true)}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-white/90 text-xs font-semibold tracking-wide cursor-pointer transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Generate Report</span>
          </button>
        </div>
      </header>

      {/* Global OIOS KPIs Bar (NASA/Formula 1 Style) */}
      <div className="px-6 py-3.5 bg-white/[0.01] border-b border-white/[0.04] grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-sans text-slate-400 z-20">
        <div className="flex flex-col space-y-0.5">
          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">Analyzed Athletes</span>
          <span className="text-sm font-bold text-white">4,820 <span className="text-[10px] text-slate-500 font-normal">Active Profiles</span></span>
        </div>
        <div className="flex flex-col space-y-0.5">
          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">Global Average Injury Risk</span>
          <span className="text-sm font-bold text-[#ff453a]">{(24.8 * (2 - recoveryMultiplier)).toFixed(1)}% <span className="text-[10px] font-normal">Dynamic Weight</span></span>
        </div>
        <div className="flex flex-col space-y-0.5">
          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">Active Parallel Simulations</span>
          <span className="text-sm font-bold text-white">16,400 <span className="text-[10px] text-slate-500 font-normal">Nodes running</span></span>
        </div>
        <div className="flex flex-col space-y-0.5">
          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">Stochastic Model Confidence</span>
          <span className="text-sm font-bold text-[#30d158]">98.45% <span className="text-[10px] text-slate-500 font-normal">XGBoost stable</span></span>
        </div>
      </div>

      {/* Sub-navigation for Sports OS */}
      {activeTab === "sports_os" && (
        <div className="px-6 py-2 bg-white/[0.02] border-b border-white/[0.04] flex items-center space-x-4 text-xs z-20">
          <span className="text-slate-500 uppercase tracking-widest text-[9px] font-bold">OS Navigation:</span>
          <div className="flex space-x-1">
            <button
              onClick={() => setSportsOsTab("dashboard")}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer font-semibold ${
                sportsOsTab === "dashboard" ? "bg-white/10 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setSportsOsTab("twin")}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer font-semibold ${
                sportsOsTab === "twin" ? "bg-white/10 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Digital Twin
            </button>
            <button
              onClick={() => setSportsOsTab("oracle")}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer font-semibold ${
                sportsOsTab === "oracle" ? "bg-white/10 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              AI Oracle
            </button>
            <button
              onClick={() => setSportsOsTab("records")}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer font-semibold ${
                sportsOsTab === "records" ? "bg-white/10 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Records Vault
            </button>
            <button
              onClick={() => setSportsOsTab("pricing")}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer font-semibold ${
                sportsOsTab === "pricing" ? "bg-white/10 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Khelab Pro
            </button>
          </div>
        </div>
      )}

      {/* Main Grid View */}
      {activeTab === "sports_os" && (
        <main className="flex-1 p-6 grid grid-cols-1 xl:grid-cols-4 gap-6 z-10">

        {/* ================= COLUMN 1: LIVE FEED & SPI LEADERBOARD ================= */}
        <div className="xl:col-span-1 space-y-6 flex flex-col">
          {/* Live Feed / Leaderboard Selector Pane */}
          <div className="glassmorphic rounded-2xl p-5 relative flex-1 flex flex-col min-h-[450px]">
            <div className="flex items-center justify-between mb-4 border-b border-white/[0.06] pb-3">
              <div className="flex space-x-1.5 bg-white/[0.04] p-0.5 rounded-lg border border-white/[0.06]">
                <button
                  onClick={() => setLeftSidebarTab("live")}
                  className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
                    leftSidebarTab === "live" ? "bg-white text-black" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Live Feed
                </button>
                <button
                  onClick={() => setLeftSidebarTab("spi")}
                  className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
                    leftSidebarTab === "spi" ? "bg-white text-black" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  SPI Leaderboard
                </button>
              </div>
              <Clock className="w-3.5 h-3.5 text-slate-500" />
            </div>

            <div className="flex-1 overflow-y-auto pr-1">
              {leftSidebarTab === "live" ? (
                <div className="space-y-4 max-h-[350px]">
                  {liveEventsData.map((event: LiveEvent) => (
                    <div
                      key={event.id}
                      className={`p-3 rounded-xl border text-xs relative overflow-hidden transition-all ${
                        event.status === "live"
                          ? "border-[#ff453a]/20 bg-[#ff453a]/5"
                          : "border-white/[0.04] bg-white/[0.01]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] text-slate-400 font-medium">{event.sport}</span>
                        <span
                          className={`text-[9px] px-2 py-0.5 rounded-full uppercase font-semibold tracking-wider ${
                            event.status === "live"
                              ? "bg-[#ff453a]/15 text-[#ff453a]"
                              : event.status === "completed"
                              ? "bg-[#30d158]/15 text-[#30d158]"
                              : "bg-white/10 text-slate-400"
                          }`}
                        >
                          {event.status}
                        </span>
                      </div>

                      <h4 className="font-semibold text-white mb-2 leading-tight">{event.discipline}</h4>
                      <p className="text-[10px] text-slate-400 mb-2">{event.phase}</p>

                      <div className="space-y-1.5">
                        {event.participants.map((p: any, i: number) => (
                          <div key={i} className="flex justify-between items-center text-[10px] border-t border-white/[0.04] pt-1.5">
                            <span className="text-slate-300 font-medium">
                              {i + 1}. {p.athleteName} ({p.countryId})
                            </span>
                            <span className="text-[#0a84ff] font-semibold">{p.currentScore || p.status || `Rank ${p.rank}`}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2 max-h-[350px] font-sans text-xs">
                  {rankedCountries.map((c: any, index: number) => (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCountryId(c.id)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                        c.id === selectedCountryId
                          ? "border-[#0a84ff]/30 bg-[#0a84ff]/5"
                          : "border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.08]"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold text-slate-500 w-4">#{index + 1}</span>
                        <span className="text-sm">{c.flag}</span>
                        <div>
                          <h4 className="font-semibold text-white leading-tight">{c.name}</h4>
                          <span className="text-[8px] text-slate-500 block">SPI Power Rank</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[#0a84ff] font-bold text-xs">{c.sportsPowerIndex}</span>
                        <span className="text-[8px] text-slate-500 block font-medium">SPI Score</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* AI Commentary Generator */}
          <div className="glassmorphic rounded-2xl p-5 space-y-4">
            <h3 className="text-[10px] font-semibold text-[#86868b] tracking-wider flex items-center uppercase">
              <Volume2 className="w-3.5 h-3.5 mr-2 text-slate-400" />
              AI Multilingual Commentary
            </h3>

            <textarea
              value={commentaryText}
              onChange={(e) => setCommentaryText(e.target.value)}
              className="w-full h-16 bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 text-xs text-slate-200 font-sans focus:border-white/20 outline-none resize-none transition-all"
              placeholder="Describe sports occurrence..."
            />

            <div className="flex items-center justify-between space-x-2">
              <select
                value={commentaryLang}
                onChange={(e) => setCommentaryLang(e.target.value as any)}
                className="bg-[#1c1c1e] border border-white/[0.06] rounded-lg px-2.5 py-1.5 text-xs text-slate-200 outline-none cursor-pointer font-sans font-medium"
              >
                <option value="en">English</option>
                <option value="hi">Hindi (हिन्दी)</option>
                <option value="gu">Gujarati (ગુજરાતી)</option>
                <option value="fr">French (Français)</option>
                <option value="es">Spanish (Español)</option>
              </select>

              <button
                onClick={handleGenerateCommentary}
                className="px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-white/90 text-xs font-semibold transition-all cursor-pointer"
              >
                Generate Audio
              </button>
            </div>

            {generatedCommentary && (
              <div className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl text-[11px] text-[#f5f5f7] leading-relaxed animate-fade-in font-medium">
                {generatedCommentary}
              </div>
            )}
          </div>
        </div>

        {/* ================= COLUMN 2 & 3: MAIN DISPLAY WORKSPACE ================= */}
        <div className="xl:col-span-2 space-y-6 flex flex-col">
          
          {sportsOsTab === "dashboard" && (
            <>
              {/* 3D Globe Visualizer */}
              <div className="h-[400px] xl:h-[450px] relative">
                <Globe3D onCountryClick={(id) => setSelectedCountryId(id)} selectedCountryId={selectedCountryId} />
              </div>

              {/* Console row containing GPT Assistant & Country Comparison Scanner side-by-side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                
                {/* KHELAB GPT Console */}
                <div className="glassmorphic rounded-2xl p-5 flex flex-col justify-between min-h-[300px]">
                  <div className="flex items-center space-x-2.5 mb-3 border-b border-white/[0.06] pb-2.5">
                    <BrainCircuit className="w-4 h-4 text-white animate-pulse" />
                    <div>
                      <h3 className="text-xs font-semibold text-white tracking-wide">Khelab GPT Assistant</h3>
                      <p className="text-[9px] text-slate-500 font-sans">Ask about SPI rankings, biomechanics, or cycles</p>
                    </div>
                  </div>

                  {/* Chat window */}
                  <div className="flex-1 space-y-3 overflow-y-auto max-h-[240px] pr-1.5 text-[11px] font-sans">
                    {gptChat.map((chat, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex items-start space-x-1.5 text-white font-semibold">
                          <ChevronRight className="w-3 h-3 mt-0.5 text-slate-400" />
                          <span>{chat.query}</span>
                        </div>
                        <div className="pl-4 text-slate-300 leading-relaxed bg-white/[0.01] p-3 rounded-xl border border-white/[0.04] overflow-x-auto">
                          {renderFormattedAnswer(chat.answer)}
                        </div>
                      </div>
                    ))}
                    {gptLoading && (
                      <div className="flex items-center space-x-2 text-slate-500 animate-pulse pl-4">
                        <span>Querying vector indexes & predictions...</span>
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleGptSearch} className="mt-3.5 flex space-x-1.5">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={gptQuery}
                        onChange={(e) => setGptQuery(e.target.value)}
                        placeholder="Compare India vs China in shooting..."
                        className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-white/20 focus:bg-white/[0.06] outline-none rounded-full py-2 pl-3.5 pr-8 text-xs text-white placeholder:text-slate-500 transition-all font-sans"
                      />
                      <Search className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-2.5" />
                    </div>
                    <button
                      type="submit"
                      className="bg-white text-black hover:bg-white/90 px-4 rounded-full font-sans text-xs font-semibold transition-all cursor-pointer"
                    >
                      Query
                    </button>
                  </form>
                </div>

                {/* Country Comparison Scanner */}
                <div className="glassmorphic rounded-2xl p-5 flex flex-col justify-between min-h-[300px] text-[#f5f5f7]">
                  <div className="flex items-center space-x-2.5 mb-3 border-b border-white/[0.06] pb-2.5">
                    <Scale className="w-4 h-4 text-white" />
                    <div>
                      <h3 className="text-xs font-semibold text-white tracking-wide">NationIQ Comparison Scanner</h3>
                      <p className="text-[9px] text-slate-500 font-sans">Side-by-side comparative diagnostics</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center space-x-3 mb-2.5 text-xs">
                    {/* Selector A */}
                    <select
                      value={compareIdA}
                      onChange={(e) => setCompareIdA(e.target.value)}
                      className="bg-[#1c1c1e] border border-white/[0.06] rounded-lg px-2 py-1 flex-1 text-slate-200 outline-none cursor-pointer text-center font-medium font-sans"
                    >
                      {countriesData.map((c) => (
                        <option key={c.id} value={c.id}>{c.flag} {c.id}</option>
                      ))}
                    </select>
                    
                    <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">VS</span>

                    {/* Selector B */}
                    <select
                      value={compareIdB}
                      onChange={(e) => setCompareIdB(e.target.value)}
                      className="bg-[#1c1c1e] border border-white/[0.06] rounded-lg px-2 py-1 flex-1 text-slate-200 outline-none cursor-pointer text-center font-medium font-sans"
                    >
                      {countriesData.map((c) => (
                        <option key={c.id} value={c.id}>{c.flag} {c.id}</option>
                      ))}
                    </select>
                  </div>

                  {/* Comparative Metrics display */}
                  <div className="flex-1 space-y-2 text-[10px] font-sans">
                    {/* SPI Comparison */}
                    <div className="space-y-1">
                      <div className="flex justify-between font-medium">
                        <span className="text-slate-400">Sports Power Index (SPI)</span>
                        <span className="text-white">
                          <strong className="text-[#0a84ff]">{calculateCountrySPI(compCountryA)}</strong> vs <strong className="text-[#ff9f0a]">{calculateCountrySPI(compCountryB)}</strong>
                        </span>
                      </div>
                      <div className="flex space-x-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="bg-[#0a84ff]" style={{ width: `${(calculateCountrySPI(compCountryA) / (calculateCountrySPI(compCountryA) + calculateCountrySPI(compCountryB))) * 100}%` }}></div>
                        <div className="bg-[#ff9f0a]" style={{ width: `${(calculateCountrySPI(compCountryB) / (calculateCountrySPI(compCountryA) + calculateCountrySPI(compCountryB))) * 100}%` }}></div>
                      </div>
                    </div>

                    {/* Growth trajectory comparison */}
                    <div className="flex justify-between pt-1 border-t border-white/[0.03]">
                      <span className="text-slate-400">Growth Trajectory:</span>
                      <span className="text-white font-semibold">+{compCountryA.growthPotential}% vs +{compCountryB.growthPotential}%</span>
                    </div>

                    {/* Dominant Biome */}
                    <div className="flex justify-between pt-1 border-t border-white/[0.03]">
                      <span className="text-slate-400">Dominant Biome:</span>
                      <span className="text-slate-300 font-medium truncate max-w-[140px]">{compCountryA.biomeDominance} vs {compCountryB.biomeDominance}</span>
                    </div>

                    {/* Dominant sports summary */}
                    <div className="pt-1.5 border-t border-white/[0.03] space-y-1">
                      <span className="text-[8px] text-slate-500 uppercase font-bold tracking-wider">Strong disciplines Comparison:</span>
                      <div className="grid grid-cols-2 gap-2 text-[9px]">
                        <div className="text-slate-300 truncate font-semibold">• {compCountryA.strongSports.slice(0,2).join(", ")}</div>
                        <div className="text-slate-300 truncate font-semibold">• {compCountryB.strongSports.slice(0,2).join(", ")}</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCountryId(compCountryA.id);
                    }}
                    className="w-full mt-2.5 py-1.5 bg-white/[0.04] border border-white/[0.08] hover:bg-white hover:text-black rounded-xl text-[10px] font-bold transition-all cursor-pointer font-sans"
                  >
                    Select {compCountryA.name} for Detail IQ
                  </button>

                </div>

              </div>
            </>
          )}

          {sportsOsTab === "twin" && (
            <DigitalTwin activeAthlete={activeAthlete} />
          )}

          {sportsOsTab === "oracle" && (
            <div className="glassmorphic rounded-2xl p-6 space-y-6 flex-1 text-[#f5f5f7]">
              <div className="border-b border-white/[0.06] pb-3 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-semibold tracking-tight text-white flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-white animate-pulse" />
                    Predictive Oracle & Live Event Simulator
                  </h3>
                  <p className="text-[10px] text-[#86868b] mt-0.5">XGBoost & LSTM trajectory forecast modeling</p>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <select
                    value={simSport}
                    onChange={(e) => setSimSport(e.target.value as any)}
                    className="bg-[#1c1c1e] border border-white/[0.06] rounded-lg px-2.5 py-1 text-xs text-slate-200 outline-none cursor-pointer font-sans"
                  >
                    <option value="Javelin Throw">Javelin Throw</option>
                    <option value="100m Sprint">100m Sprint</option>
                    <option value="400m Swim">400m Swim</option>
                  </select>
                  <button
                    onClick={startLiveSimulation}
                    disabled={simStatus === "running"}
                    className="flex items-center space-x-1 px-3 py-1 rounded-full bg-white text-black hover:bg-white/90 disabled:opacity-40 text-xs font-semibold cursor-pointer transition-all"
                  >
                    <RefreshCw className={`w-3 h-3 ${simStatus === "running" ? "animate-spin" : ""}`} />
                    <span>{simStatus === "running" ? "Simulating..." : "Launch Live Sim"}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Left pane: Live Sim Progress / Leaderboard */}
                <div className="md:col-span-2 p-4 bg-white/[0.01] rounded-2xl border border-white/[0.04] space-y-3.5">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Live Telemetry Board ({simSport})
                    </h4>
                    {simStatus === "running" && (
                      <span className="text-[9px] bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded-full font-bold animate-pulse">
                        LIVE ATTEMPT
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 mt-2">
                    {simBestResults.map((item, idx) => {
                      const progress = simProgress[item.athleteId] || 0;
                      return (
                        <div key={item.athleteId} className="p-3 bg-white/[0.01] rounded-xl border border-white/[0.04] space-y-2 text-xs">
                          <div className="flex justify-between items-center font-sans">
                            <span className="font-semibold text-white">
                              {idx === 0 && simStatus === "completed" ? "🥇" : idx === 1 && simStatus === "completed" ? "🥈" : idx === 2 && simStatus === "completed" ? "🥉" : "🏁"} {item.name} ({item.countryId})
                            </span>
                            <span className="text-[#0a84ff] font-bold text-sm">
                              {simSport === "Javelin Throw" ? item.formattedResult : simStatus === "completed" ? item.formattedResult : `${progress}% Done`}
                            </span>
                          </div>
                          
                          {/* Progress bar animation for Sprints / Swim */}
                          {simSport !== "Javelin Throw" && (
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div
                                className="bg-[#0a84ff] h-full transition-all duration-1000"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right pane: Scrolling attempt log feed */}
                <div className="md:col-span-1 p-4 bg-[#0a0a0c] rounded-2xl border border-white/[0.04] flex flex-col h-[280px]">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/[0.06] pb-2 mb-2">
                    Simulator Terminal Log
                  </h4>
                  <div className="flex-1 overflow-y-auto space-y-1.5 text-[9px] font-mono text-slate-400 pr-1.5 leading-relaxed">
                    {simLogs.map((log, idx) => (
                      <div key={idx} className="border-b border-white/[0.02] pb-1">
                        <span className="text-slate-600 mr-1.5">[{idx + 1}]</span>
                        <span className={log.includes("completed") || log.includes("🥇") ? "text-yellow-400 font-bold" : log.includes("🔥") ? "text-green-400" : ""}>{log}</span>
                      </div>
                    ))}
                    <div ref={logsEndRef} />
                  </div>
                </div>

              </div>

              {/* Secondary block: LSTM Future Medal Projections */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/[0.06] pt-5">
                <div className="md:col-span-1">
                  <MedalProjectionChart data={predictedTimeline} countryName={activeCountry.name} />
                </div>

                <div className="p-4 bg-white/[0.01] border border-white/[0.04] rounded-2xl space-y-2.5 md:col-span-2">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Global Stochastic Medal Predictions
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
                    Calculated using Random Forest weights scaled by country-level athlete densities, weather variables, and GDP policy multipliers. Changing sliders triggers instant recalculation.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 text-xs mt-1.5 font-sans">
                    <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                      <span className="text-[8px] text-[#86868b] font-medium block">ATHLETE</span>
                      <h5 className="font-semibold text-white mt-0.5">Manu Bhaker (IND)</h5>
                      <span className="text-[#30d158] font-bold text-[10px]">Proj win: {Math.round(Math.min(98, 45 * recoveryMultiplier))}%</span>
                    </div>
                    <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                      <span className="text-[8px] text-[#86868b] font-medium block">ATHLETE</span>
                      <h5 className="font-semibold text-white mt-0.5">Leon Marchand (FRA)</h5>
                      <span className="text-[#30d158] font-bold text-[10px]">Proj win: {Math.round(Math.min(99, 85 * recoveryMultiplier))}%</span>
                    </div>
                    <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                      <span className="text-[8px] text-[#86868b] font-medium block">ATHLETE</span>
                      <h5 className="font-semibold text-white mt-0.5">Noah Lyles (USA)</h5>
                      <span className="text-[#ff9f0a] font-bold text-[10px]">Proj win: {Math.round(Math.min(99, 60 * recoveryMultiplier * (2 - frictionMultiplier)))}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {sportsOsTab === "records" && (
            <div className="glassmorphic rounded-2xl p-6 space-y-6 flex-1 text-[#f5f5f7]">
              <div className="border-b border-white/[0.06] pb-3 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-semibold tracking-tight text-white flex items-center">
                    <Award className="w-4 h-4 mr-2 text-white animate-pulse" />
                    Olympic & World Records Vault
                  </h3>
                  <p className="text-[10px] text-[#86868b] mt-0.5">Real-time broken-record detection system</p>
                </div>
                <button
                  onClick={triggerRecordBreakEvent}
                  className="px-3 py-1.5 bg-yellow-500 text-black hover:bg-yellow-400 text-xs font-bold rounded-full cursor-pointer transition-all shadow-md flex items-center space-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Inject Record Break</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse font-sans">
                  <thead>
                    <tr className="border-b border-white/[0.06] text-[#86868b]">
                      <th className="py-2.5 font-semibold">DISCIPLINE</th>
                      <th className="font-semibold">ATHLETE</th>
                      <th className="font-semibold">RECORD</th>
                      <th className="font-semibold">TYPE</th>
                      <th className="font-semibold">YEAR SET</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recordsVaultData.map((rec: any) => (
                      <tr key={rec.id} className="border-b border-white/[0.04] hover:bg-white/[0.01] transition-colors">
                        <td className="py-3 font-semibold text-white">{rec.discipline}</td>
                        <td className="text-slate-300">{rec.athleteName} ({rec.countryId})</td>
                        <td className="text-[#0a84ff] font-semibold">{rec.recordValue}</td>
                        <td>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-semibold border ${
                              rec.recordType === "World Record"
                                ? "bg-white/10 text-white border-white/20"
                                : "bg-[#0a84ff]/10 text-[#0a84ff] border-[#0a84ff]/20"
                            }`}
                          >
                            {rec.recordType}
                          </span>
                        </td>
                        <td className="text-slate-400">{rec.yearSet} ({rec.location})</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {sportsOsTab === "pricing" && (
            <div className="glassmorphic rounded-2xl p-6 space-y-6 flex-1 text-[#f5f5f7]">
              <div className="border-b border-white/[0.06] pb-3 text-center">
                <h3 className="text-sm font-semibold tracking-tight text-white inline-flex items-center justify-center">
                  <Coins className="w-4 h-4 mr-2" />
                  Khelab Pro Pricing
                </h3>
                <p className="text-[11px] text-[#86868b] mt-1">Unlock advanced athletic AI models and API accesses</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Plan 1 */}
                <div className="p-4 bg-white/[0.01] border border-white/[0.04] rounded-2xl space-y-4 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Free</h4>
                    <p className="text-2xl font-semibold mt-1">₹0 <span className="text-[10px] text-slate-500 font-normal">/mo</span></p>
                    <ul className="text-[10px] text-slate-400 space-y-1.5 mt-3">
                      <li>• Real-Time Scores</li>
                      <li>• Global Standings</li>
                      <li>• Base Medals Tally</li>
                    </ul>
                  </div>
                  <button className="w-full py-1.5 bg-white/[0.04] border border-white/[0.08] hover:border-white/20 text-slate-300 rounded-full text-[10px] font-semibold cursor-pointer mt-3 transition-colors">
                    Active
                  </button>
                </div>

                {/* Plan 2 */}
                <div className="p-4 bg-white/[0.01] border border-white/[0.04] rounded-2xl space-y-4 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[9px] font-bold text-[#0a84ff] uppercase tracking-widest">Pro</h4>
                    <p className="text-2xl font-semibold mt-1 text-white">₹499 <span className="text-[10px] text-slate-500 font-normal">/mo</span></p>
                    <ul className="text-[10px] text-slate-400 space-y-1.5 mt-3">
                      <li>• Advanced Analytics</li>
                      <li>• Commentary Translat.</li>
                      <li>• Historical database</li>
                    </ul>
                  </div>
                  <button className="w-full py-1.5 bg-white text-black hover:bg-white/90 text-[10px] font-semibold rounded-full cursor-pointer mt-3 transition-colors">
                    Upgrade
                  </button>
                </div>

                {/* Plan 3 */}
                <div className="p-4 bg-white/[0.02] border border-white/[0.08] rounded-2xl space-y-4 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#0a84ff] text-white text-[8px] font-bold px-2 py-0.5 rounded-bl">
                    Popular
                  </div>
                  <div>
                    <h4 className="text-[9px] font-bold text-[#0a84ff] uppercase tracking-widest">Elite</h4>
                    <p className="text-2xl font-semibold mt-1 text-white">₹1,999 <span className="text-[10px] text-slate-500 font-normal">/mo</span></p>
                    <ul className="text-[10px] text-slate-300 space-y-1.5 mt-3">
                      <li>• Full Athlete DNA</li>
                      <li>• Oracle Forecast Eng.</li>
                      <li>• Download PDF/XLSX</li>
                    </ul>
                  </div>
                  <button className="w-full py-2 bg-[#0a84ff] hover:bg-[#0a84ff]/90 text-white font-semibold text-[10px] rounded-full cursor-pointer mt-3 transition-colors shadow-sm">
                    Buy Now
                  </button>
                </div>

                {/* Plan 4 */}
                <div className="p-4 bg-white/[0.01] border border-white/[0.04] rounded-2xl space-y-4 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Enterprise</h4>
                    <p className="text-2xl font-semibold mt-1 text-white">Custom</p>
                    <ul className="text-[10px] text-slate-400 space-y-1.5 mt-3">
                      <li>• Govs & Broadcasters</li>
                      <li>• Real-Time Kafka Stream</li>
                      <li>• Custom AI modeling</li>
                    </ul>
                  </div>
                  <button className="w-full py-1.5 bg-white/[0.04] border border-white/[0.08] hover:border-white/20 text-white font-semibold text-[10px] rounded-full cursor-pointer mt-3 transition-colors">
                    Contact Sales
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* ================= COLUMN 4: DETAILED ANALYTICS (NATION & ATHLETE) ================= */}
        <div className="xl:col-span-1 space-y-6">
          
          {/* OIOS What-If Telemetry controls panel */}
          <div className="glassmorphic rounded-2xl p-5 space-y-4">
            <div className="flex items-center space-x-2 border-b border-white/[0.06] pb-3">
              <Zap className="w-4 h-4 text-white animate-pulse" />
              <div>
                <h3 className="text-xs font-semibold text-white tracking-wide">What-If Telemetry Simulator</h3>
                <p className="text-[9px] text-slate-500 font-sans">Modify model parameters in real-time</p>
              </div>
            </div>

            <div className="space-y-4 text-[10px] font-sans">
              {/* GDP funding multiplier */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400">Sports Policy Funding</span>
                  <span className="text-[#0a84ff] font-bold">{(gdpMultiplier * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={gdpMultiplier}
                  onChange={(e) => setGdpMultiplier(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                />
              </div>

              {/* Athlete recovery multiplier */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400">Athlete Recovery Boost</span>
                  <span className="text-[#30d158] font-bold">{(recoveryMultiplier * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={recoveryMultiplier}
                  onChange={(e) => setRecoveryMultiplier(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#30d158]"
                />
              </div>

              {/* Friction multiplier */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400">Atmospheric Drag / Friction</span>
                  <span className="text-[#ff9f0a] font-bold">{(frictionMultiplier * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={frictionMultiplier}
                  onChange={(e) => setFrictionMultiplier(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ff9f0a]"
                />
              </div>
            </div>
          </div>

          {/* Country Intelligence (NationIQ) */}
          <div className="glassmorphic rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h3 className="text-[10px] font-semibold text-[#86868b] tracking-wider flex items-center uppercase">
                <Globe className="w-3.5 h-3.5 mr-2 text-slate-400" />
                NationIQ Scanner
              </h3>
              <select
                value={selectedCountryId}
                onChange={(e) => setSelectedCountryId(e.target.value)}
                className="bg-[#1c1c1e] border border-white/[0.06] rounded-lg px-2 py-1 text-xs text-slate-200 outline-none cursor-pointer font-sans font-medium"
              >
                {countriesData.map((c: CountryData) => (
                  <option key={c.id} value={c.id}>
                    {c.flag} {c.id}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Nation Name:</span>
                <span className="text-white font-semibold">{activeCountry.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sports Power Index:</span>
                <span className="text-[#0a84ff] font-bold">{rankedCountries.find((rc: any) => rc.id === activeCountry.id)?.sportsPowerIndex}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">SPI Global Rank:</span>
                <span className="text-white font-medium">#{rankedCountries.findIndex((rc: any) => rc.id === activeCountry.id) + 1}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Growth Rate:</span>
                <span className="text-[#30d158] font-semibold">+{activeCountry.growthPotential}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Dominant Biome:</span>
                <span className="text-slate-300 font-medium">{activeCountry.biomeDominance}</span>
              </div>

              {/* Strong & Weak Areas */}
              <div className="space-y-1.5 pt-2 border-t border-white/[0.04]">
                <span className="text-[9px] text-[#86868b] uppercase font-bold tracking-wider">Strongest Disciplines:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeCountry.strongSports.map((s: string, idx: number) => (
                    <span key={idx} className="bg-[#0a84ff]/10 text-[#0a84ff] border border-[#0a84ff]/20 px-2 py-0.5 rounded-full text-[9px] font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-1.5">
                <span className="text-[9px] text-[#86868b] uppercase font-bold tracking-wider">Weak Disciplines:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeCountry.weakSports.map((s: string, idx: number) => (
                    <span key={idx} className="bg-white/5 text-slate-300 border border-white/10 px-2 py-0.5 rounded-full text-[9px] font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-white/[0.01] rounded-xl border border-white/[0.04] text-[10px]">
                <span className="text-slate-500 block uppercase font-semibold tracking-wider text-[8px] mb-1">Projected 2028 LA Medals:</span>
                <span className="text-white text-sm font-semibold">
                  {Math.round(activeCountry.expectedMedals2028.min * gdpMultiplier)} - {Math.round(activeCountry.expectedMedals2028.max * gdpMultiplier)} medals
                </span>
              </div>
            </div>
          </div>

          {/* Athlete DNA Engine */}
          <div className="glassmorphic rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h3 className="text-[10px] font-semibold text-[#86868b] tracking-wider flex items-center uppercase">
                <Activity className="w-3.5 h-3.5 mr-2 text-slate-400" />
                Athlete DNA Scan
              </h3>
              <select
                value={selectedAthleteId}
                onChange={(e) => setSelectedAthleteId(e.target.value)}
                className="bg-[#1c1c1e] border border-white/[0.06] rounded-lg px-2 py-1 text-xs text-slate-200 outline-none cursor-pointer font-sans font-medium"
              >
                {athletesData.map((a: AthleteData) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Sport / Event:</span>
                <span className="text-white font-semibold">{activeAthlete.sport}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Metric Dimensions:</span>
                <span className="text-slate-300 font-medium">
                  {activeAthlete.height}cm / {activeAthlete.weight}kg / {activeAthlete.age}yrs
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Active Rank:</span>
                <span className="text-[#ff9f0a] font-semibold">World #{activeAthlete.rank}</span>
              </div>

              {/* Custom SVG Radar Chart */}
              <div className="pt-2 flex justify-center border-t border-white/[0.04]">
                <RadarChart data={radarData} color={activeAthlete.countryId === "IND" ? "#ff9f0a" : "#0a84ff"} />
              </div>

              {/* Injury Risk Speedometer & Target Win Prob */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex flex-col items-center p-3 bg-white/[0.01] rounded-2xl border border-white/[0.04] text-center">
                  <span className="text-[8px] text-slate-500 uppercase font-semibold">Injury Risk</span>
                  <span className={`text-base font-semibold mt-1 ${adjustedInjuryRisk > 30 ? "text-[#ff453a]" : "text-[#30d158]"}`}>
                    {adjustedInjuryRisk}%
                  </span>
                  <span className="text-[8px] text-slate-500 mt-0.5">LSTM Predict</span>
                </div>
                
                <div className="flex flex-col items-center p-3 bg-white/[0.01] rounded-2xl border border-white/[0.04] text-center">
                  <span className="text-[8px] text-slate-500 uppercase font-semibold">Win Prob.</span>
                  <span className="text-base font-semibold text-[#0a84ff] mt-1">
                    {Math.round(Math.min(99, activeAthlete.winningProbability.gold * recoveryMultiplier))}%
                  </span>
                  <span className="text-[8px] text-slate-500 mt-0.5">Target: 🥇 (LA28)</span>
                </div>
              </div>

              {/* Strengths bullet points */}
              <div className="space-y-1.5 pt-2 border-t border-white/[0.04]">
                <span className="text-[9px] text-[#86868b] uppercase font-bold tracking-wider">AI Biomechanical Strengths:</span>
                <ul className="space-y-1 text-[10px] text-slate-300">
                  {activeAthlete.strengths.map((str: string, idx: number) => (
                    <li key={idx}>• {str}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

      </main>
      )}

      {activeTab === "executive_hub" && (
        <main className="flex-1 p-6 z-10 flex flex-col">
          <ExecutiveHub />
        </main>
      )}

      {activeTab === "founder_command" && (
        <main className="flex-1 p-6 z-10 flex flex-col">
          <FounderCommandCenter />
        </main>
      )}

      {activeTab === "stakeholders" && (
        <main className="flex-1 p-6 z-10 flex flex-col">
          <StakeholderPortals />
        </main>
      )}

      {activeTab === "tech_architecture" && (
        <main className="flex-1 p-6 z-10 flex flex-col">
          <ArchitectureAPIs />
        </main>
      )}

      {activeTab === "system_docs" && (
        <main className="flex-1 p-6 z-10 flex flex-col">
          <SystemDocs />
        </main>
      )}

      {/* Footer System Info */}
      <footer className="border-t border-white/[0.06] px-6 py-4 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-500 font-sans z-10 relative">
        <div>
          <span>KHELAB - SPORTS INTELLIGENCE ENGINE v1.2.4-PROD</span>
        </div>
        <div className="flex items-center space-x-4 my-2 md:my-0">
          <span className="flex items-center text-slate-400">
            <Shield className="w-3.5 h-3.5 mr-1" />
            SECURE ENGINE ACTIVE
          </span>
          <span className="flex items-center text-slate-400">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            STOCHASTIC INFERENCE
          </span>
        </div>
        <div>
          <span>&copy; 2026 KHELAB SPORTS INTELLIGENCE INC.</span>
        </div>
      </footer>

      {/* Exporter Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        targetName={`${activeCountry.name} - ${activeAthlete.name}`}
        targetType="athlete"
        additionalData={{
          country: activeCountry,
          athlete: activeAthlete,
          radarMetrics: radarData,
          spiScore: rankedCountries.find((rc: any) => rc.id === activeCountry.id)?.sportsPowerIndex,
          whatIfOptions: {
            gdpMultiplier,
            recoveryMultiplier,
            frictionMultiplier
          }
        }}
      />
    </div>
  );
}
