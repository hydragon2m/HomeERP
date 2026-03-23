'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LineChart, BarChart, PieChart } from '@/components/charts';
import {
  LayoutDashboard,
  ShoppingCart,
  BarChart3,
  Wallet,
  Package,
  Users,
  FileText,
  Settings,
  Download,
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  ShoppingBag,
  UserPlus,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

// Sample report data
const monthlyRevenueData = [
  { name: 'T1', revenue: 45000000 },
  { name: 'T2', revenue: 52000000 },
  { name: 'T3', revenue: 48000000 },
  { name: 'T4', revenue: 61000000 },
  { name: 'T5', revenue: 55000000 },
  { name: 'T6', revenue: 67000000 },
  { name: 'T7', revenue: 72000000 },
  { name: 'T8', revenue: 69000000 },
  { name: 'T9', revenue: 78000000 },
  { name: 'T10', revenue: 85000000 },
  { name: 'T11', revenue: 92000000 },
  { name: 'T12', revenue: 98000000 },
];

const productCategoryData = [
  { name: 'Dien tu', value: 45 },
  { name: 'Quan ao', value: 25 },
  { name: 'Giay dep', value: 15 },
  { name: 'Phu kien', value: 10 },
  { name: 'Khac', value: 5 },
];

const salesByRegionData = [
  { name: 'Ha Noi', sales: 350000000 },
  { name: 'HCM', sales: 450000000 },
  { name: 'Da Nang', sales: 120000000 },
  { name: 'Hai Phong', sales: 85000000 },
  { name: 'Can Tho', sales: 65000000 },
];

const topProductsData = [
  { id: 1, name: 'iPhone 15 Pro Max', category: 'Dien tu', sold: 156, revenue: 4992000000 },
  { id: 2, name: 'Laptop Dell XPS 15', category: 'Dien tu', sold: 89, revenue: 3115000000 },
  { id: 3, name: 'Samsung Galaxy S24', category: 'Dien tu', sold: 124, revenue: 3100000000 },
  { id: 4, name: 'Apple Watch Series 9', category: 'Dien tu', sold: 98, revenue: 1176000000 },
  { id: 5, name: 'Giay Nike Air Max', category: 'Giay dep', sold: 234, revenue: 585000000 },
];

const topCustomersData = [
  { id: 1, name: 'Ngo Van G', orders: 30, totalSpent: 65000000, lastOrder: '2024-03-15' },
  { id: 2, name: 'Pham Van C', orders: 25, totalSpent: 45000000, lastOrder: '2024-03-14' },
  { id: 3, name: 'Nguyen Van A', orders: 15, totalSpent: 25000000, lastOrder: '2024-03-13' },
  { id: 4, name: 'Vu Van E', orders: 12, totalSpent: 18000000, lastOrder: '2024-03-12' },
  { id: 5, name: 'Tran Thi B', orders: 8, totalSpent: 12000000, lastOrder: '2024-03-11' },
];

function StatCard({ title, value, change, changeLabel, icon: Icon, color }: any) {
  const isPositive = change >= 0;
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <div className="flex items-center mt-2">
              {isPositive ? (
                <ArrowUpRight className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? '+' : ''}{change}%
              </span>
              <span className="text-sm text-gray-500 ml-1">{changeLabel}</span>
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

export default function ReportsPage() {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState('month');

  const sidebarItems = [
    { label: t.menu.dashboard, href: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: t.menu.sales, href: '/sales', icon: <ShoppingCart className="w-5 h-5" />, badge: 3 },
    { label: t.menu.analytics, href: '/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { label: t.menu.finance, href: '/finance', icon: <Wallet className="w-5 h-5" /> },
    { label: t.menu.inventory, href: '/inventory', icon: <Package className="w-5 h-5" /> },
    { label: t.menu.customers, href: '/customers', icon: <Users className="w-5 h-5" /> },
    { label: t.menu.reports, href: '/reports', icon: <FileText className="w-5 h-5" />, active: true },
    { label: t.menu.settings, href: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      headerTitle="Bao cao va Thong ke"
      headerSubtitle="Phan tich va bao cao kinh doanh"
      headerActions={
        <div className="flex gap-2">
          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            options={[
              { value: 'week', label: 'Tuan nay' },
              { value: 'month', label: 'Thang nay' },
              { value: 'quarter', label: 'Quy nay' },
              { value: 'year', label: 'Nam nay' },
            ]}
            className="w-40"
          />
          <Button variant="outline"><Download className="w-4 h-4 mr-2" />Xuat bao cao</Button>
        </div>
      }
    >
      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Tong doanh thu" value="822M VND" change={15.3} changeLabel="vs thang truoc" icon={DollarSign} color="blue" />
        <StatCard title="Don hang" value="1,234" change={8.7} changeLabel="vs thang truoc" icon={ShoppingBag} color="green" />
        <StatCard title="Khach hang moi" value="127" change={-2.4} changeLabel="vs thang truoc" icon={UserPlus} color="orange" />
        <StatCard title="Ty le chuyen doi" value="3.2%" change={12.1} changeLabel="vs thang truoc" icon={TrendingUp} color="purple" />
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
          <TabsTrigger value="products">San pham</TabsTrigger>
          <TabsTrigger value="customers">Khach hang</TabsTrigger>
          <TabsTrigger value="regions">Khu vuc</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LineChart
              data={monthlyRevenueData}
              dataKey="revenue"
              title="Doanh thu theo thang"
              xAxisKey="name"
              stroke="#3b82f6"
              height={350}
            />
            <Card>
              <CardHeader><CardTitle>Phan tich doanh thu</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <div>
                      <p className="text-sm text-gray-500">Doanh thu thang nay</p>
                      <p className="text-2xl font-bold">98,000,000 VND</p>
                    </div>
                    <Badge variant="success" className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />+12.5%
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Doanh thu trung binh/ngay</span>
                      <span className="font-bold">3,266,667 VND</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Don hang trung binh/ngay</span>
                      <span className="font-bold">41 don</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gia tri don trung binh</span>
                      <span className="font-bold">2,390,000 VND</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ty suat loi nhuan</span>
                      <span className="font-bold text-green-600">23.5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader><CardTitle>Top san pham ban chay</CardTitle></CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>San pham</TableHead>
                        <TableHead>Danh muc</TableHead>
                        <TableHead>Da ban</TableHead>
                        <TableHead>Doanh thu</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topProductsData.map((product, index) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-bold">{index + 1}</TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell><Badge variant="secondary">{product.category}</Badge></TableCell>
                          <TableCell>{product.sold}</TableCell>
                          <TableCell>{(product.revenue / 1000000).toFixed(0)}M VND</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            <PieChart
              data={productCategoryData}
              title="Phan bo theo danh muc"
              height={350}
            />
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle>Top khach hang</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Khach hang</TableHead>
                      <TableHead>Don hang</TableHead>
                      <TableHead>Tong chi tieu</TableHead>
                      <TableHead>Don gan nhat</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topCustomersData.map((customer, index) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-bold">{index + 1}</TableCell>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>{customer.orders}</TableCell>
                        <TableCell>{(customer.totalSpent / 1000000).toFixed(0)}M VND</TableCell>
                        <TableCell>{customer.lastOrder}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Thong ke khach hang</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <div>
                      <p className="text-sm text-gray-500">Tong khach hang</p>
                      <p className="text-2xl font-bold">2,456</p>
                    </div>
                    <Badge variant="success">+127 moi</Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Khach VIP</span>
                      <span className="font-bold text-yellow-600">156 (6.4%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Khach thuong xuyen</span>
                      <span className="font-bold text-blue-600">892 (36.3%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Khach moi</span>
                      <span className="font-bold text-green-600">1,408 (57.3%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ty le quay lai</span>
                      <span className="font-bold">42.7%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BarChart
              data={salesByRegionData}
              dataKey="sales"
              title="Doanh thu theo khu vuc"
              xAxisKey="name"
              fill="#10b981"
              height={350}
            />
            <Card>
              <CardHeader><CardTitle>Chi tiet khu vuc</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Khu vuc</TableHead>
                      <TableHead>Doanh thu</TableHead>
                      <TableHead>Ty trong</TableHead>
                      <TableHead>Tang truong</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesByRegionData.map((region) => {
                      const total = salesByRegionData.reduce((sum, r) => sum + r.sales, 0);
                      const percentage = ((region.sales / total) * 100).toFixed(1);
                      const growth = Math.random() * 30 - 10; // Random growth
                      return (
                        <TableRow key={region.name}>
                          <TableCell className="font-medium">{region.name}</TableCell>
                          <TableCell>{(region.sales / 1000000).toFixed(0)}M VND</TableCell>
                          <TableCell>{percentage}%</TableCell>
                          <TableCell>
                            <span className={growth >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
