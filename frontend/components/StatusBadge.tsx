'use client';

import React from 'react';

type StatusType = 'active' | 'inactive' | 'pending' | 'completed' | 'failed' | 'processing';

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig: Record<StatusType, { bg: string; text: string; dot: string }> = {
  active: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-400',
    dot: 'bg-green-500',
  },
  inactive: {
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-700 dark:text-gray-400',
    dot: 'bg-gray-500',
  },
  pending: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-700 dark:text-yellow-400',
    dot: 'bg-yellow-500',
  },
  completed: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-400',
    dot: 'bg-blue-500',
  },
  failed: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-700 dark:text-red-400',
    dot: 'bg-red-500',
  },
  processing: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-400',
    dot: 'bg-purple-500',
  },
};

const statusLabels: Record<StatusType, string> = {
  active: 'Hoạt động',
  inactive: 'Không hoạt động',
  pending: 'Đang chờ',
  completed: 'Hoàn thành',
  failed: 'Thất bại',
  processing: 'Đang xử lý',
};

const sizeMap = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-2 text-base',
};

export function StatusBadge({
  status,
  label,
  size = 'md',
}: StatusBadgeProps) {
  const config = statusConfig[status];
  const displayLabel = label || statusLabels[status];

  return (
    <div
      className={`
        inline-flex items-center gap-2 rounded-full font-medium
        ${config.bg} ${config.text} ${sizeMap[size]}
        transition-colors
      `}
    >
      <span className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
      {displayLabel}
    </div>
  );
}

export default StatusBadge;
