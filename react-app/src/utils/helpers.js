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

export const DONUT_COLORS = ['#8B1E1E', '#C69234', '#1F4E79', '#B52828', '#A47522'];
export const INCOME_DONUT_COLORS = ['#26734D', '#349162', '#C69234', '#1F4E79', '#DFAB43'];
export const ADMIN_EMAIL = 'khemmarin2548@gmail.com';
export const STORAGE_KEY = 'noodleShopData_v16';
