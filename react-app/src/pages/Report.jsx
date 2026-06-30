import React, { useState, useRef } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { getToday, formatCurrency, DONUT_COLORS } from '../utils/helpers';
import TransactionItem from '../components/TransactionItem';
import Modal from '../components/Modal';

const INCOME_DONUT_COLORS = ['#00C896', '#00A8E8', '#FFB563', '#9B59B6', '#E74C3C'];

const Report = () => {
  const { transactions, deleteTransaction, importTransactions } = useTransactions();
  const { logout, currentUser } = useAuth();
  const { t, translateCat } = useLanguage();
  const [tab, setTab] = useState('daily');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const importRef = useRef(null);

  const now = new Date();
  const [dailyDate, setDailyDate] = useState(getToday());
  const [monthlyMonth, setMonthlyMonth] = useState(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`);
  const [yearlyYear, setYearlyYear] = useState(now.getFullYear().toString());

  const handleDeleteClick = (tx) => setDeleteTarget(tx);

  const confirmDelete = async () => {
    if (deleteTarget) {
      await deleteTransaction(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  // === BACKUP / RESTORE ===
  const handleExport = () => {
    if (currentUser?.isGuest) {
      alert("เฉพาะผู้ได้รับอนุญาติ");
      return;
    }
    const blob = new Blob([JSON.stringify(transactions, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `noodle-shop-backup-${getToday()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (Array.isArray(data)) {
        await importTransactions(data);
        alert('✅ กู้คืนข้อมูลสำเร็จ!');
      } else {
        alert('⚠️ ไฟล์ไม่ถูกต้อง');
      }
    } catch {
      alert('⚠️ ไม่สามารถอ่านไฟล์ได้');
    }
    e.target.value = '';
  };

  const handleLogout = async () => {
    if (window.confirm(t('logoutConfirm'))) {
      await logout();
    }
  };

  // === DONUT CHART BUILDER ===
  const buildDonut = (catData, total, colors, centerLabel) => {
    const sortedCats = Object.keys(catData).map(k => ({ name: k, val: catData[k] })).sort((a,b) => b.val - a.val);
    
    let conicGradient = 'conic-gradient(';
    let acc = 0;
    const legendItems = [];
    sortedCats.forEach((c, i) => {
      const pct = total > 0 ? (c.val / total) * 100 : 0;
      const color = colors[i % colors.length];
      conicGradient += `${color} ${acc}% ${acc + pct}%, `;
      acc += pct;
      legendItems.push(
        <div key={c.name} className="legend-item">
          <div className="legend-dot" style={{ background: color }}></div>
          <div className="legend-label">{translateCat(c.name)}</div>
          <div className="legend-value">{pct.toFixed(0)}%</div>
        </div>
      );
    });
    if (total === 0) conicGradient = 'conic-gradient(#E5E7EB 0% 100%)';
    else conicGradient = conicGradient.slice(0, -2) + ')';

    return { conicGradient, legendItems };
  };

  // === RENDER DAILY ===
  const renderDaily = () => {
    const txs = transactions.filter(t => t.date === dailyDate);
    const income = txs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = txs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const profit = income - expense;

    return (
      <div>
        <div className="date-picker-row">
          <label className="form-label" style={{ margin: 0, whiteSpace: 'nowrap' }}>{t('selectDay')}</label>
          <input type="date" className="date-input" value={dailyDate} onChange={e => setDailyDate(e.target.value)} />
        </div>

        <div className="month-summary">
          <div className="month-card total-income">
            <div className="month-card-label">{t('totalIncome')}</div>
            <div className="month-card-value">฿{formatCurrency(income)}</div>
          </div>
          <div className="month-card total-expense">
            <div className="month-card-label">{t('totalExpense')}</div>
            <div className="month-card-value">฿{formatCurrency(expense)}</div>
          </div>
        </div>

        <div className="profit-banner">
          <div className="profit-banner-label">{t('netProfit')}</div>
          <div className="profit-banner-value">฿{formatCurrency(profit)}</div>
        </div>

        <div className="transaction-list">
          {txs.length === 0 && <div style={{textAlign: 'center', color: 'var(--text-muted)', padding: '24px'}}>{t('noDataInPeriod')}</div>}
          {txs.slice().reverse().map(tx => (
            <TransactionItem key={tx.id} tx={tx} onDeleteClick={handleDeleteClick} />
          ))}
        </div>
      </div>
    );
  };

  // === RENDER MONTHLY ===
  const renderMonthly = () => {
    const txs = transactions.filter(t => t.date.startsWith(monthlyMonth));
    const income = txs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = txs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const profit = income - expense;

    // Daily bar chart
    const [y, m] = monthlyMonth.split('-');
    const daysInMonth = new Date(y, m, 0).getDate();
    const dailyData = Array.from({ length: daysInMonth }, () => ({ inc: 0, exp: 0 }));
    txs.forEach(t => {
      const day = parseInt(t.date.split('-')[2], 10) - 1;
      if (t.type === 'income') dailyData[day].inc += t.amount;
      else dailyData[day].exp += t.amount;
    });
    let maxVal = 0;
    dailyData.forEach(d => { if (d.inc > maxVal) maxVal = d.inc; if (d.exp > maxVal) maxVal = d.exp; });

    // Expense donut
    let expCats = {};
    txs.filter(t => t.type === 'expense').forEach(t => { expCats[t.category] = (expCats[t.category] || 0) + t.amount; });
    const expDonut = buildDonut(expCats, expense, DONUT_COLORS, t('totalExpenseAll'));

    // Income donut
    let incCats = {};
    txs.filter(t => t.type === 'income').forEach(t => { incCats[t.category] = (incCats[t.category] || 0) + t.amount; });
    const incDonut = buildDonut(incCats, income, INCOME_DONUT_COLORS, t('totalIncomeAll'));

    return (
      <div>
        <div className="date-picker-row">
          <label className="form-label" style={{ margin: 0, whiteSpace: 'nowrap' }}>{t('selectMonth')}</label>
          <input type="month" className="date-input" value={monthlyMonth} onChange={e => setMonthlyMonth(e.target.value)} />
        </div>

        <div className="month-summary">
          <div className="month-card total-income">
            <div className="month-card-label">{t('totalIncome')}</div>
            <div className="month-card-value">฿{formatCurrency(income)}</div>
          </div>
          <div className="month-card total-expense">
            <div className="month-card-label">{t('totalExpense')}</div>
            <div className="month-card-value">฿{formatCurrency(expense)}</div>
          </div>
        </div>

        <div className="profit-banner">
          <div className="profit-banner-label">{t('netProfit')}</div>
          <div className="profit-banner-value">฿{formatCurrency(profit)}</div>
        </div>

        <div className="card chart-container">
          <div className="section-title" style={{ marginBottom: '16px' }}>{t('dailyChart')}</div>
          <div className="bar-chart" style={{ overflowX: 'auto', paddingBottom: '10px' }}>
            {dailyData.map((d, i) => {
              const hInc = maxVal > 0 ? (d.inc / maxVal) * 100 : 0;
              const hExp = maxVal > 0 ? (d.exp / maxVal) * 100 : 0;
              return (
                <div key={i} className="bar-group" style={{ minWidth: '40px' }}>
                  <div className="bars">
                    <div className="bar income-bar" style={{ height: `${hInc}%` }}></div>
                    <div className="bar expense-bar" style={{ height: `${hExp}%` }}></div>
                  </div>
                  <div className="bar-label">{i + 1}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Income Donut */}
        <div className="card" style={{ marginBottom: '22px' }}>
          <div className="section-title" style={{ marginBottom: '20px' }}>{t('incomeProportion')}</div>
          <div className="donut-section">
            <div className="donut-chart" style={{ background: incDonut.conicGradient }}>
              <div className="donut-center" style={{ width: '100px', height: '100px', background: 'var(--bg-card)', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="donut-center-value">฿{formatCurrency(income)}</div>
                <div className="donut-center-label">{t('totalIncomeAll')}</div>
              </div>
            </div>
            <div className="donut-legend">
              {incDonut.legendItems.length > 0 ? incDonut.legendItems : <div style={{color: 'var(--text-muted)'}}>{t('noIncome')}</div>}
            </div>
          </div>
        </div>

        {/* Expense Donut */}
        <div className="card">
          <div className="section-title" style={{ marginBottom: '20px' }}>{t('expenseProportion')}</div>
          <div className="donut-section">
            <div className="donut-chart" style={{ background: expDonut.conicGradient }}>
              <div className="donut-center" style={{ width: '100px', height: '100px', background: 'var(--bg-card)', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="donut-center-value">฿{formatCurrency(expense)}</div>
                <div className="donut-center-label">{t('totalExpenseAll')}</div>
              </div>
            </div>
            <div className="donut-legend">
              {expDonut.legendItems.length > 0 ? expDonut.legendItems : <div style={{color: 'var(--text-muted)'}}>{t('noExpense')}</div>}
            </div>
          </div>
        </div>

        <div className="transaction-list" style={{ marginTop: '22px' }}>
          {txs.slice().reverse().map(tx => (
            <TransactionItem key={tx.id} tx={tx} onDeleteClick={handleDeleteClick} />
          ))}
        </div>
      </div>
    );
  };

  // === RENDER YEARLY ===
  const renderYearly = () => {
    const txs = transactions.filter(t => t.date.startsWith(yearlyYear));
    const income = txs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = txs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const profit = income - expense;
    const yearOptions = [];
    const currentY = new Date().getFullYear();
    for (let y = currentY + 3; y >= 2023; y--) yearOptions.push(y);

    // Monthly bar chart for the year
    const monthlyData = Array.from({ length: 12 }, () => ({ inc: 0, exp: 0 }));
    txs.forEach(t => {
      const month = parseInt(t.date.split('-')[1], 10) - 1;
      if (t.type === 'income') monthlyData[month].inc += t.amount;
      else monthlyData[month].exp += t.amount;
    });
    let maxVal = 0;
    monthlyData.forEach(d => { if (d.inc > maxVal) maxVal = d.inc; if (d.exp > maxVal) maxVal = d.exp; });

    const monthLabels = t('dayNames') ? ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'] : [];
    const monthLabelsEn = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const labels = t('navDashboard') === 'Dashboard' ? monthLabelsEn : monthLabels;

    return (
      <div>
        <div className="date-picker-row">
          <label className="form-label" style={{ margin: 0, whiteSpace: 'nowrap' }}>{t('selectYear')}</label>
          <select 
            className="date-input" 
            value={yearlyYear} 
            onChange={e => setYearlyYear(e.target.value)} 
            style={{ width: '120px', textAlign: 'center', background: 'white' }}
          >
            {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div className="month-summary">
          <div className="month-card total-income">
            <div className="month-card-label">{t('totalIncome')}</div>
            <div className="month-card-value">฿{formatCurrency(income)}</div>
          </div>
          <div className="month-card total-expense">
            <div className="month-card-label">{t('totalExpense')}</div>
            <div className="month-card-value">฿{formatCurrency(expense)}</div>
          </div>
        </div>

        <div className="profit-banner">
          <div className="profit-banner-label">{t('netProfit')}</div>
          <div className="profit-banner-value">฿{formatCurrency(profit)}</div>
        </div>

        {/* Yearly Bar Chart */}
        <div className="card chart-container">
          <div className="section-title" style={{ marginBottom: '16px' }}>{t('monthlyChart')}</div>
          <div className="bar-chart" style={{ overflowX: 'auto', paddingBottom: '10px' }}>
            {monthlyData.map((d, i) => {
              const hInc = maxVal > 0 ? (d.inc / maxVal) * 100 : 0;
              const hExp = maxVal > 0 ? (d.exp / maxVal) * 100 : 0;
              return (
                <div key={i} className="bar-group" style={{ minWidth: '50px' }}>
                  <div className="bars">
                    <div className="bar income-bar" style={{ height: `${hInc}%` }}></div>
                    <div className="bar expense-bar" style={{ height: `${hExp}%` }}></div>
                  </div>
                  <div className="bar-label">{labels[i]}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly Summary Table */}
        <div className="card" style={{ marginTop: '22px' }}>
          <div className="section-title" style={{ marginBottom: '16px' }}>{t('monthlySummary')}</div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ padding: '10px 8px', textAlign: 'left', color: 'var(--text-secondary)' }}>{t('selectMonth').replace(':','')}</th>
                  <th style={{ padding: '10px 8px', textAlign: 'right', color: 'var(--success)' }}>{t('navIncome')}</th>
                  <th style={{ padding: '10px 8px', textAlign: 'right', color: 'var(--danger)' }}>{t('navExpense')}</th>
                  <th style={{ padding: '10px 8px', textAlign: 'right', color: 'var(--primary)' }}>{t('netProfit')}</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((d, i) => {
                  if (d.inc === 0 && d.exp === 0) return null;
                  return (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '10px 8px', fontWeight: 600 }}>{labels[i]}</td>
                      <td style={{ padding: '10px 8px', textAlign: 'right', color: 'var(--success)', fontWeight: 600 }}>฿{formatCurrency(d.inc)}</td>
                      <td style={{ padding: '10px 8px', textAlign: 'right', color: 'var(--danger)', fontWeight: 600 }}>฿{formatCurrency(d.exp)}</td>
                      <td style={{ padding: '10px 8px', textAlign: 'right', color: d.inc - d.exp >= 0 ? 'var(--primary)' : 'var(--danger)', fontWeight: 700 }}>฿{formatCurrency(d.inc - d.exp)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="transaction-list" style={{ marginTop: '22px' }}>
          {txs.length === 0 && <div style={{textAlign: 'center', color: 'var(--text-muted)', padding: '24px'}}>{t('noDataInPeriod')}</div>}
          {txs.slice().reverse().map(tx => (
            <TransactionItem key={tx.id} tx={tx} onDeleteClick={handleDeleteClick} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="page active">
      <div className="report-tabs">
        <button className={`report-tab ${tab === 'daily' ? 'active' : ''}`} onClick={() => setTab('daily')}>{t('daily')}</button>
        <button className={`report-tab ${tab === 'monthly' ? 'active' : ''}`} onClick={() => setTab('monthly')}>{t('monthly')}</button>
        <button className={`report-tab ${tab === 'yearly' ? 'active' : ''}`} onClick={() => setTab('yearly')}>{t('yearly')}</button>
      </div>

      {tab === 'daily' && renderDaily()}
      {tab === 'monthly' && renderMonthly()}
      {tab === 'yearly' && renderYearly()}

      {/* Backup / Restore / Logout */}
      <div className="export-section" style={{ marginTop: '28px' }}>
        <button className="btn-export" onClick={handleExport}>{t('backupData')}</button>
        <button className="btn-export" onClick={() => {
          if (currentUser?.isGuest) {
            alert("เฉพาะผู้ได้รับอนุญาติ");
            return;
          }
          importRef.current?.click();
        }}>{t('restoreData')}</button>
        <input type="file" ref={importRef} accept=".json" style={{ display: 'none' }} onChange={handleImport} />
      </div>
      <button className="btn-export" onClick={handleLogout} style={{ width: '100%', marginTop: '14px', borderColor: 'var(--danger)', color: 'var(--danger)' }}>
        {t('logoutBtn')}
      </button>

      <Modal 
        isOpen={!!deleteTarget}
        title={t('deleteTitle')}
        message={`${t('deleteConfirm')} "${deleteTarget?.category}" ${t('deleteAmount')} ฿${deleteTarget ? formatCurrency(deleteTarget.amount) : 0} ${t('deleteYesNo')}`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default Report;
