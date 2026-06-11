import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { getToday, formatCurrency, DONUT_COLORS } from '../utils/helpers';
import SummaryCard from '../components/SummaryCard';
import TransactionItem from '../components/TransactionItem';
import Modal from '../components/Modal';

const Report = () => {
  const { transactions, deleteTransaction } = useTransactions();
  const [tab, setTab] = useState('daily');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const now = new Date();
  const [dailyDate, setDailyDate] = useState(getToday());
  const [monthlyMonth, setMonthlyMonth] = useState(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`);
  const [yearlyYear, setYearlyYear] = useState(now.getFullYear().toString());

  const handleDeleteClick = (tx) => {
    setDeleteTarget(tx);
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      await deleteTransaction(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  // Common filter and calculate logic
  const renderListAndSummary = (filteredTxs) => {
    const income = filteredTxs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = filteredTxs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const profit = income - expense;

    return (
      <>
        <div className="month-summary">
          <div className="month-card total-income">
            <div className="month-card-label">รายรับรวม</div>
            <div className="month-card-value">฿{formatCurrency(income)}</div>
          </div>
          <div className="month-card total-expense">
            <div className="month-card-label">รายจ่ายรวม</div>
            <div className="month-card-value">฿{formatCurrency(expense)}</div>
          </div>
        </div>

        <div className="profit-banner">
          <div className="profit-banner-label">กำไรสุทธิ</div>
          <div className="profit-banner-value">฿{formatCurrency(profit)}</div>
        </div>

        <div className="transaction-list">
          {filteredTxs.length === 0 && <div style={{textAlign: 'center', color: 'var(--text-muted)'}}>ไม่มีข้อมูลในเวลาที่เลือก</div>}
          {filteredTxs.slice().reverse().map(tx => (
            <TransactionItem key={tx.id} tx={tx} onDeleteClick={handleDeleteClick} />
          ))}
        </div>
      </>
    );
  };

  // Render Daily
  const renderDaily = () => {
    const txs = transactions.filter(t => t.date === dailyDate);
    return (
      <div>
        <div className="date-picker-row">
          <label className="form-label" style={{ margin: 0, whiteSpace: 'nowrap' }}>เลือกวัน:</label>
          <input type="date" className="date-input" value={dailyDate} onChange={e => setDailyDate(e.target.value)} />
        </div>
        {renderListAndSummary(txs)}
      </div>
    );
  };

  // Render Monthly
  const renderMonthly = () => {
    const txs = transactions.filter(t => t.date.startsWith(monthlyMonth));
    const income = txs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = txs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const profit = income - expense;

    // Calculate days for bar chart
    const [y, m] = monthlyMonth.split('-');
    const daysInMonth = new Date(y, m, 0).getDate();
    const dailyData = Array.from({ length: daysInMonth }, (_, i) => ({ inc: 0, exp: 0 }));
    
    txs.forEach(t => {
      const day = parseInt(t.date.split('-')[2], 10) - 1;
      if (t.type === 'income') dailyData[day].inc += t.amount;
      else dailyData[day].exp += t.amount;
    });

    let maxVal = 0;
    dailyData.forEach(d => {
      if (d.inc > maxVal) maxVal = d.inc;
      if (d.exp > maxVal) maxVal = d.exp;
    });

    // Donut chart
    let expCats = {};
    txs.filter(t => t.type === 'expense').forEach(t => {
      expCats[t.category] = (expCats[t.category] || 0) + t.amount;
    });
    const sortedCats = Object.keys(expCats).map(k => ({ name: k, val: expCats[k] })).sort((a,b) => b.val - a.val);
    
    let conicGradient = 'conic-gradient(';
    let acc = 0;
    const legendItems = [];
    sortedCats.forEach((c, i) => {
      const pct = expense > 0 ? (c.val / expense) * 100 : 0;
      const color = DONUT_COLORS[i % DONUT_COLORS.length];
      conicGradient += `${color} ${acc}% ${acc + pct}%, `;
      acc += pct;
      legendItems.push(
        <div key={c.name} className="legend-item">
          <div className="legend-dot" style={{ background: color }}></div>
          <div className="legend-label">{c.name}</div>
          <div className="legend-value">{pct.toFixed(0)}%</div>
        </div>
      );
    });
    if (expense === 0) conicGradient = 'conic-gradient(#E5E7EB 0% 100%)';
    else conicGradient = conicGradient.slice(0, -2) + ')';

    return (
      <div>
        <div className="date-picker-row">
          <label className="form-label" style={{ margin: 0, whiteSpace: 'nowrap' }}>เลือกเดือน:</label>
          <input type="month" className="date-input" value={monthlyMonth} onChange={e => setMonthlyMonth(e.target.value)} />
        </div>

        <div className="month-summary">
          <div className="month-card total-income">
            <div className="month-card-label">รายรับรวม</div>
            <div className="month-card-value">฿{formatCurrency(income)}</div>
          </div>
          <div className="month-card total-expense">
            <div className="month-card-label">รายจ่ายรวม</div>
            <div className="month-card-value">฿{formatCurrency(expense)}</div>
          </div>
        </div>

        <div className="profit-banner">
          <div className="profit-banner-label">กำไรสุทธิ</div>
          <div className="profit-banner-value">฿{formatCurrency(profit)}</div>
        </div>

        <div className="card chart-container">
          <div className="section-title" style={{ marginBottom: '16px' }}>กราฟรายรับ-รายจ่าย (รายวัน)</div>
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

        <div className="card">
          <div className="section-title" style={{ marginBottom: '20px' }}>สัดส่วนรายจ่าย</div>
          <div className="donut-section">
            <div className="donut-chart" style={{ background: conicGradient }}>
              <div className="donut-center" style={{ width: '100px', height: '100px', background: 'var(--bg-card)', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="donut-center-value">฿{formatCurrency(expense)}</div>
                <div className="donut-center-label">รายจ่ายทั้งหมด</div>
              </div>
            </div>
            <div className="donut-legend">
              {legendItems.length > 0 ? legendItems : <div style={{color: 'var(--text-muted)'}}>ไม่มีรายจ่าย</div>}
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

  // Render Yearly
  const renderYearly = () => {
    const txs = transactions.filter(t => t.date.startsWith(yearlyYear));
    const yearOptions = [];
    const currentY = new Date().getFullYear();
    for (let y = currentY + 3; y >= 2023; y--) yearOptions.push(y);

    return (
      <div>
        <div className="date-picker-row">
          <label className="form-label" style={{ margin: 0, whiteSpace: 'nowrap' }}>เลือกปี:</label>
          <select 
            className="date-input" 
            value={yearlyYear} 
            onChange={e => setYearlyYear(e.target.value)} 
            style={{ width: '120px', textAlign: 'center', background: 'white' }}
          >
            {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        {renderListAndSummary(txs)}
      </div>
    );
  };

  return (
    <div className="page active">
      <div className="report-tabs">
        <button className={`report-tab ${tab === 'daily' ? 'active' : ''}`} onClick={() => setTab('daily')}>รายวัน</button>
        <button className={`report-tab ${tab === 'monthly' ? 'active' : ''}`} onClick={() => setTab('monthly')}>รายเดือน</button>
        <button className={`report-tab ${tab === 'yearly' ? 'active' : ''}`} onClick={() => setTab('yearly')}>รายปี</button>
      </div>

      {tab === 'daily' && renderDaily()}
      {tab === 'monthly' && renderMonthly()}
      {tab === 'yearly' && renderYearly()}

      <Modal 
        isOpen={!!deleteTarget}
        title="⚠️ ลบรายการ"
        message={`คุณต้องการลบรายการ "${deleteTarget?.category}" จำนวน ฿${deleteTarget ? formatCurrency(deleteTarget.amount) : 0} ใช่หรือไม่?`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default Report;
