import type { Metadata } from 'next';
import './globals.css';

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
      <body className='antialiased'>{children}</body>
    </html>
  );
}
