import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "outline" | "brand" | "navy" | "forest";

const variants: Record<BadgeVariant, string> = {
  default: "bg-cream-100 text-ink-soft border-cream-300",
  outline: "bg-transparent text-ink-soft border-cream-300",
  brand: "bg-brand-50 text-brand-700 border-brand-100",
  navy: "bg-navy/5 text-navy border-navy/15",
  forest: "bg-forest/5 text-forest border-forest/15",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium leading-5",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
