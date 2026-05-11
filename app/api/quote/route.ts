import type { ResultSetHeader } from "mysql2";
import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

const PROPERTY_TYPES = new Set([
  "home",
  "apartment",
  "office",
  "rental",
  "commercial",
  "other",
]);

export async function POST(request: Request) {
  const pool = getPool();
  if (!pool) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Database is currently unavailable. Please email info@glowinghomecleaners.com.",
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

  const fullName =
    typeof body.full_name === "string" ? body.full_name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const rawProperty =
    typeof body.property_type === "string" ? body.property_type : "home";
  const propertyType = PROPERTY_TYPES.has(rawProperty)
    ? rawProperty
    : "home";
  const serviceType =
    typeof body.service_type === "string" ? body.service_type.trim() : "";
  const squareFeet =
    typeof body.square_feet === "number"
      ? body.square_feet
      : Number(body.square_feet);
  const preferredDate =
    typeof body.preferred_date === "string"
      ? body.preferred_date.trim()
      : "";
  const message =
    typeof body.message === "string" ? body.message.trim() : "";

  if (
    fullName === "" ||
    email === "" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    serviceType === ""
  ) {
    return NextResponse.json(
      { ok: false, message: "Please fill required fields correctly." },
      { status: 400 },
    );
  }

  const sq =
    Number.isFinite(squareFeet) && squareFeet > 0
      ? Math.floor(squareFeet)
      : null;

  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO service_requests
        (full_name, email, phone, property_type, service_type, square_feet, preferred_date, message)
       VALUES (?,?,?,?,?,?,?,?)`,
      [
        fullName,
        email,
        phone || null,
        propertyType,
        serviceType,
        sq,
        preferredDate !== "" ? preferredDate : null,
        message !== "" ? message : null,
      ],
    );

    if (!result.affectedRows) {
      throw new Error("Insert returned no rows.");
    }

    return NextResponse.json({
      ok: true,
      message:
        "Quote request submitted successfully. We will contact you shortly.",
    });
  } catch (error) {
    console.error("[quote]", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Could not save your request right now. Please try again shortly.",
      },
      { status: 500 },
    );
  }
}
