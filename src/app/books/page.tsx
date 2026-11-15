import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { books } from "@/data/books";
import { PageHeader } from "@/components/layout/page-header";
import { BookBrowser } from "@/components/books/book-browser";
import { BookCover } from "@/components/books/book-cover";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = createMetadata({
  title: "全球营销好书",
  description: "20 本经典营销著作的深度导读：核心思想、主要理论、关键章节、实操价值、适合人群与可核查的出版信息。",
  path: "/books",
});

export default function BooksPage() {
  const featured = books.slice(0, 4);
  return (
    <>
      <PageHeader
        eyebrow="Marketing Library"
        title="全球营销好书"
        description="从《营销管理》到《定位》，从《影响力》到《增长黑客》。每本书都提供核心思想、理论框架、实操价值与延伸阅读，帮助你把经典转化为行动。"
        crumbs={[{ label: "营销好书" }]}
        aside={<div className="rounded-xl border border-cream-300 bg-white px-5 py-4 text-center shadow-card"><p className="stat-number">{books.length}</p><p className="mt-1 text-xs text-ink-muted">本经典著作</p></div>}
      />

      <section className="border-b border-cream-300 bg-white py-12">
        <div className="site-container">
          <p className="data-label mb-6">Editor's Selection · 编辑精选</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((b) => (
              <Link key={b.slug} href={`/books/${b.slug}`} className="group flex items-center gap-4 rounded-xl border border-cream-200 bg-cream-50 p-4 transition-all hover:border-brand-200 hover:bg-white">
                <BookCover book={b} className="w-[84px] shrink-0" />
                <div className="min-w-0">
                  <p className="font-serif text-base font-semibold leading-snug text-ink group-hover:text-brand-600">{b.titleZh}</p>
                  <p className="mt-1 line-clamp-1 text-[11px] text-ink-muted">{b.author.split("（")[0]}</p>
                  <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-ink-soft">{b.oneLine}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-[11px] text-brand-600">阅读导读 <ArrowUpRight className="h-3 w-3" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="site-container py-12 lg:py-16">
        <BookBrowser books={books} />
        <p className="mt-10 rounded-xl border border-cream-300 bg-cream-100/60 p-5 text-xs leading-6 text-ink-muted">
          <strong className="text-ink">信息来源说明：</strong>本站书籍的作者、年份与出版社信息以可核查的出版社、作者官网或公开百科为准；无法核实的项目已明确标注「请以版权页为准」。封面为本站原创设计示意图，非真实书籍封面；引用观点仅作概括评述，不复制原书内容。
        </p>
      </div>
    </>
  );
}
