'use client';

import { useState } from 'react';
import html2canvas from 'html2canvas';

interface DownloadButtonProps {
  targetId: string;
  fileName?: string;
  className?: string;
}

const DownloadButton = ({
  targetId,
  fileName = 'moneysnap-report.png',
  className,
}: DownloadButtonProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleDownload = async () => {
    const node = document.getElementById(targetId);
    if (!node) return;

    try {
      setIsSaving(true);
      const canvas = await html2canvas(node, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#f8fafc',
      });
      const dataUrl = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = fileName;
      link.click();
    } catch (err) {
      console.error('이미지 저장 중 오류', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <button
      type='button'
      onClick={handleDownload}
      disabled={isSaving}
      className={`bg-primary-500 hover:bg-primary-600 focus-visible:ring-primary-300 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-70 ${className ?? ''}`}
    >
      {isSaving ? '이미지 저장 중...' : '이미지로 저장'}
    </button>
  );
};

export default DownloadButton;
