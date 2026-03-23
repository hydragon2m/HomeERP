'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  CreditCard,
  Banknote,
  Receipt,
  Search,
  Filter,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

// Sample finance data
const cashFlowData = [
  { name: 'T1', income: 45000000, expense: 32000000 },
  { name: 'T2', income: 52000000, expense: 38000000 },
  { name: 'T3', income: 48000000, expense: 35000000 },
  { name: 'T4', income: 61000000, expense: 42000000 },
  { name: 'T5', income: 55000000, expense: 40000000 },
  { name: 'T6', income: 67000000, expense: 45000000 },
];

const expenseCategories = [
  { name: 'Luong nhan vien', value: 45 },
  { name: 'Van phong', value: 20 },
  { name: 'Marketing', value: 15 },
  { name: 'Nguyen lieu', value: 12 },
  { name: 'Khac', value: 8 },
];

const transactions = [
  { id: 1, date: '2024-03-20', description: 'Thanh toan don hang DH001', type: 'income', amount: 15000000, category: 'Ban hang', status: 'completed' },
  { id: 2, date: '2024-03-20', description: 'Tra luong thang 3', type: 'expense', amount: 85000000, category: 'Luong', status: 'completed' },
  { id: 3, date: '2024-03-19', description: 'Mua nguyen lieu', type: 'expense', amount: 12000000, category: 'Nguyen lieu', status: 'completed' },
  { id: 4, date: '2024-03-19', description: 'Thanh toan don hang DH002', type: 'income', amount: 8500000, category: 'Ban hang', status: 'pending' },
  { id: 5, date: '2024-03-18', description: 'Tien thue van phong', type: 'expense', amount: 25000000, category: 'Van phong', status: 'completed' },
  { id: 6, date: '2024-03-18', description: 'Hoa don dien nuoc', type: 'expense', amount: 3500000, category: 'Van phong', status: 'completed' },
  { id: 7, date: '2024-03-17', description: 'Thanh toan don hang DH003', type: 'income', amount: 22000000, category: 'Ban hang', status: 'completed' },
  { id: 8, date: '2024-03-17', description: 'Chi phi quang cao', type: 'expense', amount: 8000000, category: 'Marketing', status: 'completed' },
];

const invoices = [
  { id: 'HD001', customer: 'Cong ty ABC', amount: 45000000, dueDate: '2024-03-25', status: 'pending' },
  { id: 'HD002', customer: 'Cong ty XYZ', amount: 32000000, dueDate: '2024-03-22', status: 'overdue' },
  { id: 'HD003', customer: 'Nguyen Van A', amount: 8500000, dueDate: '2024-03-30', status: 'paid' },
  { id: 'HD004', customer: 'Tran Thi B', amount: 15000000, dueDate: '2024-04-05', status: 'pending' },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('vi-VN').format(amount) + ' VND';
}

export default function FinancePage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const sidebarItems = [
    { label: t.menu.dashboard, href: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: t.menu.sales, href: '/sales', icon: <ShoppingCart className="w-5 h-5" /> },
    { label: t.menu.analytics, href: '/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { label: t.menu.finance, href: '/finance', icon: <Wallet className="w-5 h-5" />, active: true },
    { label: t.menu.inventory, href: '/inventory', icon: <Package className="w-5 h-5" /> },
    { label: t.menu.customers, href: '/customers', icon: <Users className="w-5 h-5" /> },
    { label: t.menu.reports, href: '/reports', icon: <FileText className="w-5 h-5" /> },
    { label: t.menu.settings, href: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || tx.type === filterType;
    return matchesSearch && matchesType;
  });

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      headerTitle="Tai chinh"
      headerSubtitle="Quan ly thu chi va cong no"
      headerActions={
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Them giao dich
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Them giao dich moi</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium">Loai giao dich</label>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" className="flex-1">
                    <ArrowDownLeft className="w-4 h-4 mr-2 text-green-600" />
                    Thu
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <ArrowUpRight className="w-4 h-4 mr-2 text-red-600" />
                    Chi
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Mo ta</label>
                <Input placeholder="Nhap mo ta giao dich" className="mt-2" />
              </div>
              <div>
                <label className="text-sm font-medium">So tien</label>
                <Input placeholder="0" type="number" className="mt-2" />
              </div>
              <div>
                <label className="text-sm font-medium">Danh muc</label>
                <Input placeholder="Chon danh muc" className="mt-2" />
              </div>
              <Button className="w-full">Luu giao dich</Button>
            </div>
          </DialogContent>
        </Dialog>
      }
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tong thu</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{formatCurrency(totalIncome)}</p>
              </div>
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                <ArrowDownLeft className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tong chi</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{formatCurrency(totalExpense)}</p>
              </div>
              <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30">
                <ArrowUpRight className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">So du</p>
                <p className={`text-2xl font-bold mt-1 ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  {formatCurrency(balance)}
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Wallet className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Cong no phai thu</p>
                <p className="text-2xl font-bold text-orange-600 mt-1">{formatCurrency(92000000)}</p>
              </div>
              <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/30">
                <Receipt className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <BarChart
          data={cashFlowData}
          dataKey="income"
          title="Dong tien theo thang"
          xAxisKey="name"
          fill="#10b981"
          height={300}
        />
        <PieChart
          data={expenseCategories}
          title="Phan bo chi phi"
          height={300}
        />
      </div>

      {/* Transactions and Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transactions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle>Giao dich gan day</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Tim kiem..."
                      className="pl-10 w-48"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button
                    variant={filterType === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterType('all')}
                  >
                    Tat ca
                  </Button>
                  <Button
                    variant={filterType === 'income' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterType('income')}
                  >
                    Thu
                  </Button>
                  <Button
                    variant={filterType === 'expense' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterType('expense')}
                  >
                    Chi
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ngay</TableHead>
                    <TableHead>Mo ta</TableHead>
                    <TableHead>Danh muc</TableHead>
                    <TableHead className="text-right">So tien</TableHead>
                    <TableHead>Trang thai</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="text-sm text-gray-500">{tx.date}</TableCell>
                      <TableCell className="font-medium">{tx.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{tx.category}</Badge>
                      </TableCell>
                      <TableCell className={`text-right font-medium ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={tx.status === 'completed' ? 'success' : 'warning'}>
                          {tx.status === 'completed' ? 'Hoan thanh' : 'Cho xu ly'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Invoices */}
        <Card>
          <CardHeader>
            <CardTitle>Hoa don cong no</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{invoice.id}</span>
                    <Badge
                      variant={
                        invoice.status === 'paid' ? 'success' :
                        invoice.status === 'overdue' ? 'destructive' : 'warning'
                      }
                    >
                      {invoice.status === 'paid' ? 'Da thanh toan' :
                       invoice.status === 'overdue' ? 'Qua han' : 'Cho thanh toan'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{invoice.customer}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-bold">{formatCurrency(invoice.amount)}</span>
                    <span className="text-sm text-gray-500">Han: {invoice.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
