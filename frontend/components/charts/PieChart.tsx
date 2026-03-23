'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface PieChartProps {
  data: any[];
  title?: string;
  dataKey: string;
  nameKey?: string;
  colors?: string[];
  height?: number;
}

const defaultColors = [
  '#3b82f6',
  '#f97316',
  '#a855f7',
  '#ef4444',
  '#10b981',
  '#f59e0b',
];

export function DashboardPieChart({
  data,
  title,
  dataKey,
  nameKey = 'name',
  colors = defaultColors,
  height = 300,
}: PieChartProps) {
  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardPieChart;
