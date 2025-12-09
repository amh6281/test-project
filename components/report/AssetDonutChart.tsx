'use client';

import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
  type TooltipItem,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface AssetDonutChartProps {
  cash: number;
  investment: number;
  debt: number;
}

const AssetDonutChart = ({ cash, investment, debt }: AssetDonutChartProps) => {
  const total = Math.max(0, cash) + Math.max(0, investment) + Math.max(0, debt);

  if (!total) {
    return (
      <div className='flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white text-sm text-slate-500'>
        데이터가 없습니다. 금액을 입력하면 자산 구성이 표시돼요.
      </div>
    );
  }

  const data = {
    labels: ['현금', '투자', '부채'],
    datasets: [
      {
        label: '자산 구성',
        data: [cash, investment, debt],
        backgroundColor: ['#10b981', '#3b82f6', '#ef4444'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { boxWidth: 14, boxHeight: 14, padding: 12 },
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'doughnut'>) => {
            const value = Number(context.raw ?? 0);
            const percent = total > 0 ? (value / total) * 100 : 0;
            return `${context.label}: ${value.toLocaleString('ko-KR')}원 (${percent.toFixed(1)}%)`;
          },
        },
      },
    },
    cutout: '70%',
  };

  return (
    <div className='relative h-72 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
      <p className='mb-4 text-base font-semibold text-slate-900'>
        자산 구성 비율
      </p>
      <div className='h-[220px]'>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default AssetDonutChart;
