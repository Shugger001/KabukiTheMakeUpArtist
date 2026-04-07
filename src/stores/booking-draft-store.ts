import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BookingLocation } from "@/types/database";

export interface BookingDraft {
  serviceId: string | null;
  startAt: string | null;
  locationType: BookingLocation;
  address: string;
  addOns: string[];
  clientNotes: string;
}

interface BookingDraftState extends BookingDraft {
  setField: <K extends keyof BookingDraft>(key: K, value: BookingDraft[K]) => void;
  reset: () => void;
}

const initial: BookingDraft = {
  serviceId: null,
  startAt: null,
  locationType: "studio",
  address: "",
  addOns: [],
  clientNotes: "",
};

export const useBookingDraftStore = create<BookingDraftState>()(
  persist(
    (set) => ({
      ...initial,
      setField: (key, value) => set({ [key]: value } as Partial<BookingDraftState>),
      reset: () => set(initial),
    }),
    {
      name: "kabuki-booking-draft",
    },
  ),
);
