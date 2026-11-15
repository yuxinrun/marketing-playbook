import type { Book } from "@/types";
import { cn } from "@/lib/utils";

export function BookCover({ book, className }: { book: Book; className?: string }) {
  return (
    <div
      className={cn("relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-lg p-4 shadow-card", className)}
      style={{ background: `linear-gradient(145deg, ${book.cover.from}, ${book.cover.to})` }}
      aria-label={`${book.titleZh} 封面示意图`}
    >
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20" viewBox="0 0 200 280" preserveAspectRatio="none">
        <circle cx="160" cy="40" r="70" fill="none" stroke="#fff" strokeWidth="0.8" />
        <circle cx="160" cy="40" r="48" fill="none" stroke="#fff" strokeWidth="0.8" />
        <path d="M0 200 L200 90 M0 230 L200 120 M0 260 L200 150" stroke="#fff" strokeWidth="0.5" />
      </svg>
      <div className="relative flex items-center justify-between">
        <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/70">Marketing Classics</span>
        <span className="font-serif text-2xl font-bold text-white/90">{book.cover.mark}</span>
      </div>
      <div className="relative">
        <div className="mb-2 h-px w-10 bg-white/60" />
        <p className="font-serif text-lg font-semibold leading-tight text-white">{book.titleZh}</p>
        <p className="mt-1.5 line-clamp-2 text-[9px] leading-4 text-white/70">{book.titleEn}</p>
        <p className="mt-3 text-[10px] text-white/80">{book.author.split("（")[0]}</p>
      </div>
    </div>
  );
}
