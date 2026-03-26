import clsx from 'clsx';

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  children,
  ...props
}) {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    outline: 'border-2 border-blue-500 text-blue-600 hover:bg-blue-50',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      disabled={disabled}
      className={clsx(
        'font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Card({ className, children, ...props }) {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Input({
  
  size = 'md',
  icon: Icon,
  error,
  label,
  className,
  ...props
}) {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        )}
        <input
          className={clsx(
            'w-full border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            Icon ? 'pl-10' : '',
            sizes[size],
            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}

export function Badge({ variant = 'blue', className, children }) {
  const variants = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    gray: 'bg-gray-100 text-gray-800',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function Alert({ variant = 'info', title, description, icon: Icon }) {
  const variants = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };

  return (
    <div className={clsx('rounded-lg border p-4', variants[variant])}>
      <div className="flex gap-3">
        {Icon && <Icon className="w-5 h-5 shrink-0 mt-0.5" />}
        <div>
          {title && <p className="font-semibold mb-1">{title}</p>}
          {description && <p className="text-sm">{description}</p>}
        </div>
      </div>
    </div>
  );
}
