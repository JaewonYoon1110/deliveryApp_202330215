'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    if (res.ok) {
      alert('회원가입 완료! 로그인해 주세요.');
      router.push('/login');
    } else {
      alert('회원가입 실패');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">회원가입</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">이름</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block">이메일</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block">비밀번호</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2 rounded" required />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">가입하기</button>
      </form>
    </div>
  );
}