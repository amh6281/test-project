import { HomeForm, HomeHero } from '@/components/home';

const Home = () => {
  return (
    <div className='flex flex-col gap-6'>
      <HomeHero />
      <HomeForm />
    </div>
  );
};

export default Home;
