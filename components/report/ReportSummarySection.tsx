import { formatCurrency, formatPercent } from '@/lib/formatters';
import { calculateDelta } from '@/lib/calculations';
import type { MonthSummary } from '@/types';

interface ReportSummarySectionProps {
  summary: MonthSummary;
  previousSummary: MonthSummary | null;
}

const ReportSummarySection = ({
  summary,
  previousSummary,
}: ReportSummarySectionProps) => {
  const { netAssets, savingAmount, savingRate } = summary;

  // 지난달 대비 순자산 증감 계산
  const { delta: netAssetsDelta, deltaRate: netAssetsDeltaRate } =
    calculateDelta(netAssets, previousSummary?.netAssets);

  // 델타 뱃지 스타일
  const isPositive = netAssetsDelta > 0;
  const isNegative = netAssetsDelta < 0;
  const deltaBadgeBase =
    'inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium';
  const deltaBadgeTone = isPositive
    ? 'bg-green-50 text-green-700'
    : isNegative
      ? 'bg-red-50 text-red-600'
      : 'bg-slate-100 text-slate-700';
  const deltaIcon = isPositive ? '▲' : isNegative ? '▼' : '●';

  // 핵심 지표 데이터
  const summaryItems = [
    { label: '순자산', value: formatCurrency(netAssets) },
    { label: '저축액', value: formatCurrency(savingAmount) },
    { label: '저축률', value: formatPercent(savingRate, 0) },
  ];

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold text-slate-900'>핵심 지표</h2>
        {previousSummary && (
          <span className={`${deltaBadgeBase} ${deltaBadgeTone}`}>
            <span className='text-xs'>{deltaIcon}</span>
            <span>{formatCurrency(netAssetsDelta)}</span>
            <span className='text-xs text-slate-500'>
              {netAssetsDeltaRate ? formatPercent(netAssetsDeltaRate, 1) : '0%'}
            </span>
          </span>
        )}
      </div>
      <div className='grid gap-4 sm:grid-cols-3'>
        {summaryItems.map((item) => (
          <div
            key={item.label}
            className='rounded-2xl border border-slate-200 bg-white px-4 py-5 text-center shadow-sm'
          >
            <p className='text-sm text-slate-500'>{item.label}</p>
            <p className='mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl'>
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportSummarySection;
