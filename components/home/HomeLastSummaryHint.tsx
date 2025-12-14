import { useMemo } from 'react';

import { calculateDelta } from '@/lib/calculations';
import { formatCurrency, formatPercent } from '@/lib/formatters';
import type { MonthSummary } from '@/types';

type HomeLastSummaryHintProps = {
  latestSummary: MonthSummary | null;
  previousSummary: MonthSummary | null;
};

const HomeLastSummaryHint = ({
  latestSummary,
  previousSummary,
}: HomeLastSummaryHintProps) => {
  const delta = useMemo(
    () =>
      calculateDelta(latestSummary?.netAssets ?? 0, previousSummary?.netAssets),
    [latestSummary, previousSummary],
  );

  if (!latestSummary) return null;

  return (
    <div className='text-sm text-slate-600'>
      <span className='font-medium text-slate-800'>
        지난 기록({latestSummary.month}) 순자산:{' '}
      </span>
      <span className='font-semibold text-slate-900'>
        {formatCurrency(latestSummary.netAssets)}
      </span>
      <span
        className={`ml-2 font-semibold ${delta.delta >= 0 ? 'text-green-600' : 'text-red-500'}`}
      >
        {previousSummary ? formatPercent(delta.deltaRate, 1) : '+0%'}
      </span>
    </div>
  );
};

export default HomeLastSummaryHint;


