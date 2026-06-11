import React from 'react';

const Modal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay show">
      <div className="modal">
        <div className="modal-title">{title}</div>
        <div className="modal-text">{message}</div>
        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onCancel}>ยกเลิก</button>
          <button className="modal-btn confirm" onClick={onConfirm}>ยืนยันลบ</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
