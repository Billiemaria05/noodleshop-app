export const getToday = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().split('T')[0];
};

export const formatCurrency = (amount) => {
  return Number(amount).toLocaleString();
};

export const formatTime = (isoString) => {
  const d = new Date(isoString);
  return d.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

export const DONUT_COLORS = ['#FF6B35', '#004E89', '#00C896'];
export const ADMIN_EMAIL = 'khemmarin2548@gmail.com';
export const STORAGE_KEY = 'noodleShopData_v16';
