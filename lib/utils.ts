import type { MonthSummary } from '@/types';

/**
 * 월별 요약을 최신순으로 정렬 (내림차순: 2025-12 > 2025-11)
 */
export const sortSummariesByMonthDesc = (
  summaries: MonthSummary[],
): MonthSummary[] => {
  return [...summaries].sort((a, b) => b.month.localeCompare(a.month));
};

/**
 * 월별 요약을 오래된순으로 정렬 (오름차순: 2025-01 < 2025-02)
 */
export const sortSummariesByMonthAsc = (
  summaries: MonthSummary[],
): MonthSummary[] => {
  return [...summaries].sort((a, b) => a.month.localeCompare(b.month));
};

/**
 * 특정 월보다 이전의 요약들을 최신순으로 정렬하여 반환
 */
export const getPreviousSummaries = (
  summaries: MonthSummary[],
  targetMonth: string,
): MonthSummary[] => {
  return sortSummariesByMonthDesc(
    summaries.filter((s) => s.month < targetMonth),
  );
};
