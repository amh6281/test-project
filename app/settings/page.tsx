import { PageIntro } from '@/components/common';
import GoalSettingsForm from '@/components/settings/GoalSettingsForm';

const SettingsPage = () => {
  return (
    <div className='flex flex-col gap-6'>
      <PageIntro
        title='설정'
        description='목표 자산을 설정하여 진행 상황을 추적해보세요.'
      />
      <GoalSettingsForm />
    </div>
  );
};

export default SettingsPage;
