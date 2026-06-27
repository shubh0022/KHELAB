"use client";

import React from "react";

interface SpeedometerProps {
  value: number; // 0 - 100
  title: string;
  unit?: string;
  color?: string;
}

export default function Speedometer({ value, title, unit = "%", color = "#0a84ff" }: SpeedometerProps) {
  const radius = 50;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  
  // Speedometer covers an arc
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (value / 100) * arcLength;
  const rotationAngle = -225; // Align arc symmetry to pointing straight up

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white/[0.02] border border-white/[0.04] rounded-2xl">
      <h4 className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-3">{title}</h4>
      
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 120 120" className="transform rotate-[-90deg]">
          {/* Base track */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
            style={{
              transform: `rotate(${rotationAngle}deg)`,
              transformOrigin: "60px 60px"
            }}
          />

          {/* Value path */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transform: `rotate(${rotationAngle}deg)`,
              transformOrigin: "60px 60px",
              transition: "stroke-dashoffset 0.8s ease-out"
            }}
          />
        </svg>

        {/* Text in the center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold tracking-tight text-white">
            {value}
          </span>
          <span className="text-[9px] text-[#86868b] tracking-wider font-medium uppercase mt-0.5">
            {unit}
          </span>
        </div>
      </div>
    </div>
  );
}

