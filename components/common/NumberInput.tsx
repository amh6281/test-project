'use client';

import { useEffect, useMemo, useState, type ChangeEvent } from 'react';

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
        <span className='text-sm font-medium text-slate-800 dark:text-slate-200'>
          {label}
          {required && <span className='text-primary-600 dark:text-primary-400 ml-1'>*</span>}
        </span>
        {error && (
          <span id={`${label}-error`} className='text-danger text-xs' role='alert'>
            {error}
          </span>
        )}
      </div>
      <div
        className={`focus-within:border-primary-300 focus-within:ring-primary-200 dark:focus-within:border-primary-400 dark:focus-within:ring-primary-300 flex min-h-[44px] items-center justify-between rounded-xl border bg-white px-3 py-3 shadow-sm transition focus-within:ring-2 dark:bg-slate-800 dark:border-slate-700 ${error ? 'border-danger ring-danger/30' : 'border-slate-200'}`}
      >
        <input
          type='text'
          inputMode='numeric'
          placeholder={placeholder}
          value={display}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
          onBlur={handleBlur}
          className='w-full bg-transparent pr-2 text-base text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-50 dark:placeholder:text-slate-500'
          aria-label={label}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${label}-error` : undefined}
        />
        {suffix && (
          <span className='text-sm font-medium text-slate-500 dark:text-slate-400'>
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
};

export default NumberInput;
