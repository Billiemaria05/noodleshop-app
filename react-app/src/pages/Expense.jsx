import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransactions } from '../context/TransactionContext';
import { getToday, generateId } from '../utils/helpers';
import Numpad from '../components/Numpad';

const EXPENSE_CATEGORIES = [
  { name: 'ค่าแรงลูกจ้าง', emoji: '👷' },
  { name: 'วัตถุดิบ', emoji: '🥩' },
  { name: 'ค่าเช่า', emoji: '🏠' },
];

const Expense = () => {
  const { addTransaction } = useTransactions();
  const navigate = useNavigate();
  
  const [amount, setAmount] = useState('0');
  const [date, setDate] = useState(getToday());
  const [selectedCat, setSelectedCat] = useState(null);
  const [note, setNote] = useState('');

  const handleSubmit = async () => {
    if (!selectedCat) {
      alert('⚠️ กรุณาเลือกประเภทรายจ่าย');
      return;
    }
    const numAmount = Number(amount.replace(/,/g, ''));
    if (numAmount <= 0) {
      alert('⚠️ กรุณาระบุจำนวนเงิน');
      return;
    }

    const tx = {
      id: generateId(),
      type: 'expense',
      date: date,
      category: selectedCat.name,
      emoji: selectedCat.emoji,
      amount: numAmount,
      note: note,
      createdAt: new Date().toISOString()
    };

    await addTransaction(tx);
    navigate('/');
  };

  return (
    <div className="page active">
      <div className="section-title">เพิ่มรายจ่าย</div>
      <br/>
      <div className="form-section">
        <label className="form-label">เลือกประเภทรายจ่าย</label>
        <div className="category-grid">
          {EXPENSE_CATEGORIES.map(cat => (
            <div 
              key={cat.name} 
              className={`category-pill ${selectedCat?.name === cat.name ? 'active' : ''}`}
              onClick={() => setSelectedCat(cat)}
            >
              <span className="cat-emoji">{cat.emoji}</span> {cat.name}
            </div>
          ))}
        </div>
      </div>

      <div className="form-layout">
        <div>
          <div className="amount-display" style={{ borderColor: 'var(--danger)' }}>
            <span className="amount-currency">฿</span>
            <span className="amount-value" style={{ color: 'var(--danger)' }}>{amount}</span>
          </div>
          <Numpad value={amount} onChange={setAmount} />
        </div>
        
        <div>
          <div className="form-section" style={{ marginTop: '24px' }}>
            <div className="date-picker-row">
              <label className="form-label" style={{ margin: 0, whiteSpace: 'nowrap' }}>วันที่:</label>
              <input 
                type="date" 
                className="date-input" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <div className="form-section">
            <label className="form-label">บันทึกช่วยจำ (ถ้ามี)</label>
            <input 
              type="text" 
              className="note-input" 
              placeholder="เช่น ซื้อหมูแดงเพิ่ม, จ่ายค่าไฟ..." 
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <button className="btn-submit expense-submit ripple" onClick={handleSubmit}>
            บันทึกรายจ่าย
          </button>
        </div>
      </div>
    </div>
  );
};

export default Expense;
