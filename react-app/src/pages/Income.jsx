import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Banknote, Smartphone, Landmark, PlusCircle, ArrowDownCircle } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import { useLanguage } from '../context/LanguageContext';
import { getToday, generateId } from '../utils/helpers';
import Numpad from '../components/Numpad';

const INCOME_CATEGORIES = [
  { name: 'เงินสด', icon: Banknote },
  { name: 'เงินโอน', icon: Smartphone },
  { name: 'สวัสดิการรัฐ', icon: Landmark },
];

const Income = () => {
  const { addTransaction } = useTransactions();
  const { t, translateCat } = useLanguage();
  const navigate = useNavigate();
  
  const [amount, setAmount] = useState('0');
  const [date, setDate] = useState(getToday());
  const [selectedCat, setSelectedCat] = useState(null);
  const [note, setNote] = useState('');

  const handleSubmit = async () => {
    if (!selectedCat) {
      alert(t('selectCategory'));
      return;
    }
    const numAmount = Number(amount.replace(/,/g, ''));
    if (numAmount <= 0) {
      alert(t('enterAmount'));
      return;
    }

    const tx = {
      id: generateId(),
      type: 'income',
      date: date,
      category: selectedCat.name,
      amount: numAmount,
      note: note,
      createdAt: new Date().toISOString()
    };

    await addTransaction(tx);
    navigate('/');
  };

  return (
    <div className="page active">
      <div className="section-title">
        <ArrowDownCircle size={26} strokeWidth={2.4} />
        <span>{t('recordIncome')}</span>
      </div>
      <br/>

      <div className="form-section">
        <label className="form-label">{t('incomeCategory')}</label>
        <div className="category-grid">
          {INCOME_CATEGORIES.map(cat => {
            const IconComponent = cat.icon;
            const isSelected = selectedCat?.name === cat.name;
            return (
              <div 
                key={cat.name} 
                className={`category-pill ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedCat(cat)}
              >
                <div className="seal-badge seal-sm seal-jade">
                  <IconComponent size={20} strokeWidth={2.4} />
                </div>
                <span>{translateCat(cat.name)}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="form-layout">
        <div>
          <div className="amount-display" style={{ borderColor: 'var(--jade)' }}>
            <span className="amount-currency" style={{ color: 'var(--jade)' }}>฿</span>
            <span className="amount-value" style={{ color: 'var(--jade)' }}>{amount}</span>
          </div>
          <Numpad value={amount} onChange={setAmount} />
        </div>
        
        <div>
          <div className="form-section" style={{ marginTop: '12px' }}>
            <div className="date-picker-row">
              <label className="form-label" style={{ margin: 0, whiteSpace: 'nowrap' }}>{t('date')}:</label>
              <input 
                type="date" 
                className="date-input" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-section">
            <label className="form-label">{t('note')}</label>
            <input 
              type="text" 
              className="note-input" 
              placeholder={t('notePlaceholder')} 
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <button className="btn-submit income-submit" onClick={handleSubmit}>
            <PlusCircle size={26} strokeWidth={2.4} />
            <span>{t('saveIncome')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Income;
