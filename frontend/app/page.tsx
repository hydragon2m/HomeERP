'use client';

import React, { useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KPICard } from '@/components/KPICard';
import { Metric } from '@/components/Metric';
import { DashboardLineChart, DashboardBarChart, DashboardPieChart, DashboardAreaChart, GaugeChart } from '@/components/charts';
import { DataTable } from '@/components/DataTable';
import { Calendar } from '@/components/Calendar';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/Button';
import { useTranslation } from '@/lib/i18n';

// Sample data
const revenueData = [
  { name: 'Tháng 1', revenue: 4000 },
  { name: 'Tháng 2', revenue: 3000 },
  { name: 'Tháng 3', revenue: 2000 },
  { name: 'Tháng 4', revenue: 2780 },
  { name: 'Tháng 5', revenue: 1890 },
  { name: 'Tháng 6', revenue: 2390 },
];

const salesData = [
  { name: 'Tháng 1', sales: 4000, returns: 2400 },
  { name: 'Tháng 2', sales: 3000, returns: 1398 },
  { name: 'Tháng 3', sales: 2000, returns: 9800 },
  { name: 'Tháng 4', sales: 2780, returns: 3908 },
  { name: 'Tháng 5', sales: 1890, returns: 4800 },
  { name: 'Tháng 6', sales: 2390, returns: 3800 },
];

const categoryData = [
  { name: 'Điện tử', value: 4000 },
  { name: 'Thực phẩm', value: 3000 },
  { name: 'Quần áo', value: 2000 },
  { name: 'Sách', value: 2780 },
  { name: 'Khác', value: 1890 },
];

const ordersData = [
  { id: 1, orderNo: 'ĐH001', customer: 'Nguyễn Văn A', amount: '1,000,000', status: 'completed', date: '2024-03-10' },
  { id: 2, orderNo: 'ĐH002', customer: 'Trần Thị B', amount: '2,500,000', status: 'processing', date: '2024-03-11' },
  { id: 3, orderNo: 'ĐH003', customer: 'Phạm Văn C', amount: '800,000', status: 'pending', date: '2024-03-12' },
  { id: 4, orderNo: 'ĐH004', customer: 'Hoàng Thị D', amount: '3,200,000', status: 'completed', date: '2024-03-13' },
  { id: 5, orderNo: 'ĐH005', customer: 'Vũ Văn E', amount: '1,500,000', status: 'failed', date: '2024-03-14' },
];

export default function Home() {
  const { t } = useTranslation();

  const sidebarItems = [
    { label: t.menu.dashboard, href: '/', icon: '📊', active: true },
    { label: t.menu.sales, href: '/sales', icon: '💰', badge: 3 },
    { label: t.menu.analytics, href: '/analytics', icon: '📈' },
    { label: t.menu.finance, href: '/finance', icon: '💳' },
    { label: t.menu.inventory, href: '/inventory', icon: '📦' },
    { label: t.menu.customers, href: '/customers', icon: '👥' },
    { label: t.menu.reports, href: '/reports', icon: '📋' },
    { label: t.menu.settings, href: '/settings', icon: '⚙️' },
  ];

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      headerTitle={t.dashboard.title}
      headerSubtitle={`${t.dashboard.welcome} đến HomeERP`}
      headerActions={
        <Button variant="primary" size="md">
          + {t.actions.add}
        </Button>
      }
    >
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          title={t.metrics.revenue}
          value="₫45,200,000"
          subtitle={t.metrics.thisMonth}
          trend={12.5}
          trendLabel={t.time.thisMonth}
          color="blue"
        />
        <KPICard
          title={t.metrics.sales}
          value="1,234"
          subtitle={t.metrics.thisMonth}
          trend={8.2}
          color="orange"
        />
        <KPICard
          title={t.metrics.orders}
          value="856"
          subtitle={t.metrics.thisMonth}
          trend={-3.1}
          color="purple"
        />
        <KPICard
          title={t.metrics.users}
          value="2,456"
          subtitle={t.metrics.total}
          trend={15.8}
          color="green"
        />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
        <Metric label={t.metrics.profit} value="₫12.5M" color="green" size="sm" />
        <Metric label={t.metrics.growth} value="23.5%" color="blue" size="sm" />
        <Metric label="ROI" value="15.2%" color="orange" size="sm" />
        <Metric label="CTR" value="8.9%" color="purple" size="sm" />
        <Metric label="Bounce Rate" value="32.1%" color="red" size="sm" />
        <Metric label={t.metrics.total} value="5.2K" color="yellow" size="sm" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DashboardLineChart
          data={revenueData}
          title={t.charts.revenue}
          dataKey="revenue"
          stroke="#3b82f6"
          height={300}
        />
        <DashboardAreaChart
          data={revenueData}
          title={t.charts.trend}
          dataKey="revenue"
          fill="#a855f7"
          height={300}
        />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <DashboardBarChart
          data={salesData}
          title={t.charts.sales}
          dataKey="sales"
          fill="#f97316"
          height={300}
        />
        <DashboardPieChart
          data={categoryData}
          title={t.charts.distribution}
          dataKey="value"
          height={300}
        />
        <div className="flex flex-col gap-6">
          <GaugeChart
            value={75}
            title={t.charts.performance}
            maxValue={100}
            color="#10b981"
            height={200}
          />
          <Calendar title={t.time.january} />
        </div>
      </div>

      {/* Orders Table */}
      <div className="mb-6">
        <DataTable
          title={t.menu.sales}
          columns={[
            { key: 'orderNo', label: 'Số ĐH', width: '100px' },
            { key: 'customer', label: 'Khách hàng' },
            { key: 'amount', label: 'Số tiền' },
            {
              key: 'status',
              label: t.table.status,
              render: (value: string) => (
                <StatusBadge status={value as any} />
              ),
            },
            { key: 'date', label: t.table.date },
            {
              key: 'id',
              label: t.table.action,
              render: () => (
                <Button variant="secondary" size="sm">
                  {t.actions.view}
                </Button>
              ),
            },
          ]}
          data={ordersData}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t.menu.inventory}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Tổng sản phẩm</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">5,234</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Sản phẩm hết hàng</span>
              <span className="text-2xl font-bold text-red-600">23</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Cảnh báo tồn kho</span>
              <span className="text-2xl font-bold text-orange-600">45</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t.menu.customers}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Khách hàng mới</span>
              <span className="text-2xl font-bold text-green-600">127</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Khách hàng hoạt động</span>
              <span className="text-2xl font-bold text-blue-600">2,456</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Tỷ lệ giữ chân</span>
              <span className="text-2xl font-bold text-purple-600">94.2%</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t.menu.reports}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Báo cáo hôm nay</span>
              <StatusBadge status="completed" size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Báo cáo tuần</span>
              <StatusBadge status="processing" size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Báo cáo tháng</span>
              <StatusBadge status="pending" size="sm" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
