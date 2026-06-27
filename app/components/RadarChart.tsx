"use client";

import React from "react";

interface RadarItem {
  label: string;
  value: number; // 0 - 100
}

interface RadarChartProps {
  data: RadarItem[];
  color?: string;
  size?: number;
}

export default function RadarChart({ data, color = "#0a84ff", size = 260 }: RadarChartProps) {
  const padding = 40;
  const chartSize = size + padding * 2;
  const center = chartSize / 2;
  const radius = size / 2;
  const totalAxes = data.length;

  // Calculate coordinates for a given axis index, value (0-100), and center
  const getCoordinates = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / totalAxes - Math.PI / 2; // Subtract PI/2 to start at 12 o'clock
    const x = center + radius * (value / 100) * Math.cos(angle);
    const y = center + radius * (value / 100) * Math.sin(angle);
    return { x, y };
  };

  // Concentric background shapes (rings at 20, 40, 60, 80, 100%)
  const rings = [20, 40, 60, 80, 100];
  const backgroundRings = rings.map((ringValue) => {
    const points = Array.from({ length: totalAxes }).map((_, i) => {
      const { x, y } = getCoordinates(i, ringValue);
      return `${x},${y}`;
    }).join(" ");
    return points;
  });

  // Calculate points for the actual value polygon
  const valuePoints = data.map((d, i) => {
    const { x, y } = getCoordinates(i, d.value);
    return `${x},${y}`;
  }).join(" ");

  // Labels positioning
  const labels = data.map((d, i) => {
    const angle = (Math.PI * 2 * indexToAngle(i)) - Math.PI / 2;
    const x = center + (radius + 18) * Math.cos(angle);
    const y = center + (radius + 12) * Math.sin(angle);
    
    // Text anchor alignments based on angle position
    let textAnchor: "start" | "middle" | "end" = "middle";
    if (Math.cos(angle) > 0.1) textAnchor = "start";
    if (Math.cos(angle) < -0.1) textAnchor = "end";

    return { label: d.label, x, y, textAnchor, value: d.value };
  });

  function indexToAngle(i: number) {
    return i / totalAxes;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width="100%" height="100%" viewBox={`0 0 ${chartSize} ${chartSize}`} className="max-w-[280px]">
        {/* Gradients */}
        <defs>
          <linearGradient id="polyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.45" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Concentric helper grids */}
        {backgroundRings.map((points, index) => (
          <polygon
            key={index}
            points={points}
            fill="none"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {Array.from({ length: totalAxes }).map((_, i) => {
          const outerPoint = getCoordinates(i, 100);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={outerPoint.x}
              y2={outerPoint.y}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
            />
          );
        })}

        {/* Clean filled data polygon */}
        <polygon
          points={valuePoints}
          fill="url(#polyGrad)"
          stroke={color}
          strokeWidth="2"
        />

        {/* Data points (dots) */}
        {data.map((d, i) => {
          const pt = getCoordinates(i, d.value);
          return (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r="4"
              fill="#08080a"
              stroke={color}
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200 hover:r-5"
            />
          );
        })}

        {/* Labels & values */}
        {labels.map((l, i) => (
          <text
            key={i}
            x={l.x}
            y={l.y}
            fill="#86868b"
            fontSize="9"
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fontWeight="500"
            textAnchor={l.textAnchor}
            dominantBaseline="middle"
          >
            {l.label} <tspan fill={color} fontWeight="600">({l.value}%)</tspan>
          </text>
        ))}
      </svg>
    </div>
  );
}

