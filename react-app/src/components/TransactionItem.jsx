import React from 'react';
import {
  Banknote,
  Smartphone,
  Landmark,
  Users,
  ShoppingBag,
  Store,
  Coins,
  Receipt
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { formatCurrency, formatTime, ADMIN_EMAIL } from '../utils/helpers';

const getCategorySeal = (category, type) => {
  const isIncome = type === 'income';
  const sealClass = isIncome ? 'seal-jade' : 'seal-crimson';

  switch (category) {
    case 'เงินสด':
    case 'Cash':
      return <div className={`seal-badge seal-md ${sealClass}`}><Banknote size={24} strokeWidth={2.2} /></div>;
    case 'เงินโอน':
    case 'Bank Transfer':
    case 'Transfer':
      return <div className={`seal-badge seal-md ${sealClass}`}><Smartphone size={24} strokeWidth={2.2} /></div>;
    case 'สวัสดิการรัฐ':
    case 'Government Welfare':
    case 'Gov Welfare Card':
      return <div className={`seal-badge seal-md ${sealClass}`}><Landmark size={24} strokeWidth={2.2} /></div>;
    case 'ค่าแรงลูกจ้าง':
    case 'Labor Cost':
    case 'Labor / Staff Wages':
      return <div className={`seal-badge seal-md ${sealClass}`}><Users size={24} strokeWidth={2.2} /></div>;
    case 'วัตถุดิบ':
    case 'Raw Materials':
    case 'Food Ingredients':
      return <div className={`seal-badge seal-md ${sealClass}`}><ShoppingBag size={24} strokeWidth={2.2} /></div>;
    case 'ค่าเช่า':
    case 'Rent':
    case 'Store Rent / Utilities':
      return <div className={`seal-badge seal-md ${sealClass}`}><Store size={24} strokeWidth={2.2} /></div>;
    default:
      return isIncome
        ? <div className={`seal-badge seal-md ${sealClass}`}><Coins size={24} strokeWidth={2.2} /></div>
        : <div className={`seal-badge seal-md ${sealClass}`}><Receipt size={24} strokeWidth={2.2} /></div>;
  }
};

const TransactionItem = ({ tx, onDeleteClick }) => {
  const { currentUser } = useAuth();
  const { translateCat } = useLanguage();
  const isAdmin = currentUser && currentUser.email === ADMIN_EMAIL;
  
  const isIncome = tx.type === 'income';
  const itemClass = `transaction-item ${isAdmin ? 'can-delete' : ''}`;
  const amountClass = `tx-amount ${isIncome ? 'income' : 'expense'}`;
  
  const handleClick = () => {
    if (isAdmin) {
      onDeleteClick(tx);
    }
  };

  return (
    <div className={itemClass} onClick={handleClick}>
      {getCategorySeal(tx.category, tx.type)}
      <div className="tx-info">
        <div className="tx-name">{translateCat(tx.category)}</div>
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
