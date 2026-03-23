// Vietnamese translations for HomeERP Dashboard
export const vi = {
  // Navigation
  nav: {
    dashboard: "Bảng điều khiển",
    overview: "Tổng quan",
    analytics: "Phân tích",
    reports: "Báo cáo",
    settings: "Cài đặt",
    profile: "Hồ sơ",
    logout: "Đăng xuất",
  },

  // Dashboard Sections
  dashboard: {
    title: "Bảng điều khiển",
    welcome: "Chào mừng",
    overview: "Tổng quan",
    statistics: "Thống kê",
    performance: "Hiệu suất",
    recent: "Gần đây",
  },

  // Metrics & KPI
  metrics: {
    revenue: "Doanh thu",
    sales: "Bán hàng",
    users: "Người dùng",
    orders: "Đơn hàng",
    products: "Sản phẩm",
    profit: "Lợi nhuận",
    growth: "Tăng trưởng",
    total: "Tổng cộng",
    thisMonth: "Tháng này",
    lastMonth: "Tháng trước",
    thisYear: "Năm nay",
    lastYear: "Năm ngoái",
  },

  // Chart Labels
  charts: {
    revenue: "Doanh thu",
    sales: "Bán hàng",
    profit: "Lợi nhuận",
    trend: "Xu hướng",
    comparison: "So sánh",
    distribution: "Phân bố",
    performance: "Hiệu suất",
    monthly: "Hàng tháng",
    quarterly: "Hàng quý",
    yearly: "Hàng năm",
  },

  // Time Periods
  time: {
    today: "Hôm nay",
    yesterday: "Hôm qua",
    thisWeek: "Tuần này",
    lastWeek: "Tuần trước",
    thisMonth: "Tháng này",
    lastMonth: "Tháng trước",
    thisQuarter: "Quý này",
    lastQuarter: "Quý trước",
    thisYear: "Năm nay",
    lastYear: "Năm ngoái",
    january: "Tháng 1",
    february: "Tháng 2",
    march: "Tháng 3",
    april: "Tháng 4",
    may: "Tháng 5",
    june: "Tháng 6",
    july: "Tháng 7",
    august: "Tháng 8",
    september: "Tháng 9",
    october: "Tháng 10",
    november: "Tháng 11",
    december: "Tháng 12",
  },

  // Status & Actions
  status: {
    active: "Hoạt động",
    inactive: "Không hoạt động",
    pending: "Đang chờ",
    completed: "Hoàn thành",
    failed: "Thất bại",
    processing: "Đang xử lý",
    success: "Thành công",
    error: "Lỗi",
    warning: "Cảnh báo",
    info: "Thông tin",
  },

  // Actions
  actions: {
    add: "Thêm",
    edit: "Chỉnh sửa",
    delete: "Xóa",
    save: "Lưu",
    cancel: "Hủy",
    export: "Xuất",
    import: "Nhập",
    download: "Tải xuống",
    upload: "Tải lên",
    search: "Tìm kiếm",
    filter: "Lọc",
    sort: "Sắp xếp",
    view: "Xem",
    details: "Chi tiết",
  },

  // Table Headers
  table: {
    id: "ID",
    name: "Tên",
    email: "Email",
    phone: "Điện thoại",
    date: "Ngày",
    status: "Trạng thái",
    amount: "Số tiền",
    action: "Hành động",
    category: "Danh mục",
    description: "Mô tả",
    createdAt: "Ngày tạo",
    updatedAt: "Ngày cập nhật",
  },

  // Form Labels
  form: {
    firstName: "Tên",
    lastName: "Họ",
    fullName: "Họ và tên",
    email: "Email",
    phone: "Điện thoại",
    password: "Mật khẩu",
    confirmPassword: "Xác nhận mật khẩu",
    category: "Danh mục",
    amount: "Số tiền",
    date: "Ngày",
    description: "Mô tả",
    notes: "Ghi chú",
  },

  // Messages
  messages: {
    loading: "Đang tải...",
    noData: "Không có dữ liệu",
    success: "Thành công",
    error: "Có lỗi xảy ra",
    confirmation: "Bạn có chắc chắn?",
    deleteConfirm: "Bạn có chắc chắn muốn xóa?",
    saved: "Đã lưu",
    deleted: "Đã xóa",
    updated: "Đã cập nhật",
  },

  // Sidebar Menu Items
  menu: {
    dashboard: "Bảng điều khiển",
    sales: "Bán hàng",
    analytics: "Phân tích",
    finance: "Tài chính",
    inventory: "Kho hàng",
    customers: "Khách hàng",
    reports: "Báo cáo",
    settings: "Cài đặt",
  },
};

export type TranslationKey = keyof typeof vi;
