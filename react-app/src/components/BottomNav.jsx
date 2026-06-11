import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowDownCircle, ArrowUpCircle, BarChart3 } from 'lucide-react';

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <LayoutDashboard className="nav-icon" size={28} />
        ภาพรวม
      </NavLink>
      <NavLink to="/income" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <ArrowDownCircle className="nav-icon" size={28} />
        รายรับ
      </NavLink>
      <NavLink to="/expense" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <ArrowUpCircle className="nav-icon" size={28} />
        รายจ่าย
      </NavLink>
      <NavLink to="/report" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <BarChart3 className="nav-icon" size={28} />
        รายงาน
      </NavLink>
    </nav>
  );
};

export default BottomNav;
