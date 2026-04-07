import { Suspense } from "react";
import { CartClient } from "./cart-client";

function CartFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-kabuki-grey">
      <div className="h-10 w-10 animate-pulse rounded-full bg-kabuki-pink/40" aria-hidden />
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={<CartFallback />}>
      <CartClient />
    </Suspense>
  );
}
