import { PageIntro } from '@/components/common';
import { HistoryList, AssetTrendChart } from '@/components/history';

const HistoryPage = () => {
  return (
    <div className='flex flex-col gap-6'>
      <PageIntro
        title='자산 히스토리'
        description='지난 기록을 확인하고 자산 변화를 추적해보세요.'
      />
      <AssetTrendChart />
      <HistoryList />
    </div>
  );
};

export default HistoryPage;
