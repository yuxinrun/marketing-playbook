"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Clock, ArrowUpRight } from "lucide-react";
import type { ArticleMeta } from "@/types";
import { SmartImage } from "@/components/ui/smart-image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ArticleBrowser({ articles }: { articles: ArticleMeta[] }) {
  const [category, setCategory] = React.useState("all");
  const [query, setQuery] = React.useState("");
  const categories = React.useMemo(() => Array.from(new Set(articles.map((a) => a.categoryLabel))), [articles]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const matchCat = category === "all" || a.categoryLabel === category;
      const matchQuery = !q || `${a.title} ${a.excerpt} ${a.tags.join(" ")}`.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [articles, category, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {["all", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                category === c ? "border-brand-500 bg-brand-500 text-white" : "border-cream-300 bg-white text-ink-soft hover:border-brand-300"
              )}
            >
              {c === "all" ? "全部文章" : c}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 rounded-lg border border-cream-300 bg-white px-3 py-2">
          <Search className="h-4 w-4 text-ink-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索文章标题或关键词"
            className="w-full bg-transparent text-sm outline-none placeholder:text-ink-faint sm:w-64"
          />
        </label>
      </div>

      <p className="mt-6 text-xs text-ink-muted">共 {filtered.length} 篇文章</p>

      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <Link key={a.slug} href={`/articles/${a.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-cream-300 bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
            {a.cover && <SmartImage src={a.cover} alt={a.title} className="aspect-[16/9]" sizes="(max-width: 640px) 100vw, 33vw" />}
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center gap-2 text-[11px] text-ink-muted">
                <Badge variant="brand">{a.categoryLabel}</Badge>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{a.readMinutes} 分钟</span>
                <span>{a.level}</span>
              </div>
              <h3 className="mt-3 font-serif text-lg font-semibold leading-snug text-ink group-hover:text-brand-600">{a.title}</h3>
              {a.subtitle && <p className="mt-1 text-xs text-brand-600">{a.subtitle}</p>}
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-soft">{a.excerpt}</p>
              <div className="mt-auto flex items-center justify-between pt-5">
                <time dateTime={a.date} className="text-[11px] text-ink-muted">{a.date}</time>
                <span className="flex items-center gap-1 text-xs font-medium text-brand-600">阅读全文 <ArrowUpRight className="h-3.5 w-3.5" /></span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-cream-300 py-20 text-center text-sm text-ink-muted">
          没有找到匹配的文章，试试其他关键词或分类。
        </div>
      )}
    </div>
  );
}
