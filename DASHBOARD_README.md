# HomeERP Dashboard - Vietnamese ERP System

Một hệ thống quản lý doanh nghiệp toàn diện (ERP) được xây dựng bằng Next.js 16, React 19, Tailwind CSS v4 với giao diện hoàn toàn tiếng Việt.

## Các tính năng chính

### 1. **Bảng điều khiển tổng quan**
- KPI Cards hiển thị các chỉ số kinh doanh chính (doanh thu, bán hàng, đơn hàng, người dùng)
- Metric cards nhỏ gọn với các tỷ lệ và chỉ số phụ
- Thanh công cụ linh hoạt

### 2. **Hệ thống biểu đồ**
- **Line Chart**: Hiển thị xu hướng theo thời gian
- **Bar Chart**: So sánh dữ liệu hàng loạt
- **Pie Chart**: Phân bố dữ liệu theo danh mục
- **Area Chart**: Thể hiện khối lượng theo thời gian
- **Gauge Chart**: Đo lường hiệu suất

### 3. **Bảng dữ liệu tương tác**
- Sắp xếp theo cột
- Phân trang tự động
- Hiển thị trạng thái động
- Hỗ trợ custom render cho mỗi cột

### 4. **Hệ thống điều hướng**
- Sidebar có thể thu gọn
- Menu chính với 8 mục chính
- Hỗ trợ badges thông báo
- Tooltip khi thu gọn

### 5. **Lịch tương tác**
- Chọn ngày tháng
- Điều hướng qua các tháng
- Ghi chú ngày được chọn
- Giao diện tiếng Việt đầy đủ

### 6. **Trạng thái & Chỉ báo**
- 6 loại trạng thái: Hoạt động, Không hoạt động, Đang chờ, Hoàn thành, Thất bại, Đang xử lý
- Thiết kế badge đẹp với phần tử "pulse"
- 3 kích cỡ: nhỏ, trung bình, lớn

### 7. **Biểu mẫu linh hoạt**
- Hỗ trợ nhiều loại input: text, email, password, number, date, textarea, select
- Xác thực lỗi
- Thiết kế đẹp mắt

### 8. **Hệ thống design token**
- 6 màu chính: Blue, Orange, Purple, Red, Green, Yellow
- Hỗ trợ Dark mode
- Biến CSS tùy chỉnh
- Giao diện thống nhất

## Cấu trúc thư mục

```
frontend/
├── app/
│   ├── page.tsx                 # Trang chính dashboard
│   ├── layout.tsx              # Layout gốc
│   └── globals.css             # Design tokens & styles
├── components/
│   ├── KPICard.tsx            # KPI card component
│   ├── Metric.tsx             # Metric component
│   ├── DataTable.tsx          # Bảng dữ liệu
│   ├── Calendar.tsx           # Lịch
│   ├── StatusBadge.tsx        # Trạng thái badge
│   ├── Form.tsx               # Biểu mẫu
│   ├── Button.tsx             # Nút
│   ├── charts/
│   │   ├── LineChart.tsx
│   │   ├── BarChart.tsx
│   │   ├── PieChart.tsx
│   │   ├── AreaChart.tsx
│   │   ├── GaugeChart.tsx
│   │   └── index.ts
│   └── layout/
│       ├── Sidebar.tsx        # Sidebar
│       ├── Header.tsx         # Header
│       └── DashboardLayout.tsx # Layout chính
└── lib/
    └── i18n/
        ├── vi.ts             # Bản dịch tiếng Việt
        └── index.ts          # Hook translation

```

## Hệ thống màu

| Tên | Mã màu | Sử dụng |
|-----|--------|--------|
| Blue | #3b82f6 | Màu chính |
| Orange | #f97316 | Bán hàng, cảnh báo |
| Purple | #a855f7 | Chỉ báo phụ |
| Red | #ef4444 | Lỗi, nguy hiểm |
| Green | #10b981 | Thành công, dương |
| Yellow | #f59e0b | Cảnh báo nhẹ |

## Bản dịch

Tất cả các nhãn UI được dịch ra tiếng Việt và lưu trữ trong `/lib/i18n/vi.ts`. Sử dụng hook `useTranslation()` để truy cập:

```typescript
const { t } = useTranslation();
console.log(t.dashboard.title); // "Bảng điều khiển"
```

## Cách sử dụng các Component

### KPI Card
```typescript
<KPICard
  title="Doanh thu"
  value="₫45,200,000"
  subtitle="Tháng này"
  trend={12.5}
  trendLabel="so với tháng trước"
  color="blue"
/>
```

### Chart Components
```typescript
<DashboardLineChart
  data={revenueData}
  title="Doanh thu"
  dataKey="revenue"
  stroke="#3b82f6"
  height={300}
/>
```

### Data Table
```typescript
<DataTable
  title="Đơn hàng"
  columns={[
    { key: 'id', label: 'ID' },
    { key: 'amount', label: 'Số tiền' },
  ]}
  data={ordersData}
/>
```

### Form
```typescript
<Form
  fields={[
    { label: 'Tên', name: 'name', required: true },
    { label: 'Email', name: 'email', type: 'email' },
  ]}
  onSubmit={handleSubmit}
/>
```

## Responsive Design

Dashboard được thiết kế mobile-first với 3 breakpoint:
- **Mobile**: < 768px (1 cột)
- **Tablet**: 768px - 1024px (2 cột)
- **Desktop**: > 1024px (4 cột)

## Dark Mode

Tất cả component hỗ trợ dark mode tự động thông qua Tailwind CSS `dark:` prefix.

## Yêu cầu hệ thống

- Node.js 18+
- React 19.2.4+
- Next.js 16.2.1+
- Tailwind CSS 4+

## Cài đặt dependencies

```bash
cd frontend
npm install
```

Recharts đã được thêm vào `package.json` cho các biểu đồ.

## Chạy development server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

## Build production

```bash
npm run build
npm start
```

## Tính năng tiếp theo

- [ ] Tích hợp API backend
- [ ] Xác thực người dùng
- [ ] Export dữ liệu (PDF, Excel)
- [ ] Cảnh báo thời gian thực
- [ ] Báo cáo tùy chỉnh
- [ ] Bảng điều khiển có thể tuỳ chỉnh
- [ ] Nhập dữ liệu hàng loạt

## License

MIT
