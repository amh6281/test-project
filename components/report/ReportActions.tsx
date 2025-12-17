'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import html2canvas from 'html2canvas';

const ReportActions = () => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleDownload = useCallback(async () => {
    const element = document.getElementById('report-card');
    if (!element) return;

    setIsSaving(true);
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
      });

      const link = document.createElement('a');
      link.download = `moneysnap-report-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('이미지 저장 실패:', error);
    } finally {
      setIsSaving(false);
    }
  }, []);

  return (
    <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
      <button
        type='button'
        onClick={() => router.push('/')}
        className='border-primary-500 text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-300 min-h-[44px] w-full rounded-full border-2 bg-white px-5 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 sm:w-auto'
      >
        다시 입력하기
      </button>
      <button
        type='button'
        onClick={handleDownload}
        disabled={isSaving}
        className='bg-primary-500 hover:bg-primary-600 focus-visible:ring-primary-300 min-h-[44px] w-full rounded-full px-5 py-3 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto'
      >
        {isSaving ? '이미지 저장 중...' : '이미지로 저장'}
      </button>
    </div>
  );
};

export default ReportActions;
