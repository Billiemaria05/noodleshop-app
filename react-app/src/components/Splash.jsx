import React from 'react';

const Splash = () => {
  return (
    <div id="splashScreen">
      <img src="icons/logo.png" className="splash-logo" alt="Logo" onError={(e) => e.target.src='https://placehold.co/120x120?text=Logo'} />
      <div style={{ marginTop: '20px', color: 'var(--text-muted)', fontWeight: 500 }}>กำลังโหลด...</div>
    </div>
  );
};

export default Splash;
