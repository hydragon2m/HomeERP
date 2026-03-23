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
  fill = '#f97316',
  height = 300,
}: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d[dataKey] as number));
  const barWidth = 100 / data.length;

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
        {data.map((d, i) => {
          const height = ((d[dataKey] as number) / maxValue) * 80;
          const x = 5 + (barWidth * i) + barWidth * 0.1;
          const y = 90 - height;
          return (
            <rect key={i} x={x} y={y} width={barWidth * 0.8} height={height} fill={fill} rx="1" />
          );
        })}
      </svg>
    </div>
  );
}
