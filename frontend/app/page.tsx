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
      headerSubtitle={`${t.dashboard.welcome} đến HomeERP`}
      headerActions={
        <Button variant="default">
          <Plus className="w-4 h-4 mr-2" /> {t.actions.add}
        </Button>
      }
    >
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Chào mừng trở lại</h1>
        <p className="text-[#999] text-sm">Dưới đây là tổng quan hoạt động kinh doanh của bạn trong tháng này</p>
      </div>

      {/* KPI Section - Premium Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-xl border border-[#333] p-6 hover:border-[#555] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[#999] uppercase tracking-wider">{t.metrics.revenue}</span>
              <div className="w-8 h-8 rounded-full bg-[#3b82f6]/10 flex items-center justify-center"><Wallet className="w-4 h-4 text-[#3b82f6]" /></div>
            </div>
            <div className="mb-3">
              <p className="text-3xl font-bold text-white">₫45.2B</p>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#10b981]" />
              <span className="text-sm text-[#10b981] font-medium">+12.5%</span>
              <span className="text-xs text-[#666] ml-1">từ tháng trước</span>
            </div>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-xl border border-[#333] p-6 hover:border-[#555] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f97316]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[#999] uppercase tracking-wider">{t.metrics.sales}</span>
              <div className="w-8 h-8 rounded-full bg-[#f97316]/10 flex items-center justify-center"><ShoppingCart className="w-4 h-4 text-[#f97316]" /></div>
            </div>
            <div className="mb-3">
              <p className="text-3xl font-bold text-white">1,234</p>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#10b981]" />
              <span className="text-sm text-[#10b981] font-medium">+8.2%</span>
              <span className="text-xs text-[#666] ml-1">từ tháng trước</span>
            </div>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-xl border border-[#333] p-6 hover:border-[#555] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[#999] uppercase tracking-wider">{t.metrics.orders}</span>
              <div className="w-8 h-8 rounded-full bg-[#a855f7]/10 flex items-center justify-center"><Package className="w-4 h-4 text-[#a855f7]" /></div>
            </div>
            <div className="mb-3">
              <p className="text-3xl font-bold text-white">856</p>
            </div>
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-[#ef4444]" />
              <span className="text-sm text-[#ef4444] font-medium">-3.1%</span>
              <span className="text-xs text-[#666] ml-1">từ tháng trước</span>
            </div>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-xl border border-[#333] p-6 hover:border-[#555] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[#999] uppercase tracking-wider">{t.metrics.users}</span>
              <div className="w-8 h-8 rounded-full bg-[#10b981]/10 flex items-center justify-center"><Users className="w-4 h-4 text-[#10b981]" /></div>
            </div>
            <div className="mb-3">
              <p className="text-3xl font-bold text-white">2,456</p>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#10b981]" />
              <span className="text-sm text-[#10b981] font-medium">+15.8%</span>
              <span className="text-xs text-[#666] ml-1">từ tháng trước</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row - Premium Styled */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-xl border border-[#333] p-6 hover:border-[#555] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white">Doanh thu theo tháng</h3>
                <p className="text-xs text-[#666] mt-1">Biểu đồ doanh thu hàng tháng</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#3b82f6]/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-[#3b82f6]" />
              </div>
            </div>
            <LineChart
              data={revenueData}
              dataKey="revenue"
              xAxisKey="name"
              stroke="#3b82f6"
              height={220}
            />
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-xl border border-[#333] p-6 hover:border-[#555] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white">Xu hướng hiệu suất</h3>
                <p className="text-xs text-[#666] mt-1">Biểu đồ hiệu suất hoạt động</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#a855f7]/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#a855f7]" />
              </div>
            </div>
            <AreaChart
              data={performanceData}
              dataKey="performance"
              xAxisKey="name"
              fill="#a855f7"
              height={220}
            />
          </div>
        </div>
      </div>

      {/* Second Charts Row - Premium Styled */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-xl border border-[#333] p-6 hover:border-[#555] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f97316]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white">Phân tích bán hàng</h3>
                <p className="text-xs text-[#666] mt-1">So sánh bán hàng theo tháng</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#f97316]/10 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-[#f97316]" />
              </div>
            </div>
            <BarChart
              data={salesData}
              dataKey="sales"
              xAxisKey="name"
              fill="#f97316"
              height={220}
            />
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-xl border border-[#333] p-6 hover:border-[#555] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white">Phân loại sản phẩm</h3>
                <p className="text-xs text-[#666] mt-1">Phân bổ theo danh mục</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#10b981]/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-[#10b981]" />
              </div>
            </div>
            <PieChart
              data={categoryData}
              height={220}
            />
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-xl border border-[#333] p-6 hover:border-[#555] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#50e3c2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white">Tổng quan nhanh</h3>
                <p className="text-xs text-[#666] mt-1">Thống kê chính của hệ thống</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#50e3c2]/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-[#50e3c2]" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-[#333]">
                <span className="text-[#888] text-sm">Tổng sản phẩm</span>
                <span className="text-white font-bold">5,234</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-[#333]">
                <span className="text-[#888] text-sm">Hết hàng</span>
                <span className="text-[#ef4444] font-bold">23</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-[#333]">
                <span className="text-[#888] text-sm">Cảnh báo</span>
                <span className="text-[#f97316] font-bold">45</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[#888] text-sm">Tỷ lệ giữ chân</span>
                <span className="text-[#50e3c2] font-bold">94.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table - Premium Styled */}
      <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-xl border border-[#333] p-6 hover:border-[#555] transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#50e3c2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Đơn hàng gần đây</h3>
              <p className="text-xs text-[#666] mt-1">Danh sách các đơn hàng mới nhất</p>
            </div>
            <Button variant="outline" size="sm" className="text-[#888] border-[#444] hover:bg-[#333]">
              Xem tất cả
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-[#333] hover:bg-transparent">
                <TableHead className="text-[#666] font-semibold">Mã ĐH</TableHead>
                <TableHead className="text-[#666] font-semibold">Khách hàng</TableHead>
                <TableHead className="text-[#666] font-semibold">Số tiền</TableHead>
                <TableHead className="text-[#666] font-semibold">Trạng thái</TableHead>
                <TableHead className="text-[#666] font-semibold">Ngày</TableHead>
                <TableHead className="text-[#666] font-semibold text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordersData.map((order) => (
                <TableRow key={order.id} className="border-[#333] hover:bg-[#222] transition-colors">
                  <TableCell className="font-semibold text-white">{order.orderNo}</TableCell>
                  <TableCell className="text-[#888]">{order.customer}</TableCell>
                  <TableCell className="text-white font-medium">₫{order.amount}</TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="text-[#888] text-sm">{order.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-[#3b82f6] hover:text-[#60a5fa] hover:bg-[#3b82f6]/10">
                      Xem chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
