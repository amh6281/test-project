'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/common';

const Header = () => {
  const pathname = usePathname();

  return (
    <header className='border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80'>
      <div className='mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8'>
        <Link href='/' className='transition-opacity hover:opacity-80'>
          <p className='text-primary-600 text-xl font-semibold dark:text-primary-400'>
            MoneySnap
          </p>
          <p className='text-sm text-slate-500 dark:text-slate-400'>
            한 장 스냅샷으로 보는 내 돈 상태
          </p>
        </Link>
        <nav className='flex items-center gap-4'>
          <Link
            href='/history'
            className={`text-sm font-medium transition-colors ${
              pathname === '/history'
                ? 'text-primary-600 dark:text-primary-400'
                : 'hover:text-primary-600 text-slate-600 dark:text-slate-300 dark:hover:text-primary-400'
            }`}
          >
            히스토리
          </Link>
          <Link
            href='/simulation'
            className={`text-sm font-medium transition-colors ${
              pathname === '/simulation'
                ? 'text-primary-600 dark:text-primary-400'
                : 'hover:text-primary-600 text-slate-600 dark:text-slate-300 dark:hover:text-primary-400'
            }`}
          >
            시뮬레이션
          </Link>
          <Link
            href='/settings'
            className={`text-sm font-medium transition-colors ${
              pathname === '/settings'
                ? 'text-primary-600 dark:text-primary-400'
                : 'hover:text-primary-600 text-slate-600 dark:text-slate-300 dark:hover:text-primary-400'
            }`}
          >
            설정
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;
