import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

const querySchema = z.object({
  reference: z.string().min(3),
});

/**
 * Verifies a Paystack transaction and optionally marks related orders as paid.
 * Call from a Route Handler or Server Action after redirect (never trust client-only checks).
 */
export async function GET(request: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "PAYSTACK_SECRET_KEY is not configured" },
      { status: 503 },
    );
  }

  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({ reference: searchParams.get("reference") ?? "" });
  if (!parsed.success) {
    return NextResponse.json({ error: "Missing or invalid reference" }, { status: 400 });
  }

  const { reference } = parsed.data;

  const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secret}` },
  });

  const payload = (await res.json()) as {
    status?: boolean;
    message?: string;
    data?: { status?: string; amount?: number; currency?: string; metadata?: Record<string, unknown> };
  };

  if (!res.ok || !payload.status) {
    return NextResponse.json(
      { ok: false, error: payload.message ?? "Verification failed" },
      { status: 400 },
    );
  }

  const tx = payload.data;
  const success = tx?.status === "success";

  if (success && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const admin = createAdminClient();
      await admin
        .from("orders")
        .update({
          status: "paid",
          paystack_reference: reference,
          updated_at: new Date().toISOString(),
        })
        .eq("paystack_reference", reference);
    } catch {
      /* Order row may not exist yet — create via checkout pipeline with service role */
    }
  }

  return NextResponse.json({
    ok: success,
    reference,
    amount: tx?.amount,
    currency: tx?.currency,
    metadata: tx?.metadata,
  });
}
