interface PageIntroProps {
  title: string;
  description: string;
}

const PageIntro = ({ title, description }: PageIntroProps) => {
  return (
    <section className='flex flex-col gap-2'>
      <h1 className='text-3xl font-semibold text-slate-900'>{title}</h1>
      <p className='text-slate-600'>{description}</p>
    </section>
  );
};

export default PageIntro;
