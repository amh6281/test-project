'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card } from '@/components/common';
import { getAllSummaries } from '@/lib/storage';
import { formatCurrency, formatMonthKorean } from '@/lib/formatters';
import type { MonthSummary } from '@/types';

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const AssetTrendChart = () => {
  const [summaries, setSummaries] = useState<MonthSummary[]>([]);

  useEffect(() => {
    const allSummaries = getAllSummaries();
    // 최근 6개월만 표시
    const recentSummaries = allSummaries.slice(0, 6).reverse(); // 오래된 순으로 정렬 (차트는 시간순)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSummaries(recentSummaries);
  }, []);

  if (summaries.length === 0) {
    return null;
  }

  // 차트 데이터 준비
  const labels = summaries.map((summary) => {
    const [, month] = summary.month.split('-');
    return `${parseInt(month, 10)}월`;
  });

  const data = summaries.map((summary) => summary.netAssets);

  const chartData = {
    labels,
    datasets: [
      {
        label: '순자산',
        data,
        borderColor: 'rgb(16, 185, 129)', // primary-500
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: 'rgb(16, 185, 129)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          title: (context: Array<{ dataIndex: number }>) => {
            const index = context[0]?.dataIndex ?? 0;
            return formatMonthKorean(summaries[index]?.month ?? '');
          },
          label: (context: { parsed: { y: number | null } }) => {
            const value = context.parsed.y ?? 0;
            return `순자산: ${formatCurrency(value)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: '#64748b',
        },
      },
      y: {
        grid: {
          color: 'rgba(226, 232, 240, 0.5)',
        },
        ticks: {
          font: {
            size: 12,
          },
          color: '#64748b',
          callback: (value: string | number) => {
            const numValue = typeof value === 'number' ? value : Number(value);
            if (numValue >= 10000) {
              return `${(numValue / 10000).toFixed(0)}만원`;
            }
            return `${numValue.toLocaleString()}원`;
          },
        },
      },
    },
  };

  return (
    <Card>
      <div className='mb-4'>
        <h3 className='text-lg font-semibold text-slate-900'>
          최근 6개월 자산 변화
        </h3>
        <p className='mt-1 text-sm text-slate-500'>
          시간에 따른 순자산 추이를 확인해보세요.
        </p>
      </div>
      <div className='h-[300px] w-full'>
        <Line data={chartData} options={chartOptions} />
      </div>
    </Card>
  );
};

export default AssetTrendChart;
