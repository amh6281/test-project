'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/common';
import { getAllSummaries } from '@/lib/storage';
import { calculateDelta } from '@/lib/calculations';
import type { MonthSummary } from '@/types';
import HistoryListItem from './HistoryListItem';

const HistoryList = () => {
  const router = useRouter();
  const [summaries, setSummaries] = useState<MonthSummary[]>([]);

  useEffect(() => {
    const allSummaries = getAllSummaries();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSummaries(allSummaries);
  }, []);

  const handleItemClick = (month: string) => {
    router.push(`/report?month=${month}`);
  };

  if (summaries.length === 0) {
    return (
      <Card>
        <div className='flex min-h-[200px] flex-col items-center justify-center py-12 text-center'>
          <p className='text-slate-500'>아직 기록이 없습니다.</p>
          <p className='mt-2 text-sm text-slate-400'>
            메인 페이지에서 첫 리포트를 만들어보세요.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className='space-y-0 p-0'>
      <div className='divide-y divide-slate-200'>
        {summaries.map((summary, index) => {
          const previousSummary =
            index < summaries.length - 1 ? summaries[index + 1] : undefined;

          // 증감률
          const { deltaRate } = calculateDelta(
            summary.netAssets,
            previousSummary?.netAssets,
          );

          return (
            <HistoryListItem
              key={summary.month}
              summary={summary}
              deltaRate={deltaRate}
              onClick={() => handleItemClick(summary.month)}
            />
          );
        })}
      </div>
    </Card>
  );
};

export default HistoryList;
