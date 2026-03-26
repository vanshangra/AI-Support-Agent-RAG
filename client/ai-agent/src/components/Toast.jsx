import { useEffect, } from 'react';
import { AlertCircle, CheckCircle, InfoIcon, AlertTriangle, X } from 'lucide-react';

export default function Toast({ type = 'info', message, onClose, duration = 4000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <InfoIcon className="w-5 h-5" />,
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200',
  };

  const textColors = {
    success: 'text-green-800',
    error: 'text-red-800',
    warning: 'text-yellow-800',
    info: 'text-blue-800',
  };

  const iconColors = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
  };

  return (
    <div className={`${bgColors[type]} border rounded-lg p-4 flex items-center gap-3 shadow-lg animate-in fade-in slide-in-from-top-4`}>
      <div className={iconColors[type]}>{icons[type]}</div>
      <p className={`flex-1 ${textColors[type]} text-sm font-medium`}>{message}</p>
      <button onClick={onClose} className={`${textColors[type]} hover:opacity-70`}>
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
