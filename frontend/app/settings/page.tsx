'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LayoutDashboard,
  ShoppingCart,
  BarChart3,
  Wallet,
  Package,
  Users,
  FileText,
  Settings,
  User,
  Building2,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Moon,
  Sun,
  Check,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export default function SettingsPage() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('vi');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    orders: true,
    inventory: true,
    reports: false,
  });

  const sidebarItems = [
    { label: t.menu.dashboard, href: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: t.menu.sales, href: '/sales', icon: <ShoppingCart className="w-5 h-5" /> },
    { label: t.menu.analytics, href: '/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { label: t.menu.finance, href: '/finance', icon: <Wallet className="w-5 h-5" /> },
    { label: t.menu.inventory, href: '/inventory', icon: <Package className="w-5 h-5" /> },
    { label: t.menu.customers, href: '/customers', icon: <Users className="w-5 h-5" /> },
    { label: t.menu.reports, href: '/reports', icon: <FileText className="w-5 h-5" /> },
    { label: t.menu.settings, href: '/settings', icon: <Settings className="w-5 h-5" />, active: true },
  ];

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      headerTitle="Cai dat"
      headerSubtitle="Quan ly cau hinh he thong"
    >
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-flex">
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Ho so</span>
          </TabsTrigger>
          <TabsTrigger value="company" className="gap-2">
            <Building2 className="w-4 h-4" />
            <span className="hidden sm:inline">Cong ty</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Thong bao</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Giao dien</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Bao mat</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Thong tin ca nhan</CardTitle>
              <CardDescription>Cap nhat thong tin tai khoan cua ban</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/avatars/admin.jpg" />
                  <AvatarFallback className="text-2xl">AD</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Thay anh dai dien
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">JPG, PNG. Toi da 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Ho va ten</Label>
                  <Input id="fullName" defaultValue="Nguyen Van Admin" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="admin@homeerp.vn" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">So dien thoai</Label>
                  <Input id="phone" defaultValue="0912 345 678" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Vai tro</Label>
                  <Input id="role" defaultValue="Quan tri vien" disabled />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Luu thay doi
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Company Tab */}
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Thong tin cong ty</CardTitle>
              <CardDescription>Cau hinh thong tin doanh nghiep</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Ten cong ty</Label>
                  <Input id="companyName" defaultValue="Cong ty TNHH HomeERP Viet Nam" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxCode">Ma so thue</Label>
                  <Input id="taxCode" defaultValue="0123456789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyEmail">Email cong ty</Label>
                  <Input id="companyEmail" type="email" defaultValue="contact@homeerp.vn" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyPhone">Dien thoai</Label>
                  <Input id="companyPhone" defaultValue="024 1234 5678" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Dia chi</Label>
                  <Input id="address" defaultValue="123 Nguyen Hue, Quan 1, TP. Ho Chi Minh" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Luu thay doi
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Cai dat thong bao</CardTitle>
              <CardDescription>Quan ly cach ban nhan thong bao</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Kenh thong bao</h3>
                {[
                  { key: 'email', label: 'Email', desc: 'Nhan thong bao qua email' },
                  { key: 'push', label: 'Push', desc: 'Thong bao tren trinh duyet' },
                  { key: 'sms', label: 'SMS', desc: 'Tin nhan van ban' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                    <Button
                      variant={notifications[item.key as keyof typeof notifications] ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof notifications] }))}
                    >
                      {notifications[item.key as keyof typeof notifications] ? (
                        <>
                          <Check className="w-4 h-4 mr-1" /> Bat
                        </>
                      ) : 'Tat'}
                    </Button>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Loai thong bao</h3>
                {[
                  { key: 'orders', label: 'Don hang', desc: 'Thong bao don hang moi, cap nhat trang thai' },
                  { key: 'inventory', label: 'Kho hang', desc: 'Canh bao ton kho, het hang' },
                  { key: 'reports', label: 'Bao cao', desc: 'Bao cao hang ngay, hang tuan' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                    <Button
                      variant={notifications[item.key as keyof typeof notifications] ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof notifications] }))}
                    >
                      {notifications[item.key as keyof typeof notifications] ? (
                        <>
                          <Check className="w-4 h-4 mr-1" /> Bat
                        </>
                      ) : 'Tat'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Giao dien</CardTitle>
              <CardDescription>Tuy chinh giao dien ung dung</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Che do hien thi</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'light', label: 'Sang', icon: Sun },
                    { value: 'dark', label: 'Toi', icon: Moon },
                    { value: 'system', label: 'He thong', icon: Settings },
                  ].map((item) => (
                    <button
                      key={item.value}
                      onClick={() => setTheme(item.value)}
                      className={`p-4 border rounded-lg text-center transition-colors ${
                        theme === item.value ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <item.icon className={`w-6 h-6 mx-auto mb-2 ${theme === item.value ? 'text-blue-600' : 'text-gray-500'}`} />
                      <span className={theme === item.value ? 'text-blue-600 font-medium' : ''}>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Ngon ngu</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: 'vi', label: 'Tieng Viet', flag: 'VN' },
                    { value: 'en', label: 'English', flag: 'US' },
                  ].map((item) => (
                    <button
                      key={item.value}
                      onClick={() => setLanguage(item.value)}
                      className={`p-4 border rounded-lg flex items-center gap-3 transition-colors ${
                        language === item.value ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span className="text-2xl">{item.flag === 'VN' ? '🇻🇳' : '🇺🇸'}</span>
                      <span className={language === item.value ? 'text-blue-600 font-medium' : ''}>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Doi mat khau</CardTitle>
                <CardDescription>Cap nhat mat khau tai khoan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mat khau hien tai</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Mat khau moi</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Xac nhan mat khau moi</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button>Cap nhat mat khau</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Phien dang nhap</CardTitle>
                <CardDescription>Quan ly cac phien dang nhap</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { device: 'Chrome - Windows', location: 'Ha Noi, Viet Nam', time: 'Hien tai', current: true },
                    { device: 'Safari - iPhone', location: 'TP. Ho Chi Minh', time: '2 gio truoc', current: false },
                    { device: 'Firefox - MacOS', location: 'Da Nang', time: '1 ngay truoc', current: false },
                  ].map((session, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{session.device}</p>
                          {session.current && <Badge variant="success">Hien tai</Badge>}
                        </div>
                        <p className="text-sm text-gray-500">{session.location} - {session.time}</p>
                      </div>
                      {!session.current && (
                        <Button variant="outline" size="sm">Dang xuat</Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
