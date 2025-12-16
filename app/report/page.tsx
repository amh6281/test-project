import { ReportActions, ReportCard } from '@/components/report';
import { PageIntro } from '@/components/common';

interface ReportPageProps {
  searchParams: Promise<{ month: string }>;
}

const ReportPage = async ({ searchParams }: ReportPageProps) => {
  const { month } = await searchParams;

  return (
    <div className='flex flex-col gap-6'>
      {/* 헤더 */}
      <PageIntro
        title={`${month} 자산 리포트`}
        description='이 달의 내 돈 흐름을 스냅샷으로 확인해보세요.'
      />

      {/* 리포트 카드 영역 (캡처 대상) */}
      <ReportCard />

      {/* 액션 버튼 */}
      <ReportActions />
    </div>
  );
};

export default ReportPage;
