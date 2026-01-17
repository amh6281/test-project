const THEME_STORAGE_KEY = 'moneysnap:theme:v1';

export type Theme = 'light' | 'dark';

const isBrowser = (): boolean =>
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

/**
 * 저장된 테마 조회 (없으면 시스템 테마 반환)
 */
export const getTheme = (): Theme => {
  if (!isBrowser()) {
    return 'light';
  }

  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch {
    // localStorage 접근 실패 무시
  }

  // 시스템 테마 감지
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

/**
 * 테마 저장 및 적용
 */
export const setTheme = (theme: Theme): void => {
  if (!isBrowser()) return;

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // localStorage 저장 실패 무시
  }

  document.documentElement.classList.toggle('dark', theme === 'dark');
};

/**
 * 초기 테마 적용 (SSR 안전)
 */
export const initTheme = (): void => {
  setTheme(getTheme());
};
