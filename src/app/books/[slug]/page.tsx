import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, ExternalLink, Quote, BookMarked, Target, ListOrdered, Sparkles, BriefcaseBusiness, Users, LibraryBig } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { books, bookBySlug } from "@/data/books";
import { caseBySlug } from "@/data/cases";
import { PageHeader } from "@/components/layout/page-header";
import { BookCover } from "@/components/books/book-cover";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const book = bookBySlug[slug];
  if (!book) return {};
  return createMetadata({
    title: `${book.titleZh} · 核心思想与实操指南`,
    description: book.oneLine,
    path: `/books/${slug}`,
  });
}

export default async function BookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = bookBySlug[slug];
  if (!book) notFound();

  const relatedCases = book.relatedCases.map((s) => caseBySlug[s]).filter(Boolean);
  const furtherBooks = book.furtherReading.map((s) => bookBySlug[s]).filter(Boolean);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Book",
        name: book.titleZh, alternateName: book.titleEn,
        author: book.author, datePublished: book.year,
        description: book.coreIdea, inLanguage: "zh-CN",
      }) }} />

      <PageHeader
        eyebrow={`${book.category} · 营销经典`}
        title={book.titleZh}
        description={book.oneLine}
        crumbs={[{ label: "营销好书", href: "/books" }, { label: book.titleZh }]}
      />

      <div className="site-container grid gap-10 py-12 lg:grid-cols-[280px_1fr] lg:gap-14 lg:py-16">
        <aside>
          <div className="sticky top-24">
            <BookCover book={book} className="w-full" />
            <p className="mt-3 text-center text-[11px] text-ink-muted">封面为本站原创设计示意，非真实书籍封面</p>
            <div className="mt-6 rounded-xl border border-cream-300 bg-white p-5">
              <dl className="space-y-3 text-xs">
                <div><dt className="data-label">原版书名</dt><dd className="mt-1 leading-5 text-ink-soft">{book.titleEn}</dd></div>
                <div><dt className="data-label">作者</dt><dd className="mt-1 leading-5 text-ink-soft">{book.author}</dd></div>
                <div><dt className="data-label">出版年份</dt><dd className="mt-1 leading-5 text-ink-soft">{book.year ?? "请以版权页为准"}</dd></div>
                <div><dt className="data-label">出版社</dt><dd className="mt-1 leading-5 text-ink-soft">{book.publisher ?? "请以版权页为准"}</dd></div>
              </dl>
              {book.officialLink && (
                <a href={book.officialLink.url} target="_blank" rel="noopener noreferrer" className="mt-5 flex items-center justify-center gap-1.5 rounded-lg border border-cream-300 bg-cream-50 px-3 py-2.5 text-xs font-medium text-ink transition-colors hover:border-brand-300 hover:text-brand-600">
                  {book.officialLink.label} <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        </aside>

        <article className="min-w-0">
          <div className="flex flex-wrap gap-2">{book.tags.map((t) => <Badge key={t} variant="brand">{t}</Badge>)}</div>

          {book.quote && (
            <blockquote className="mt-8 rounded-r-xl border-l-[3px] border-brand-500 bg-cream-100/70 py-5 pl-6 pr-5 font-serif text-xl italic leading-relaxed text-ink">
              “{book.quote.text}”
              <footer className="mt-3 font-sans text-xs not-italic text-ink-muted">—— {book.quote.source}</footer>
            </blockquote>
          )}

          <section className="mt-10">
            <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold text-ink"><BookMarked className="h-5 w-5 text-brand-500" />核心思想</h2>
            <p className="mt-4 text-[15px] leading-8 text-ink-soft">{book.coreIdea}</p>
          </section>

          <section className="mt-12">
            <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold text-ink"><Sparkles className="h-5 w-5 text-brand-500" />主要理论</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {book.theories.map((t) => (
                <div key={t.name} className="rounded-xl border border-cream-300 bg-white p-5">
                  <h3 className="font-serif text-lg font-semibold text-ink">{t.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{t.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <section>
              <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-ink"><ListOrdered className="h-4 w-4 text-brand-500" />关键章节</h2>
              <ol className="mt-4 space-y-2.5">
                {book.keyChapters.map((c, i) => <li key={c} className="flex gap-3 text-sm leading-6 text-ink-soft"><span className="text-brand-400">{String(i + 1).padStart(2, "0")}</span>{c}</li>)}
              </ol>
            </section>
            <section>
              <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-ink"><Quote className="h-4 w-4 text-brand-500" />最值得学习的观点</h2>
              <ul className="mt-4 space-y-2.5">
                {book.bestIdeas.map((idea) => <li key={idea} className="flex gap-3 text-sm leading-6 text-ink-soft"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />{idea}</li>)}
              </ul>
            </section>
          </div>

          <section className="mt-12 rounded-2xl border border-brand-100 bg-brand-50/50 p-6">
            <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-ink"><BriefcaseBusiness className="h-4 w-4 text-brand-600" />如何用于实际营销工作</h2>
            <ol className="mt-4 space-y-3">
              {book.practice.map((p, i) => <li key={p} className="flex gap-3 text-sm leading-6 text-ink-soft"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-[11px] font-bold text-white">{i + 1}</span>{p}</li>)}
            </ol>
          </section>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <section>
              <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-ink"><Users className="h-4 w-4 text-brand-500" />适合哪些人阅读</h2>
              <div className="mt-4 flex flex-wrap gap-2">{book.audience.map((a) => <Badge key={a} variant="navy">{a}</Badge>)}</div>
            </section>
            <section>
              <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-ink"><Target className="h-4 w-4 text-brand-500" />相关案例</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {relatedCases.length ? relatedCases.map((c) => <Link key={c.slug} href={`/cases/${c.slug}`} className="inline-flex items-center gap-1 rounded-full border border-cream-300 bg-white px-3 py-1.5 text-xs text-ink-soft hover:border-brand-300 hover:text-brand-600">{c.brand} <ArrowUpRight className="h-3 w-3" /></Link>) : <span className="text-sm text-ink-muted">暂无直接关联案例</span>}
              </div>
            </section>
          </div>

          {furtherBooks.length > 0 && (
            <section className="mt-12 border-t border-cream-300 pt-8">
              <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-ink"><LibraryBig className="h-4 w-4 text-brand-500" />延伸阅读</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {furtherBooks.map((b) => <Link key={b.slug} href={`/books/${b.slug}`} className="flex items-center justify-between gap-3 rounded-lg border border-cream-300 bg-white px-4 py-3 text-sm text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-600"><span>{b.titleZh}</span><ArrowUpRight className="h-4 w-4 shrink-0" /></Link>)}
              </div>
            </section>
          )}

          <div className="mt-10 flex items-center justify-between border-t border-cream-300 pt-6">
            <Link href="/books" className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-brand-600"><ArrowLeft className="h-4 w-4" />返回好书库</Link>
            <Link href="/cases" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600">看看相关案例 <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </article>
      </div>
    </>
  );
}
