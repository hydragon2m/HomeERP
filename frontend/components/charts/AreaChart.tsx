'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface AreaChartProps {
  data: any[];
  title?: string;
  dataKey: string;
  fill?: string;
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
}

export function DashboardAreaChart({
  data,
  title,
  dataKey,
  fill = '#a855f7',
  height = 300,
  showLegend = true,
  showGrid = true,
}: AreaChartProps) {
  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
            }}
          />
          {showLegend && <Legend />}
          <Area
            type="monotone"
            dataKey={dataKey}
            fill={fill}
            stroke={fill}
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardAreaChart;
