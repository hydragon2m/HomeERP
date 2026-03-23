'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
  Mail,
  Phone,
  MapPin,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Crown,
  Star,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

// Sample customers data
const customersData = [
  { id: 1, name: 'Nguyen Van A', email: 'nguyenvana@email.com', phone: '0901234567', address: 'Ha Noi', orders: 15, totalSpent: 25000000, status: 'vip', joinDate: '2023-01-15' },
  { id: 2, name: 'Tran Thi B', email: 'tranthib@email.com', phone: '0912345678', address: 'Ho Chi Minh', orders: 8, totalSpent: 12000000, status: 'regular', joinDate: '2023-03-20' },
  { id: 3, name: 'Pham Van C', email: 'phamvanc@email.com', phone: '0923456789', address: 'Da Nang', orders: 25, totalSpent: 45000000, status: 'vip', joinDate: '2022-11-10' },
  { id: 4, name: 'Hoang Thi D', email: 'hoangthid@email.com', phone: '0934567890', address: 'Hai Phong', orders: 3, totalSpent: 3500000, status: 'new', joinDate: '2024-02-01' },
  { id: 5, name: 'Vu Van E', email: 'vuvane@email.com', phone: '0945678901', address: 'Can Tho', orders: 12, totalSpent: 18000000, status: 'regular', joinDate: '2023-06-15' },
  { id: 6, name: 'Le Thi F', email: 'lethif@email.com', phone: '0956789012', address: 'Nha Trang', orders: 1, totalSpent: 1500000, status: 'new', joinDate: '2024-03-01' },
  { id: 7, name: 'Ngo Van G', email: 'ngovang@email.com', phone: '0967890123', address: 'Ha Noi', orders: 30, totalSpent: 65000000, status: 'vip', joinDate: '2022-08-20' },
  { id: 8, name: 'Do Thi H', email: 'dothih@email.com', phone: '0978901234', address: 'Ho Chi Minh', orders: 6, totalSpent: 8500000, status: 'regular', joinDate: '2023-09-10' },
];

function CustomerStatusBadge({ status }: { status: string }) {
  const config: Record<string, { variant: any; label: string; icon: any }> = {
    vip: { variant: 'warning', label: 'VIP', icon: Crown },
    regular: { variant: 'default', label: 'Thuong xuyen', icon: Star },
    new: { variant: 'success', label: 'Moi', icon: UserPlus },
  };
  const { variant, label, icon: Icon } = config[status] || { variant: 'secondary', label: status, icon: Users };
  return (
    <Badge variant={variant} className="flex items-center gap-1">
      <Icon className="w-3 h-3" />{label}
    </Badge>
  );
}

export default function CustomersPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const sidebarItems = [
    { label: t.menu.dashboard, href: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: t.menu.sales, href: '/sales', icon: <ShoppingCart className="w-5 h-5" />, badge: 3 },
    { label: t.menu.analytics, href: '/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { label: t.menu.finance, href: '/finance', icon: <Wallet className="w-5 h-5" /> },
    { label: t.menu.inventory, href: '/inventory', icon: <Package className="w-5 h-5" /> },
    { label: t.menu.customers, href: '/customers', icon: <Users className="w-5 h-5" />, active: true },
    { label: t.menu.reports, href: '/reports', icon: <FileText className="w-5 h-5" /> },
    { label: t.menu.settings, href: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const filteredCustomers = customersData.filter((customer) => {
    const matchSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    const matchStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalCustomers = customersData.length;
  const vipCustomers = customersData.filter(c => c.status === 'vip').length;
  const newCustomers = customersData.filter(c => c.status === 'new').length;
  const totalRevenue = customersData.reduce((sum, c) => sum + c.totalSpent, 0);

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      headerTitle="Quan ly Khach hang"
      headerSubtitle="Quan ly thong tin va lich su khach hang"
      headerActions={
        <Dialog>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />Them khach hang</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Them khach hang moi</DialogTitle>
              <DialogDescription>Nhap thong tin khach hang</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Ho va ten</Label>
                <Input placeholder="Nhap ho va ten" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="email@example.com" />
                </div>
                <div className="grid gap-2">
                  <Label>So dien thoai</Label>
                  <Input placeholder="0901234567" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Dia chi</Label>
                <Input placeholder="Nhap dia chi" />
              </div>
              <div className="grid gap-2">
                <Label>Phan loai</Label>
                <Select options={[
                  { value: 'new', label: 'Khach hang moi' },
                  { value: 'regular', label: 'Khach thuong xuyen' },
                  { value: 'vip', label: 'Khach VIP' },
                ]} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Huy</Button>
              <Button>Them khach hang</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tong khach hang</p>
              <p className="text-2xl font-bold">{totalCustomers}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Crown className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Khach VIP</p>
              <p className="text-2xl font-bold text-yellow-600">{vipCustomers}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <UserPlus className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Khach moi</p>
              <p className="text-2xl font-bold text-green-600">{newCustomers}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Wallet className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tong doanh thu</p>
              <p className="text-2xl font-bold">{(totalRevenue / 1000000).toFixed(1)}M</p>
            </div>
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
                placeholder="Tim kiem khach hang..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: 'all', label: 'Tat ca phan loai' },
                { value: 'vip', label: 'Khach VIP' },
                { value: 'regular', label: 'Khach thuong xuyen' },
                { value: 'new', label: 'Khach moi' },
              ]}
              className="w-full md:w-48"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sach khach hang</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khach hang</TableHead>
                <TableHead>Lien he</TableHead>
                <TableHead>Dia chi</TableHead>
                <TableHead>Don hang</TableHead>
                <TableHead>Tong chi tieu</TableHead>
                <TableHead>Phan loai</TableHead>
                <TableHead>Ngay tham gia</TableHead>
                <TableHead>Thao tac</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {customer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{customer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Mail className="w-3 h-3" />{customer.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Phone className="w-3 h-3" />{customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="w-3 h-3 text-gray-400" />{customer.address}
                    </div>
                  </TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell>{customer.totalSpent.toLocaleString()} VND</TableCell>
                  <TableCell><CustomerStatusBadge status={customer.status} /></TableCell>
                  <TableCell>{customer.joinDate}</TableCell>
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
