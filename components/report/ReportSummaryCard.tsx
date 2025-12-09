import { formatCurrency, formatPercent } from '@/lib/formatters';

interface ReportSummaryCardProps {
  netAssets: number;
  savingAmount: number;
  savingRate: number;
}

const ReportSummaryCard = ({
  netAssets,
  savingAmount,
  savingRate,
}: ReportSummaryCardProps) => {
  const items = [
    { label: '순자산', value: formatCurrency(netAssets) },
    { label: '저축액', value: formatCurrency(savingAmount) },
    { label: '저축률', value: formatPercent(savingRate, 0) },
  ];

  return (
    <div className='grid gap-4 sm:grid-cols-3'>
      {items.map((item) => (
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
  );
};

export default ReportSummaryCard;
