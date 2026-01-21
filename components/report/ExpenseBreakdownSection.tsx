'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ExpenseBreakdownInput } from '.';
import type { MonthSummary } from '@/types';
import { formatMonth } from '@/lib/formatters';
import { getMonthSummary } from '@/lib/storage';

const ExpenseBreakdownSection = () => {
  const searchParams = useSearchParams();
  const [summary, setSummary] = useState<MonthSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const monthParam = useMemo(() => searchParams.get('month'), [searchParams]);

  useEffect(() => {
    if (!monthParam) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoading(false);
      return;
    }

    const normalizedMonth = formatMonth(monthParam);
    const found = getMonthSummary(normalizedMonth);

    if (found) {
      setSummary(found);
    }
    setIsLoading(false);
  }, [monthParam]);

  if (isLoading || !summary) {
    return null;
  }

  return (
    <ExpenseBreakdownInput
      summary={summary}
      onSave={(updatedSummary) => {
        setSummary(updatedSummary);
      }}
    />
  );
};

export default ExpenseBreakdownSection;
