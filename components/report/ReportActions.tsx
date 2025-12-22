'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import html2canvas from 'html2canvas';

const ReportActions = () => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = useCallback(async () => {
    const element = document.getElementById('report-card');
    if (!element) {
      setError('리포트 카드를 찾을 수 없습니다.');
      return;
    }

    setIsSaving(true);
    setError(null);
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
    } catch (err) {
      const message =
        err instanceof Error ? err.message : '이미지 저장에 실패했습니다.';
      setError(message);
      console.error('이미지 저장 실패:', err);
    } finally {
      setIsSaving(false);
    }
  }, []);

  return (
    <div className='flex flex-col gap-3'>
      {error && (
        <div
          className='rounded-lg border border-danger bg-danger/10 p-3 text-sm text-danger'
          role='alert'
        >
          {error}
        </div>
      )}
      <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
        <button
          type='button'
          onClick={() => router.push('/')}
          className='border-primary-500 text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-300 min-h-[44px] w-full rounded-full border-2 bg-white px-5 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 sm:w-auto'
          aria-label='다시 입력하기'
        >
          다시 입력하기
        </button>
        <button
          type='button'
          onClick={handleDownload}
          disabled={isSaving}
          className='bg-primary-500 hover:bg-primary-600 focus-visible:ring-primary-300 min-h-[44px] w-full rounded-full px-5 py-3 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto'
          aria-label={isSaving ? '이미지 저장 중' : '리포트를 이미지로 저장'}
          aria-disabled={isSaving}
        >
          {isSaving ? '이미지 저장 중...' : '이미지로 저장'}
        </button>
      </div>
    </div>
  );
};

export default ReportActions;
