import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('⚠️ กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }
    try {
      await login(email, password);
    } catch (err) {
      setError('❌ อีเมลหรือรหัสผ่านไม่ถูกต้อง!');
    }
  };

  return (
    <div id="pageLogin">
      <div className="login-box">
        <img src="icons/logo.png" className="login-logo-img" alt="Logo" onError={(e) => e.target.src='https://placehold.co/100x100?text=Logo'} />
        <div className="login-title">ระบบบัญชีร้านบะหมี่</div>
        {error && <div style={{ color: 'var(--danger)', marginBottom: '16px' }}>{error}</div>}
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            className="login-input" 
            placeholder="อีเมล (Email)" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            className="login-input" 
            placeholder="รหัสผ่าน (Password)" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-btn ripple">เข้าสู่ระบบ</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
