'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  return (
    <header className='border-b border-slate-200 bg-white/80 backdrop-blur'>
      <div className='mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8'>
        <Link href='/' className='transition-opacity hover:opacity-80'>
          <p className='text-primary-600 text-xl font-semibold'>MoneySnap</p>
          <p className='text-sm text-slate-500'>
            한 장 스냅샷으로 보는 내 돈 상태
          </p>
        </Link>
        <nav className='flex items-center'>
          <Link
            href='/history'
            className={`text-sm font-medium transition-colors ${
              pathname === '/history'
                ? 'text-primary-600'
                : 'hover:text-primary-600 text-slate-600'
            }`}
          >
            히스토리
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
