# HomeERP - Hệ thống ERP Doanh nghiệp Tiếng Việt

Một platform ERP hiện đại, chuyên nghiệp, được xây dựng bằng **Next.js 16**, **React 19**, **TypeScript**, **shadcn/ui**, và **Tailwind CSS v4**. Giao diện lấy cảm hứng từ **Vercel** - tối giản, sạch sẽ, hiệu quả và hoàn toàn tiếng Việt.

## 🎯 Tính năng chính

### 📊 Dashboard
- KPI Cards hiển thị chỉ số chính (Doanh thu, Bán hàng, Đơn hàng, Người dùng)
- Biểu đồ đa dạng: Line Chart, Bar Chart, Pie Chart, Area Chart (SVG-based)
- Bảng đơn hàng gần đây với trạng thái
- Thống kê tổng quan doanh nghiệp

### 💰 Bán hàng (Sales)
- Quản lý đơn hàng hoàn chỉnh
- Tạo đơn hàng mới với Dialog modal
- Tìm kiếm và lọc theo trạng thái
- Theo dõi: Hoàn thành, Đang xử lý, Chờ xử lý, Thất bại

### 📈 Phân tích (Analytics)
- Phân tích lưu lượng truy cập
- Tỷ lệ chuyển đổi
- Phân tích nguồn lưu lượng
- Biểu đồ khu vực bán hàng

### 💳 Tài chính (Finance)
- Quản lý thu chi chi tiết với biểu đồ
- Theo dõi công nợ phải thu
- Biểu đồ dòng tiền theo tháng
- Phân bổ chi phí
- Lịch sử giao dịch đầy đủ

### 📦 Kho hàng (Inventory)
- Quản lý sản phẩm với SKU
- Theo dõi tồn kho theo danh mục
- Cảnh báo hết hang/sắp hết (3 mức: Còn, Sắp hết, Hết)
- Nhập/Xuất kho
- Lịch sử giao dịch kho

### 👥 Khách hàng (Customers)
- Danh sách khách hàng với avatar tự động
- Phân loại: VIP (👑), Thường xuyên (⭐), Mới (🆕)
- Lịch sử mua hàng & tổng chi tiêu
- Thêm/Chỉnh sửa/Xóa khách hàng

### 📋 Báo cáo (Reports)
- Báo cáo doanh thu theo tháng
- Sản phẩm bán chạy
- Phân tích khách hàng
- Báo cáo khu vực
- Xuất báo cáo

### ⚙️ Cài đặt (Settings)
- Thông tin công ty
- Quản lý người dùng
- Cấu hình thông báo (Email, Push, SMS)
- Tùy chọn giao diện (Dark/Light theme)
- Cài đặt bảo mật

## 🛠 Công nghệ sử dụng

| Công nghệ | Phiên bản | Mục đích |
|----------|----------|---------|
| **Next.js** | 16.2.1 | Framework React với App Router |
| **React** | 19.2.4 | UI library |
| **TypeScript** | Latest | Type-safe development |
| **shadcn/ui** | Latest | Component library (Button, Card, Table, Dialog, etc.) |
| **Tailwind CSS** | v4 | Styling with design tokens |
| **Lucide React** | 0.400+ | Icon library (350+ professional icons) |
| **Radix UI** | Latest | Headless UI primitives |

## 📁 Cấu trúc dự án

