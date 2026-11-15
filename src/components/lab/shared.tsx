"use client";

import * as React from "react";
import { Info, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export function Notice({ children, tone = "brand" }: { children: React.ReactNode; tone?: "brand" | "neutral" }) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border px-5 py-4 text-xs leading-6",
        tone === "brand" ? "border-brand-100 bg-brand-50 text-brand-800" : "border-cream-300 bg-cream-100/60 text-ink-soft"
      )}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0" />
      <div>{children}</div>
    </div>
  );
}

export function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-lg border border-cream-300 bg-white px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-600"
    >
      <RotateCcw className="h-3.5 w-3.5" /> 恢复示例
    </button>
  );
}

export function StatCard({
  label,
  value,
  hint,
  tone = "ink",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "ink" | "good" | "warn" | "bad";
}) {
  const toneClass = {
    ink: "text-ink",
    good: "text-forest",
    warn: "text-brand-600",
    bad: "text-[#B23C0D]",
  }[tone];
  return (
    <div className="rounded-xl border border-cream-300 bg-white p-5">
      <p className="data-label">{label}</p>
      <p className={cn("mt-2 font-serif text-3xl font-semibold tabular-nums tracking-tight", toneClass)}>{value}</p>
      {hint && <p className="mt-1 text-[11px] leading-5 text-ink-muted">{hint}</p>}
    </div>
  );
}

export function Panel({ title, desc, children, className }: { title: string; desc?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-2xl border border-cream-300 bg-white p-5 shadow-card sm:p-6", className)}>
      <h2 className="font-serif text-lg font-semibold text-ink">{title}</h2>
      {desc && <p className="mt-1 text-xs leading-5 text-ink-muted">{desc}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}
