'use client';

import { useMemo } from 'react';
import { ArcElement, Chart, Legend, Tooltip, type TooltipItem } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

interface ExpenseBreakdownChartProps {
  fixed: number;
  variable: number;
  saving: number;
  investment: number;
}

const ExpenseBreakdownChart = ({
  fixed,
  variable,
  saving,
  investment,
}: ExpenseBreakdownChartProps) => {
  const total = useMemo(
    () => fixed + variable + saving + investment,
    [fixed, variable, saving, investment],
  );

  const chartData = useMemo(
    () => ({
      labels: ['고정비', '변동비', '저축', '투자'],
      datasets: [
        {
          label: '소비 구조',
          data: [fixed, variable, saving, investment],
          backgroundColor: [
            '#3b82f6', // Blue - 고정비
            '#f97316', // Orange - 변동비
            '#10b981', // Green - 저축
            '#8b5cf6', // Purple - 투자
          ],
          borderWidth: 0,
        },
      ],
    }),
    [fixed, variable, saving, investment],
  );

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom' as const,
          labels: {
            boxWidth: 14,
            boxHeight: 14,
            padding: 12,
            font: {
              size: 13,
            },
          },
        },
        tooltip: {
          callbacks: {
            label: (context: TooltipItem<'doughnut'>) => {
              const value = Number(context.raw ?? 0);
              return `${context.label}: ${value}%`;
            },
          },
        },
      },
      cutout: '70%',
    }),
    [],
  );

  if (total === 0) {
    return (
      <div className='flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400'>
        소비 구조 비율을 입력하면 차트가 표시됩니다.
      </div>
    );
  }

  return (
    <div className='relative h-72 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800'>
      <p className='mb-4 text-base font-semibold text-slate-900 dark:text-slate-50'>
        소비 구조 비율
      </p>
      <div className='h-[220px]'>
        <Doughnut data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ExpenseBreakdownChart;
