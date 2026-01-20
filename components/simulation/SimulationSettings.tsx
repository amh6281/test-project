import { Card } from '@/components/common';

interface SimulationSettingsProps {
  returnRate: number;
  salaryGrowthRate: number;
  onReturnRateChange: (value: number) => void;
  onSalaryGrowthRateChange: (value: number) => void;
}

const SimulationSettings = ({
  returnRate,
  salaryGrowthRate,
  onReturnRateChange,
  onSalaryGrowthRateChange,
}: SimulationSettingsProps) => {
  return (
    <Card>
      <div className='space-y-6'>
        <h2 className='text-lg font-semibold text-slate-900'>시뮬레이션 설정</h2>

        {/* 연 수익률 */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <label className='text-sm font-medium text-slate-700'>연 수익률</label>
            <span className='text-sm font-semibold text-primary-600'>
              {returnRate.toFixed(1)}%
            </span>
          </div>
          <input
            type='range'
            min='0'
            max='10'
            step='0.1'
            value={returnRate}
            onChange={(e) => onReturnRateChange(Number(e.target.value))}
            className='h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-primary-600'
          />
          <div className='flex justify-between text-xs text-slate-500'>
            <span>0%</span>
            <span>10%</span>
          </div>
        </div>

        {/* 연봉 상승률 */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <label className='text-sm font-medium text-slate-700'>연봉 상승률</label>
            <span className='text-sm font-semibold text-primary-600'>
              {salaryGrowthRate.toFixed(1)}%
            </span>
          </div>
          <input
            type='range'
            min='0'
            max='10'
            step='0.1'
            value={salaryGrowthRate}
            onChange={(e) => onSalaryGrowthRateChange(Number(e.target.value))}
            className='h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-primary-600'
          />
          <div className='flex justify-between text-xs text-slate-500'>
            <span>0%</span>
            <span>10%</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SimulationSettings;
