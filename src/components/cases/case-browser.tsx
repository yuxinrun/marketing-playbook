"use client";

import * as React from "react";
import Link from "next/link";
import { Search, ArrowUpRight, MapPin } from "lucide-react";
import type { CaseStudy } from "@/types";
import { SmartImage } from "@/components/ui/smart-image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function CaseBrowser({ cases }: { cases: CaseStudy[] }) {
  const [region, setRegion] = React.useState("all");
  const [query, setQuery] = React.useState("");
  const regions = React.useMemo(() => Array.from(new Set(cases.map((c) => c.region.split("/")[0]))), [cases]);
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return cases.filter((c) => {
      const rOk = region === "all" || c.region.startsWith(region);
      const qOk = !q || `${c.brand} ${c.title} ${c.summary} ${c.tags.join(" ")} ${c.industry}`.toLowerCase().includes(q);
      return rOk && qOk;
    });
  }, [cases, region, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {["all", ...regions].map((r) => (
            <button key={r} type="button" onClick={() => setRegion(r)} className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              region === r ? "border-brand-500 bg-brand-500 text-white" : "border-cream-300 bg-white text-ink-soft hover:border-brand-300"
            )}>{r === "all" ? "全部案例" : r}</button>
          ))}
        </div>
        <label className="flex items-center gap-2 rounded-lg border border-cream-300 bg-white px-3 py-2">
          <Search className="h-4 w-4 text-ink-muted" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索品牌或营销主题" className="w-full bg-transparent text-sm outline-none placeholder:text-ink-faint sm:w-64" />
        </label>
      </div>
      <p className="mt-6 text-xs text-ink-muted">共 {filtered.length} 个案例</p>
      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <Link key={c.slug} href={`/cases/${c.slug}`} className="group overflow-hidden rounded-2xl border border-cream-300 bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
            <SmartImage src={c.cover} alt={`${c.brand} 案例配图`} className="aspect-[16/10]" sizes="(max-width: 640px) 100vw, 33vw" />
            <div className="p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-serif text-lg font-bold text-ink">{c.brand}</span>
                <Badge variant="brand">{c.industry}</Badge>
              </div>
              <h3 className="mt-3 line-clamp-2 font-serif text-base font-semibold leading-snug text-ink group-hover:text-brand-600">{c.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-soft">{c.summary}</p>
              <div className="mt-4 flex items-center justify-between text-[11px] text-ink-muted">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{c.region}</span>
                <span className="flex items-center gap-1 font-medium text-brand-600">阅读案例 <ArrowUpRight className="h-3.5 w-3.5" /></span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
