'use client';

import {
  LayoutDashboard,
  ShoppingCart,
  BarChart3,
  Wallet,
  Package,
  Users,
  FileText,
  Settings,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export function useSidebarItems() {
  const { t } = useTranslation();
  
  return [
    { label: t.menu.dashboard, href: '/', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: t.menu.sales, href: '/sales', icon: <ShoppingCart className="w-4 h-4" />, badge: 3 },
    { label: t.menu.analytics, href: '/analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { label: t.menu.finance, href: '/finance', icon: <Wallet className="w-4 h-4" /> },
    { label: t.menu.inventory, href: '/inventory', icon: <Package className="w-4 h-4" /> },
    { label: t.menu.customers, href: '/customers', icon: <Users className="w-4 h-4" /> },
    { label: t.menu.reports, href: '/reports', icon: <FileText className="w-4 h-4" /> },
    { label: t.menu.settings, href: '/settings', icon: <Settings className="w-4 h-4" /> },
  ];
}
