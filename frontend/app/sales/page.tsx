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
  TrendingUp,
  ArrowUpRight,
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

function PaymentBadge({ payment }: { payment: string }) {
  const config: Record<string, { color: string; label: string }> = {
    cash: { color: 'text-[#50e3c2]', label: 'Tien mat' },
    transfer: { color: 'text-[#0070f3]', label: 'Chuyen khoan' },
    card: { color: 'text-[#7928ca]', label: 'The' },
  };
  const { color, label } = config[payment] || { color: 'text-[#888]', label: payment };
  return <span className={`text-xs ${color}`}>{label}</span>;
}

export default function SalesPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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
      headerActions={
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="w-4 h-4" />Tao don hang</Button>
          </DialogTrigger>
          <DialogContent>
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
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#666] text-sm">Tong doanh thu</span>
              <ArrowUpRight className="w-4 h-4 text-[#666]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-white">{(totalRevenue/1000000).toFixed(1)}M</span>
              <span className="text-sm text-[#50e3c2] flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />+12%
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#666] text-sm">Tong don hang</span>
              <ArrowUpRight className="w-4 h-4 text-[#666]" />
            </div>
            <span className="text-2xl font-semibold text-white">{totalOrders}</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#666] text-sm">Hoan thanh</span>
              <ArrowUpRight className="w-4 h-4 text-[#666]" />
            </div>
            <span className="text-2xl font-semibold text-[#50e3c2]">{completedOrders}</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#666] text-sm">Dang xu ly</span>
              <ArrowUpRight className="w-4 h-4 text-[#666]" />
            </div>
            <span className="text-2xl font-semibold text-[#f5a623]">{pendingOrders}</span>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#666]" />
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
            { value: 'all', label: 'Tat ca' },
            { value: 'completed', label: 'Hoan thanh' },
            { value: 'processing', label: 'Dang xu ly' },
            { value: 'pending', label: 'Cho xu ly' },
            { value: 'failed', label: 'That bai' },
          ]}
          className="w-full md:w-40"
        />
        <Button variant="outline" size="sm"><Download className="w-4 h-4" />Xuat</Button>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Don hang</CardTitle>
          <Button variant="ghost" size="sm">Xem tat ca</Button>
        </CardHeader>
        <CardContent className="p-0">
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
                <TableHead className="text-right">Thao tac</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-white">{order.orderNo}</TableCell>
                  <TableCell className="text-[#ededed]">{order.customer}</TableCell>
                  <TableCell className="text-[#888]">{order.phone}</TableCell>
                  <TableCell className="text-[#888]">{order.products}</TableCell>
                  <TableCell className="text-white">{order.amount.toLocaleString()}</TableCell>
                  <TableCell><PaymentBadge payment={order.payment} /></TableCell>
                  <TableCell><StatusBadge status={order.status} /></TableCell>
                  <TableCell className="text-[#888]">{order.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-[#e00]"><Trash2 className="w-4 h-4" /></Button>
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
