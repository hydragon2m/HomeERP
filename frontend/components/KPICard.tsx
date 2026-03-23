'use client';

import React from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number;
  trendLabel?: string;
  icon?: React.ReactNode;
  color?: 'blue' | 'orange' | 'purple' | 'red' | 'green' | 'yellow';
  onClick?: () => void;
}

const colorMap = {
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-600 dark:text-blue-400',
    icon: 'text-blue-500',
  },
  orange: {
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-600 dark:text-orange-400',
    icon: 'text-orange-500',
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-600 dark:text-purple-400',
    icon: 'text-purple-500',
  },
  red: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-600 dark:text-red-400',
    icon: 'text-red-500',
  },
  green: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-600 dark:text-green-400',
    icon: 'text-green-500',
  },
  yellow: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-600 dark:text-yellow-400',
    icon: 'text-yellow-500',
  },
};

export function KPICard({
  title,
  value,
  subtitle,
  trend,
  trendLabel,
  icon,
  color = 'blue',
  onClick,
}: KPICardProps) {
  const colors = colorMap[color];
  const isPositive = trend ? trend > 0 : false;
  const trendIcon = isPositive ? '↑' : '↓';

  return (
    <div
      onClick={onClick}
      className={`
        p-6 rounded-lg border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-900 shadow-sm hover:shadow-md
        transition-all duration-300 cursor-pointer
        ${onClick ? 'hover:scale-105' : ''}
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
        {icon && (
          <div className={`p-3 rounded-lg ${colors.bg}`}>
            <div className={colors.icon}>{icon}</div>
          </div>
        )}
      </div>

      {(subtitle || trend !== undefined) && (
        <div className="flex items-center gap-4 text-sm">
          {subtitle && (
            <span className="text-gray-600 dark:text-gray-400">{subtitle}</span>
          )}
          {trend !== undefined && (
            <span className={`font-medium ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {trendIcon} {Math.abs(trend)}%
              {trendLabel && ` ${trendLabel}`}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default KPICard;
