import Link from "next/link";
import { ArrowUpRight, Clock, BookOpen } from "lucide-react";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { site, siteStats } from "@/data/site";
import { featuredArticles } from "@/data/articles";
import { Hero } from "@/components/home/hero";
import { KnowledgeMap } from "@/components/home/knowledge-map";
import { MethodsExplorer } from "@/components/home/methods-explorer";
import { PracticeSection } from "@/components/home/practice-section";
import { CasesSection } from "@/components/home/cases-section";
import { ResourcesSection } from "@/components/home/resources-section";
import { LabSection } from "@/components/home/lab-section";
import { InspirationCard } from "@/components/home/inspiration-card";
import { SectionHeading } from "@/components/layout/section-heading";
import { SmartImage } from "@/components/ui/smart-image";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = createMetadata({
  title: `${site.name} · ${site.brand}`,
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: site.name,
            alternateName: site.brand,
            url: site.url,
            description: site.description,
            inLanguage: "zh-CN",
          }),
        }}
      />

      <Hero />

      <section className="border-b border-cream-300 bg-white">
        <div className="site-container grid grid-cols-2 divide-x divide-cream-300 lg:grid-cols-4">
          {siteStats.map((stat) => (
            <div key={stat.label} className="px-2 py-7 text-center lg:py-9">
              <p className="stat-number">{stat.value}</p>
              <p className="mt-1 text-xs font-medium text-ink-soft lg:text-sm">{stat.label}</p>
              {stat.unit && <p className="text-[10px] text-ink-muted">{stat.unit}</p>}
            </div>
          ))}
        </div>
      </section>

      <KnowledgeMap />
      <MethodsExplorer />
      <PracticeSection />

      <section className="border-y border-cream-300 bg-cream-100/60 py-16 lg:py-24">
        <div className="site-container">
          <SectionHeading
            eyebrow="Editor's Picks"
            title="深度文章：把问题讲透"
            description="像商业杂志与资深顾问共同撰写的教程：有理论、有案例、有步骤，也有常见错误与行动清单。"
            href="/articles"
            linkLabel="文章中心"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.slice(0, 3).map((article) => (
              <Link key={article.slug} href={`/articles/${article.slug}`} className="group overflow-hidden rounded-2xl border border-cream-300 bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <SmartImage
                  src={article.cover ?? ""}
                  alt={article.title}
                  className="aspect-[16/9]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] text-ink-muted">
                    <Badge variant="brand">{article.categoryLabel}</Badge>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readMinutes} 分钟</span>
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-semibold leading-snug text-ink group-hover:text-brand-600">{article.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-soft">{article.excerpt}</p>
                  <span className="link-underline mt-5 text-xs">阅读文章 <ArrowUpRight className="h-3.5 w-3.5" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CasesSection />
      <ResourcesSection />
      <LabSection />
      <InspirationCard />

      <section className="site-container pb-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-cream-300 bg-cream-100/60 p-8 sm:flex-row sm:items-center lg:p-10">
          <div>
            <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600">
              <BookOpen className="h-4 w-4" /> Start Here
            </span>
            <h2 className="mt-3 font-serif text-2xl font-semibold text-ink sm:text-3xl">从理解市场开始，到真正实现增长。</h2>
            <p className="mt-2 text-sm text-ink-soft">{site.sloganEn}</p>
          </div>
          <Link href="/marketing" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy">
            开始系统学习 <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
