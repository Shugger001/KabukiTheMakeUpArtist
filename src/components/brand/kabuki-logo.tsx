import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { BRAND } from "@/lib/constants/brand";

type KabukiLogoProps = {
  className?: string;
  /** Navy backgrounds: soft shadow, no white plate */
  variant?: "default" | "onDark";
  priority?: boolean;
};

export function KabukiLogo({ className, variant = "default", priority = false }: KabukiLogoProps) {
  const { src, alt, width, height } = BRAND.logo;

  return (
    <span
      className={cn(
        "relative inline-flex items-center",
        variant === "default" && "isolate overflow-visible",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={cn(
          "w-auto object-contain object-left",
          variant === "default" &&
            cn(
              /* Wide lockup stays short at a given height — scale up visually; pre-scale h neutralizes layout jump */
              "origin-left [height:calc((var(--header-height)-4px)/var(--header-logo-scale))] max-w-none scale-[var(--header-logo-scale)]",
              "sm:[height:calc((var(--header-height)-3px)/var(--header-logo-scale))]",
              /* Tames leftover matte on glass / hero */
              "mix-blend-multiply opacity-[0.98]",
            ),
          variant === "onDark" &&
            cn(
              "h-8 max-w-[min(200px,55vw)] sm:h-9 sm:max-w-[240px] md:h-10 md:max-w-[260px]",
              "drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] brightness-110",
            ),
        )}
        sizes={
          variant === "default"
            ? "(max-width: 640px) 300px, (max-width: 1024px) 380px, 480px"
            : "(max-width: 768px) 200px, 260px"
        }
      />
    </span>
  );
}
