import { formatCurrency, formatPercent } from '@/lib/formatters';

interface DeltaBadgeProps {
  value: number;
  rate: number;
  className?: string;
}

const DeltaBadge = ({ value, rate, className }: DeltaBadgeProps) => {
  const isPositive = value > 0;
  const isNegative = value < 0;

  const base =
    'inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium';
  const tone = isPositive
    ? 'bg-green-50 text-green-700'
    : isNegative
      ? 'bg-red-50 text-red-600'
      : 'bg-slate-100 text-slate-700';

  const icon = isPositive ? '▲' : isNegative ? '▼' : '●';

  return (
    <span className={`${base} ${tone} ${className ?? ''}`}>
      <span className='text-xs'>{icon}</span>
      <span>{formatCurrency(value)}</span>
      <span className='text-xs text-slate-500'>
        {rate ? formatPercent(rate, 1) : '0%'}
      </span>
    </span>
  );
};

export default DeltaBadge;
