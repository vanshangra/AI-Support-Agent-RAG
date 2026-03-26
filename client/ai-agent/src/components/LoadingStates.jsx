import clsx from 'clsx';

export function Skeleton({ className }) {
  return <div className={clsx('animate-pulse bg-gray-200 rounded', className)} />;
}

export function MessageSkeleton() {
  return (
    <div className="mb-4">
      <Skeleton className="h-4 w-24 mb-2" />
      <Skeleton className="h-12 w-full mb-2" />
      <Skeleton className="h-3 w-32" />
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-6 h-6">
        <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 animate-spin"></div>
      </div>
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 p-3 bg-gray-100 rounded-lg">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      {action && action}
    </div>
  );
}
