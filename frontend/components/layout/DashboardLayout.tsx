'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

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
  headerSubtitle,
  headerActions,
}: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar
        items={sidebarItems}
        collapsed={sidebarCollapsed}
        onCollapse={setSidebarCollapsed}
      />

      <div
        className={`
          transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? 'ml-20' : 'ml-64'}
        `}
      >
        {(headerTitle || headerSubtitle || headerActions) && (
          <Header
            title={headerTitle}
            subtitle={headerSubtitle}
            actions={headerActions}
          />
        )}

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
