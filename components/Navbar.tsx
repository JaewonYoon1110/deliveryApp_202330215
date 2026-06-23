'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-slate-800 text-white p-4 flex justify-between items-center shadow-md">
<Link href="/restaurants" className="font-bold text-xl">🛵 배달학개론</Link>
      <div className="space-x-4 text-sm flex items-center">
        <Link href="/restaurants" className="hover:underline">식당보기</Link>
        <Link href="/cart" className="hover:underline">장바구니</Link>
        <Link href="/orders" className="hover:underline">주문내역</Link>
        <span className="text-slate-400">|</span>
        {session ? (
          <>
            <span className="text-yellow-300 font-semibold">{session.user?.name || session.user?.email}님</span>
            <button onClick={() => signOut({ callbackUrl: '/login' })} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">로그아웃</button>
          </>
        ) : (
          <>
            <Link href="/login" className="bg-green-600 px-3 py-1 rounded hover:bg-green-700">로그인</Link>
            <Link href="/register" className="bg-gray-600 px-3 py-1 rounded hover:bg-gray-700">회원가입</Link>
          </>
        )}
      </div>
    </nav>
  );
}