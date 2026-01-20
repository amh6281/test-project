import { PageIntro } from '@/components/common';
import { SavingSimulation } from '@/components/simulation';

const SimulationPage = () => {
  return (
    <div className='flex flex-col gap-6'>
      <PageIntro
        title='저축률 시뮬레이션'
        description='현재 저축률을 기준으로 미래 자산을 예측해보세요.'
      />
      <SavingSimulation />
    </div>
  );
};

export default SimulationPage;
