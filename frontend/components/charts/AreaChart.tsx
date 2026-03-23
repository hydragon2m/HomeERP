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
  fill = '#a855f7',
}: AreaChartProps) {
  const maxValue = Math.max(...data.map((d) => d[dataKey] as number));
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: 100 - ((d[dataKey] as number) / maxValue) * 80,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L 100 100 L 0 100 Z`;

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
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={fill} stopOpacity="0.6" />
            <stop offset="100%" stopColor={fill} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <line x1="5" y1="90" x2="95" y2="90" stroke="#e5e7eb" strokeWidth="0.5" />
        <line x1="5" y1="10" x2="5" y2="90" stroke="#e5e7eb" strokeWidth="0.5" />
        <path d={areaD} fill="url(#areaGradient)" />
        <path d={pathD} fill="none" stroke={fill} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1.5" fill={fill} />
        ))}
      </svg>
    </div>
  );
}
