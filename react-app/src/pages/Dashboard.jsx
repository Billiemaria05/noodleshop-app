import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDownCircle, ArrowUpCircle, UtensilsCrossed, ClipboardList } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { getToday, formatCurrency } from '../utils/helpers';
import SummaryCard from '../components/SummaryCard';
import TransactionItem from '../components/TransactionItem';
import Modal from '../components/Modal';

const Dashboard = () => {
  const { transactions, deleteTransaction } = useTransactions();
  const { currentUser } = useAuth();
  const { t } = useLanguage();
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

  const handleNavigate = (path) => {
    if (currentUser?.isGuest) {
      alert(t('unauthorizedMsg') || 'เฉพาะผู้ได้รับอนุญาต');
      return;
    }
    navigate(path);
  };

  return (
    <div className="page active">
      <div className="summary-grid">
        <SummaryCard type="income" title={t('todayIncome')} amount={totalIncome} />
        <SummaryCard type="expense" title={t('todayExpense')} amount={totalExpense} />
        <SummaryCard type="profit" title={t('todayProfit')} amount={profit} />
      </div>

      <div className="quick-actions">
        <button className="btn-quick income-btn" onClick={() => handleNavigate('/income')}>
          <ArrowDownCircle size={28} strokeWidth={2.4} /> {t('addIncome')}
        </button>
        <button className="btn-quick expense-btn" onClick={() => handleNavigate('/expense')}>
          <ArrowUpCircle size={28} strokeWidth={2.4} /> {t('addExpense')}
        </button>
      </div>

      <div className="card">
        <div className="today-list-header">
          <div className="section-title">
            <ClipboardList size={24} strokeWidth={2.4} />
            <span>{t('todayList')}</span>
          </div>
          <div className="today-total">{t('netTotal')}: ฿{formatCurrency(totalIncome - totalExpense)}</div>
        </div>
        
        {todaysTxs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-seal">
              <UtensilsCrossed size={36} strokeWidth={2.2} />
            </div>
            <div className="empty-text">{t('emptyToday')}<br/>{t('emptyTodaySub')}</div>
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
        title={t('deleteTitle')}
        message={`${t('deleteConfirm')} "${deleteTarget?.category}" ${t('deleteAmount')} ฿${deleteTarget ? formatCurrency(deleteTarget.amount) : 0} ${t('deleteYesNo')}`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default Dashboard;
