import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, ExternalLink, CircleHelp, Target, Users, Flag, Layers3, Megaphone, Lightbulb, Play, BarChart3, CheckCircle2, AlertTriangle, Copy, Ban, BookOpen } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { cases, caseBySlug } from "@/data/cases";
import { PageHeader } from "@/components/layout/page-header";
import { SmartImage } from "@/components/ui/smart-image";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = caseBySlug[slug];
  if (!c) return {};
  return createMetadata({ title: `${c.brand} 营销案例`, description: c.summary, path: `/cases/${slug}`, image: c.cover });
}

const sourceColors: Record<string, string> = {
  "公开事实": "bg-forest/10 text-forest border-forest/20",
  "媒体报道": "bg-navy/5 text-navy border-navy/15",
  "企业宣传": "bg-brand-50 text-brand-700 border-brand-100",
  "编辑分析": "bg-cream-200 text-ink-soft border-cream-300",
};

function Block({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-cream-200 pb-8 last:border-0">
      <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-ink"><Icon className="h-[18px] w-[18px] text-brand-500" />{title}</h2>
      <p className="mt-3 text-[15px] leading-8 text-ink-soft">{children}</p>
    </section>
  );
}

export default async function CaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = caseBySlug[slug];
  if (!c) notFound();

  return (
    <>
      <PageHeader
        eyebrow={`${c.industry} · ${c.region} · ${c.year}`}
        title={c.title}
        description={c.summary}
        crumbs={[{ label: "营销案例", href: "/cases" }, { label: c.brand }]}
        aside={<div className="rounded-xl border border-cream-300 bg-white px-6 py-4 text-center shadow-card"><p className="font-serif text-2xl font-bold text-brand-600">{c.brand}</p><p className="mt-1 text-xs text-ink-muted">{c.industry}</p></div>}
      />

      <div className="site-container py-10 lg:py-14">
        <SmartImage src={c.cover} alt={`${c.brand} 案例配图：${c.title}`} className="aspect-[21/9] rounded-2xl border border-cream-300" priority sizes="(max-width: 1024px) 100vw, 90vw" />
        <p className="mt-2 text-[11px] text-ink-muted">配图：{c.coverCredit}，仅作主题示意，非品牌官方素材。</p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px] lg:gap-14">
          <article className="min-w-0 space-y-8">
            <div className="flex items-start gap-3 rounded-xl border border-cream-300 bg-cream-100/70 p-5">
              <CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
              <p className="text-xs leading-6 text-ink-soft">
                <strong className="text-ink">如何阅读本案例：</strong>「背景」「问题」「渠道」等描述基于公开资料整理；「效果与数据」仅引用可核查信息；「成功因素」「可复制方法」「不适合照搬的部分」为本站编辑分析。文末列出全部参考资料与来源类型。
              </p>
            </div>

            <div className="flex flex-wrap gap-2">{c.tags.map((t) => <Badge key={t} variant="brand">{t}</Badge>)}</div>

            <div className="space-y-8 rounded-2xl border border-cream-300 bg-white p-6 sm:p-8">
              <Block icon={Layers3} title="1. 品牌和市场背景">{c.background}</Block>
              <Block icon={CircleHelp} title="2. 当时面临的问题">{c.problem}</Block>
              <Block icon={Users} title="3. 目标用户">{c.audience}</Block>
              <Block icon={Flag} title="4. 营销目标">{c.goal}</Block>
              <Block icon={Target} title="5. 核心策略">{c.strategy}</Block>

              <section className="border-b border-cream-200 pb-8">
                <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-ink"><Megaphone className="h-[18px] w-[18px] text-brand-500" />6. 渠道选择</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {c.channels.map((ch) => (
                    <div key={ch.name} className="rounded-xl border border-cream-300 bg-cream-50 p-4">
                      <p className="text-sm font-semibold text-ink">{ch.name}</p>
                      <p className="mt-1 text-xs leading-5 text-ink-muted">{ch.role}</p>
                    </div>
                  ))}
                </div>
              </section>

              <Block icon={Lightbulb} title="7. 创意和传播方式">{c.creative}</Block>
              <Block icon={Play} title="8. 执行过程">{c.execution}</Block>
              <Block icon={BarChart3} title="9. 效果与数据">{c.results}</Block>

              <section className="border-b border-cream-200 pb-8">
                <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-ink"><CheckCircle2 className="h-[18px] w-[18px] text-brand-500" />10. 成功因素</h2>
                <ul className="mt-4 space-y-2.5">{c.successFactors.map((f) => <li key={f} className="flex gap-3 text-sm leading-6 text-ink-soft"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />{f}</li>)}</ul>
              </section>

              <Block icon={AlertTriangle} title="11. 局限与风险">{c.limitations}</Block>

              <section className="border-b border-cream-200 pb-8">
                <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-ink"><Copy className="h-[18px] w-[18px] text-brand-500" />12. 可以复制的营销方法</h2>
                <ul className="mt-4 space-y-2.5">{c.replicable.map((f) => <li key={f} className="flex gap-3 text-sm leading-6 text-ink-soft"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />{f}</li>)}</ul>
              </section>

              <section>
                <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-ink"><Ban className="h-[18px] w-[18px] text-brand-500" />13. 不适合照搬的部分</h2>
                <ul className="mt-4 space-y-2.5">{c.notToCopy.map((f) => <li key={f} className="flex gap-3 text-sm leading-6 text-ink-soft"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />{f}</li>)}</ul>
              </section>
            </div>

            <section className="rounded-2xl border border-cream-300 bg-white p-6">
              <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-ink"><BookOpen className="h-[18px] w-[18px] text-brand-500" />14. 参考资料和来源</h2>
              <ul className="mt-4 space-y-3">
                {c.sources.map((s) => (
                  <li key={s.url} className="flex flex-wrap items-center gap-2 text-sm">
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-brand-600 hover:underline">{s.label}<ExternalLink className="h-3 w-3" /></a>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] ${sourceColors[s.type]}`}>{s.type}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="flex items-center justify-between border-t border-cream-300 pt-6">
              <Link href="/cases" className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-brand-600"><ArrowLeft className="h-4 w-4" />返回案例库</Link>
              <Link href="/marketing" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600">学习相关理论 <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          </article>

          <aside>
            <div className="sticky top-24 space-y-4">
              <div className="rounded-xl border border-cream-300 bg-white p-5">
                <p className="data-label">案例概览</p>
                <dl className="mt-4 space-y-3 text-xs">
                  <div className="flex justify-between gap-3"><dt className="text-ink-muted">品牌</dt><dd className="text-right text-ink-soft">{c.brand}</dd></div>
                  <div className="flex justify-between gap-3"><dt className="text-ink-muted">行业</dt><dd className="text-right text-ink-soft">{c.industry}</dd></div>
                  <div className="flex justify-between gap-3"><dt className="text-ink-muted">地区</dt><dd className="text-right text-ink-soft">{c.region}</dd></div>
                  <div className="flex justify-between gap-3"><dt className="text-ink-muted">时间</dt><dd className="text-right text-ink-soft">{c.year}</dd></div>
                </dl>
              </div>
              <div className="rounded-xl border border-brand-100 bg-brand-50/60 p-5">
                <p className="data-label text-brand-700">一句话结论</p>
                <p className="mt-3 font-serif text-base leading-7 text-ink">{c.summary}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
