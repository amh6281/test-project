'use client';

import { useEffect, useState } from 'react';
import { getTheme, setTheme, initTheme, type Theme } from '@/lib/theme';

const ThemeToggle = () => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initTheme();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(getTheme());
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setThemeState(newTheme);
    setTheme(newTheme);
  };

  // SSR 하이드레이션 전까지 렌더링 방지
  if (!mounted) {
    return (
      <button
        className='flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 transition-colors hover:bg-slate-50'
        aria-label='테마 토글'
        disabled
      >
        <svg
          className='h-4 w-4'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
          />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className='flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
      aria-label={theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}
      aria-pressed={theme === 'dark'}
    >
      {theme === 'light' ? (
        // 달 아이콘 (다크 모드로 전환)
        <svg
          className='h-4 w-4'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
          />
        </svg>
      ) : (
        // 태양 아이콘 (라이트 모드로 전환)
        <svg
          className='h-4 w-4'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
