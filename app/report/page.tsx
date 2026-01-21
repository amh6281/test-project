import { ReportActions, ReportCard, ExpenseBreakdownSection } from '@/components/report';
import { PageIntro } from '@/components/common';
import { formatMonthKorean } from '@/lib/formatters';

interface ReportPageProps {
  searchParams: Promise<{ month?: string }>;
}

const ReportPage = async ({ searchParams }: ReportPageProps) => {
  const { month } = await searchParams;

  if (!month) {
    return (
      <div className='flex flex-col gap-6'>
        <PageIntro
          title='리포트를 찾을 수 없습니다'
          description='월 정보가 없습니다. 메인 페이지로 돌아가 리포트를 생성해주세요.'
        />
      </div>
    );
  }

  const formattedMonth = formatMonthKorean(month);

  return (
    <div className='flex flex-col gap-6'>
      {/* 헤더 */}
      <PageIntro
        title={`${formattedMonth} 자산 리포트`}
        description='이 달의 내 돈 흐름을 스냅샷으로 확인해보세요.'
      />

      {/* 리포트 카드 영역 (캡처 대상) */}
      <ReportCard />

      {/* 소비 구조 비율 입력 */}
      <ExpenseBreakdownSection />

      {/* 액션 버튼 */}
      <ReportActions />
    </div>
  );
};

export default ReportPage;
