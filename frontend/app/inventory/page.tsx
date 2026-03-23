'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  AlertTriangle,
  PackageX,
  ArrowDownToLine,
  ArrowUpFromLine,
  Edit,
  Trash2,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

// Sample inventory data
const productsData = [
  { id: 1, sku: 'SP001', name: 'Laptop Dell XPS 15', category: 'Dien tu', quantity: 25, minStock: 10, price: 35000000, status: 'in_stock' },
  { id: 2, sku: 'SP002', name: 'iPhone 15 Pro Max', category: 'Dien tu', quantity: 8, minStock: 15, price: 32000000, status: 'low_stock' },
  { id: 3, sku: 'SP003', name: 'Samsung Galaxy S24', category: 'Dien tu', quantity: 0, minStock: 10, price: 25000000, status: 'out_of_stock' },
  { id: 4, sku: 'SP004', name: 'Ao thun nam cotton', category: 'Quan ao', quantity: 150, minStock: 50, price: 250000, status: 'in_stock' },
  { id: 5, sku: 'SP005', name: 'Quan jean nu', category: 'Quan ao', quantity: 45, minStock: 30, price: 450000, status: 'in_stock' },
  { id: 6, sku: 'SP006', name: 'Giay the thao Nike', category: 'Giay dep', quantity: 5, minStock: 20, price: 2500000, status: 'low_stock' },
  { id: 7, sku: 'SP007', name: 'Tui xach nu da', category: 'Phu kien', quantity: 30, minStock: 15, price: 1500000, status: 'in_stock' },
  { id: 8, sku: 'SP008', name: 'Dong ho Apple Watch', category: 'Dien tu', quantity: 0, minStock: 5, price: 12000000, status: 'out_of_stock' },
];

const stockHistoryData = [
  { id: 1, date: '2024-03-15', type: 'import', product: 'Laptop Dell XPS 15', quantity: 20, note: 'Nhap hang dot 1' },
  { id: 2, date: '2024-03-15', type: 'export', product: 'iPhone 15 Pro Max', quantity: 5, note: 'Xuat ban' },
  { id: 3, date: '2024-03-14', type: 'import', product: 'Ao thun nam cotton', quantity: 100, note: 'Nhap hang moi' },
  { id: 4, date: '2024-03-14', type: 'export', product: 'Quan jean nu', quantity: 10, note: 'Don hang DH003' },
  { id: 5, date: '2024-03-13', type: 'import', product: 'Giay the thao Nike', quantity: 30, note: 'Nhap kho chinh' },
];

function StockStatusBadge({ status }: { status: string }) {
  const config: Record<string, { variant: any; label: string }> = {
    in_stock: { variant: 'success', label: 'Con hang' },
    low_stock: { variant: 'warning', label: 'Sap het' },
    out_of_stock: { variant: 'destructive', label: 'Het hang' },
  };
  const { variant, label } = config[status] || { variant: 'secondary', label: status };
  return <Badge variant={variant}>{label}</Badge>;
}

function TransactionBadge({ type }: { type: string }) {
  return type === 'import' ? (
    <Badge variant="success" className="flex items-center gap-1">
      <ArrowDownToLine className="w-3 h-3" />Nhap
    </Badge>
  ) : (
    <Badge variant="warning" className="flex items-center gap-1">
      <ArrowUpFromLine className="w-3 h-3" />Xuat
    </Badge>
  );
}

