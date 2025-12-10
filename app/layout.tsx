import type { Metadata } from 'next';
import './globals.css';
import { Footer, Header } from '@/components/layout';

export const metadata: Metadata = {
  title: 'MoneySnap - 한 장 스냅샷으로 보는 내 돈 상태',
  description:
    '매달 말, 숫자 몇 개만 입력하면 이번 달 내 자산·저축 상태를 예쁜 리포트 카드로 만들어주는 웹 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className='antialiased'>
        <div className='min-h-screen bg-slate-50 text-slate-900'>
          <Header />
          <main className='mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8'>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
