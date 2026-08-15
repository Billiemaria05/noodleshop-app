import React from 'react';
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const SummaryCard = ({ type, title, amount }) => {
  const getIcon = () => {
    switch (type) {
      case 'income':
        return <div className="seal-badge seal-md seal-jade"><TrendingUp size={26} strokeWidth={2.5} /></div>;
      case 'expense':
        return <div className="seal-badge seal-md seal-crimson"><TrendingDown size={26} strokeWidth={2.5} /></div>;
      case 'profit':
      default:
        return <div className="seal-badge seal-md seal-gold"><Sparkles size={26} strokeWidth={2.5} /></div>;
    }
  };

  return (
    <div className={`summary-card ${type}`}>
      <div className="summary-icon-container">
        {getIcon()}
      </div>
      <div className="summary-label">{title}</div>
      <div className="summary-value">฿{formatCurrency(amount)}</div>
    </div>
  );
};

export default SummaryCard;
