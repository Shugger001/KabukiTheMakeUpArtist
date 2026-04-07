"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { bookingFormSchema, type BookingFormValues } from "@/lib/validation/booking";
import { createClient } from "@/lib/supabase/client";
import { useBookingDraftStore } from "@/stores/booking-draft-store";
import { MARKET } from "@/lib/constants/market";
import { formatShopPrice } from "@/lib/format/money";
import { m } from "framer-motion";
import { useEffect, useState } from "react";

/** Matches `supabase/seed.sql` service IDs */
const demoServices = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    name: "Bridal editorial",
    duration: 120,
    price: 8500,
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    name: "Soft glam portrait",
    duration: 90,
    price: 4200,
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    name: "Private masterclass",
    duration: 180,
    price: 11500,
  },
];

const addOnOptions = [
  { id: "lashes", label: "Premium lashes", price: 120 },
  { id: "travel", label: `Travel within Greater ${MARKET.city}`, price: 280 },
  { id: "touchup-kit", label: "Touch-up kit", price: 200 },
];

function bookingTimezoneLabel() {
  try {
    return Intl.DateTimeFormat(undefined, { timeZoneName: "longGeneric" }).formatToParts(new Date())
      .find((p) => p.type === "timeZoneName")?.value;
  } catch {
    return undefined;
  }
}

