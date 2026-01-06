'use client';

import {
  formatCurrency,
  formatPercent,
  formatMonthKorean,
} from '@/lib/formatters';
import type { MonthSummary } from '@/types';

interface HistoryListItemProps {
  summary: MonthSummary;
  deltaRate: number;
  onClick: () => void;
}

const HistoryListItem = ({
  summary,
  deltaRate,
  onClick,
}: HistoryListItemProps) => {
  const { month, netAssets } = summary;
  const formattedMonth = formatMonthKorean(month);
  const formattedNetAssets = formatCurrency(netAssets);
  const formattedDeltaRate = formatPercent(deltaRate, 1);

  const isPositive = deltaRate > 0;
  const isNegative = deltaRate < 0;

  return (
    <button
      type='button'
      onClick={onClick}
      className='w-full px-4 py-4 text-left transition hover:bg-slate-50 active:bg-slate-100 sm:px-6'
      aria-label={`${formattedMonth} 리포트 보기`}
    >
      <div className='flex items-center justify-between gap-4'>
        <div className='flex-1'>
          <p className='text-base font-semibold text-slate-900'>
            {formattedMonth}
          </p>
          <p className='mt-1 text-lg font-semibold text-slate-900 sm:text-xl'>
            {formattedNetAssets}
          </p>
        </div>
        {deltaRate !== 0 && (
          <div
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium ${
              isPositive
                ? 'bg-green-50 text-green-700'
                : isNegative
                  ? 'bg-red-50 text-red-600'
                  : 'bg-slate-100 text-slate-700'
            }`}
          >
            <span className='text-xs'>
              {isPositive ? '▲' : isNegative ? '▼' : '●'}
            </span>
            <span>{formattedDeltaRate}</span>
          </div>
        )}
        <div className='cursor-pointer text-slate-400'>
          <svg
            className='h-5 w-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
        </div>
      </div>
    </button>
  );
};

export default HistoryListItem;
