const Footer = () => {
  return (
    <footer className='border-t border-slate-200 bg-white/70 backdrop-blur dark:border-slate-700 dark:bg-slate-900/70'>
      <div className='mx-auto flex max-w-4xl items-center justify-between px-4 py-4 text-sm text-slate-500 dark:text-slate-400 sm:px-6 lg:px-8'>
        <span>MoneySnap · 개인 금융 리포트 카드</span>
        <span className='hidden sm:inline'>
          브라우저에만 저장 · 로그인 없이 사용
        </span>
      </div>
    </footer>
  );
};

export default Footer;
