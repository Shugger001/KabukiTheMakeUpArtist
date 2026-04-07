import { z } from "zod";

export const bookingFormSchema = z
  .object({
    serviceId: z.string().uuid("Select a service"),
    startAt: z.string().min(1, "Pick a date and time"),
    locationType: z.enum(["studio", "home"]),
    address: z.string().optional(),
    addOns: z.array(z.string()),
    clientNotes: z.string().max(800).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.locationType === "home" && (!data.address || data.address.trim().length < 8)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please share a full address for home service.",
        path: ["address"],
      });
    }
  });

export type BookingFormValues = z.infer<typeof bookingFormSchema>;
