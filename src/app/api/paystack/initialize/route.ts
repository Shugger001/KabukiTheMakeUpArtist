import { NextResponse } from "next/server";
import { MARKET } from "@/lib/constants/market";
import { paystackInitializeSchema } from "@/lib/validation/checkout";

/**
 * Initializes a Paystack transaction (server-side).
 * Amount is accepted in major units (e.g. GHS cedis) and converted to pesewas (×100).
 */
export async function POST(request: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://127.0.0.1:3100";

  if (!secret) {
    return NextResponse.json(
      { error: "PAYSTACK_SECRET_KEY is not configured" },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = paystackInitializeSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { email, amount, metadata } = parsed.data;
  const currency =
    process.env.NEXT_PUBLIC_PAYSTACK_CURRENCY?.trim().toUpperCase() || MARKET.currencyCode;
  const amountMinor = Math.round(amount * 100);

  const reference = `kabuki_${crypto.randomUUID().replace(/-/g, "")}`;

  const metaObject =
    metadata && typeof metadata === "object" && !Array.isArray(metadata)
      ? (metadata as Record<string, unknown>)
      : {};

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: amountMinor,
      currency,
      reference,
      callback_url: `${appUrl}/shop/cart?reference=${encodeURIComponent(reference)}`,
      metadata: { ...metaObject, reference },
      channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
    }),
  });

  const data = (await res.json()) as {
    status?: boolean;
    message?: string;
    data?: { authorization_url?: string; reference?: string };
  };

  if (!res.ok || !data.status) {
    return NextResponse.json(
      { error: data.message ?? "Paystack initialization failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({
    authorization_url: data.data?.authorization_url,
    reference: data.data?.reference ?? reference,
  });
}
