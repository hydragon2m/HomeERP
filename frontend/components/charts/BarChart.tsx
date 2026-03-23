'use client';

import React from 'react';

interface BarChartProps {
  data: Array<{ [key: string]: string | number }>;
  dataKey: string;
  title?: string;
  xAxisKey?: string;
  fill?: string;
  height?: number;
}

export function BarChart({
  data,
  dataKey,
  title,
  fill = '#50e3c2',
  height = 300,
}: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d[dataKey] as number));
  const barWidth = 80 / data.length;

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
        
        {/* Bars */}
        {data.map((d, i) => {
          const barHeight = ((d[dataKey] as number) / maxValue) * 70;
          const x = 10 + (barWidth * i) + barWidth * 0.15;
          const y = 85 - barHeight;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={barWidth * 0.7}
              height={barHeight}
              fill={fill}
              rx="2"
              opacity="0.9"
            />
          );
        })}
      </svg>
    </div>
  );
}
