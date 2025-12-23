'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/common';
import {
  calculateNetAssets,
  calculateSavingAmount,
  calculateSavingRate,
} from '@/lib/calculations';
import { formatMonth } from '@/lib/formatters';
import { loadSummaries, saveMonthSummary } from '@/lib/storage';
import { validateFields } from '@/lib/validation';
import type { FieldErrors, MonthSummary, SummaryPair } from '@/types';
import { HomeAmountInputs, HomeMonthInput, HomeLastSummaryHint } from './index';

const HomeForm = () => {
  const router = useRouter();

  const [month, setMonth] = useState<string>('');
  const [cash, setCash] = useState<number>(0);
  const [investment, setInvestment] = useState<number>(0);
  const [debt, setDebt] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [summaries, setSummaries] = useState<SummaryPair>({
    latestSummary: null,
    previousSummary: null,
  });

  useEffect(() => {
    const currentMonth = formatMonth(new Date());
    const loadedSummaries = loadSummaries();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMonth(currentMonth);
    setSummaries(loadedSummaries);
  }, []);

  const { latestSummary, previousSummary } = summaries;

  const validate = (): FieldErrors => {
    return validateFields(month, income, expense, cash, investment);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const netAssets = calculateNetAssets(cash, investment, debt);
    const savingAmount = calculateSavingAmount(income, expense);
    const savingRate = calculateSavingRate(income, expense);

    const summary: MonthSummary = {
      month,
      cash,
      investment,
      debt,
      income,
      expense,
      netAssets,
      savingAmount,
      savingRate,
    };

    saveMonthSummary(summary);
    router.push(`/report?month=${month}`);
  };

  const assetError = errors.assets;

  return (
    <Card className='space-y-6'>
      <form className='space-y-6' onSubmit={handleSubmit}>
        <HomeMonthInput
          month={month}
          onChange={setMonth}
          error={errors.month}
        />

        <HomeAmountInputs
          cash={cash}
          investment={investment}
          debt={debt}
          income={income}
          expense={expense}
          onCashChange={setCash}
          onInvestmentChange={setInvestment}
          onDebtChange={setDebt}
          onIncomeChange={setIncome}
          onExpenseChange={setExpense}
          assetError={assetError}
          incomeError={errors.income}
          expenseError={errors.expense}
        />

        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <HomeLastSummaryHint
            latestSummary={latestSummary}
            previousSummary={previousSummary}
          />
          <button
            type='submit'
            className='bg-primary-500 hover:bg-primary-600 focus:ring-primary-200 w-full rounded-full px-5 py-3 text-center text-base font-semibold text-white shadow-sm transition focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto'
            aria-label='이번 달 리포트 만들기'
          >
            이번 달 리포트 만들기
          </button>
        </div>
      </form>
    </Card>
  );
};

export default HomeForm;
