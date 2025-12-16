'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Card } from '../common';
import { useEffect, useState } from 'react';
import { MonthSummary } from '@/types';
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

  useEffect(() => {
    // 월 파라미터 가져오기
    const month = searchParams.get('month');
    if (!month) {
      router.push('/');
      return;
    }

    const normalizedMonth = formatMonth(month);
    // 월 요약 데이터 가져오기
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
  }, [searchParams, router]);

  if (isLoading || !summary) {
    return (
      <div className='flex min-h-[400px] items-center justify-center'>
        <p className='text-slate-500'>로딩 중...</p>
      </div>
    );
  }

  return (
    <div id='report-card' className='space-y-6'>
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
