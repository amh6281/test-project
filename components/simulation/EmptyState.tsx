import { Card } from '@/components/common';

const EmptyState = () => {
  return (
    <Card>
      <div className='flex min-h-[200px] flex-col items-center justify-center py-12 text-center'>
        <p className='text-slate-500'>시뮬레이션을 위해 먼저 리포트를 생성해주세요.</p>
        <p className='mt-2 text-sm text-slate-400'>
          메인 페이지에서 첫 리포트를 만들어보세요.
        </p>
      </div>
    </Card>
  );
};

export default EmptyState;
