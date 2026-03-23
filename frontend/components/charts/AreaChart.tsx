'use client';

import React from 'react';

interface AreaChartProps {
  data: Array<{ [key: string]: string | number }>;
  dataKey: string;
  title?: string;
  xAxisKey?: string;
  fill?: string;
  height?: number;
}

export function AreaChart({
  data,
  dataKey,
  title,
  height = 300,
  fill = '#7928ca',
}: AreaChartProps) {
  const maxValue = Math.max(...data.map((d) => d[dataKey] as number));
  const points = data.map((d, i) => ({
    x: 10 + (i / (data.length - 1)) * 80,
    y: 85 - ((d[dataKey] as number) / maxValue) * 70,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${points[points.length - 1].x} 85 L ${points[0].x} 85 Z`;

  return (
    <div className="bg-[#0a0a0a] rounded-lg border border-[#333] p-5">
      {title && (
        <h3 className="text-sm font-medium text-[#ededed] mb-4">{title}</h3>
      )}
      <svg
        viewBox="0 0 100 100"
        className="w-full"
        style={{ height: `${height}px` }}
        preserveAspectRatio="none"
      >
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((pct) => (
          <line
            key={pct}
            x1="10"
            y1={15 + (pct / 100) * 70}
            x2="90"
            y2={15 + (pct / 100) * 70}
            stroke="#333"
            strokeWidth="0.3"
          />
        ))}
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id={`areaGrad-${fill}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={fill} stopOpacity="0.4" />
            <stop offset="100%" stopColor={fill} stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Area fill */}
        <path d={areaD} fill={`url(#areaGrad-${fill})`} />
        
        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke={fill}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Data points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="3"
            fill="#0a0a0a"
            stroke={fill}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
}
