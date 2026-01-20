import { Card } from '@/components/common';
import { formatCurrency } from '@/lib/formatters';

interface SimulationResultsProps {
  current: number;
  after1Year: number;
  after3Years: number;
}

const SimulationResults = ({
  current,
  after1Year,
  after3Years,
}: SimulationResultsProps) => {
  return (
    <Card>
      <div className='space-y-4'>
        <h2 className='text-lg font-semibold text-slate-900'>예상 결과</h2>
        <div className='grid gap-4 sm:grid-cols-2'>
          {/* 1년 후 */}
          <div className='rounded-xl border-2 border-primary-200 bg-primary-50 px-4 py-4'>
            <p className='text-sm font-medium text-primary-700'>1년 후</p>
            <p className='mt-2 text-2xl font-bold text-primary-900'>
              {formatCurrency(after1Year)}
            </p>
            <p className='mt-1 text-xs text-primary-600'>
              증가액: {formatCurrency(after1Year - current)}
            </p>
          </div>

          {/* 3년 후 */}
          <div className='rounded-xl border-2 border-primary-300 bg-primary-100 px-4 py-4'>
            <p className='text-sm font-medium text-primary-700'>3년 후</p>
            <p className='mt-2 text-2xl font-bold text-primary-900'>
              {formatCurrency(after3Years)}
            </p>
            <p className='mt-1 text-xs text-primary-600'>
              증가액: {formatCurrency(after3Years - current)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SimulationResults;
