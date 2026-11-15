import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { books } from "@/data/books";
import { websiteResources } from "@/data/websites";
import { BookCover } from "@/components/books/book-cover";
import { SectionHeading } from "@/components/layout/section-heading";

const pickedBooks = ["positioning", "influence", "contagious", "lean-startup"];
const pickedSites = ["think-with-google", "semrush", "content-marketing-institute", "statista", "google-trends", "nielsen", "oceanengine", "iresearch"];

export function ResourcesSection() {
  const selectedBooks = pickedBooks.map((s) => books.find((b) => b.slug === s)).filter(Boolean);
  const selectedSites = pickedSites.map((s) => websiteResources.find((w) => w.slug === s)).filter(Boolean);

  return (
    <section className="site-container py-16 lg:py-24">
      <SectionHeading
        eyebrow="Learning Resources"
        title="好书与优质网站：站在前人经验之上"
        description="精选经过时间检验的经典著作与行业公认的权威网站，信息以官方来源为准。"
      />

      <div className="mt-12">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-serif text-2xl font-semibold text-ink">营销经典好书</h3>
          <Link href="/books" className="link-underline text-sm">全部 20 本 <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {selectedBooks.map((b) => b && (
            <Link key={b.slug} href={`/books/${b.slug}`} className="group flex gap-4 rounded-xl border border-cream-300 bg-white p-4 shadow-card transition-all hover:border-brand-200 hover:shadow-card-hover">
              <BookCover book={b} className="w-[92px] shrink-0" />
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-600">{b.category}</p>
                <h4 className="mt-1.5 font-serif text-base font-semibold leading-snug text-ink group-hover:text-brand-600">{b.titleZh}</h4>
                <p className="mt-1 line-clamp-1 text-[11px] text-ink-muted">{b.titleEn}</p>
                <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-ink-soft">{b.oneLine}</p>
                <span className="mt-auto pt-2 text-[11px] text-ink-muted">{b.author.split("（")[0]}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-serif text-2xl font-semibold text-ink">全球优质营销网站</h3>
          <Link href="/websites" className="link-underline text-sm">资源导航 <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {selectedSites.map((w) => w && (
            <Link key={w.slug} href={`/websites/${w.slug}`} className="group flex items-start gap-3 rounded-xl border border-cream-300 bg-cream-50 p-4 transition-all hover:border-brand-200 hover:bg-white">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy font-serif text-sm font-bold text-white">
                {w.name.charAt(0)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1 text-sm font-semibold text-ink group-hover:text-brand-600">
                  <span className="truncate">{w.name}</span>
                  <ExternalLink className="h-3 w-3 shrink-0 opacity-40" />
                </span>
                <span className="mt-1 block text-[11px] text-ink-muted">{w.region} · {w.category}</span>
                <span className="mt-1.5 line-clamp-2 block text-[11px] leading-5 text-ink-soft">{w.positioning}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
