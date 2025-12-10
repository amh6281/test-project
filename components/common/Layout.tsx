import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className='min-h-screen bg-slate-50 text-slate-900'>
      <main
        className={`mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 ${className ?? ''}`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
