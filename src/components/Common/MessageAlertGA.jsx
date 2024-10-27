import { useState, useEffect } from 'react';
import './MessageAlert.css';

// eslint-disable-next-line react/prop-types
const MessageAlertGA = ({ message, type = 'info', onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  const getAlertClass = () => {
    const baseClasses = 'alert alert-dismissible d-flex align-items-center message-alert position-absolute w-100';
    const variantClass = `alert-${type}`;
    const visibilityClass = isVisible ? 'visible' : '';
    const leavingClass = isLeaving ? 'leaving' : '';
    
    return `${baseClasses} ${variantClass} ${visibilityClass} ${leavingClass}`;
  };

  return (
    <div className={getAlertClass()} role="alert">
      <div className="d-flex align-items-center flex-grow-1">
        <i className="bi bi-info-circle me-2"></i>
        <span>{message}</span>
      <button 
        type="button" 
        className="btn-close message-alert-x" 
        onClick={handleClose}
        aria-label="Close"
      ></button>
      </div>
    </div>
  );
};

export default MessageAlertGA;