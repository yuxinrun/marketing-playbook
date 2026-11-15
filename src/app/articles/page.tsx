import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { articles } from "@/data/articles";
import { PageHeader } from "@/components/layout/page-header";
import { ArticleBrowser } from "@/components/articles/article-browser";

export const metadata: Metadata = createMetadata({
  title: "深度文章中心",
  description: "系统、深入、可执行的中文营销深度文章：理论、案例、步骤、模板、常见错误与行动清单。",
  path: "/articles",
});

export default function ArticlesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Articles & Essays"
        title="深度文章中心"
        description="每一篇都试图回答：为什么重要、应该怎么做、具体步骤是什么、如何衡量、常见错误是什么。拒绝空洞的通用内容。"
        crumbs={[{ label: "深度文章" }]}
        aside={<div className="rounded-xl border border-cream-300 bg-white px-5 py-4 text-center shadow-card"><p className="stat-number">{articles.length}</p><p className="mt-1 text-xs text-ink-muted">篇深度文章</p></div>}
      />
      <div className="site-container py-12 lg:py-16">
        <ArticleBrowser articles={articles} />
      </div>
    </>
  );
}
