"use client";

import * as React from "react";
import Link from "next/link";
import { Search, ArrowUpRight, ExternalLink } from "lucide-react";
import type { WebsiteResource } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function WebsiteBrowser({ sites }: { sites: WebsiteResource[] }) {
  const [category, setCategory] = React.useState("all");
  const [query, setQuery] = React.useState("");
  const categories = React.useMemo(() => Array.from(new Set(sites.map((s) => s.category))), [sites]);
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return sites.filter((s) => {
      const catOk = category === "all" || s.category === category;
      const qOk = !q || `${s.name} ${s.url} ${s.positioning} ${s.content} ${s.features.join(" ")}`.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [sites, category, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {["all", ...categories].map((c) => (
            <button key={c} type="button" onClick={() => setCategory(c)} className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              category === c ? "border-brand-500 bg-brand-500 text-white" : "border-cream-300 bg-white text-ink-soft hover:border-brand-300"
            )}>{c === "all" ? "全部资源" : c}</button>
          ))}
        </div>
        <label className="flex items-center gap-2 rounded-lg border border-cream-300 bg-white px-3 py-2">
          <Search className="h-4 w-4 text-ink-muted" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索网站名称或领域" className="w-full bg-transparent text-sm outline-none placeholder:text-ink-faint sm:w-64" />
        </label>
      </div>
      <p className="mt-6 text-xs text-ink-muted">共 {filtered.length} 个网站</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <div key={s.slug} className="group flex flex-col rounded-xl border border-cream-300 bg-white p-5 shadow-card transition-all hover:border-brand-200 hover:shadow-card-hover">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy font-serif text-base font-bold text-white">{s.name.charAt(0)}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Link href={`/websites/${s.slug}`} className="truncate font-serif text-base font-semibold text-ink hover:text-brand-600">{s.name}</Link>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-ink-faint" />
                </div>
                <p className="mt-1 text-[11px] text-ink-muted">{s.region} · {s.category}</p>
              </div>
            </div>
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-ink-soft">{s.positioning}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">{s.features.slice(0, 2).map((f) => <Badge key={f} variant="outline">{f}</Badge>)}</div>
            <div className="mt-auto flex items-center justify-between gap-3 pt-5">
              <Link href={`/websites/${s.slug}`} className="text-xs font-medium text-brand-600">查看详细介绍</Link>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] text-ink-muted hover:text-brand-600">
                访问官网 <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
