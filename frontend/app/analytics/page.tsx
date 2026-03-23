'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Target,
  Activity,
  Percent,
  Eye,
  MousePointer,
  Clock,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

// Sample analytics data
const trafficData = [
  { name: 'T2', visits: 1200, unique: 800 },
  { name: 'T3', visits: 1900, unique: 1200 },
  { name: 'T4', visits: 1500, unique: 1000 },
  { name: 'T5', visits: 2100, unique: 1400 },
  { name: 'T6', visits: 2400, unique: 1600 },
  { name: 'T7', visits: 1800, unique: 1100 },
  { name: 'CN', visits: 1400, unique: 900 },
];

const conversionData = [
  { name: 'Trang chu', value: 45 },
  { name: 'San pham', value: 30 },
  { name: 'Gio hang', value: 15 },
  { name: 'Thanh toan', value: 10 },
];

const sourceData = [
  { name: 'Tim kiem', value: 40 },
  { name: 'Truc tiep', value: 25 },
  { name: 'Mang xa hoi', value: 20 },
  { name: 'Email', value: 10 },
  { name: 'Khac', value: 5 },
];

const pageViewData = [
  { name: 'Thang 1', views: 12000 },
  { name: 'Thang 2', views: 15000 },
  { name: 'Thang 3', views: 18000 },
  { name: 'Thang 4', views: 22000 },
  { name: 'Thang 5', views: 25000 },
  { name: 'Thang 6', views: 28000 },
];

function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  change: number;
  icon: any;
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <div className="flex items-center mt-2">
              {change >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={change >= 0 ? 'text-green-600 text-sm' : 'text-red-600 text-sm'}>
                {change >= 0 ? '+' : ''}{change}%
              </span>
              <span className="text-gray-500 text-sm ml-1">so voi tuan truoc</span>
            </div>
          </div>
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AnalyticsPage() {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState('7d');

  const sidebarItems = [
    { label: t.menu.dashboard, href: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: t.menu.sales, href: '/sales', icon: <ShoppingCart className="w-5 h-5" /> },
    { label: t.menu.analytics, href: '/analytics', icon: <BarChart3 className="w-5 h-5" />, active: true },
    { label: t.menu.finance, href: '/finance', icon: <Wallet className="w-5 h-5" /> },
    { label: t.menu.inventory, href: '/inventory', icon: <Package className="w-5 h-5" /> },
    { label: t.menu.customers, href: '/customers', icon: <Users className="w-5 h-5" /> },
    { label: t.menu.reports, href: '/reports', icon: <FileText className="w-5 h-5" /> },
    { label: t.menu.settings, href: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      headerTitle="Phan tich"
      headerSubtitle="Thong ke va phan tich du lieu"
      headerActions={
        <div className="flex gap-2">
          <Button variant={timeRange === '7d' ? 'default' : 'outline'} size="sm" onClick={() => setTimeRange('7d')}>
            7 ngay
          </Button>
          <Button variant={timeRange === '30d' ? 'default' : 'outline'} size="sm" onClick={() => setTimeRange('30d')}>
            30 ngay
          </Button>
          <Button variant={timeRange === '90d' ? 'default' : 'outline'} size="sm" onClick={() => setTimeRange('90d')}>
            90 ngay
          </Button>
        </div>
      }
    >
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Tong luot truy cap"
          value="12,456"
          change={12.5}
          icon={Eye}
          color="blue"
        />
        <MetricCard
          title="Nguoi dung moi"
          value="1,234"
          change={8.2}
          icon={Users}
          color="green"
        />
        <MetricCard
          title="Ty le chuyen doi"
          value="3.24%"
          change={-2.1}
          icon={Target}
          color="orange"
        />
        <MetricCard
          title="Thoi gian trung binh"
          value="4m 32s"
          change={5.8}
          icon={Clock}
          color="purple"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <LineChart
          data={trafficData}
          dataKey="visits"
          title="Luot truy cap theo ngay"
          xAxisKey="name"
          stroke="#3b82f6"
          height={300}
        />
        <AreaChart
          data={pageViewData}
          dataKey="views"
          title="Luot xem trang theo thang"
          xAxisKey="name"
          fill="#10b981"
          height={300}
        />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <BarChart
          data={conversionData}
          dataKey="value"
          title="Pheu chuyen doi"
          xAxisKey="name"
          fill="#f97316"
          height={280}
        />
        <PieChart
          data={sourceData}
          title="Nguon truy cap"
          height={280}
        />
        <Card>
          <CardHeader>
            <CardTitle>Trang pho bien</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { page: '/trang-chu', views: '4,523', percent: 36 },
                { page: '/san-pham', views: '2,891', percent: 23 },
                { page: '/gioi-thieu', views: '1,456', percent: 12 },
                { page: '/lien-he', views: '987', percent: 8 },
                { page: '/blog', views: '654', percent: 5 },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.page}</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 ml-4">{item.views}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device & Browser Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Thiet bi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { device: 'Desktop', percent: 58, color: 'bg-blue-500' },
                { device: 'Mobile', percent: 35, color: 'bg-green-500' },
                { device: 'Tablet', percent: 7, color: 'bg-orange-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="w-20 text-sm">{item.device}</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div className={`${item.color} h-3 rounded-full`} style={{ width: `${item.percent}%` }} />
                  </div>
                  <span className="text-sm font-medium w-12 text-right">{item.percent}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trinh duyet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { browser: 'Chrome', percent: 65, color: 'bg-yellow-500' },
                { browser: 'Safari', percent: 18, color: 'bg-blue-500' },
                { browser: 'Firefox', percent: 10, color: 'bg-orange-500' },
                { browser: 'Edge', percent: 5, color: 'bg-cyan-500' },
                { browser: 'Khac', percent: 2, color: 'bg-gray-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="w-20 text-sm">{item.browser}</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div className={`${item.color} h-3 rounded-full`} style={{ width: `${item.percent}%` }} />
                  </div>
                  <span className="text-sm font-medium w-12 text-right">{item.percent}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
