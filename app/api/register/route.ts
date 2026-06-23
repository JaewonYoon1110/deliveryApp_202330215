import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();
    
    const exists = await sql`SELECT id FROM users WHERE email = ${email} LIMIT 1`;
    if (exists.length > 0) {
      return NextResponse.json({ error: "이미 존재하는 이메일입니다." }, { status: 400 });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    await sql`INSERT INTO users (email, password, name) VALUES (${email}, ${hashedPassword}, ${name})`;
    
    return NextResponse.json({ message: "회원가입 성공" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}