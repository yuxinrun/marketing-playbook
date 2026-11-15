"use client";

import * as React from "react";
import Link from "next/link";
import { Search, ArrowUpRight } from "lucide-react";
import type { Book } from "@/types";
import { BookCover } from "./book-cover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function BookBrowser({ books }: { books: Book[] }) {
  const [category, setCategory] = React.useState("all");
  const [query, setQuery] = React.useState("");
  const categories = React.useMemo(() => Array.from(new Set(books.map((b) => b.category))), [books]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return books.filter((b) => {
      const catOk = category === "all" || b.category === category;
      const qOk = !q || `${b.titleZh} ${b.titleEn} ${b.author} ${b.tags.join(" ")} ${b.oneLine}`.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [books, category, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {["all", ...categories].map((c) => (
            <button key={c} type="button" onClick={() => setCategory(c)} className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              category === c ? "border-brand-500 bg-brand-500 text-white" : "border-cream-300 bg-white text-ink-soft hover:border-brand-300"
            )}>{c === "all" ? "全部书籍" : c}</button>
          ))}
        </div>
        <label className="flex items-center gap-2 rounded-lg border border-cream-300 bg-white px-3 py-2">
          <Search className="h-4 w-4 text-ink-muted" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索书名、作者或关键词" className="w-full bg-transparent text-sm outline-none placeholder:text-ink-faint sm:w-64" />
        </label>
      </div>
      <p className="mt-6 text-xs text-ink-muted">共 {filtered.length} 本书</p>
      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((b) => (
          <Link key={b.slug} href={`/books/${b.slug}`} className="group flex gap-4 rounded-2xl border border-cream-300 bg-white p-4 shadow-card transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover">
            <BookCover book={b} className="w-[100px] shrink-0" />
            <div className="flex min-w-0 flex-1 flex-col">
              <Badge variant="brand" className="w-fit">{b.category}</Badge>
              <h3 className="mt-2 font-serif text-base font-semibold leading-snug text-ink group-hover:text-brand-600">{b.titleZh}</h3>
              <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-ink-muted">{b.titleEn}</p>
              <p className="mt-2 text-[11px] text-ink-soft">{b.author.split("（")[0]}</p>
              <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-ink-muted">{b.oneLine}</p>
              <span className="mt-auto flex items-center gap-1 pt-3 text-[11px] font-medium text-brand-600">查看详情 <ArrowUpRight className="h-3 w-3" /></span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
