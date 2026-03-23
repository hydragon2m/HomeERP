'use client';

import React from 'react';

interface LineChartProps {
  data: Array<{ [key: string]: string | number }>;
  dataKey: string;
  title?: string;
  xAxisKey?: string;
  stroke?: string;
  height?: number;
}

export function LineChart({
  data,
  dataKey,
  title,
  height = 300,
}: LineChartProps) {
  const maxValue = Math.max(...data.map((d) => d[dataKey] as number));
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: 100 - ((d[dataKey] as number) / maxValue) * 80,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
      )}
      <svg
        viewBox="0 0 100 100"
        className="w-full"
        style={{ height: `${height}px` }}
        preserveAspectRatio="xMidYMid meet"
      >
        <line x1="5" y1="90" x2="95" y2="90" stroke="#e5e7eb" strokeWidth="0.5" />
        <line x1="5" y1="10" x2="5" y2="90" stroke="#e5e7eb" strokeWidth="0.5" />
        <path d={pathD} fill="none" stroke="#3b82f6" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1.5" fill="#3b82f6" />
        ))}
      </svg>
    </div>
  );
}
