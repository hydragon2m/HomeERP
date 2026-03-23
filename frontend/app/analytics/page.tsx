'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, BarChart, PieChart, AreaChart } from '@/components/charts';
import { useSidebarItems } from '@/lib/navigation';
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  Target,
  Clock,
  ArrowUpRight,
} from 'lucide-react';

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
  { name: 'MXH', value: 20 },
  { name: 'Email', value: 10 },
  { name: 'Khac', value: 5 },
];

const pageViewData = [
  { name: 'T1', views: 12000 },
  { name: 'T2', views: 15000 },
  { name: 'T3', views: 18000 },
  { name: 'T4', views: 22000 },
  { name: 'T5', views: 25000 },
  { name: 'T6', views: 28000 },
];

function MetricCard({
  title,
  value,
  change,
  icon: Icon,
}: {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#666] text-sm">{title}</span>
          <Icon className="w-4 h-4 text-[#666]" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-white">{value}</span>
          <span className={`text-sm flex items-center gap-1 ${change >= 0 ? 'text-[#50e3c2]' : 'text-[#e00]'}`}>
            {change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {change >= 0 ? '+' : ''}{change}%
          </span>
        </div>
        <span className="text-xs text-[#666]">so voi tuan truoc</span>
      </CardContent>
    </Card>
  );
}

export default function AnalyticsPage() {
  const sidebarItems = useSidebarItems();
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      headerTitle="Phan tich"
      headerActions={
        <div className="flex gap-1">
          {['7d', '30d', '90d'].map((range) => (
            <Button 
              key={range}
              variant={timeRange === range ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setTimeRange(range)}
            >
              {range === '7d' ? '7 ngay' : range === '30d' ? '30 ngay' : '90 ngay'}
            </Button>
          ))}
        </div>
      }
    >
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard title="Luot truy cap" value="12,456" change={12.5} icon={Eye} />
        <MetricCard title="Nguoi dung moi" value="1,234" change={8.2} icon={Users} />
        <MetricCard title="Ty le chuyen doi" value="3.24%" change={-2.1} icon={Target} />
        <MetricCard title="Thoi gian TB" value="4m 32s" change={5.8} icon={Clock} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <LineChart
          data={trafficData}
          dataKey="visits"
          title="Luot truy cap theo ngay"
          xAxisKey="name"
          stroke="#0070f3"
          height={300}
        />
        <AreaChart
          data={pageViewData}
          dataKey="views"
          title="Luot xem trang theo thang"
          xAxisKey="name"
          fill="#50e3c2"
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
          fill="#f5a623"
          height={280}
        />
        <PieChart
          data={sourceData}
          title="Nguon truy cap"
          height={280}
        />
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Trang pho bien</CardTitle>
            <Button variant="ghost" size="sm">Xem tat ca</Button>
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
                    <p className="text-sm text-[#ededed]">{item.page}</p>
                    <div className="w-full bg-[#222] rounded-full h-1.5 mt-1">
                      <div
                        className="bg-[#0070f3] h-1.5 rounded-full transition-all"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-[#888] ml-4">{item.views}</span>
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
                { device: 'Desktop', percent: 58, color: 'bg-[#0070f3]' },
                { device: 'Mobile', percent: 35, color: 'bg-[#50e3c2]' },
                { device: 'Tablet', percent: 7, color: 'bg-[#f5a623]' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="w-16 text-sm text-[#888]">{item.device}</span>
                  <div className="flex-1 bg-[#222] rounded-full h-2">
                    <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percent}%` }} />
                  </div>
                  <span className="text-sm text-white w-12 text-right">{item.percent}%</span>
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
                { browser: 'Chrome', percent: 65, color: 'bg-[#f5a623]' },
                { browser: 'Safari', percent: 18, color: 'bg-[#0070f3]' },
                { browser: 'Firefox', percent: 10, color: 'bg-[#ff0080]' },
                { browser: 'Edge', percent: 5, color: 'bg-[#50e3c2]' },
                { browser: 'Khac', percent: 2, color: 'bg-[#666]' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="w-16 text-sm text-[#888]">{item.browser}</span>
                  <div className="flex-1 bg-[#222] rounded-full h-2">
                    <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percent}%` }} />
                  </div>
                  <span className="text-sm text-white w-12 text-right">{item.percent}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
