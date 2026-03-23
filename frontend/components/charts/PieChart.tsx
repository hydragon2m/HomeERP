'use client';

import React, { useState, useEffect } from 'react';

interface PieChartProps {
  data: Array<{ name: string; value: number }>;
  title?: string;
  height?: number;
  colors?: string[];
}

// Vercel-style colors
const VERCEL_COLORS = ['#0070f3', '#7928ca', '#ff0080', '#50e3c2', '#f5a623'];

export function PieChart({
  data,
  title,
  height = 300,
  colors = VERCEL_COLORS,
}: PieChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  const cx = 50;
  const cy = 50;
  const r = 35;

  const polarToCartesian = (angle: number) => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: Math.round(cx + r * Math.cos(radians)),
      y: Math.round(cy + r * Math.sin(radians)),
    };
  };

  const createArcPath = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(startAngle);
    const end = polarToCartesian(endAngle);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
  };

  const getSlices = () => {
    let currentAngle = -90;
    return data.map((item, index) => {
      const sliceAngle = (item.value / total) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + sliceAngle;
      const color = colors[index % colors.length];
      currentAngle = endAngle;
      return { ...item, startAngle, endAngle, color };
    });
  };

  return (
    <div className="bg-[#0a0a0a] rounded-lg border border-[#333] p-5">
      {title && (
        <h3 className="text-sm font-medium text-[#ededed] mb-4">{title}</h3>
      )}
      <div className="flex items-center gap-6">
        <svg
          viewBox="0 0 100 100"
          className="w-32 h-32 flex-shrink-0"
          suppressHydrationWarning
        >
          {mounted && getSlices().map((slice, index) => (
            <path
              key={index}
              d={createArcPath(slice.startAngle, slice.endAngle)}
              fill={slice.color}
              stroke="#0a0a0a"
              strokeWidth="1"
            />
          ))}
        </svg>
        <div className="flex-1 space-y-2">
          {data.map((item, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: colors[i % colors.length] }}
                />
                <span className="text-[#888]">{item.name}</span>
              </div>
              <span className="text-white font-medium">
                {Math.round((item.value / total) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
