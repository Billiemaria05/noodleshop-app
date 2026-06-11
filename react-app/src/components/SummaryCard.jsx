import React from 'react';
import { formatCurrency } from '../utils/helpers';

const SummaryCard = ({ type, title, amount, emoji }) => {
  return (
    <div className={`summary-card ${type}`}>
      <span className="summary-icon">{emoji}</span>
      <div className="summary-label">{title}</div>
      <div className="summary-value">฿{formatCurrency(amount)}</div>
    </div>
  );
};

export default SummaryCard;
