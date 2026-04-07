import { z } from "zod";

export const paystackInitializeSchema = z.object({
  email: z.string().email(),
  amount: z.number().positive(),
  metadata: z.unknown().optional(),
});

export type PaystackInitializeInput = z.infer<typeof paystackInitializeSchema>;
