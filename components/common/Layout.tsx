import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className='min-h-screen bg-slate-50 text-slate-900'>
      <header className='border-b border-slate-200 bg-white/80 backdrop-blur'>
        <div className='mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8'>
          <div>
            <p className='text-primary-600 text-xl font-semibold'>MoneySnap</p>
            <p className='text-sm text-slate-500'>
              한 장 스냅샷으로 보는 내 돈 상태
            </p>
          </div>
          <div className='text-primary-600 hidden text-sm font-medium sm:block'>
            이번 달 리포트 카드 한 장
          </div>
        </div>
      </header>

      <main
        className={`mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 ${className ?? ''}`}
      >
        {children}
      </main>

      <footer className='border-t border-slate-200 bg-white/70 backdrop-blur'>
        <div className='mx-auto flex max-w-4xl items-center justify-between px-4 py-4 text-sm text-slate-500 sm:px-6 lg:px-8'>
          <span>MoneySnap · 개인 금융 리포트 카드</span>
          <span className='hidden sm:inline'>
            브라우저에만 저장 · 로그인 없이 사용
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
