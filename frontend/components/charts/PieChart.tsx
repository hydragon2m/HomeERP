'use client';

import React from 'react';

interface PieChartProps {
  data: Array<{ name: string; value: number }>;
  title?: string;
  height?: number;
  colors?: string[];
}

const DEFAULT_COLORS = ['#3b82f6', '#f97316', '#a855f7', '#ef4444', '#10b981'];

export function PieChart({
  data,
  title,
  height = 300,
  colors = DEFAULT_COLORS,
}: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -90;
  const slices = data.map((item, index) => {
    const sliceAngle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    const color = colors[index % colors.length];
    currentAngle = endAngle;
    return { ...item, startAngle, endAngle, color };
  });

  const cx = 50;
  const cy = 50;
  const r = 30;

  const polarToCartesian = (angle: number) => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: Math.round((cx + r * Math.cos(radians)) * 100) / 100,
      y: Math.round((cy + r * Math.sin(radians)) * 100) / 100,
    };
  };

  const createArcPath = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(startAngle);
    const end = polarToCartesian(endAngle);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
      )}
      <div className="flex flex-col items-center">
        <svg
          viewBox="0 0 120 100"
          className="w-full max-w-sm"
          style={{ height: `${Math.min(height, 200)}px` }}
          preserveAspectRatio="xMidYMid meet"
        >
          {slices.map((slice, index) => (
            <path
              key={index}
              d={createArcPath(slice.startAngle, slice.endAngle)}
              fill={slice.color}
              stroke="white"
              strokeWidth="1"
            />
          ))}
        </svg>
        <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[i % colors.length] }}
              />
              <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
