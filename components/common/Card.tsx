import type { ReactNode } from 'react';

interface CardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

const Card = ({ title, description, children, className }: CardProps) => {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-6 ${className ?? ''}`}
    >
      {(title || description) && (
        <div className='mb-4'>
          {title && (
            <h3 className='text-lg font-semibold text-slate-900 dark:text-slate-50'>
              {title}
            </h3>
          )}
          {description && (
            <p className='mt-1 text-sm text-slate-500 dark:text-slate-400'>
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
