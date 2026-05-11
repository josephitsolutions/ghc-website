import type { RowDataPacket } from "mysql2";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

type ClientUserRow = RowDataPacket & {
  id: number;
  email: string;
  password_hash: string;
};

export async function POST(request: Request) {
  const pool = getPool();
  if (!pool) {
    return NextResponse.json(
      {
        ok: false,
        message: "Database is unavailable. Please try later.",
      },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, {
      status: 400,
    });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (email === "" || password === "") {
    return NextResponse.json(
      { ok: false, message: "Email and password are required." },
      { status: 400 },
    );
  }

  try {
    const [rows] = await pool.query<ClientUserRow[]>(
      "SELECT id, email, password_hash FROM client_users WHERE email = ? LIMIT 1",
      [email],
    );

    const user = rows[0];
    const valid =
      user && bcrypt.compareSync(password, user.password_hash ?? "");

    if (!valid) {
      return NextResponse.json(
        { ok: false, message: "Invalid login credentials." },
        { status: 401 },
      );
    }

    return NextResponse.json({
      ok: true,
      message:
        "Login successful. Secure portal experiences can be layered onto this foundation.",
    });
  } catch (error) {
    console.error("[client-login]", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "Login table not found yet. Add the SQL provided by your developer and retry.",
      },
      { status: 500 },
    );
  }
}
