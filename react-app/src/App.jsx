import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useTransactions } from './context/TransactionContext';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Income from './pages/Income';
import Expense from './pages/Expense';
import Report from './pages/Report';

// Components
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Splash from './components/Splash';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  const { currentUser } = useAuth();
  const { isDataLoaded } = useTransactions();

  if (currentUser && !isDataLoaded) {
    return <Splash />;
  }

  return (
    <Router>
      {currentUser && <Header />}
      
      <main className="main">
        <Routes>
          <Route path="/login" element={currentUser ? <Navigate to="/" replace /> : <Login />} />
          
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/income" element={<PrivateRoute><Income /></PrivateRoute>} />
          <Route path="/expense" element={<PrivateRoute><Expense /></PrivateRoute>} />
          <Route path="/report" element={<PrivateRoute><Report /></PrivateRoute>} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {currentUser && <BottomNav />}
    </Router>
  );
}

export default App;
