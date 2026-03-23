'use client';

import React from 'react';

interface MetricProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: 'blue' | 'orange' | 'purple' | 'red' | 'green' | 'yellow';
  size?: 'sm' | 'md' | 'lg';
}

const colorMap = {
  blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
  orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
  purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
  red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
  green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
  yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
};

const sizeMap = {
  sm: {
    container: 'p-3',
    icon: 'w-6 h-6',
    label: 'text-xs',
    value: 'text-sm',
  },
  md: {
    container: 'p-4',
    icon: 'w-8 h-8',
    label: 'text-sm',
    value: 'text-lg',
  },
  lg: {
    container: 'p-6',
    icon: 'w-10 h-10',
    label: 'text-base',
    value: 'text-2xl',
  },
};

export function Metric({
  label,
  value,
  icon,
  color = 'blue',
  size = 'md',
}: MetricProps) {
  const sizes = sizeMap[size];

  return (
    <div className={`rounded-lg ${colorMap[color]} ${sizes.container}`}>
      <div className="flex items-center gap-3">
        {icon && <div className={`${sizes.icon} flex-shrink-0`}>{icon}</div>}
        <div className="flex-1 min-w-0">
          <p className={`${sizes.label} font-medium text-gray-600 dark:text-gray-400`}>
            {label}
          </p>
          <p className={`${sizes.value} font-bold text-gray-900 dark:text-white truncate`}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Metric;
