import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

const translations = {
  th: {
    // Header
    shopName: 'ชายสี่บะหมี่เกี๊ยว By ซ้อเอ๋สายฝอ',
    logout: 'ออกจากระบบ',
    logoutConfirm: 'ต้องการออกจากระบบใช่หรือไม่?',

    // Bottom Nav
    navDashboard: 'ภาพรวม',
    navIncome: 'รายรับ',
    navExpense: 'รายจ่าย',
    navReport: 'รายงาน',

    // Dashboard
    todayIncome: 'รายรับวันนี้',
    todayExpense: 'รายจ่ายวันนี้',
    todayProfit: 'กำไรวันนี้',
    addIncome: 'รายรับ',
    addExpense: 'รายจ่าย',
    last7Days: '📊 รายรับ-รายจ่าย 7 วันย้อนหลัง',
    recentToday: '📋 รายการล่าสุดวันนี้',
    viewAll: 'ดูทั้งหมด →',
    emptyToday: 'ยังไม่มีรายการในวันนี้',
    emptyTodaySub: 'กดปุ่มด้านบนเพื่อเริ่มบันทึกเลย!',
    todayList: 'รายการวันนี้',

    // Income
    recordIncome: '💰 บันทึกรายรับ',
    incomeCategory: 'ประเภทรายรับ',
    amount: 'จำนวนเงิน (บาท)',
    date: '📅 วันที่',
    note: '📝 หมายเหตุ (ไม่บังคับ)',
    notePlaceholder: 'เช่น ลูกค้าประจำ, ขายดีวันนี้...',
    saveIncome: '✅ บันทึกรายรับ',
    incomeTodayList: '📋 รายรับวันนี้',
    selectCategory: '⚠️ กรุณาเลือกประเภทรายรับ',
    enterAmount: '⚠️ กรุณาใส่จำนวนเงิน',

    // Expense
    recordExpense: '💸 บันทึกรายจ่าย',
    expenseCategory: 'หมวดหมู่รายจ่าย',
    detail: '📝 รายละเอียด',
    detailPlaceholder: 'เช่น เส้นบะหมี่ 10 กก., ค่าแก๊ส...',
    expenseNote: '📝 หมายเหตุ (ไม่บังคับ)',
    expenseNotePlaceholder: 'หมายเหตุเพิ่มเติม...',
    saveExpense: '✅ บันทึกรายจ่าย',
    expenseTodayList: '📋 รายจ่ายวันนี้',
    selectExpenseCategory: '⚠️ กรุณาเลือกหมวดหมู่',

    // Report
    reportTitle: '📊 รายงานสรุป',
    daily: 'รายวัน',
    monthly: 'รายเดือน',
    yearly: 'รายปี',
    selectDay: 'เลือกวัน:',
    selectMonth: 'เลือกเดือน:',
    selectYear: 'เลือกปี:',
    totalIncome: 'รายรับรวม',
    totalExpense: 'รายจ่ายรวม',
    netProfit: 'กำไรสุทธิ',
    dailyChart: 'กราฟรายรับ-รายจ่าย (รายวัน)',
    expenseProportion: 'สัดส่วนรายจ่าย',
    incomeProportion: 'สัดส่วนรายรับ',
    totalExpenseAll: 'รายจ่ายทั้งหมด',
    totalIncomeAll: 'รายรับทั้งหมด',
    noExpense: 'ไม่มีรายจ่าย',
    noIncome: 'ไม่มีรายรับ',
    noDataInPeriod: 'ไม่มีข้อมูลในเวลาที่เลือก',
    monthlyChart: 'กราฟรายรับ-รายจ่าย (รายเดือน)',
    monthlySummary: 'สรุปรายเดือน',
    backupData: '📤 สำรองข้อมูล',
    restoreData: '📥 กู้คืนข้อมูล',
    logoutBtn: '🚪 ออกจากระบบ',

    // Delete modal
    deleteTitle: '⚠️ ลบรายการ',
    deleteConfirm: 'คุณต้องการลบรายการ',
    deleteAmount: 'จำนวน',
    deleteYesNo: 'ใช่หรือไม่?',
    cancel: 'ยกเลิก',
    confirmDelete: 'ลบเลย',

    // Toast
    saved: '✅ บันทึก',
    deleted: 'ลบรายการแล้ว',
    
    // Login
    loginTitle: 'ระบบบัญชีร้านบะหมี่',
    emailPlaceholder: 'อีเมล (Email)',
    passwordPlaceholder: 'รหัสผ่าน (Password)',
    loginBtn: 'เข้าสู่ระบบ',
    loginError: '⚠️ กรุณากรอกอีเมลและรหัสผ่าน',
    loginSuccess: '✅ เข้าสู่ระบบสำเร็จ',

    // Days
    dayNames: ['อา','จ','อ','พ','พฤ','ศ','ส'],
  },
  en: {
    // Header
    shopName: 'Noodle Shop By Sor-Eh Saifon',
    logout: 'Logout',
    logoutConfirm: 'Do you want to logout?',

    // Bottom Nav
    navDashboard: 'Dashboard',
    navIncome: 'Income',
    navExpense: 'Expense',
    navReport: 'Report',

    // Dashboard
    todayIncome: "Today's Income",
    todayExpense: "Today's Expense",
    todayProfit: "Today's Profit",
    addIncome: 'Income',
    addExpense: 'Expense',
    last7Days: '📊 Income-Expense Last 7 Days',
    recentToday: "📋 Today's Transactions",
    viewAll: 'View All →',
    emptyToday: 'No transactions today',
    emptyTodaySub: 'Tap buttons above to start recording!',
    todayList: "Today's List",

    // Income
    recordIncome: '💰 Record Income',
    incomeCategory: 'Income Category',
    amount: 'Amount (Baht)',
    date: '📅 Date',
    note: '📝 Note (Optional)',
    notePlaceholder: 'e.g. Regular customer, Good sales day...',
    saveIncome: '✅ Save Income',
    incomeTodayList: "📋 Today's Income",
    selectCategory: '⚠️ Please select a category',
    enterAmount: '⚠️ Please enter an amount',

    // Expense
    recordExpense: '💸 Record Expense',
    expenseCategory: 'Expense Category',
    detail: '📝 Details',
    detailPlaceholder: 'e.g. Noodles 10 kg., Gas cost...',
    expenseNote: '📝 Note (Optional)',
    expenseNotePlaceholder: 'Additional notes...',
    saveExpense: '✅ Save Expense',
    expenseTodayList: "📋 Today's Expenses",
    selectExpenseCategory: '⚠️ Please select a category',

    // Report
    reportTitle: '📊 Summary Report',
    daily: 'Daily',
    monthly: 'Monthly',
    yearly: 'Yearly',
    selectDay: 'Select Day:',
    selectMonth: 'Select Month:',
    selectYear: 'Select Year:',
    totalIncome: 'Total Income',
    totalExpense: 'Total Expense',
    netProfit: 'Net Profit',
    dailyChart: 'Income-Expense Chart (Daily)',
    expenseProportion: 'Expense Breakdown',
    incomeProportion: 'Income Breakdown',
    totalExpenseAll: 'Total Expenses',
    totalIncomeAll: 'Total Income',
    noExpense: 'No expenses',
    noIncome: 'No income',
    noDataInPeriod: 'No data for selected period',
    monthlyChart: 'Income-Expense Chart (Monthly)',
    monthlySummary: 'Monthly Summary',
    backupData: '📤 Backup Data',
    restoreData: '📥 Restore Data',
    logoutBtn: '🚪 Logout',

    // Delete modal
    deleteTitle: '⚠️ Delete Transaction',
    deleteConfirm: 'Do you want to delete',
    deleteAmount: 'amount',
    deleteYesNo: '?',
    cancel: 'Cancel',
    confirmDelete: 'Delete',

    // Toast
    saved: '✅ Saved',
    deleted: 'Transaction deleted',

    // Login
    loginTitle: 'Noodle Shop Accounting',
    emailPlaceholder: 'Email',
    passwordPlaceholder: 'Password',
    loginBtn: 'Login',
    loginError: '⚠️ Please enter email and password',
    loginSuccess: '✅ Login successful',

    // Days
    dayNames: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
  }
};
// Category name translations (data stored in Thai, display in selected language)
const categoryMap = {
  // Income categories
  'เงินสด': 'Cash',
  'เงินโอน': 'Transfer',
  'สวัสดิการรัฐ': 'Government Welfare',
  // Expense categories
  'ค่าแรงลูกจ้าง': 'Labor Cost',
  'วัตถุดิบ': 'Raw Materials',
  'ค่าเช่า': 'Rent',
  // Legacy/backup categories
  'ยอดรวมรายรับประจำเดือน': 'Monthly Income Total',
  'ยอดรวมรายจ่ายประจำเดือน': 'Monthly Expense Total',
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('noodleShopLang') || 'th';
  });

  useEffect(() => {
    localStorage.setItem('noodleShopLang', lang);
  }, [lang]);

  const t = (key) => {
    return translations[lang]?.[key] || translations['th']?.[key] || key;
  };

  const translateCat = (thaiName) => {
    if (lang === 'th') return thaiName;
    return categoryMap[thaiName] || thaiName;
  };

  const toggleLang = () => {
    setLang(prev => prev === 'th' ? 'en' : 'th');
  };

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, translateCat }}>
      {children}
    </LanguageContext.Provider>
  );
};
