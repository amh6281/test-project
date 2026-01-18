import type { ChangeEvent } from 'react';

interface HomeMonthInputProps {
  month: string;
  error?: string;
  onChange: (next: string) => void;
}

const HomeMonthInput = ({ month, error, onChange }: HomeMonthInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <label className='flex w-full flex-col gap-2'>
      <div className='flex items-center justify-between'>
        <span className='text-sm font-medium text-slate-800 dark:text-slate-200'>
          기준 월
          <span className='text-primary-600 dark:text-primary-400 ml-1'>*</span>
        </span>
        {error && <span className='text-danger text-xs'>{error}</span>}
      </div>
      <div
        className={`focus-within:border-primary-300 focus-within:ring-primary-200 dark:focus-within:border-primary-400 dark:focus-within:ring-primary-300 flex min-h-[44px] items-center rounded-xl border bg-white px-3 py-2 shadow-sm transition focus-within:ring-2 dark:bg-slate-800 dark:border-slate-700 ${error ? 'border-danger ring-danger/30' : 'border-slate-200'}`}
      >
        <input
          type='month'
          value={month}
          onChange={handleChange}
          className='w-full bg-transparent text-base text-slate-900 outline-none dark:text-slate-50'
          aria-label='기준 월 선택'
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'month-error' : undefined}
        />
        {error && <span id='month-error' className='sr-only'>{error}</span>}
      </div>
    </label>
  );
};

export default HomeMonthInput;
