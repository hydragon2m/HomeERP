'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LineChart, BarChart, PieChart, AreaChart } from '@/components/charts';
import {
  LayoutDashboard,
  ShoppingCart,
  BarChart3,
  Wallet,
  Package,
  Users,
  FileText,
  Settings,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Plus,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import {
  revenueData,
  salesData,
  categoryData,
  ordersData,
  performanceData,
} from '@/lib/mockData';

// Vercel-style KPI Card
function KPICard({
  title,
  value,
  change,
  changeType = 'positive',
}: {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[#666] text-sm">{title}</span>
          <ArrowUpRight className="w-4 h-4 text-[#666]" />
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-semibold text-white">{value}</span>
          {change && (
            <span className={`text-sm flex items-center gap-1 ${
              changeType === 'positive' ? 'text-[#50e3c2]' : 
              changeType === 'negative' ? 'text-[#e00]' : 'text-[#666]'
            }`}>
              {changeType === 'positive' ? <TrendingUp className="w-3 h-3" /> : 
               changeType === 'negative' ? <TrendingDown className="w-3 h-3" /> : null}
              {change}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Status Badge Vercel style
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; text: string; dot: string; label: string }> = {
    completed: { bg: 'bg-[#50e3c2]/10', text: 'text-[#50e3c2]', dot: 'bg-[#50e3c2]', label: 'Hoan thanh' },
    processing: { bg: 'bg-[#f5a623]/10', text: 'text-[#f5a623]', dot: 'bg-[#f5a623]', label: 'Dang xu ly' },
    pending: { bg: 'bg-[#666]/10', text: 'text-[#888]', dot: 'bg-[#666]', label: 'Cho xu ly' },
    failed: { bg: 'bg-[#e00]/10', text: 'text-[#e00]', dot: 'bg-[#e00]', label: 'That bai' },
  };
  const style = styles[status] || styles.pending;
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs ${style.bg} ${style.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
      {style.label}
    </span>
  );
}

export default function Home() {
  const { t } = useTranslation();

  const sidebarItems = [
    { label: t.menu.dashboard, href: '/', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: t.menu.sales, href: '/sales', icon: <ShoppingCart className="w-4 h-4" />, badge: 3 },
    { label: t.menu.analytics, href: '/analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { label: t.menu.finance, href: '/finance', icon: <Wallet className="w-4 h-4" /> },
    { label: t.menu.inventory, href: '/inventory', icon: <Package className="w-4 h-4" /> },
    { label: t.menu.customers, href: '/customers', icon: <Users className="w-4 h-4" /> },
    { label: t.menu.reports, href: '/reports', icon: <FileText className="w-4 h-4" /> },
    { label: t.menu.settings, href: '/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      headerTitle={t.dashboard.title}
      headerActions={
        <Button size="sm">
          <Plus className="w-4 h-4" />
          Tao moi
        </Button>
      }
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          title="Doanh thu"
          value="₫45.2M"
          change="+12.5%"
          changeType="positive"
        />
        <KPICard
          title="Don hang"
          value="1,234"
          change="+8.2%"
          changeType="positive"
        />
        <KPICard
          title="Khach hang"
          value="856"
          change="-3.1%"
          changeType="negative"
        />
        <KPICard
          title="San pham"
          value="2,456"
          change="+15.8%"
          changeType="positive"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <LineChart
          data={revenueData}
          dataKey="revenue"
          title="Doanh thu theo thang"
          xAxisKey="name"
          stroke="#0070f3"
          height={280}
        />
        <AreaChart
          data={performanceData}
          dataKey="performance"
          title="Hieu suat"
          xAxisKey="name"
          fill="#7928ca"
          height={280}
        />
      </div>

      {/* Second Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <BarChart
          data={salesData}
          dataKey="sales"
          title="Ban hang"
          xAxisKey="name"
          fill="#50e3c2"
          height={280}
        />
        <PieChart
          data={categoryData}
          title="Phan loai san pham"
          height={280}
        />
        <Card>
          <CardHeader>
            <CardTitle>Tong quan nhanh</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-[#333]">
              <span className="text-[#888] text-sm">Tong san pham</span>
              <span className="text-white font-medium">5,234</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#333]">
              <span className="text-[#888] text-sm">Het hang</span>
              <span className="text-[#e00] font-medium">23</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#333]">
              <span className="text-[#888] text-sm">Canh bao</span>
              <span className="text-[#f5a623] font-medium">45</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-[#888] text-sm">Ty le giu chan</span>
              <span className="text-[#50e3c2] font-medium">94.2%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Don hang gan day</CardTitle>
          <Button variant="outline" size="sm">
            Xem tat ca
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-[#333] hover:bg-transparent">
                <TableHead className="text-[#888]">Ma DH</TableHead>
                <TableHead className="text-[#888]">Khach hang</TableHead>
                <TableHead className="text-[#888]">So tien</TableHead>
                <TableHead className="text-[#888]">Trang thai</TableHead>
                <TableHead className="text-[#888]">Ngay</TableHead>
                <TableHead className="text-[#888] text-right">Hanh dong</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordersData.map((order) => (
                <TableRow key={order.id} className="border-[#333]">
                  <TableCell className="font-medium text-white">{order.orderNo}</TableCell>
                  <TableCell className="text-[#888]">{order.customer}</TableCell>
                  <TableCell className="text-white">₫{order.amount}</TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="text-[#888]">{order.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Xem
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
