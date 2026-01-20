'use client';

import { useState, useMemo, useEffect } from 'react';
import { getLastMonthSummary } from '@/lib/storage';
import type { MonthSummary } from '@/types';
import { CurrentStatus, SimulationSettings, SimulationResults, EmptyState } from './index';

const SavingSimulation = () => {
  const [returnRate, setReturnRate] = useState<number>(5); // 연 수익률 (%)
  const [salaryGrowthRate, setSalaryGrowthRate] = useState<number>(3); // 연봉 상승률 (%)
  const [latestSummary, setLatestSummary] = useState<MonthSummary | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const summary = getLastMonthSummary();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLatestSummary(summary);
    setMounted(true);
  }, []);

  const simulationResults = useMemo(() => {
    if (!latestSummary) return null;

    const { netAssets, savingAmount } = latestSummary;
    const monthlyReturnRate = returnRate / 100 / 12; // 월 수익률
    const monthlySalaryGrowthRate = salaryGrowthRate / 100 / 12; // 월 연봉 상승률

    // 1년 후 계산
    let assets1Year = netAssets;
    let totalSaved1Year = 0;
    for (let month = 0; month < 12; month++) {
      const currentSaving = savingAmount * (1 + monthlySalaryGrowthRate * month);
      totalSaved1Year += currentSaving;
      assets1Year = assets1Year * (1 + monthlyReturnRate) + currentSaving;
    }

    // 3년 후 계산
    let assets3Years = netAssets;
    let totalSaved3Years = 0;
    for (let month = 0; month < 36; month++) {
      const currentSaving = savingAmount * (1 + monthlySalaryGrowthRate * month);
      totalSaved3Years += currentSaving;
      assets3Years = assets3Years * (1 + monthlyReturnRate) + currentSaving;
    }

    return {
      current: netAssets,
      after1Year: assets1Year,
      after3Years: assets3Years,
      totalSaved1Year,
      totalSaved3Years,
    };
  }, [latestSummary, returnRate, salaryGrowthRate]);

  if (!mounted) {
    return (
      <div className='space-y-6'>
        <div className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6'>
          <div className='flex min-h-[200px] items-center justify-center'>
            <p className='text-slate-500'>로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!latestSummary) {
    return <EmptyState />;
  }

  return (
    <div className='space-y-6'>
      <CurrentStatus summary={latestSummary} />
      <SimulationSettings
        returnRate={returnRate}
        salaryGrowthRate={salaryGrowthRate}
        onReturnRateChange={setReturnRate}
        onSalaryGrowthRateChange={setSalaryGrowthRate}
      />
      <SimulationResults
        current={simulationResults!.current}
        after1Year={simulationResults!.after1Year}
        after3Years={simulationResults!.after3Years}
      />
    </div>
  );
};

export default SavingSimulation;
