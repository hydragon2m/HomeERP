'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingCart,
  BarChart3,
  Wallet,
  Package,
  Users,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Triangle,
} from 'lucide-react';

interface SidebarItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: number;
}

export const menuIcons = {
  dashboard: LayoutDashboard,
  sales: ShoppingCart,
  analytics: BarChart3,
  finance: Wallet,
  inventory: Package,
  customers: Users,
  reports: FileText,
  settings: Settings,
};

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
  const pathname = usePathname();

  const handleCollapse = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    onCollapse?.(newState);
  };

  return (
    <div
      className={`
        fixed left-0 top-0 h-screen bg-black border-r border-[#333]
        transition-all duration-200 ease-out z-40
        ${collapsed ? 'w-16' : 'w-60'}
      `}
    >
      {/* Header */}
      <div className="h-14 px-4 border-b border-[#333] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Triangle className="w-5 h-5 text-white fill-white" />
          {!collapsed && (
            <span className="text-sm font-semibold text-white">{title}</span>
          )}
        </div>
        <button
          onClick={handleCollapse}
          className="p-1.5 hover:bg-[#333] rounded-md transition-colors text-[#666] hover:text-white"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="py-2 px-2">
        {items.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={index}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-150 relative group mb-0.5
                ${
                  isActive
                    ? 'bg-[#333] text-white'
                    : 'text-[#888] hover:text-white hover:bg-[#222]'
                }
              `}
              title={collapsed ? item.label : undefined}
            >
              {item.icon && (
                <span className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-[#666]'}`}>
                  {item.icon}
                </span>
              )}
              {!collapsed && (
                <span className="flex-1 text-sm">{item.label}</span>
              )}
              {item.badge !== undefined && !collapsed && (
                <span className="px-1.5 py-0.5 text-xs font-medium bg-[#0070f3] text-white rounded">
                  {item.badge}
                </span>
              )}

              {/* Tooltip for collapsed state */}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-[#333] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-[#444]">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-[#333]">
        <div className={`flex items-center gap-3 px-3 py-2 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0070f3] to-[#7928ca] flex items-center justify-center text-white text-sm font-medium">
            A
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">Admin</p>
              <p className="text-xs text-[#666] truncate">admin@homeerp.vn</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
