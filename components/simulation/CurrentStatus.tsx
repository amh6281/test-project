import { Card } from '@/components/common';
import { formatCurrency } from '@/lib/formatters';
import type { MonthSummary } from '@/types';

interface CurrentStatusProps {
  summary: MonthSummary;
}

const CurrentStatus = ({ summary }: CurrentStatusProps) => {
  const { netAssets, savingAmount } = summary;

  return (
    <Card>
      <div className='space-y-4'>
        <h2 className='text-lg font-semibold text-slate-900'>현재 상태</h2>
        <div className='grid gap-4 sm:grid-cols-2'>
          <div className='rounded-xl border border-slate-200 bg-slate-50 px-4 py-3'>
            <p className='text-sm text-slate-500'>현재 순자산</p>
            <p className='mt-1 text-xl font-semibold text-slate-900'>
              {formatCurrency(netAssets)}
            </p>
          </div>
          <div className='rounded-xl border border-slate-200 bg-slate-50 px-4 py-3'>
            <p className='text-sm text-slate-500'>월 저축액</p>
            <p className='mt-1 text-xl font-semibold text-slate-900'>
              {formatCurrency(savingAmount)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CurrentStatus;
