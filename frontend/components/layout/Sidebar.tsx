'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';

interface SidebarItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  active?: boolean;
  badge?: number;
}

interface SidebarProps {
  items: SidebarItem[];
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  title?: string;
}

export function Sidebar({
  items,
  collapsed: initialCollapsed = false,
  onCollapse,
  title = 'HomeERP',
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const { t } = useTranslation();

  const handleCollapse = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    onCollapse?.(newState);
  };

  return (
    <div
      className={`
        fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
        transition-all duration-300 ease-in-out z-40
        ${collapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        {!collapsed && (
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
        )}
        <button
          onClick={handleCollapse}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="py-4 space-y-2 px-3">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`
              flex items-center gap-3 px-3 py-2 rounded-lg transition-colors relative group
              ${
                item.active
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }
            `}
            title={collapsed ? item.label : undefined}
          >
            {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
            {!collapsed && <span className="flex-1 text-sm font-medium">{item.label}</span>}
            {item.badge !== undefined && !collapsed && (
              <span className="ml-auto px-2 py-1 text-xs font-semibold bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full">
                {item.badge}
              </span>
            )}

            {/* Tooltip for collapsed state */}
            {collapsed && (
              <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                {item.label}
              </div>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
