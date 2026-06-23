import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  try {
    const { items, totalPrice } = await req.json();
    const userId = parseInt((session.user as any).id);

    const orderResult = await sql`
      INSERT INTO orders (user_id, total_price) VALUES (${userId}, ${totalPrice}) RETURNING id
    `;
    const orderId = orderResult[0].id;

    for (const item of items) {
      await sql`
        INSERT INTO order_items (order_id, menu_name, price, quantity)
        VALUES (${orderId}, ${item.name}, ${item.price}, ${item.quantity})
      `;
    }

    return NextResponse.json({ message: "주문 성공", orderId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "주문 실패" }, { status: 500 });
  }
}