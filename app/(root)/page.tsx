import { PageIntro } from '@/components/common';
import { HomeForm } from '@/components/home';

const Home = () => {
  return (
    <div className='flex flex-col gap-6'>
      <PageIntro
        title='MoneySnap'
        description='숫자 몇 개만 입력하면 이번 달 내 자산·저축 상태를 예쁜 리포트 카드 한 장으로 만들어드려요.'
      />
      <HomeForm />
    </div>
  );
};

export default Home;
