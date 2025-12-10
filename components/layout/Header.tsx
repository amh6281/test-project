const Header = () => {
  return (
    <header className='border-b border-slate-200 bg-white/80 backdrop-blur'>
      <div className='mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8'>
        <div>
          <p className='text-primary-600 text-xl font-semibold'>MoneySnap</p>
          <p className='text-sm text-slate-500'>
            한 장 스냅샷으로 보는 내 돈 상태
          </p>
        </div>
        <div className='text-primary-600 hidden text-sm font-medium sm:block'>
          이번 달 리포트 카드 한 장
        </div>
      </div>
    </header>
  );
};

export default Header;