export default function InventoryPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const sidebarItems = [
    { label: t.menu.dashboard, href: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: t.menu.sales, href: '/sales', icon: <ShoppingCart className="w-5 h-5" />, badge: 3 },
    { label: t.menu.analytics, href: '/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { label: t.menu.finance, href: '/finance', icon: <Wallet className="w-5 h-5" /> },
    { label: t.menu.inventory, href: '/inventory', icon: <Package className="w-5 h-5" />, active: true },
    { label: t.menu.customers, href: '/customers', icon: <Users className="w-5 h-5" /> },
    { label: t.menu.reports, href: '/reports', icon: <FileText className="w-5 h-5" /> },
    { label: t.menu.settings, href: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const filteredProducts = productsData.filter((product) => {
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const totalProducts = productsData.length;
  const totalValue = productsData.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const lowStockCount = productsData.filter(p => p.status === 'low_stock').length;
  const outOfStockCount = productsData.filter(p => p.status === 'out_of_stock').length;

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      headerTitle="Quan ly Kho hang"
      headerSubtitle="Quan ly san pham va ton kho"
      headerActions={
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline"><ArrowDownToLine className="w-4 h-4 mr-2" />Nhap kho</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nhap kho</DialogTitle>
                <DialogDescription>Them san pham vao kho</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>San pham</Label>
                  <Select options={productsData.map(p => ({ value: p.sku, label: p.name }))} />
                </div>
                <div className="grid gap-2">
                  <Label>So luong</Label>
                  <Input type="number" placeholder="Nhap so luong" />
                </div>
                <div className="grid gap-2">
                  <Label>Ghi chu</Label>
                  <Input placeholder="Ghi chu nhap kho" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Huy</Button>
                <Button>Nhap kho</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-2" />Them san pham</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Them san pham moi</DialogTitle>
                <DialogDescription>Nhap thong tin san pham</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Ten san pham</Label>
                  <Input placeholder="Nhap ten san pham" />
                </div>
                <div className="grid gap-2">
                  <Label>Ma SKU</Label>
                  <Input placeholder="Nhap ma SKU" />
                </div>
                <div className="grid gap-2">
                  <Label>Danh muc</Label>
                  <Select options={[
                    { value: 'Dien tu', label: 'Dien tu' },
                    { value: 'Quan ao', label: 'Quan ao' },
                    { value: 'Giay dep', label: 'Giay dep' },
                    { value: 'Phu kien', label: 'Phu kien' },
                  ]} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Gia ban</Label>
                    <Input type="number" placeholder="Gia" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Ton kho toi thieu</Label>
                    <Input type="number" placeholder="So luong" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Huy</Button>
                <Button>Them san pham</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      }
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tong san pham</p>
              <p className="text-2xl font-bold">{totalProducts}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Wallet className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Gia tri ton kho</p>
              <p className="text-2xl font-bold">{(totalValue / 1000000).toFixed(1)}M</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Sap het hang</p>
              <p className="text-2xl font-bold text-orange-600">{lowStockCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-full">
              <PackageX className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Het hang</p>
              <p className="text-2xl font-bold text-red-600">{outOfStockCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">San pham</TabsTrigger>
          <TabsTrigger value="history">Lich su nhap/xuat</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          {/* Filters */}
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Tim kiem san pham..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  options={[
                    { value: 'all', label: 'Tat ca danh muc' },
                    { value: 'Dien tu', label: 'Dien tu' },
                    { value: 'Quan ao', label: 'Quan ao' },
                    { value: 'Giay dep', label: 'Giay dep' },
                    { value: 'Phu kien', label: 'Phu kien' },
                  ]}
                  className="w-full md:w-48"
                />
              </div>
            </CardContent>
          </Card>

          {/* Products Table */}
          <Card>
            <CardHeader><CardTitle>Danh sach san pham</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Ten san pham</TableHead>
                    <TableHead>Danh muc</TableHead>
                    <TableHead>Ton kho</TableHead>
                    <TableHead>Toi thieu</TableHead>
                    <TableHead>Gia</TableHead>
                    <TableHead>Trang thai</TableHead>
                    <TableHead>Thao tac</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.sku}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className={product.quantity <= product.minStock ? 'text-red-600 font-bold' : ''}>{product.quantity}</TableCell>
                      <TableCell>{product.minStock}</TableCell>
                      <TableCell>{product.price.toLocaleString()} VND</TableCell>
                      <TableCell><StockStatusBadge status={product.status} /></TableCell>
                      <TableCell>
                        <div className="flex gap-1">
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
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader><CardTitle>Lich su nhap/xuat kho</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ngay</TableHead>
                    <TableHead>Loai</TableHead>
                    <TableHead>San pham</TableHead>
                    <TableHead>So luong</TableHead>
                    <TableHead>Ghi chu</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockHistoryData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell><TransactionBadge type={item.type} /></TableCell>
                      <TableCell>{item.product}</TableCell>
                      <TableCell className={item.type === 'import' ? 'text-green-600' : 'text-orange-600'}>
                        {item.type === 'import' ? '+' : '-'}{item.quantity}
                      </TableCell>
                      <TableCell>{item.note}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
