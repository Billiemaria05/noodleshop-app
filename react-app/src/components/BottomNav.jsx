import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowDownCircle, ArrowUpCircle, BarChart3 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const BottomNav = () => {
  const { t } = useLanguage();

  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <LayoutDashboard className="nav-icon" size={28} />
        {t('navDashboard')}
      </NavLink>
      <NavLink to="/income" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <ArrowDownCircle className="nav-icon" size={28} />
        {t('navIncome')}
      </NavLink>
      <NavLink to="/expense" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <ArrowUpCircle className="nav-icon" size={28} />
        {t('navExpense')}
      </NavLink>
      <NavLink to="/report" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <BarChart3 className="nav-icon" size={28} />
        {t('navReport')}
      </NavLink>
    </nav>
  );
};

export default BottomNav;