```
frontend/
├── app/
│   ├── page.tsx                    # Dashboard chính
│   ├── sales/page.tsx              # Quản lý bán hàng
│   ├── analytics/page.tsx          # Phân tích dữ liệu
│   ├── finance/page.tsx            # Quản lý tài chính
│   ├── inventory/page.tsx          # Quản lý kho hàng
│   ├── customers/page.tsx          # Quản lý khách hàng
│   ├── reports/page.tsx            # Báo cáo doanh nghiệp
│   ├── settings/page.tsx           # Cài đặt hệ thống
│   ├── layout.tsx                  # Root layout + metadata
│   └── globals.css                 # Tailwind + design tokens
├── components/
│   ├── ui/                         # shadcn/ui components (10+ components)
│   │   ├── button.tsx              # Button with variants
│   │   ├── card.tsx                # Card container
│   │   ├── input.tsx               # Input field
│   │   ├── table.tsx               # Table component
│   │   ├── dialog.tsx              # Modal dialog
│   │   ├── badge.tsx               # Badge/Tag component
│   │   ├── select.tsx              # Select dropdown
│   │   ├── tabs.tsx                # Tabs navigation
│   │   ├── avatar.tsx              # User avatar
│   │   ├── label.tsx               # Form label
│   │   └── ...
│   ├── charts/                     # SVG chart components
│   │   ├── LineChart.tsx           # Line chart
│   │   ├── BarChart.tsx            # Bar chart
│   │   ├── PieChart.tsx            # Pie chart with legend
│   │   ├── AreaChart.tsx           # Area chart
│   │   └── index.ts                # Chart exports
│   └── layout/
│       ├── Sidebar.tsx             # Navigation sidebar (collapsible)
│       └── DashboardLayout.tsx     # Main layout wrapper
├── lib/
│   ├── utils.ts                    # Utility functions (cn)
│   ├── i18n/
│   │   ├── vi.ts                   # Vietnamese translations (150+ terms)
│   │   └── index.ts                # i18n hook
│   ├── navigation.tsx              # Shared navigation config
│   ├── mockData.ts                 # Sample data for all pages
│   └── ...
├── package.json                    # Dependencies & scripts
└── README.md                       # This file
```

## 🎨 Thiết kế & Giao diện

### Color Palette
```
Primary:    #3b82f6 (Blue)
Secondary:  #f97316 (Orange)
Accent:     #a855f7 (Purple)
Success:    #10b981 (Green)
Warning:    #f59e0b (Amber)
Danger:     #ef4444 (Red)
```

### Typography
- **Sans-serif**: Geist (headings & body)
- **Monospace**: Geist Mono (code blocks)

### Features
- ✅ Full Dark/Light mode support
- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Accessibility (ARIA labels, semantic HTML)
- ✅ Smooth animations & transitions

## 🚀 Hướng dẫn cài đặt

### Requirements
- Node.js 18+ 
- npm / yarn / pnpm / bun

### Cài đặt & Chạy

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Truy cập: [http://localhost:3000](http://localhost:3000)

## 📦 Component Usage

### Button
```tsx
import { Button } from '@/components/ui/button';

<Button variant="primary" size="md">Click me</Button>
<Button variant="outline">Secondary</Button>
<Button variant="destructive">Delete</Button>
```

### Card
```tsx
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

### Table
```tsx
import { Table, TableHeader, TableRow, TableCell } from '@/components/ui/table';

<Table>
  <TableHeader>
    <TableRow>
      <TableCell>Header</TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    {/* rows */}
  </TableBody>
</Table>
```

## 📊 Sample Data

Tất cả các trang sử dụng mock data từ `lib/mockData.ts`:
- Orders: 5+ samples
- Products: 8+ samples
- Customers: 8+ samples
- Transactions: 8+ samples
- Invoices: 4+ samples

Để integrate với backend thực, chỉ cần replace mock data với API calls.

## 🔄 Next Steps - Roadmap

### Phase 1 - Backend (Priority High)
- [ ] Tạo API routes (/api/orders, /api/products, etc.)
- [ ] Kết nối database (Supabase / Neon)
- [ ] Replace mock data → API calls
- [ ] Error handling & loading states

### Phase 2 - Authentication (Priority High)
- [ ] Đăng ký/Đăng nhập
- [ ] JWT tokens
- [ ] Protected routes
- [ ] User roles & permissions

### Phase 3 - Advanced (Priority Medium)
- [ ] Real-time updates (WebSocket)
- [ ] Export PDF/Excel
- [ ] Email notifications
- [ ] Task scheduling
- [ ] Multi-language (EN, JP, ZH)

### Phase 4 - Production (Priority Medium)
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Analytics (PostHog)
- [ ] Error logging (Sentry)
- [ ] API documentation (Swagger)

## 📚 Documentation Links

- [Next.js 16](https://nextjs.org/docs)
- [React 19](https://react.dev)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [Radix UI](https://radix-ui.com)

## 🐛 Troubleshooting

### Build errors?
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Port already in use?
```bash
npm run dev -- -p 3001
```

### Dark mode not working?
Check that your OS/browser has dark mode enabled

## 📄 License

MIT License - Free to use for personal & commercial projects

## 👨‍💻 Author

**HomeERP Team**
- GitHub: [hydragon2m/HomeERP](https://github.com/hydragon2m/HomeERP)
- Built with ❤️ using Next.js, shadcn/ui & Tailwind CSS

---

**Tạo với ❤️ cho doanh nghiệp Việt Nam**
