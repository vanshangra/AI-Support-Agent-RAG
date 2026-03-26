import { useState, useCallback } from 'react';
import Toast from './Toast';

export function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Expose globally for use in pages
  window.showToast = showToast;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

export const useToast = () => {
  return {
    success: (msg, duration) => {
      if (window.showToast) window.showToast(msg, 'success', duration);
      else console.log('✓', msg);
    },
    error: (msg, duration) => {
      if (window.showToast) window.showToast(msg, 'error', duration);
      else console.error('✗', msg);
    },
    warning: (msg, duration) => {
      if (window.showToast) window.showToast(msg, 'warning', duration);
      else console.warn('⚠', msg);
    },
    info: (msg, duration) => {
      if (window.showToast) window.showToast(msg, 'info', duration);
      else console.info('ℹ', msg);
    },
  };
};
