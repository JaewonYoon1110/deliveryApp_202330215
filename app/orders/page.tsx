import { sql } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

async function getMyOrders(userId: number) {
  const orders = await sql`SELECT * FROM orders WHERE user_id = ${userId} ORDER BY created_at DESC`;
  const items = await sql`
    SELECT oi.* FROM order_items oi JOIN orders o ON oi.order_id = o.id WHERE o.user_id = ${userId}
  `;

  return orders.map((order: any) => ({
    ...order,
    items: items.filter((item: any) => item.order_id === order.id)
  }));
}

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect('/login');
  }

  const userId = parseInt((session.user as any).id);
  const orders = await getMyOrders(userId);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">나의 주문 내역 📜</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">아직 주문 내역이 존재하지 않습니다.</p>
      ) : (
        orders.map((order: any) => (
          <div key={order.id} className="border p-4 rounded bg-white shadow-sm space-y-2">
            <div className="flex justify-between border-b pb-2 text-sm text-gray-600">
              <span>📅 주문일시: {new Date(order.created_at).toLocaleString('ko-KR')}</span>
              <span className="text-xs text-gray-400">주문번호: {order.id}</span>
            </div>
            <div className="space-y-1 py-2">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.menu_name} (×{item.quantity})</span>
                  <span>{item.price * item.quantity}원</span>
                </div>
              ))}
            </div>
            <div className="text-right font-bold text-base border-t pt-2 text-orange-600">
              총 결제금액: {order.total_price}원
            </div>
          </div>
        ))
      )}
    </div>
  );
}