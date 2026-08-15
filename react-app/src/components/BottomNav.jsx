import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowDownCircle, ArrowUpCircle, BarChart3 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const BottomNav = () => {
  const { t } = useLanguage();

  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <LayoutDashboard className="nav-icon" size={26} strokeWidth={2.4} />
        <span>{t('navDashboard')}</span>
      </NavLink>
      <NavLink to="/income" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <ArrowDownCircle className="nav-icon" size={26} strokeWidth={2.4} />
        <span>{t('navIncome')}</span>
      </NavLink>
      <NavLink to="/expense" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <ArrowUpCircle className="nav-icon" size={26} strokeWidth={2.4} />
        <span>{t('navExpense')}</span>
      </NavLink>
      <NavLink to="/report" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <BarChart3 className="nav-icon" size={26} strokeWidth={2.4} />
        <span>{t('navReport')}</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
