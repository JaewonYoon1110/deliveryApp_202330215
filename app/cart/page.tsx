'use client';

import { useCartStore } from '@/store/useCartStore';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function CartPage() {
  const { items, clearCart } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();

  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleOrder = async () => {
    if (!session) {
      alert('로그인이 필요한 서비스입니다.');
      router.push('/login');
      return;
    }
    if (items.length === 0) {
      alert('장바구니가 비어 있습니다.');
      return;
    }

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, totalPrice }),
    });

    if (res.ok) {
      alert('주문이 완료되었습니다!');
      clearCart();
      router.push('/orders');
    } else {
      alert('주문 실패');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">내 장바구니 🛒</h2>
      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-6">장바구니가 비어있습니다.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item, idx) => (
            <div key={idx} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-xs text-gray-500">{item.price}원 × {item.quantity}개</p>
              </div>
              <p className="font-bold">{item.price * item.quantity}원</p>
            </div>
          ))}
          <div className="text-right text-lg font-bold mt-4">
            총 결제 금액: <span className="text-red-500">{totalPrice}원</span>
          </div>
          <button onClick={handleOrder} className="w-full bg-orange-500 text-white py-3 rounded font-bold hover:bg-orange-600 transition-colors">
            결제 및 주문하기
          </button>
        </div>
      )}
    </div>
  );
}