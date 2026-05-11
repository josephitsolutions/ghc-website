import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const service =
    typeof body.service === "string" ? body.service.trim() : undefined;

  if (name === "" || email === "" || message === "") {
    return NextResponse.json(
      { error: "Please complete all required fields." },
      { status: 400 },
    );
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (process.env.NODE_ENV !== "production") {
    // Visible server-side only — replace with transactional email in production.
    // Legacy PHP used `mail()` to info@glowinghomecleaners.com.
    console.info("[contact]", { name, email, phone, message, service });
  }

  return NextResponse.json({
    ok: true,
    message: "Thank you. Your message has been received.",
  });
}
