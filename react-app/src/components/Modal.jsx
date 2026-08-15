import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Modal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  const { t } = useLanguage();
  if (!isOpen) return null;

  return (
    <div className="modal-overlay show">
      <div className="modal">
        <div className="modal-seal-icon">
          <AlertTriangle size={32} strokeWidth={2.5} />
        </div>
        <div className="modal-title">{title}</div>
        <div className="modal-text">{message}</div>
        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onCancel}>{t('cancel')}</button>
          <button className="modal-btn confirm" onClick={onConfirm}>{t('confirmDelete')}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
