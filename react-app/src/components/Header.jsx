import React, { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { formatTime } from '../utils/helpers';

const Header = () => {
  const { logout } = useAuth();
  const { lang, t, toggleLang } = useLanguage();
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const locale = lang === 'th' ? 'th-TH' : 'en-US';
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const dateString = now.toLocaleDateString(locale, options);
      const timeString = formatTime(now.toISOString());
      setTimeStr(`${dateString} | ${timeString} ${lang === 'th' ? 'น.' : ''}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, [lang]);

  const handleLogout = async () => {
    if (window.confirm(t('logoutConfirm'))) {
      await logout();
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <img
          src="icons/logo.png"
          className="header-logo-img"
          alt="ซ้อเอ๋สายฝอ"
          onError={(e) => {
            e.target.src = 'https://placehold.co/52x52?text=Logo';
          }}
        />
        <div>
          <div className="header-title">
            <span>{t('shopName')}</span>
            <span className="header-version-pill">v24</span>
          </div>
          <div className="header-date">{timeStr}</div>
        </div>
      </div>
      <div className="header-actions">
        <button
          className="btn-icon"
          onClick={toggleLang}
          title={lang === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
        >
          {lang === 'th' ? 'EN' : 'TH'}
        </button>
        <button className="btn-icon" onClick={handleLogout} title={t('logout')}>
          <LogOut size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
