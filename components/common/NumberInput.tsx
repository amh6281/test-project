'use client';

import { useEffect, useMemo, useState } from 'react';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (next: number) => void;
  placeholder?: string;
  suffix?: string;
  required?: boolean;
  error?: string;
}

const formatWithComma = (num: number) =>
  Number.isFinite(num) ? num.toLocaleString('ko-KR') : '';

const NumberInput = ({
  label,
  value,
  onChange,
  placeholder,
  suffix = '원',
  required = false,
  error,
}: NumberInputProps) => {
  const [display, setDisplay] = useState<string>(formatWithComma(value));

  const numericValue = useMemo(
    () => (Number.isFinite(value) ? value : 0),
    [value],
  );

  useEffect(() => {
    setDisplay(formatWithComma(value));
  }, [value]);

  const handleChange = (next: string) => {
    const cleaned = next.replace(/[^0-9]/g, '');
    setDisplay(cleaned);
    const numeric = cleaned.length ? Number(cleaned) : 0;
    onChange(numeric);
  };

  const handleBlur = () => {
    setDisplay(formatWithComma(numericValue));
  };

  return (
    <label className='flex w-full flex-col gap-2'>
      <div className='flex items-center justify-between'>
        <span className='text-sm font-medium text-slate-800'>
          {label}
          {required && <span className='text-primary-600 ml-1'>*</span>}
        </span>
        {error && <span className='text-danger text-xs'>{error}</span>}
      </div>
      <div
        className={`focus-within:border-primary-300 focus-within:ring-primary-200 flex min-h-[44px] items-center justify-between rounded-xl border bg-white px-3 py-3 shadow-sm transition focus-within:ring-2 ${error ? 'border-danger ring-danger/30' : 'border-slate-200'}`}
      >
        <input
          type='text'
          inputMode='numeric'
          placeholder={placeholder}
          value={display}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          className='w-full bg-transparent pr-2 text-base text-slate-900 outline-none placeholder:text-slate-400'
        />
        {suffix && (
          <span className='text-sm font-medium text-slate-500'>{suffix}</span>
        )}
      </div>
    </label>
  );
};

export default NumberInput;
