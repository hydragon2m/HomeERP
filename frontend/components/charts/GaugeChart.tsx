'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

interface GaugeChartProps {
  value: number;
  title?: string;
  maxValue?: number;
  color?: string;
  height?: number;
}

export function GaugeChart({
  value,
  title,
  maxValue = 100,
  color = '#3b82f6',
  height = 250,
}: GaugeChartProps) {
  const percentage = (value / maxValue) * 100;
  const data = [
    { name: 'value', value: percentage },
    { name: 'empty', value: 100 - percentage },
  ];

  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
      )}
      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
            >
              <Cell fill={color} />
              <Cell fill="#e5e7eb" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="text-center mt-2">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            / {maxValue}
          </p>
        </div>
      </div>
    </div>
  );
}

export default GaugeChart;
