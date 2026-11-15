"use client";

import * as React from "react";
import Link from "next/link";
import { Search, BookOpen, Globe2, BriefcaseBusiness, GraduationCap, LayoutGrid } from "lucide-react";
import { articles } from "@/data/articles";
import { books } from "@/data/books";
import { websiteResources } from "@/data/websites";
import { cases } from "@/data/cases";
import { allTopics } from "@/data/topics";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface Result {
  title: string;
  desc: string;
  href: string;
  kind: string;
  icon: React.ReactNode;
}

const corpus: Result[] = [
  ...articles.map((a) => ({
    title: a.title, desc: a.excerpt, href: `/articles/${a.slug}`, kind: "文章",
    icon: <BookOpen className="h-4 w-4" />,
  })),
  ...books.map((b) => ({
    title: `${b.titleZh} · ${b.titleEn}`, desc: b.oneLine, href: `/books/${b.slug}`, kind: "好书",
    icon: <GraduationCap className="h-4 w-4" />,
  })),
  ...websiteResources.map((w) => ({
    title: w.name, desc: w.positioning, href: `/websites/${w.slug}`, kind: "网站",
    icon: <Globe2 className="h-4 w-4" />,
  })),
  ...cases.map((c) => ({
    title: `${c.brand}：${c.title.split("：")[1] || c.title}`, desc: c.summary, href: `/cases/${c.slug}`, kind: "案例",
    icon: <BriefcaseBusiness className="h-4 w-4" />,
  })),
  ...allTopics.map((t) => ({
    title: t.title, desc: t.summary, href: `/marketing/${t.category}#${t.slug}`, kind: "知识点",
    icon: <LayoutGrid className="h-4 w-4" />,
  })),
];

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      const timer = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return corpus.slice(0, 6);
    return corpus.filter((r) => `${r.title} ${r.desc} ${r.kind}`.toLowerCase().includes(q)).slice(0, 12);
  }, [query]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="left-1/2 top-[12vh] w-[min(92vw,640px)] -translate-x-1/2 rounded-2xl p-0">
        <DialogTitle className="sr-only">搜索营销知识</DialogTitle>
        <div className="flex items-center gap-3 border-b border-cream-300 px-5 py-4">
          <Search className="h-5 w-5 shrink-0 text-brand-500" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索营销知识、方法、案例、书籍和工具…"
            className="w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-faint"
          />
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-3">
          <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
            {query ? `找到 ${results.length} 条结果` : "推荐内容"}
          </p>
          {results.length === 0 ? (
            <div className="px-3 py-10 text-center text-sm text-ink-muted">没有找到匹配内容，试试其他关键词。</div>
          ) : (
            results.map((r, i) => (
              <Link
                key={`${r.href}-${i}`}
                href={r.href}
                onClick={() => onOpenChange(false)}
                className="flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-cream-100"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  {r.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-ink">{r.title}</span>
                  <span className="mt-0.5 block truncate text-xs text-ink-muted">{r.desc}</span>
                </span>
                <span className="shrink-0 rounded-full bg-cream-100 px-2 py-0.5 text-[10px] text-ink-muted">{r.kind}</span>
              </Link>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
