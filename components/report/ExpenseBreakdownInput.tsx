'use client';

import { useState, useEffect } from 'react';
import type { MonthSummary } from '@/types';
import { saveMonthSummary } from '@/lib/storage';
import { Card } from '../common';
import {ExpenseBreakdownChart} from '.';

interface ExpenseBreakdownInputProps {
  summary: MonthSummary;
  onSave?: (updatedSummary: MonthSummary) => void;
}

const ExpenseBreakdownInput = ({
  summary,
  onSave,
}: ExpenseBreakdownInputProps) => {
  const [fixed, setFixed] = useState<number>(
    summary.expenseBreakdown?.fixed ?? 0,
  );
  const [variable, setVariable] = useState<number>(
    summary.expenseBreakdown?.variable ?? 0,
  );
  const [saving, setSaving] = useState<number>(
    summary.expenseBreakdown?.saving ?? 0,
  );
  const [investment, setInvestment] = useState<number>(
    summary.expenseBreakdown?.investment ?? 0,
  );
  const [error, setError] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  const total = fixed + variable + saving + investment;

  useEffect(() => {
    if (summary.expenseBreakdown) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFixed(summary.expenseBreakdown.fixed);
      setVariable(summary.expenseBreakdown.variable);
      setSaving(summary.expenseBreakdown.saving);
      setInvestment(summary.expenseBreakdown.investment);
    } else {
      setFixed(0);
      setVariable(0);
      setSaving(0);
      setInvestment(0);
    }
    setError('');
  }, [summary.expenseBreakdown, summary.month]);

  const handleSave = () => {
    if (total !== 100) {
      setError('합계가 100%가 되어야 합니다.');
      return;
    }

    setIsSaving(true);
    const updatedSummary: MonthSummary = {
      ...summary,
      expenseBreakdown: {
        fixed,
        variable,
        saving,
        investment,
      },
    };

    saveMonthSummary(updatedSummary);
    setIsSaving(false);
    setError('');
    onSave?.(updatedSummary);
  };

  const handlePercentChange = (
    value: number,
    setter: (val: number) => void,
  ) => {
    // NaN이거나 빈 값인 경우 0으로 처리
    if (isNaN(value) || value === null || value === undefined) {
      setter(0);
      setError('');
      return;
    }

    // 앞의 0 제거를 위해 숫자로 변환
    const normalizedValue = Number(value);

    if (normalizedValue < 0) {
      setter(0);
    } else if (normalizedValue > 100) {
      setter(100);
    } else {
      setter(normalizedValue);
    }
    setError('');
  };

  return (
    <div className='space-y-6'>
      <Card
        title='소비 구조 비율'
        description='이번 달 소비 구조를 입력해주세요. 합계는 100%가 되어야 합니다.'
      >
        <div className='space-y-4'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <label className='flex flex-col gap-2'>
            <span className='text-sm font-medium text-slate-800 dark:text-slate-200'>
              고정비
            </span>
            <div className='flex min-h-[44px] items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-sm transition focus-within:border-primary-300 focus-within:ring-2 focus-within:ring-primary-200 dark:bg-slate-800 dark:border-slate-700 dark:focus-within:border-primary-400 dark:focus-within:ring-primary-300'>
              <input
                type='number'
                min='0'
                max='100'
                step='1'
                value={fixed || ''}
                onChange={(e) => {
                  const val = e.target.value === '' ? 0 : Number(e.target.value);
                  handlePercentChange(val, setFixed);
                }}
                className='w-full bg-transparent pr-2 text-base text-slate-900 outline-none dark:text-slate-50'
                placeholder='0'
              />
              <span className='text-sm font-medium text-slate-500 dark:text-slate-400'>
                %
              </span>
            </div>
          </label>

          <label className='flex flex-col gap-2'>
            <span className='text-sm font-medium text-slate-800 dark:text-slate-200'>
              변동비
            </span>
            <div className='flex min-h-[44px] items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-sm transition focus-within:border-primary-300 focus-within:ring-2 focus-within:ring-primary-200 dark:bg-slate-800 dark:border-slate-700 dark:focus-within:border-primary-400 dark:focus-within:ring-primary-300'>
              <input
                type='number'
                min='0'
                max='100'
                step='1'
                value={variable || ''}
                onChange={(e) => {
                  const val = e.target.value === '' ? 0 : Number(e.target.value);
                  handlePercentChange(val, setVariable);
                }}
                className='w-full bg-transparent pr-2 text-base text-slate-900 outline-none dark:text-slate-50'
                placeholder='0'
              />
              <span className='text-sm font-medium text-slate-500 dark:text-slate-400'>
                %
              </span>
            </div>
          </label>

          <label className='flex flex-col gap-2'>
            <span className='text-sm font-medium text-slate-800 dark:text-slate-200'>
              저축
            </span>
            <div className='flex min-h-[44px] items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-sm transition focus-within:border-primary-300 focus-within:ring-2 focus-within:ring-primary-200 dark:bg-slate-800 dark:border-slate-700 dark:focus-within:border-primary-400 dark:focus-within:ring-primary-300'>
              <input
                type='number'
                min='0'
                max='100'
                step='1'
                value={saving || ''}
                onChange={(e) => {
                  const val = e.target.value === '' ? 0 : Number(e.target.value);
                  handlePercentChange(val, setSaving);
                }}
                className='w-full bg-transparent pr-2 text-base text-slate-900 outline-none dark:text-slate-50'
                placeholder='0'
              />
              <span className='text-sm font-medium text-slate-500 dark:text-slate-400'>
                %
              </span>
            </div>
          </label>

          <label className='flex flex-col gap-2'>
            <span className='text-sm font-medium text-slate-800 dark:text-slate-200'>
              투자
            </span>
            <div className='flex min-h-[44px] items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-sm transition focus-within:border-primary-300 focus-within:ring-2 focus-within:ring-primary-200 dark:bg-slate-800 dark:border-slate-700 dark:focus-within:border-primary-400 dark:focus-within:ring-primary-300'>
              <input
                type='number'
                min='0'
                max='100'
                step='1'
                value={investment || ''}
                onChange={(e) => {
                  const val = e.target.value === '' ? 0 : Number(e.target.value);
                  handlePercentChange(val, setInvestment);
                }}
                className='w-full bg-transparent pr-2 text-base text-slate-900 outline-none dark:text-slate-50'
                placeholder='0'
              />
              <span className='text-sm font-medium text-slate-500 dark:text-slate-400'>
                %
              </span>
            </div>
          </label>
        </div>

        <div className='flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50'>
          <span className='text-sm font-medium text-slate-700 dark:text-slate-300'>
            합계
          </span>
          <span
            className={`text-base font-semibold ${
              total === 100
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-danger'
            }`}
          >
            {total}%
          </span>
        </div>

        {error && (
          <div
            className='rounded-lg border border-danger bg-danger/10 px-4 py-2 text-sm text-danger'
            role='alert'
          >
            {error}
          </div>
        )}

          <button
            onClick={handleSave}
            disabled={isSaving || total !== 100}
            className='w-full rounded-xl bg-primary-600 px-4 py-3 text-base font-medium text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary-500 dark:hover:bg-primary-600'
          >
            {isSaving ? '저장 중...' : '저장하기'}
          </button>
        </div>
      </Card>

      {total === 100 && (
        <ExpenseBreakdownChart
          fixed={fixed}
          variable={variable}
          saving={saving}
          investment={investment}
        />
      )}
    </div>
  );
};

export default ExpenseBreakdownInput;
