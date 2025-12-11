type HomeMonthInputProps = {
  month: string;
  error?: string;
  onChange: (next: string) => void;
};

const HomeMonthInput = ({ month, error, onChange }: HomeMonthInputProps) => {
  return (
    <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
      <label className='text-sm font-medium text-slate-800'>
        기준 월
        <input
          type='month'
          value={month}
          onChange={(e) => onChange(e.target.value)}
          className={`focus:border-primary-300 focus:ring-primary-200 mt-2 w-full rounded-xl border bg-white px-3 py-2 text-base text-slate-900 shadow-sm focus:ring-2 focus:outline-none ${error ? 'border-danger ring-danger/30' : 'border-slate-200'}`}
        />
      </label>
      {error && <span className='text-danger text-sm'>{error}</span>}
    </div>
  );
};

export default HomeMonthInput;
