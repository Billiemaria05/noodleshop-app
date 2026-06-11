import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransactions } from '../context/TransactionContext';
import { getToday, generateId } from '../utils/helpers';
import Numpad from '../components/Numpad';

const INCOME_CATEGORIES = [
  { name: 'เงินสด', emoji: '💵' },
  { name: 'เงินโอน', emoji: '📱' },
  { name: 'สวัสดิการรัฐ', emoji: '🏛️' },
];

const Income = () => {
  const { addTransaction } = useTransactions();
  const navigate = useNavigate();
  
  const [amount, setAmount] = useState('0');
  const [date, setDate] = useState(getToday());
  const [selectedCat, setSelectedCat] = useState(null);
  const [note, setNote] = useState('');

  const handleSubmit = async () => {
    if (!selectedCat) {
      alert('⚠️ กรุณาเลือกประเภทรายรับ');
      return;
    }
    const numAmount = Number(amount.replace(/,/g, ''));
    if (numAmount <= 0) {
      alert('⚠️ กรุณาระบุจำนวนเงิน');
      return;
    }

    const tx = {
      id: generateId(),
      type: 'income',
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
      <div className="section-title">เพิ่มรายรับ</div>
      <br/>
      <div className="form-section">
        <label className="form-label">เลือกประเภทรายรับ</label>
        <div className="category-grid">
          {INCOME_CATEGORIES.map(cat => (
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
          <div className="amount-display">
            <span className="amount-currency">฿</span>
            <span className="amount-value">{amount}</span>
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
              placeholder="เช่น ลูกค้าโต๊ะ 5, ทิปพิเศษ..." 
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <button className="btn-submit income-submit ripple" onClick={handleSubmit}>
            บันทึกรายรับ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Income;
