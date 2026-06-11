import React from 'react';
import { useAuth } from '../context/AuthContext';
import { formatCurrency, formatTime, ADMIN_EMAIL } from '../utils/helpers';

const TransactionItem = ({ tx, onDeleteClick }) => {
  const { currentUser } = useAuth();
  const isAdmin = currentUser && currentUser.email === ADMIN_EMAIL;
  
  const isIncome = tx.type === 'income';
  const itemClass = `transaction-item ${isAdmin ? 'can-delete' : ''}`;
  const iconClass = `tx-icon ${isIncome ? 'income' : 'expense'}`;
  const amountClass = `tx-amount ${isIncome ? 'income' : 'expense'}`;
  
  const handleClick = () => {
    if (isAdmin) {
      onDeleteClick(tx);
    }
  };

  return (
    <div className={itemClass} onClick={handleClick}>
      <div className={iconClass}>{tx.emoji}</div>
      <div className="tx-info">
        <div className="tx-name">{tx.category}</div>
        {tx.note && <div className="tx-detail">{tx.note}</div>}
      </div>
      <div>
        <div className={amountClass}>
          {isIncome ? '+' : '-'}฿{formatCurrency(tx.amount)}
        </div>
        <div className="tx-time">{formatTime(tx.createdAt)}</div>
      </div>
    </div>
  );
};

export default TransactionItem;
