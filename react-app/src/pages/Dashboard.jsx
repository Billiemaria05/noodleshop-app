import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import { getToday, formatCurrency } from '../utils/helpers';
import SummaryCard from '../components/SummaryCard';
import TransactionItem from '../components/TransactionItem';
import Modal from '../components/Modal';

const Dashboard = () => {
  const { transactions, deleteTransaction } = useTransactions();
  const navigate = useNavigate();
  const today = getToday();

  const [deleteTarget, setDeleteTarget] = useState(null);

  const todaysTxs = transactions.filter(t => t.date === today);
  const totalIncome = todaysTxs.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = todaysTxs.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const profit = totalIncome - totalExpense;

  const handleDeleteClick = (tx) => {
    setDeleteTarget(tx);
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      await deleteTransaction(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="page active">
      <div className="summary-grid">
        <SummaryCard type="income" title="รายรับวันนี้" amount={totalIncome} emoji="💰" />
        <SummaryCard type="expense" title="รายจ่ายวันนี้" amount={totalExpense} emoji="💸" />
        <SummaryCard type="profit" title="กำไรวันนี้" amount={profit} emoji="✨" />
      </div>

      <div className="quick-actions">
        <button className="btn-quick income-btn ripple" onClick={() => navigate('/income')}>
          <ArrowDownCircle size={24} /> รายรับ
        </button>
        <button className="btn-quick expense-btn ripple" onClick={() => navigate('/expense')}>
          <ArrowUpCircle size={24} /> รายจ่าย
        </button>
      </div>

      <div className="card">
        <div className="today-list-header">
          <div className="section-title">รายการวันนี้</div>
          <div className="today-total">รวม: ฿{formatCurrency(totalIncome - totalExpense)}</div>
        </div>
        
        {todaysTxs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🍜</div>
            <div className="empty-text">ยังไม่มีรายการในวันนี้<br/>กดปุ่มด้านบนเพื่อเริ่มบันทึกเลย!</div>
          </div>
        ) : (
          <div className="transaction-list">
            {todaysTxs.slice().reverse().map(tx => (
              <TransactionItem key={tx.id} tx={tx} onDeleteClick={handleDeleteClick} />
            ))}
          </div>
        )}
      </div>

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

export default Dashboard;
