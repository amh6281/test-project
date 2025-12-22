'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card } from '../common';
import type { MonthSummary } from '@/types';
import { formatMonth } from '@/lib/formatters';
import { getAllSummaries, getMonthSummary } from '@/lib/storage';
import ReportSummarySection from './ReportSummarySection';
import ReportChartSection from './ReportChartSection';
import ReportCommentSection from './ReportCommentSection';

const ReportCard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [summary, setSummary] = useState<MonthSummary | null>(null);
  const [previousSummary, setPreviousSummary] = useState<MonthSummary | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  const monthParam = useMemo(() => searchParams.get('month'), [searchParams]);

  useEffect(() => {
    if (!monthParam) {
      router.push('/');
      return;
    }

    const normalizedMonth = formatMonth(monthParam);
    const found = getMonthSummary(normalizedMonth);

    if (!found) {
      router.push('/');
      return;
    }

    // 이전 달 데이터 찾기 (같은 월이 아닌 가장 가까운 이전 월)
    const allSummaries = getAllSummaries();
    const sorted = [...allSummaries]
      .filter((s) => s.month < normalizedMonth)
      .sort((a, b) => b.month.localeCompare(a.month));

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSummary(found);
    setPreviousSummary(sorted[0] ?? null);
    setIsLoading(false);
  }, [monthParam, router]);

  if (isLoading || !summary) {
    return (
      <div
        className='flex min-h-[400px] items-center justify-center'
        role='status'
        aria-live='polite'
      >
        <p className='text-slate-500'>로딩 중...</p>
      </div>
    );
  }

  return (
    <div id='report-card' className='space-y-6' role='article'>
      <Card className='space-y-6 p-6 sm:p-8'>
        {/* 핵심 지표 */}
        <ReportSummarySection
          summary={summary}
          previousSummary={previousSummary}
        />
        {/* 차트 */}
        <ReportChartSection summary={summary} />
        {/* 코멘트 */}
        <ReportCommentSection savingRate={summary.savingRate} />
      </Card>
    </div>
  );
};

export default ReportCard;
