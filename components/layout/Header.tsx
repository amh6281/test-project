'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/common';

const NAV_ITEMS = [
  { href: '/history', label: '히스토리' },
  { href: '/simulation', label: '시뮬레이션' },
  { href: '/settings', label: '설정' },
] as const;

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
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'hover:text-primary-600 text-slate-600 dark:text-slate-300 dark:hover:text-primary-400'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;
