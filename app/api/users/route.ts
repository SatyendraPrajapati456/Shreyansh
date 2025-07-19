// app/api/users/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { uid, email, name } = body;

  try {
    // ✏️ Replace this with your real DB logic (e.g., MongoDB, Prisma, etc.)
    console.log("Saving user to DB:", { uid, email, name });

    // Mock success
    return NextResponse.json({ success: true, message: "User saved!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
