'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', { redirect: false, email, password });
    if (result?.ok) {
      router.push('/restaurants');
      router.refresh();
    } else {
      alert('로그인 정보가 일치하지 않습니다.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">로그인</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">이메일</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block">비밀번호</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2 rounded" required />
        </div>
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">로그인</button>
      </form>
    </div>
  );
}