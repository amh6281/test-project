'use client';

import { useRouter } from 'next/navigation';

const ReportActions = () => {
  const router = useRouter();

  return (
    <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
      <button
        type='button'
        onClick={() => router.push('/')}
        className='border-primary-500 text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-300 w-full rounded-full border-2 bg-white px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 sm:w-auto'
      >
        다시 입력하기
      </button>
      <button
        type='button'
        // onClick={handleDownload}
        // disabled={isSaving}
        className='bg-primary-500 hover:bg-primary-600 focus-visible:ring-primary-300 w-full rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto'
      >
        {/* {isSaving ? '이미지 저장 중...' : '이미지로 저장'} */}
        이미지로 저장
      </button>
    </div>
  );
};

export default ReportActions;
