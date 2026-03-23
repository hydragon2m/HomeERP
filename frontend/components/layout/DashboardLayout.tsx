'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Search, Bell, Command } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  sidebarItems?: any[];
  headerTitle?: string;
  headerSubtitle?: string;
  headerActions?: React.ReactNode;
}

export function DashboardLayout({
  children,
  sidebarItems = [],
  headerTitle,
  headerActions,
}: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <Sidebar
        items={sidebarItems}
        collapsed={sidebarCollapsed}
        onCollapse={setSidebarCollapsed}
      />

      <div
        className={`
          transition-all duration-200 ease-out
          ${sidebarCollapsed ? 'ml-16' : 'ml-60'}
        `}
      >
        {/* Vercel-style Header */}
        <header className="sticky top-0 z-30 h-14 bg-black/80 backdrop-blur-sm border-b border-[#333]">
          <div className="h-full px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {headerTitle && (
                <h1 className="text-sm font-medium text-white">{headerTitle}</h1>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <button className="flex items-center gap-2 px-3 py-1.5 bg-[#111] border border-[#333] rounded-md text-[#666] hover:text-white hover:border-[#444] transition-colors">
                <Search className="w-4 h-4" />
                <span className="text-sm">Tim kiem...</span>
                <kbd className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 bg-[#222] rounded text-xs text-[#666]">
                  <Command className="w-3 h-3" />K
                </kbd>
              </button>

              {/* Notifications */}
              <button className="p-2 hover:bg-[#222] rounded-md transition-colors text-[#666] hover:text-white relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#0070f3] rounded-full"></span>
              </button>

              {headerActions}
            </div>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
