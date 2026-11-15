import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, BookOpen, Layers3, Compass, ChartNoAxesCombined } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { topicCategories, allTopics } from "@/data/topics";
import { methods } from "@/data/methods";
import { PageHeader } from "@/components/layout/page-header";
import { SectionHeading } from "@/components/layout/section-heading";
import { MethodIllustration } from "@/components/illustrations/method-illustrations";
import { JourneyMapSvg, ResearchFlowSvg } from "@/components/illustrations/diagrams";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = createMetadata({
  title: "营销知识中心",
  description: "系统化的中文营销知识体系：覆盖营销基础、战略、品牌、内容、搜索、社交、广告、增长、B2B、电商与数据分析，160+ 知识点逐层展开。",
  path: "/marketing",
});

export default function MarketingHubPage() {
  return (
    <>
      <PageHeader
        eyebrow="Marketing Knowledge Center"
        title="营销知识中心"
        description="一个从基础概念到高级实战的完整知识体系。每个知识点都回答：为什么重要、怎么做、步骤是什么、需要什么工具、如何衡量、常见错误是什么。"
        crumbs={[{ label: "营销知识中心" }]}
        aside={<div className="rounded-xl border border-cream-300 bg-white px-5 py-4 text-center shadow-card"><p className="stat-number">{allTopics.length}</p><p className="mt-1 text-xs text-ink-muted">个结构化知识点</p></div>}
      />

      <section className="site-container py-14 lg:py-20">
        <SectionHeading
          eyebrow="Browse by Category"
          title="十一个知识模块，一条完整学习路径"
          description="从理解市场开始，逐步走向品牌建设、用户增长与数据驱动决策。"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topicCategories.map((cat) => (
            <Link key={cat.id} href={`/marketing/${cat.id}`} className="group flex flex-col rounded-2xl border border-cream-300 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover">
              <div className="flex items-start justify-between">
                <span className="font-serif text-3xl font-bold text-cream-300 transition-colors group-hover:text-brand-200">{cat.number}</span>
                <ArrowUpRight className="h-4 w-4 text-ink-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500" />
              </div>
              <h3 className="mt-3 font-serif text-xl font-semibold text-ink">{cat.title}</h3>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-brand-600">{cat.subtitle}</p>
              <p className="mt-3 text-sm leading-6 text-ink-soft">{cat.desc}</p>
              <div className="mt-5 flex items-center gap-2 border-t border-cream-200 pt-4 text-xs text-ink-muted">
                <Layers3 className="h-3.5 w-3.5" /> {cat.topics.length} 个知识点
                <span className="mx-1 h-3 w-px bg-cream-300" />
                <BookOpen className="h-3.5 w-3.5" /> 含方法、工具与指标
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-cream-300 bg-white py-14 lg:py-20">
        <div className="site-container">
          <SectionHeading eyebrow="How to Learn" title="如何系统学习营销" description="营销知识不是零散技巧，而是一条从洞察到增长的链条。" />
          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-center">
            <ResearchFlowSvg />
            <div className="space-y-5">
              {[
                { n: "01", t: "先建立地图，再深入细节", d: "营销知识彼此关联：没有 STP 就谈不上定位，没有用户洞察就谈不上内容。先知道每个模块在链条中的位置。" },
                { n: "02", t: "每个知识点问七个问题", d: "为什么重要？是什么？怎么做？步骤是什么？需要什么工具？如何衡量？常见错误是什么？本站所有知识点都按此结构组织。" },
                { n: "03", t: "用真实业务验证", d: "知识只有被用在自己的产品、用户和数据上，才会真正变成能力。营销实验室提供可立即上手的练习工具。" },
              ].map((item) => (
                <div key={item.n} className="flex gap-4 rounded-xl border border-cream-300 bg-cream-50 p-5">
                  <span className="font-serif text-2xl font-bold text-brand-300">{item.n}</span>
                  <div><h3 className="font-serif text-lg font-semibold text-ink">{item.t}</h3><p className="mt-1.5 text-sm leading-6 text-ink-soft">{item.d}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="site-container py-14 lg:py-20">
        <SectionHeading eyebrow="Core Frameworks" title="八个必须掌握的营销模型" description="模型是思考的脚手架。点击任意方法查看可视化图解。" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {methods.map((m) => (
            <div key={m.slug} className="overflow-hidden rounded-xl border border-cream-300 bg-white shadow-card">
              <MethodIllustration type={m.illustration} className="rounded-none border-0 border-b border-cream-300" />
              <div className="p-5">
                <div className="flex items-center justify-between"><h3 className="font-serif text-xl font-semibold text-ink">{m.name}</h3><Badge variant="brand">{m.category}</Badge></div>
                <p className="mt-2 line-clamp-3 text-xs leading-5 text-ink-soft">{m.summary}</p>
                <Link href={`/marketing/${m.slug === "stp" || m.slug === "positioning" ? "strategy" : "fundamentals"}#${m.slug}`} className="link-underline mt-4 text-xs">查看知识点 <ArrowUpRight className="h-3.5 w-3.5" /></Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-cream-300 bg-white py-14 lg:py-20">
        <div className="site-container grid gap-8 lg:grid-cols-2 lg:items-center">
          <JourneyMapSvg />
          <div>
            <span className="eyebrow">From Insight to Growth</span>
            <h2 className="section-title mt-3">理解用户旅程，才能设计有效触点</h2>
            <p className="section-desc">用户从认知到拥护的路径不是一条直线，但在每个阶段，我们都需要回答同一个问题：用户此刻需要什么，我们如何帮助他前进？</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/marketing/fundamentals" className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-600">从营销基础开始 <ArrowUpRight className="h-4 w-4" /></Link>
              <Link href="/marketing/analytics" className="inline-flex items-center gap-2 rounded-xl border border-cream-300 bg-white px-5 py-3 text-sm font-semibold text-ink hover:border-brand-300">查看数据分析 <ChartNoAxesCombined className="h-4 w-4" /></Link>
            </div>
            <p className="mt-6 flex items-center gap-2 text-xs text-ink-muted"><Compass className="h-4 w-4" /> 不知道从哪开始？试试首页的营销知识地图。</p>
          </div>
        </div>
      </section>
    </>
  );
}
