'use client';

import { useCartStore } from '@/store/useCartStore';

export default function AddToCartButton({ menu }: { menu: { menuId: string, name: string, price: number } }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAdd = () => {
    addToCart(menu);
    alert(`${menu.name}이(가) 장바구니에 담겼습니다!`);
  };

  return (
    <button onClick={handleAdd} className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600">
      담기
    </button>
  );
}