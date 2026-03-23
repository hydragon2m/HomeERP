// Revenue data for line chart
export const revenueData = [
  { name: 'Tháng 1', revenue: 4000 },
  { name: 'Tháng 2', revenue: 3000 },
  { name: 'Tháng 3', revenue: 2000 },
  { name: 'Tháng 4', revenue: 2780 },
  { name: 'Tháng 5', revenue: 1890 },
  { name: 'Tháng 6', revenue: 2390 },
  { name: 'Tháng 7', revenue: 1990 },
  { name: 'Tháng 8', revenue: 2800 },
];

// Sales data for bar chart
export const salesData = [
  { name: 'Tháng 1', sales: 4000, returns: 2400 },
  { name: 'Tháng 2', sales: 3000, returns: 1398 },
  { name: 'Tháng 3', sales: 2000, returns: 9800 },
  { name: 'Tháng 4', sales: 2780, returns: 3908 },
  { name: 'Tháng 5', sales: 1890, returns: 4800 },
  { name: 'Tháng 6', sales: 2390, returns: 3800 },
];

// Category distribution for pie chart
export const categoryData = [
  { name: 'Điện tử', value: 4000 },
  { name: 'Thực phẩm', value: 3000 },
  { name: 'Quần áo', value: 2000 },
  { name: 'Sách', value: 2780 },
  { name: 'Khác', value: 1890 },
];

// Orders data for table
export const ordersData = [
  { id: 1, orderNo: 'ĐH001', customer: 'Nguyễn Văn A', amount: '1,000,000', status: 'completed' as const, date: '2024-03-10' },
  { id: 2, orderNo: 'ĐH002', customer: 'Trần Thị B', amount: '2,500,000', status: 'processing' as const, date: '2024-03-11' },
  { id: 3, orderNo: 'ĐH003', customer: 'Phạm Văn C', amount: '800,000', status: 'pending' as const, date: '2024-03-12' },
  { id: 4, orderNo: 'ĐH004', customer: 'Hoàng Thị D', amount: '3,200,000', status: 'completed' as const, date: '2024-03-13' },
  { id: 5, orderNo: 'ĐH005', customer: 'Vũ Văn E', amount: '1,500,000', status: 'failed' as const, date: '2024-03-14' },
];

// Performance trend data
export const performanceData = [
  { name: 'Tuần 1', performance: 65 },
  { name: 'Tuần 2', performance: 78 },
  { name: 'Tuần 3', performance: 72 },
  { name: 'Tuần 4', performance: 85 },
  { name: 'Tuần 5', performance: 90 },
];
