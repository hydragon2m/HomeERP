'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  LayoutDashboard,
  ShoppingCart,
  BarChart3,
  Wallet,
  Package,
  Users,
  FileText,
  Settings,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

// Sample orders data
const ordersData = [
  { id: 1, orderNo: 'DH001', customer: 'Nguyen Van A', phone: '0901234567', products: 3, amount: 1500000, status: 'completed', date: '2024-03-15', payment: 'cash' },
  { id: 2, orderNo: 'DH002', customer: 'Tran Thi B', phone: '0912345678', products: 2, amount: 2800000, status: 'processing', date: '2024-03-15', payment: 'transfer' },
  { id: 3, orderNo: 'DH003', customer: 'Pham Van C', phone: '0923456789', products: 5, amount: 4500000, status: 'pending', date: '2024-03-14', payment: 'card' },
  { id: 4, orderNo: 'DH004', customer: 'Hoang Thi D', phone: '0934567890', products: 1, amount: 890000, status: 'completed', date: '2024-03-14', payment: 'cash' },
  { id: 5, orderNo: 'DH005', customer: 'Vu Van E', phone: '0945678901', products: 4, amount: 3200000, status: 'failed', date: '2024-03-13', payment: 'transfer' },
  { id: 6, orderNo: 'DH006', customer: 'Le Thi F', phone: '0956789012', products: 2, amount: 1750000, status: 'completed', date: '2024-03-13', payment: 'card' },
  { id: 7, orderNo: 'DH007', customer: 'Ngo Van G', phone: '0967890123', products: 6, amount: 5600000, status: 'processing', date: '2024-03-12', payment: 'transfer' },
  { id: 8, orderNo: 'DH008', customer: 'Do Thi H', phone: '0978901234', products: 3, amount: 2100000, status: 'pending', date: '2024-03-12', payment: 'cash' },
];

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { variant: any; label: string }> = {
    completed: { variant: 'success', label: 'Hoan thanh' },
    processing: { variant: 'warning', label: 'Dang xu ly' },
    pending: { variant: 'secondary', label: 'Cho xu ly' },
    failed: { variant: 'destructive', label: 'That bai' },
  };
  const { variant, label } = config[status] || { variant: 'secondary', label: status };
  return <Badge variant={variant}>{label}</Badge>;
}

function PaymentBadge({ payment }: { payment: string }) {
  const config: Record<string, { variant: any; label: string }> = {
    cash: { variant: 'success', label: 'Tien mat' },
    transfer: { variant: 'info', label: 'Chuyen khoan' },
    card: { variant: 'default', label: 'The' },
  };
  const { variant, label } = config[payment] || { variant: 'secondary', label: payment };
  return <Badge variant={variant}>{label}</Badge>;
}

export default function SalesPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const sidebarItems = [
    { label: t.menu.dashboard, href: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: t.menu.sales, href: '/sales', icon: <ShoppingCart className="w-5 h-5" />, active: true, badge: 3 },
    { label: t.menu.analytics, href: '/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { label: t.menu.finance, href: '/finance', icon: <Wallet className="w-5 h-5" /> },
    { label: t.menu.inventory, href: '/inventory', icon: <Package className="w-5 h-5" /> },
    { label: t.menu.customers, href: '/customers', icon: <Users className="w-5 h-5" /> },
    { label: t.menu.reports, href: '/reports', icon: <FileText className="w-5 h-5" /> },
    { label: t.menu.settings, href: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const filteredOrders = ordersData.filter((order) => {
    const matchSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = ordersData.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.amount, 0);
  const totalOrders = ordersData.length;
  const completedOrders = ordersData.filter(o => o.status === 'completed').length;
  const pendingOrders = ordersData.filter(o => o.status === 'pending' || o.status === 'processing').length;

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      headerTitle="Quan ly Ban hang"
      headerSubtitle="Quan ly don hang va doanh so"
      headerActions={
        <Dialog>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />Tao don hang</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Tao don hang moi</DialogTitle>
              <DialogDescription>Nhap thong tin don hang moi</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="customer">Ten khach hang</Label>
                <Input id="customer" placeholder="Nhap ten khach hang" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">So dien thoai</Label>
                <Input id="phone" placeholder="Nhap so dien thoai" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">So tien</Label>
                <Input id="amount" type="number" placeholder="Nhap so tien" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="payment">Phuong thuc thanh toan</Label>
                <Select
                  options={[
                    { value: 'cash', label: 'Tien mat' },
                    { value: 'transfer', label: 'Chuyen khoan' },
                    { value: 'card', label: 'The tin dung' },
                  ]}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Huy</Button>
              <Button>Tao don hang</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Tong doanh thu</p>
            <p className="text-2xl font-bold text-blue-600">{totalRevenue.toLocaleString()} VND</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Tong don hang</p>
            <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Da hoan thanh</p>
            <p className="text-2xl font-bold text-green-600">{completedOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Dang cho xu ly</p>
            <p className="text-2xl font-bold text-orange-600">{pendingOrders}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Tim kiem don hang, khach hang..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: 'all', label: 'Tat ca trang thai' },
                { value: 'completed', label: 'Hoan thanh' },
                { value: 'processing', label: 'Dang xu ly' },
                { value: 'pending', label: 'Cho xu ly' },
                { value: 'failed', label: 'That bai' },
              ]}
              className="w-full md:w-48"
            />
            <Button variant="outline"><Filter className="w-4 h-4 mr-2" />Loc</Button>
            <Button variant="outline"><Download className="w-4 h-4 mr-2" />Xuat Excel</Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sach don hang</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ma DH</TableHead>
                <TableHead>Khach hang</TableHead>
                <TableHead>SDT</TableHead>
                <TableHead>SP</TableHead>
                <TableHead>So tien</TableHead>
                <TableHead>Thanh toan</TableHead>
                <TableHead>Trang thai</TableHead>
                <TableHead>Ngay</TableHead>
                <TableHead>Thao tac</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNo}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.phone}</TableCell>
                  <TableCell>{order.products}</TableCell>
                  <TableCell>{order.amount.toLocaleString()} VND</TableCell>
                  <TableCell><PaymentBadge payment={order.payment} /></TableCell>
                  <TableCell><StatusBadge status={order.status} /></TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
                    </div>
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
