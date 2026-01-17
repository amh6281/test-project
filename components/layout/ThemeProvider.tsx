'use client';

import { useEffect } from 'react';
import { initTheme } from '@/lib/theme';

/**
 * 테마 초기화를 위한 클라이언트 컴포넌트
 */
const ThemeProvider = () => {
  useEffect(() => {
    initTheme();
  }, []);

  return null;
};

export default ThemeProvider;
