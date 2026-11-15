import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Lightbulb, Wrench, Gauge, AlertTriangle, BookMarked, Newspaper } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { topicCategories, getCategory, topicBySlug } from "@/data/topics";
import { bookBySlug } from "@/data/books";
import { articleBySlug } from "@/data/articles";
import { PageHeader } from "@/components/layout/page-header";
import { MethodIllustration } from "@/components/illustrations/method-illustrations";
import { ContentWorkflowSvg, JourneyMapSvg, ResearchFlowSvg, ChannelMapSvg } from "@/components/illustrations/diagrams";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return topicCategories.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return createMetadata({
    title: cat.title,
    description: `${cat.title}：${cat.desc} 共 ${cat.topics.length} 个知识点，包含方法步骤、工具、衡量指标与常见错误。`,
    path: `/marketing/${category}`,
  });
}

function CategoryVisual({ id }: { id: string }) {
  if (id === "fundamentals" || id === "strategy") return <MethodIllustration type="stp" />;
  if (id === "branding") return <MethodIllustration type="positioning" />;
  if (id === "growth") return <MethodIllustration type="aarrr" />;
  if (id === "analytics") return <MethodIllustration type="funnel" />;
  if (id === "content") return <ContentWorkflowSvg />;
  if (id === "seo" || id === "advertising") return <JourneyMapSvg />;
  if (id === "social") return <ChannelMapSvg />;
  return <ResearchFlowSvg />;
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  return (
    <>
      <PageHeader
        eyebrow={`${cat.subtitle} · ${cat.number}`}
        title={cat.title}
        description={cat.desc}
        crumbs={[{ label: "营销知识中心", href: "/marketing" }, { label: cat.title }]}
        aside={<div className="rounded-xl border border-cream-300 bg-white px-5 py-4 text-center shadow-card"><p className="stat-number">{cat.topics.length}</p><p className="mt-1 text-xs text-ink-muted">个知识点</p></div>}
      />

      <div className="site-container grid gap-10 py-12 lg:grid-cols-[240px_1fr] lg:gap-14 lg:py-16">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto" aria-label="本页目录">
            <p className="data-label mb-4">本页目录</p>
            <ol className="space-y-1 border-l border-cream-300">
              {cat.topics.map((topic, i) => (
                <li key={topic.slug}>
                  <a href={`#${topic.slug}`} className="flex gap-3 py-2 pl-4 text-sm text-ink-soft transition-colors hover:text-brand-600">
                    <span className="shrink-0 text-[11px] text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span>{topic.title}</span>
                  </a>
                </li>
              ))}
            </ol>
            <Link href="/marketing" className="mt-6 inline-flex items-center gap-1 text-xs text-brand-600 hover:underline">
              <ArrowRight className="h-3.5 w-3.5 rotate-180" /> 返回知识中心
            </Link>
          </nav>
        </aside>

        <div className="min-w-0">
          <div className="mb-12"><CategoryVisual id={cat.id} /></div>

          <div className="space-y-16">
            {cat.topics.map((topic, index) => {
              const relatedBooks = (topic.bookSlugs ?? []).map((s) => bookBySlug[s]).filter(Boolean);
              const relatedArticles = (topic.articleSlugs ?? []).map((s) => articleBySlug[s]).filter(Boolean);
              const relatedTopics = (topic.relatedSlugs ?? []).map((s) => topicBySlug[s]).filter(Boolean);
              return (
                <section key={topic.slug} id={topic.slug} className="scroll-mt-24 border-b border-cream-300 pb-14 last:border-0">
                  <div className="flex items-start gap-4">
                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cream-100 font-serif text-sm font-bold text-navy">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">{topic.title}</h2>
                      <p className="mt-3 text-[15px] leading-8 text-ink-soft">{topic.summary}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3 rounded-xl border border-brand-100 bg-brand-50/60 p-4">
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    <p className="text-sm leading-6 text-ink-soft"><strong className="text-ink">为什么重要：</strong>{topic.why}</p>
                  </div>

                  <div className="mt-8">
                    <h3 className="mb-4 flex items-center gap-2 font-serif text-lg font-semibold text-ink"><BookMarked className="h-4 w-4 text-brand-500" />核心概念</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {topic.concepts.map((c) => (
                        <div key={c.term} className="rounded-xl border border-cream-300 bg-white p-4">
                          <p className="text-sm font-semibold text-ink">{c.term}</p>
                          <p className="mt-1.5 text-xs leading-6 text-ink-soft">{c.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink"><ArrowRight className="h-4 w-4 text-brand-500" />执行步骤</h3>
                      <ol className="space-y-2.5">
                        {topic.steps.map((s, i) => (
                          <li key={s} className="flex gap-3 text-sm leading-6 text-ink-soft">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cream-200 text-[10px] font-semibold text-ink">{i + 1}</span>
                            {s}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink"><Wrench className="h-4 w-4 text-brand-500" />常用工具</h3>
                      <div className="flex flex-wrap gap-2">{topic.tools.map((t) => <Badge key={t} variant="navy">{t}</Badge>)}</div>
                      <h3 className="mb-3 mt-6 flex items-center gap-2 text-sm font-semibold text-ink"><Gauge className="h-4 w-4 text-brand-500" />衡量指标</h3>
                      <div className="flex flex-wrap gap-2">{topic.metrics.map((m) => <Badge key={m} variant="forest">{m}</Badge>)}</div>
                    </div>
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink"><AlertTriangle className="h-4 w-4 text-brand-500" />常见错误</h3>
                      <ul className="space-y-2.5">
                        {topic.mistakes.map((m) => (
                          <li key={m} className="flex gap-2 text-sm leading-6 text-ink-soft">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />{m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {(relatedBooks.length > 0 || relatedArticles.length > 0 || relatedTopics.length > 0) && (
                    <div className="mt-8 flex flex-wrap gap-3 border-t border-cream-200 pt-5">
                      {relatedBooks.map((book) => (
                        <Link key={book.slug} href={`/books/${book.slug}`} className="inline-flex items-center gap-1.5 rounded-lg border border-cream-300 bg-white px-3 py-2 text-xs text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-600">
                          <BookMarked className="h-3.5 w-3.5" />{book.titleZh}<ArrowUpRight className="h-3 w-3" />
                        </Link>
                      ))}
                      {relatedArticles.map((article) => (
                        <Link key={article.slug} href={`/articles/${article.slug}`} className="inline-flex items-center gap-1.5 rounded-lg border border-cream-300 bg-white px-3 py-2 text-xs text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-600">
                          <Newspaper className="h-3.5 w-3.5" />{article.title}<ArrowUpRight className="h-3 w-3" />
                        </Link>
                      ))}
                      {relatedTopics.map((t) => (
                        <Link key={t.slug} href={`/marketing/${t.category}#${t.slug}`} className="inline-flex items-center gap-1.5 rounded-lg border border-cream-300 bg-white px-3 py-2 text-xs text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-600">
                          → {t.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