export function BookingWizard() {
  const [step, setStep] = useState(0);
  const [tzLabel, setTzLabel] = useState<string | undefined>(undefined);
  const draft = useBookingDraftStore();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      serviceId: draft.serviceId ?? "",
      startAt: draft.startAt ?? "",
      locationType: draft.locationType,
      address: draft.address,
      addOns: draft.addOns,
      clientNotes: draft.clientNotes,
    },
  });

  useEffect(() => {
    setTzLabel(bookingTimezoneLabel());
  }, []);

  useEffect(() => {
    const applyDraft = () => {
      const s = useBookingDraftStore.getState();
      form.reset({
        serviceId: s.serviceId ?? "",
        startAt: s.startAt ?? "",
        locationType: s.locationType,
        address: s.address,
        addOns: s.addOns,
        clientNotes: s.clientNotes ?? "",
      });
    };
    if (useBookingDraftStore.persist.hasHydrated()) {
      applyDraft();
    }
    return useBookingDraftStore.persist.onFinishHydration(applyDraft);
  }, [form]);

  useEffect(() => {
    const sub = form.watch((data) => {
      const store = useBookingDraftStore.getState();
      const serviceId = data.serviceId?.trim();
      const startAt = data.startAt?.trim();
      store.setField("serviceId", serviceId && serviceId.length > 0 ? serviceId : null);
      store.setField("startAt", startAt && startAt.length > 0 ? startAt : null);
      store.setField("locationType", data.locationType ?? "studio");
      store.setField("address", data.address ?? "");
      store.setField("addOns", data.addOns ?? []);
      store.setField("clientNotes", data.clientNotes ?? "");
    });
    return () => sub.unsubscribe();
  }, [form]);

  const serviceIdW = useWatch({ control: form.control, name: "serviceId" });
  const locationTypeW = useWatch({ control: form.control, name: "locationType" });
  const startAtW = useWatch({ control: form.control, name: "startAt" });
  const addOnsW = useWatch({ control: form.control, name: "addOns" }) ?? [];

  async function onSubmit(values: BookingFormValues) {
    let supabase: ReturnType<typeof createClient>;
    try {
      supabase = createClient();
    } catch {
      toast.error("Connect Supabase (see .env.example) to submit live bookings.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      toast.message("Sign in required", {
        description: "We’ll wire auth in your Supabase project — for now, this validates the flow.",
      });
      return;
    }

    const service = demoServices.find((s) => s.id === values.serviceId);
    const start = new Date(values.startAt);
    const end = new Date(start.getTime() + (service?.duration ?? 60) * 60_000);

    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      service_id: values.serviceId,
      start_at: start.toISOString(),
      end_at: end.toISOString(),
      status: "awaiting_approval",
      location_type: values.locationType,
      address: values.locationType === "home" ? values.address : null,
      add_ons: { ids: values.addOns },
      client_notes: values.clientNotes ?? null,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Request received", {
      description: "We’ll confirm shortly. You’ll get a notification once approved.",
    });
    form.reset();
    draft.reset();
    setStep(0);
  }

  const steps = ["Service", "Schedule", "Details", "Review"];
  const ianaTz =
    typeof Intl !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : undefined;

  return (
    <div className="mx-auto max-w-2xl">
      <p className="mb-6 rounded-2xl border border-kabuki-pink/25 bg-white/70 px-4 py-3 text-sm text-kabuki-navy/65 shadow-[var(--shadow-glass)] backdrop-blur-sm">
        <span className="font-semibold text-kabuki-navy">Progress saved</span> on this device — your
        selections stay put if you leave and come back.
      </p>
      <div className="mb-10 flex gap-2">
        {steps.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setStep(i)}
            className={`flex-1 rounded-full border px-2 py-2 text-xs font-semibold uppercase tracking-wider transition sm:text-[0.65rem] ${
              step === i
                ? "border-kabuki-navy bg-kabuki-navy text-white"
                : "border-kabuki-pink/40 bg-white/60 text-kabuki-navy/55"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {step === 0 && (
          <m.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
            role="group"
            aria-labelledby="booking-step-service"
          >
            <h3 id="booking-step-service" className="font-display text-2xl text-kabuki-navy">
              Choose your service
            </h3>
            <div className="grid gap-3">
              {demoServices.map((s) => (
                <label
                  key={s.id}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border px-5 py-4 transition hover:border-kabuki-pink ${
                    serviceIdW === s.id
                      ? "border-kabuki-navy bg-kabuki-pink/15"
                      : "border-kabuki-pink/25 bg-white/70"
                  }`}
                >
                  <div>
                    <p className="font-medium text-kabuki-navy">{s.name}</p>
                    <p className="text-xs text-kabuki-navy/50">
                      {s.duration} min · from {formatShopPrice(s.price)}
                    </p>
                  </div>
                  <input type="radio" value={s.id} {...form.register("serviceId")} className="size-4" />
                </label>
              ))}
            </div>
            {form.formState.errors.serviceId && (
              <p className="text-sm text-red-600">{form.formState.errors.serviceId.message}</p>
            )}
            <p className="text-xs text-kabuki-navy/45">
              Run <code className="rounded bg-kabuki-pink/20 px-1">supabase/seed.sql</code> so these
              IDs exist in your database.
            </p>
          </m.div>
        )}

        {step === 1 && (
          <m.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
            role="group"
            aria-labelledby="booking-step-schedule"
          >
            <h3 id="booking-step-schedule" className="font-display text-2xl text-kabuki-navy">
              Schedule
            </h3>
            <label className="block text-sm font-medium text-kabuki-navy/70">
              Date & time
              <input
                type="datetime-local"
                className="mt-2 w-full rounded-2xl border border-kabuki-pink/30 bg-white/80 px-4 py-3 text-kabuki-navy outline-none ring-kabuki-pink/40 focus:ring-2"
                {...form.register("startAt")}
              />
            </label>
            {form.formState.errors.startAt && (
              <p className="text-sm text-red-600">{form.formState.errors.startAt.message}</p>
            )}
            <p className="text-xs leading-relaxed text-kabuki-navy/50">
              Times use{" "}
              <span className="font-medium text-kabuki-navy/70">
                {tzLabel ?? "your local time zone"}
              </span>
              {ianaTz ? (
                <>
                  {" "}
                  (<span className="font-mono text-[0.7rem] text-kabuki-navy/55">{ianaTz}</span>).
                </>
              ) : (
                "."
              )}
            </p>
          </m.div>
        )}

        {step === 2 && (
          <m.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
            role="group"
            aria-labelledby="booking-step-details"
          >
            <h3 id="booking-step-details" className="font-display text-2xl text-kabuki-navy">
              Location & add-ons
            </h3>
            <div className="flex gap-4">
              {(["studio", "home"] as const).map((loc) => (
                <label
                  key={loc}
                  className={`flex-1 cursor-pointer rounded-2xl border px-4 py-3 text-center text-sm font-semibold capitalize ${
                    locationTypeW === loc
                      ? "border-kabuki-navy bg-kabuki-navy text-white"
                      : "border-kabuki-pink/30 bg-white/70 text-kabuki-navy"
                  }`}
                >
                  <input type="radio" value={loc} {...form.register("locationType")} className="sr-only" />
                  {loc === "studio" ? `${MARKET.city} studio` : "Your venue / home"}
                </label>
              ))}
            </div>
            {locationTypeW === "home" && (
              <label className="block text-sm font-medium text-kabuki-navy/70">
                Address
                <textarea
                  rows={3}
                  className="mt-2 w-full rounded-2xl border border-kabuki-pink/30 bg-white/80 px-4 py-3 text-kabuki-navy outline-none ring-kabuki-pink/40 focus:ring-2"
                  {...form.register("address")}
                />
                {form.formState.errors.address && (
                  <p className="mt-1 text-sm text-red-600">{form.formState.errors.address.message}</p>
                )}
              </label>
            )}
            <div>
              <p className="mb-3 text-sm font-medium text-kabuki-navy/70">Add-ons</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {addOnOptions.map((a) => {
                  const selected = addOnsW.includes(a.id);
                  return (
                    <label
                      key={a.id}
                      className="flex cursor-pointer items-center gap-3 rounded-xl border border-kabuki-pink/25 bg-white/70 px-4 py-3 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={(e) => {
                          const cur = form.getValues("addOns");
                          if (e.target.checked) {
                            form.setValue("addOns", [...cur, a.id], { shouldValidate: true });
                          } else {
                            form.setValue(
                              "addOns",
                              cur.filter((x) => x !== a.id),
                              { shouldValidate: true },
                            );
                          }
                        }}
                        className="size-4 rounded border-kabuki-pink/40"
                      />
                      <span>
                        {a.label}
                        <span className="block text-xs text-kabuki-navy/45">
                          +{formatShopPrice(a.price)}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
            <label className="block text-sm font-medium text-kabuki-navy/70">
              Notes (optional)
              <textarea
                rows={3}
                className="mt-2 w-full rounded-2xl border border-kabuki-pink/30 bg-white/80 px-4 py-3 text-kabuki-navy outline-none ring-kabuki-pink/40 focus:ring-2"
                placeholder="Skin concerns, inspiration references, allergies…"
                {...form.register("clientNotes")}
              />
            </label>
          </m.div>
        )}

        {step === 3 && (
          <m.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel rounded-3xl p-8"
          >
            <h3 className="font-display text-2xl text-kabuki-navy">Review</h3>
            <dl className="mt-6 space-y-3 text-sm text-kabuki-navy/75">
              <div className="flex justify-between gap-4">
                <dt className="text-kabuki-navy/45">Service</dt>
                <dd className="text-right font-medium text-kabuki-navy">
                  {demoServices.find((s) => s.id === serviceIdW)?.name ?? "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-kabuki-navy/45">When</dt>
                <dd className="text-right font-medium text-kabuki-navy">{startAtW || "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-kabuki-navy/45">Where</dt>
                <dd className="text-right font-medium capitalize text-kabuki-navy">
                  {locationTypeW}
                </dd>
              </div>
            </dl>
          </m.div>
        )}

        <div className="space-y-4 pt-4">
          {step === steps.length - 1 ? (
            <p className="text-sm leading-relaxed text-kabuki-navy/55">
              <span className="font-medium text-kabuki-navy/75">What happens next:</span> we review your
              request, confirm availability, then send a note with approval and next steps — usually
              within one business day.
            </p>
          ) : null}
          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="rounded-full border border-kabuki-navy/15 px-6 py-3 text-sm font-semibold text-kabuki-navy transition hover:bg-kabuki-pink/20"
            >
              Back
            </button>
            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
                className="rounded-full bg-kabuki-navy px-8 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-kabuki-navy/90"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="rounded-full bg-kabuki-pink px-8 py-3 text-sm font-semibold text-kabuki-navy shadow-soft transition hover:opacity-95 disabled:opacity-60"
              >
                {form.formState.isSubmitting ? "Sending…" : "Submit request"}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
