'use client';

import React from 'react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

export function Header({
  title,
  subtitle,
  children,
  actions,
}: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            {title && (
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                {subtitle}
              </p>
            )}
            {children}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </div>
    </header>
  );
}

export default Header;
