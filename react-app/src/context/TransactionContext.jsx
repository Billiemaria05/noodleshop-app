import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { database } from '../utils/firebase';
import { STORAGE_KEY } from '../utils/helpers';
import { useAuth } from './AuthContext';

const TransactionContext = createContext();

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setTransactions([]);
      setIsDataLoaded(true);
      return;
    }

    const txRef = ref(database, 'transactions');
    const unsubscribe = onValue(txRef, (snapshot) => {
      const data = snapshot.val();
      let newData = [];

      if (!data) {
        if (isInitialLoad) {
          try {
            const localData = localStorage.getItem(STORAGE_KEY);
            if (localData && localData !== '[]') {
              newData = JSON.parse(localData);
              // Save to Firebase to restore
              set(txRef, newData);
              setIsInitialLoad(false);
              return;
            }
          } catch (err) {
            console.error(err);
          }
        }
      } else {
        newData = (Array.isArray(data) ? data : Object.values(data)).filter(Boolean);
      }

      // Repair IDs if missing
      let isDataFixed = false;
      newData.forEach(t => {
        if (t.id == null || t.id === 'undefined') {
          t.id = 'old_' + Date.now() + Math.random().toString(36).substr(2, 5);
          isDataFixed = true;
        } else if (typeof t.id !== 'string') {
          t.id = String(t.id);
          isDataFixed = true;
        }
      });

      if (isDataFixed) {
        set(txRef, newData);
      }

      setTransactions(newData);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      } catch {}
      
      setIsDataLoaded(true);
      setIsInitialLoad(false);
    });

    return () => unsubscribe();
  }, [currentUser, isInitialLoad]);

  const addTransaction = async (transaction) => {
    if (currentUser?.isGuest) {
      alert("เฉพาะผู้ได้รับอนุญาติ");
      return;
    }
    const newTxList = [...transactions, transaction];
    // Optimistic UI update
    setTransactions(newTxList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTxList));
    } catch {}
    
    // Save to Firebase
    await set(ref(database, 'transactions'), newTxList);
  };

  const deleteTransaction = async (id) => {
    if (currentUser?.isGuest) {
      alert("เฉพาะผู้ได้รับอนุญาติ");
      return;
    }
    const newTxList = transactions.filter(t => String(t.id) !== String(id));
    setTransactions(newTxList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTxList));
    } catch {}
    
    await set(ref(database, 'transactions'), newTxList);
  };

  const importTransactions = async (importedData) => {
    if (currentUser?.isGuest) {
      alert("เฉพาะผู้ได้รับอนุญาติ");
      return;
    }
    await set(ref(database, 'transactions'), importedData);
  };

  const value = {
    transactions,
    isDataLoaded,
    addTransaction,
    deleteTransaction,
    importTransactions
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
