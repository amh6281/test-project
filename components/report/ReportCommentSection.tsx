'use client';

import { useMemo } from 'react';
import { getComment } from '@/lib/calculations';

interface ReportCommentSectionProps {
  savingRate: number;
}

const ReportCommentSection = ({
  savingRate,
}: ReportCommentSectionProps) => {
  const comment = useMemo(() => getComment(savingRate), [savingRate]);

  return (
    <div className='rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/50'>
      <p className='text-center text-base leading-relaxed text-slate-700 dark:text-slate-300'>
        {comment}
      </p>
    </div>
  );
};

export default ReportCommentSection;
