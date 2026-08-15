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
    addIncome: 'บันทึกรายรับ',
    addExpense: 'บันทึกรายจ่าย',
    last7Days: 'รายรับ-รายจ่าย 7 วันย้อนหลัง',
    recentToday: 'รายการล่าสุดวันนี้',
    viewAll: 'ดูทั้งหมด',
    emptyToday: 'ยังไม่มีรายการในวันนี้',
    emptyTodaySub: 'แตะปุ่มด้านบนเพื่อเริ่มบันทึกรายการ',
    todayList: 'รายการวันนี้',
    netTotal: 'ยอดสุทธิ',

    // Income
    recordIncome: 'บันทึกรายรับ',
    incomeCategory: 'เลือกประเภทรายรับ',
    amount: 'จำนวนเงิน (บาท)',
    date: 'วันที่ทำรายการ',
    note: 'บันทึกช่วยจำ (ถ้ามี)',
    notePlaceholder: 'เช่น ลูกค้าประจำ, ขายดีรอบเช้า...',
    saveIncome: 'บันทึกรายรับ',
    incomeTodayList: 'รายการรายรับวันนี้',
    selectCategory: 'กรุณาเลือกประเภทรายรับ',
    enterAmount: 'กรุณาระบุจำนวนเงิน',

    // Expense
    recordExpense: 'บันทึกรายจ่าย',
    expenseCategory: 'เลือกหมวดหมู่รายจ่าย',
    detail: 'รายละเอียด',
    detailPlaceholder: 'เช่น เส้นบะหมี่ 10 กก., ค่าแก๊ส...',
    expenseNote: 'บันทึกช่วยจำ (ถ้ามี)',
    expenseNotePlaceholder: 'เช่น สั่งของเพิ่ม, ใบเสร็จร้านค้า...',
    saveExpense: 'บันทึกรายจ่าย',
    expenseTodayList: 'รายการรายจ่ายวันนี้',
    selectExpenseCategory: 'กรุณาเลือกหมวดหมู่รายจ่าย',

    // Report
    reportTitle: 'รายงานสรุปบัญชี',
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
    noExpense: 'ไม่มีข้อมูลรายจ่าย',
    noIncome: 'ไม่มีข้อมูลรายรับ',
    noDataInPeriod: 'ไม่มีข้อมูลรายการในช่วงเวลาที่เลือก',
    monthlyChart: 'กราฟสรุปรายรับ-รายจ่าย (รายเดือน)',
    monthlySummary: 'ตารางสรุปรายเดือน',
    backupData: 'สำรองข้อมูล (Backup)',
    restoreData: 'กู้คืนข้อมูล (Restore)',
    logoutBtn: 'ออกจากระบบ',

    // Delete modal
    deleteTitle: 'ยืนยันการลบรายการ',
    deleteConfirm: 'คุณต้องการลบรายการ',
    deleteAmount: 'จำนวนเงิน',
    deleteYesNo: 'ใช่หรือไม่?',
    cancel: 'ยกเลิก',
    confirmDelete: 'ลบรายการ',

    // Toast
    saved: 'บันทึกรายการสำเร็จ',
    deleted: 'ลบรายการเรียบร้อยแล้ว',
    
    // Login
    loginTitle: 'ระบบบัญชีร้านบะหมี่',
    loginSubtitle: 'ชายสี่บะหมี่เกี๊ยว By ซ้อเอ๋สายฝอ',
    emailPlaceholder: 'อีเมลผู้ใช้งาน (Email)',
    passwordPlaceholder: 'รหัสผ่าน (Password)',
    loginBtn: 'เข้าสู่ระบบ',
    guestBtn: 'เข้าชมในฐานะผู้เยี่ยมชม (Guest)',
    loginError: 'กรุณากรอกอีเมลและรหัสผ่าน',
    loginSuccess: 'เข้าสู่ระบบสำเร็จ',
    unauthorizedMsg: 'เฉพาะผู้ได้รับอนุญาตเท่านั้น',

    // Days
    dayNames: ['อา.','จ.','อ.','พ.','พฤ.','ศ.','ส.'],
  },
  en: {
    // Header
    shopName: 'Noodle Shop By Sor-Eh Saifon',
    logout: 'Logout',
    logoutConfirm: 'Are you sure you want to logout?',

    // Bottom Nav
    navDashboard: 'Dashboard',
    navIncome: 'Income',
    navExpense: 'Expense',
    navReport: 'Report',

    // Dashboard
    todayIncome: "Today's Income",
    todayExpense: "Today's Expense",
    todayProfit: "Today's Profit",
    addIncome: 'Record Income',
    addExpense: 'Record Expense',
    last7Days: 'Income & Expense Last 7 Days',
    recentToday: "Today's Transactions",
    viewAll: 'View All',
    emptyToday: 'No transactions recorded today',
    emptyTodaySub: 'Tap buttons above to record a new entry',
    todayList: "Today's Ledger",
    netTotal: 'Net Total',

    // Income
    recordIncome: 'Record Income',
    incomeCategory: 'Select Income Category',
    amount: 'Amount (THB)',
    date: 'Transaction Date',
    note: 'Notes (Optional)',
    notePlaceholder: 'e.g. Regular customer, Lunch rush...',
    saveIncome: 'Save Income Entry',
    incomeTodayList: "Today's Income List",
    selectCategory: 'Please select an income category',
    enterAmount: 'Please enter a valid amount',

    // Expense
    recordExpense: 'Record Expense',
    expenseCategory: 'Select Expense Category',
    detail: 'Details',
    detailPlaceholder: 'e.g. Noodles 10 kg, Cooking gas...',
    expenseNote: 'Notes (Optional)',
    expenseNotePlaceholder: 'e.g. Additional stock, Receipt #...',
    saveExpense: 'Save Expense Entry',
    expenseTodayList: "Today's Expense List",
    selectExpenseCategory: 'Please select an expense category',

    // Report
    reportTitle: 'Financial Summary Report',
    daily: 'Daily',
    monthly: 'Monthly',
    yearly: 'Yearly',
    selectDay: 'Select Date:',
    selectMonth: 'Select Month:',
    selectYear: 'Select Year:',
    totalIncome: 'Total Income',
    totalExpense: 'Total Expense',
    netProfit: 'Net Profit',
    dailyChart: 'Daily Income vs Expense Chart',
    expenseProportion: 'Expense Breakdown',
    incomeProportion: 'Income Breakdown',
    totalExpenseAll: 'Total Expenses',
    totalIncomeAll: 'Total Income',
    noExpense: 'No expense records found',
    noIncome: 'No income records found',
    noDataInPeriod: 'No transactions found for the selected period',
    monthlyChart: 'Monthly Income vs Expense Trend',
    monthlySummary: 'Monthly Performance Breakdown',
    backupData: 'Backup Data (Export JSON)',
    restoreData: 'Restore Data (Import JSON)',
    logoutBtn: 'Logout Account',

    // Delete modal
    deleteTitle: 'Confirm Transaction Deletion',
    deleteConfirm: 'Are you sure you want to delete',
    deleteAmount: 'amount',
    deleteYesNo: '?',
    cancel: 'Cancel',
    confirmDelete: 'Delete Entry',

    // Toast
    saved: 'Transaction saved successfully',
    deleted: 'Transaction deleted successfully',

    // Login
    loginTitle: 'Noodle Shop Accounting',
    loginSubtitle: 'Chai Si Noodle By Sor-Eh Saifon',
    emailPlaceholder: 'Account Email',
    passwordPlaceholder: 'Account Password',
    loginBtn: 'Sign In',
    guestBtn: 'Continue as Guest (Read Only)',
    loginError: 'Please enter both email and password',
    loginSuccess: 'Signed in successfully',
    unauthorizedMsg: 'Authorized personnel only',

    // Days
    dayNames: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
  }
};

// Category name translations
const categoryMap = {
  // Income categories
  'เงินสด': 'Cash',
  'เงินโอน': 'Bank Transfer',
  'สวัสดิการรัฐ': 'Gov Welfare Card',
  // Expense categories
  'ค่าแรงลูกจ้าง': 'Labor / Staff Wages',
  'วัตถุดิบ': 'Food Ingredients',
  'ค่าเช่า': 'Store Rent / Utilities',
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
