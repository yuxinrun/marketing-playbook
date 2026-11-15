import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import GithubSlugger from "github-slugger";
import { ArrowLeft, ArrowUpRight, Clock, Calendar, CheckSquare, UserRound, Info } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { articles, articleBySlug } from "@/data/articles";
import { getArticleContent, getRelatedArticles } from "@/lib/articles";
import { PageHeader } from "@/components/layout/page-header";
import { SmartImage } from "@/components/ui/smart-image";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = articleBySlug[slug];
  if (!meta) return {};
  return createMetadata({
    title: meta.title,
    description: meta.excerpt,
    path: `/articles/${slug}`,
    type: "article",
    publishedTime: meta.date,
    image: meta.cover,
  });
}

function extractToc(source: string) {
  const headings: { level: number; text: string; id: string }[] = [];
  const slugger = new GithubSlugger();
  const lines = source.split("\n");
  let inCode = false;
  lines.forEach((line) => {
    if (line.startsWith("```")) inCode = !inCode;
    if (inCode) return;
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const text = match[2].replace(/[*`]/g, "").trim();
      headings.push({ level: match[1].length, text, id: slugger.slug(text) });
    }
  });
  return headings;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = articleBySlug[slug];
  if (!meta) notFound();

  const source = getArticleContent(slug);
  const { content } = await compileMDX({
    source,
    options: { mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } },
  });
  const toc = extractToc(source);
  const related = getRelatedArticles(slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: meta.title,
            description: meta.excerpt,
            datePublished: meta.date,
            author: { "@type": "Organization", name: meta.author },
            publisher: { "@type": "Organization", name: "营销实战指南" },
            mainEntityOfPage: `https://marketing-playbook.example.com/articles/${slug}`,
          }),
        }}
      />

      <PageHeader
        eyebrow={`${meta.categoryLabel} · 深度文章`}
        title={meta.title}
        description={meta.excerpt}
        crumbs={[{ label: "深度文章", href: "/articles" }, { label: meta.title }]}
      />

      <div className="site-container grid gap-10 py-12 lg:grid-cols-[1fr_230px] lg:gap-14 lg:py-16">
        <article className="min-w-0">
          <div className="mb-8 flex flex-wrap items-center gap-4 text-xs text-ink-muted">
            <span className="flex items-center gap-1.5"><UserRound className="h-3.5 w-3.5" />{meta.author}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /><time dateTime={meta.date}>{meta.date}</time></span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{meta.readMinutes} 分钟阅读</span>
            <Badge variant="outline">{meta.level}</Badge>
            {meta.tags.map((tag) => <Badge key={tag} variant="brand">{tag}</Badge>)}
          </div>

          {meta.cover && (
            <figure className="mb-10">
              <SmartImage src={meta.cover} alt={meta.title} className="aspect-[16/9] rounded-2xl border border-cream-300" priority sizes="(max-width: 1024px) 100vw, 70vw" />
              {meta.coverCredit && <figcaption className="mt-2 text-[11px] text-ink-muted">图片：{meta.coverCredit}</figcaption>}
            </figure>
          )}

          <div className="mb-10 rounded-2xl border border-brand-100 bg-brand-50/60 p-6">
            <h2 className="flex items-center gap-2 font-serif text-lg font-semibold text-ink"><CheckSquare className="h-4 w-4 text-brand-600" />本文要点</h2>
            <ul className="mt-4 space-y-2.5">
              {meta.keyTakeaways.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-6 text-ink-soft">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />{point}
                </li>
              ))}
            </ul>
          </div>

          {meta.subtitle && <p className="mb-8 border-l-[3px] border-brand-400 pl-5 font-serif text-xl italic leading-relaxed text-ink">{meta.subtitle}</p>}

          <div className="prose-mp max-w-none">{content}</div>

          <div className="mt-14 flex items-start gap-3 rounded-xl border border-cream-300 bg-cream-100/70 p-5 text-xs leading-6 text-ink-soft">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
            <p><strong className="text-ink">来源与版权声明：</strong>本文引用的理论、书籍与案例均标注可核查来源，仅作概括与分析，不复制原文内容。标注为「编辑原创」的观点为本站立场。案例数据请以官方与权威公开资料为准。</p>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-cream-300 pt-6">
            <Link href="/articles" className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-brand-600"><ArrowLeft className="h-4 w-4" />返回文章中心</Link>
            <Link href="/marketing" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600">继续学习营销知识 <ArrowUpRight className="h-4 w-4" /></Link>
          </div>

          {related.length > 0 && (
            <section className="mt-14">
              <h2 className="font-serif text-2xl font-semibold text-ink">延伸阅读</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {related.map((a) => (
                  <Link key={a.slug} href={`/articles/${a.slug}`} className="group rounded-xl border border-cream-300 bg-white p-4 transition-all hover:border-brand-200 hover:shadow-card">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-600">{a.categoryLabel}</p>
                    <h3 className="mt-2 line-clamp-2 font-serif text-base font-semibold leading-snug text-ink group-hover:text-brand-600">{a.title}</h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-ink-muted">{a.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        <aside className="hidden lg:block">
          <nav className="sticky top-24" aria-label="文章目录">
            <p className="data-label mb-4">本文目录</p>
            <ul className="space-y-2 border-l border-cream-300">
              {toc.map((h) => (
                <li key={h.id} className={h.level === 3 ? "pl-6" : "pl-4"}>
                  <a
                    href={`#${h.id}`}
                    className={`block text-xs leading-5 transition-colors hover:text-brand-600 ${h.level === 3 ? "text-ink-muted" : "text-ink-soft font-medium"}`}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl border border-cream-300 bg-white p-4">
              <p className="data-label">文章信息</p>
              <dl className="mt-3 space-y-2 text-xs">
                <div className="flex justify-between"><dt className="text-ink-muted">栏目</dt><dd className="text-ink-soft">{meta.categoryLabel}</dd></div>
                <div className="flex justify-between"><dt className="text-ink-muted">难度</dt><dd className="text-ink-soft">{meta.level}</dd></div>
                <div className="flex justify-between"><dt className="text-ink-muted">阅读</dt><dd className="text-ink-soft">{meta.readMinutes} 分钟</dd></div>
              </dl>
            </div>
          </nav>
        </aside>
      </div>
    </>
  );
}
