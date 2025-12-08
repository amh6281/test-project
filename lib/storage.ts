import { MonthSummary, StorageShape } from '@/types';

const STORAGE_KEY = 'moneysnap:storage:v1';

// 브라우저 환경 여부 확인 (SSR 안전)
const isBrowser = () =>
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

// localStorage에서 스토리지 스냅샷 읽기
const readStorage = (): StorageShape => {
  if (!isBrowser()) return { summaries: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { summaries: [] };
    const parsed = JSON.parse(raw) as StorageShape;
    if (!parsed || !Array.isArray(parsed.summaries)) return { summaries: [] };
    return parsed;
  } catch {
    return { summaries: [] };
  }
};

// localStorage에 스토리지 스냅샷 쓰기
const writeStorage = (data: StorageShape) => {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// 월별 요약 저장/업데이트 후 최신순으로 정렬
export const saveMonthSummary = (summary: MonthSummary) => {
  const current = readStorage();
  const filtered = current.summaries.filter(
    (item) => item.month !== summary.month,
  );
  const next = [...filtered, summary].sort((a, b) =>
    b.month.localeCompare(a.month),
  );
  writeStorage({ summaries: next });
  return summary;
};

// 특정 월 데이터 조회
export const getMonthSummary = (month: string): MonthSummary | undefined => {
  const { summaries } = readStorage();
  return summaries.find((item) => item.month === month);
};

// 최신 월(지난 기록 중 가장 최근) 데이터 조회
export const getLastMonthSummary = (): MonthSummary | undefined => {
  const { summaries } = readStorage();
  if (!summaries.length) return undefined;
  return [...summaries].sort((a, b) => b.month.localeCompare(a.month))[0];
};

// 전체 월 데이터 조회
export const getAllSummaries = (): MonthSummary[] => {
  const { summaries } = readStorage();
  return summaries;
};
