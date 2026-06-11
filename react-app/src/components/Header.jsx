import React, { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { formatTime } from '../utils/helpers';

const Header = () => {
  const { logout } = useAuth();
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const dateString = now.toLocaleDateString('th-TH', options);
      const timeString = formatTime(now.toISOString());
      setTimeStr(`${dateString} | ${timeString} น.`);
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    if (window.confirm('ต้องการออกจากระบบใช่หรือไม่?')) {
      await logout();
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src="icons/logo.png" className="header-logo-img" alt="Logo" onError={(e) => e.target.src='https://placehold.co/45x45?text=Logo'} />
        <div>
          <div className="header-title">ชายสี่บะหมี่เกี๊ยว By ซ้อเอ๋สายฝอ <span style={{ fontSize: '0.6em', color: 'var(--text-muted)', fontWeight: 'normal' }}>v21</span></div>
          <div className="header-date">{timeStr}</div>
        </div>
      </div>
      <div className="header-actions">
        <button className="btn-icon" onClick={handleLogout} title="ออกจากระบบ">
          <LogOut size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
