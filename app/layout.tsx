import './globals.css';
import Providers from '@/components/Providers';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: '배달학개론 - 기말 프로젝트',
  description: '컴퓨터과학개론 기말 과제물',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-slate-50 min-h-screen">
        <Providers>
          <Navbar />
          <main className="container mx-auto p-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}