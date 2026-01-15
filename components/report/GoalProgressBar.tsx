'use client';

import { formatCurrency, formatPercent } from '@/lib/formatters';

interface GoalProgressBarProps {
  currentNetAssets: number;
  goalNetAssets: number;
}

const GoalProgressBar = ({
  currentNetAssets,
  goalNetAssets,
}: GoalProgressBarProps) => {
  const progress = Math.min((currentNetAssets / goalNetAssets) * 100, 100);
  const progressPercent = progress / 100;

  return (
    <div className='space-y-3'>
      <div className='flex items-baseline justify-between'>
        <div>
          <p className='text-sm font-medium text-slate-700'>목표 진행률</p>
          <p className='mt-1 text-xs text-slate-500'>
            목표 {formatCurrency(goalNetAssets)} 중{' '}
            {formatCurrency(currentNetAssets)}
          </p>
        </div>
        <div className='text-right'>
          <p className='text-lg font-semibold text-slate-900'>
            {formatPercent(progressPercent, 1)}
          </p>
        </div>
      </div>

      {/* 프로그레스 바 */}
      <div className='relative h-3 w-full overflow-hidden rounded-full bg-slate-100'>
        <div
          className='h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-500 ease-out'
          style={{ width: `${progress}%` }}
          role='progressbar'
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`목표 진행률 ${progress.toFixed(1)}%`}
        />
      </div>
    </div>
  );
};

export default GoalProgressBar;
