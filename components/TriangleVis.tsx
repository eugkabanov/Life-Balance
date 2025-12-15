import React from 'react';
import { OptionKey, OPTIONS } from '../types';

interface TriangleVisProps {
  activeKeys: OptionKey[];
}

export const TriangleVis: React.FC<TriangleVisProps> = ({ activeKeys }) => {
  // Coordinates for an equilateral triangle
  // Top: Time
  // Bottom Right: Comfort
  // Bottom Left: Savings
  
  const points = {
    time: { x: 200, y: 50 },
    comfort: { x: 350, y: 310 },
    savings: { x: 50, y: 310 },
  };

  const getStrokeColor = (key1: OptionKey, key2: OptionKey) => {
    const isActive1 = activeKeys.includes(key1);
    const isActive2 = activeKeys.includes(key2);
    
    if (isActive1 && isActive2) {
      // Find the color of the gradient or mix. For simplicity, white glowing line.
      return "url(#activeGradient)";
    }
    return "#334155"; // slate-700
  };

  const getStrokeWidth = (key1: OptionKey, key2: OptionKey) => {
    const isActive1 = activeKeys.includes(key1);
    const isActive2 = activeKeys.includes(key2);
    return isActive1 && isActive2 ? 4 : 2;
  };

  return (
    <div className="w-full max-w-[400px] aspect-square relative flex items-center justify-center mx-auto">
      <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Lines connecting vertices */}
        <line 
          x1={points.time.x} y1={points.time.y} 
          x2={points.comfort.x} y2={points.comfort.y} 
          stroke={getStrokeColor('time', 'comfort')}
          strokeWidth={getStrokeWidth('time', 'comfort')}
          strokeLinecap="round"
          className="transition-all duration-500"
          filter={activeKeys.includes('time') && activeKeys.includes('comfort') ? "url(#glow)" : ""}
        />
        <line 
          x1={points.comfort.x} y1={points.comfort.y} 
          x2={points.savings.x} y2={points.savings.y} 
          stroke={getStrokeColor('comfort', 'savings')}
          strokeWidth={getStrokeWidth('comfort', 'savings')}
          strokeLinecap="round"
          className="transition-all duration-500"
          filter={activeKeys.includes('comfort') && activeKeys.includes('savings') ? "url(#glow)" : ""}
        />
        <line 
          x1={points.savings.x} y1={points.savings.y} 
          x2={points.time.x} y2={points.time.y} 
          stroke={getStrokeColor('savings', 'time')}
          strokeWidth={getStrokeWidth('savings', 'time')}
          strokeLinecap="round"
          className="transition-all duration-500"
          filter={activeKeys.includes('savings') && activeKeys.includes('time') ? "url(#glow)" : ""}
        />

        {/* Vertices */}
        {OPTIONS.map((opt) => {
          const isActive = activeKeys.includes(opt.key);
          const pos = points[opt.key];
          return (
            <g key={opt.key} className="transition-all duration-500">
              {/* Outer Glow Circle */}
              <circle 
                cx={pos.x} cy={pos.y} 
                r={isActive ? 25 : 0} 
                fill={opt.color} 
                opacity="0.2"
                className="transition-all duration-500"
              />
              
              {/* Main Circle */}
              <circle 
                cx={pos.x} cy={pos.y} 
                r={12} 
                fill={isActive ? opt.color : '#1e293b'} 
                stroke={isActive ? '#fff' : '#475569'}
                strokeWidth={3}
                className="transition-all duration-300"
              />

              {/* Text Label */}
              <text
                x={pos.x}
                y={opt.key === 'time' ? pos.y - 30 : pos.y + 40}
                textAnchor="middle"
                fill={isActive ? '#fff' : '#64748b'}
                className="text-sm font-bold uppercase tracking-wider transition-colors duration-300"
                style={{ fontSize: '14px', fontFamily: 'sans-serif' }}
              >
                {opt.label}
              </text>
            </g>
          );
        })}
        
        {/* Center Text Status */}
        <text
          x="200"
          y="200"
          textAnchor="middle"
          fill="#94a3b8"
          className="text-xs tracking-widest opacity-50"
          style={{ fontSize: '10px' }}
        >
          {activeKeys.length === 2 ? "MAX CAPACITY" : "SELECT TWO"}
        </text>
      </svg>
    </div>
  );
};