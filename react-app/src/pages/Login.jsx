import React, { useState } from 'react';
import { UtensilsCrossed, LogIn, UserCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Login = () => {
  const { login, loginAsGuest } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError(t('loginError'));
      return;
    }
    try {
      await login(email, password);
    } catch (err) {
      setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
    }
  };

  return (
    <div id="pageLogin">
      <div className="login-box">
        <div className="login-seal-logo">
          <UtensilsCrossed size={42} strokeWidth={2.4} />
        </div>
        <div className="login-title">{t('loginTitle')}</div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 600, marginBottom: '20px' }}>
          {t('loginSubtitle')}
        </div>

        {error && (
          <div style={{
            color: 'var(--crimson)',
            background: 'var(--crimson-glow)',
            border: '1.5px solid var(--crimson)',
            padding: '12px 16px',
            borderRadius: '12px',
            marginBottom: '18px',
            fontSize: '1rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            justifyContent: 'center'
          }}>
            <AlertCircle size={20} strokeWidth={2.4} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            className="login-input" 
            placeholder={t('emailPlaceholder')} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            className="login-input" 
            placeholder={t('passwordPlaceholder')} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-btn">
            <LogIn size={22} strokeWidth={2.4} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} />
            <span>{t('loginBtn')}</span>
          </button>
        </form>

        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <button 
            type="button" 
            className="login-btn" 
            style={{
              backgroundColor: 'var(--bg-input)',
              color: 'var(--text)',
              borderColor: 'var(--border)',
              boxShadow: 'none',
              marginTop: '4px'
            }}
            onClick={loginAsGuest}
          >
            <UserCheck size={22} strokeWidth={2.4} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px', color: 'var(--gold-dark)' }} />
            <span>{t('guestBtn')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
