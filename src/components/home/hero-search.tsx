"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { SearchDialog } from "@/components/layout/search-dialog";

export function HeroSearch() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex w-full max-w-xl items-center gap-3 rounded-xl border border-cream-300 bg-white/90 px-4 py-3.5 text-left shadow-sm transition-all hover:border-brand-300 hover:shadow-card"
      >
        <Search className="h-[18px] w-[18px] shrink-0 text-brand-500" />
        <span className="flex-1 text-sm text-ink-muted">搜索营销知识、方法、案例、书籍和工具</span>
        <kbd className="hidden rounded-md border border-cream-300 bg-cream-50 px-2 py-1 text-[10px] text-ink-muted sm:block">⌘ K</kbd>
      </button>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
