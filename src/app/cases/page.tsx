import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { cases } from "@/data/cases";
import { PageHeader } from "@/components/layout/page-header";
import { CaseBrowser } from "@/components/cases/case-browser";

export const metadata: Metadata = createMetadata({
  title: "全球营销案例研究",
  description: "系统拆解 Apple、Nike、Airbnb、Duolingo、星巴克、小米等品牌的营销实践，严格区分公开事实、媒体报道、企业宣传与编辑分析。",
  path: "/cases",
});

export default function CasesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Case Studies"
        title="全球营销案例研究"
        description="不是故事会，而是可拆解的学习样本。每个案例覆盖背景、问题、目标、策略、执行、效果、成功因素、局限与可复制方法。"
        crumbs={[{ label: "营销案例" }]}
        aside={<div className="rounded-xl border border-cream-300 bg-white px-5 py-4 text-center shadow-card"><p className="stat-number">{cases.length}</p><p className="mt-1 text-xs text-ink-muted">个深度案例</p></div>}
      />
      <div className="site-container py-12 lg:py-16">
        <div className="mb-8 flex items-start gap-3 rounded-xl border border-cream-300 bg-cream-100/60 p-5">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-[11px] font-bold text-white">i</span>
          <p className="text-xs leading-6 text-ink-soft">
            <strong className="text-ink">编辑原则：</strong>案例中的「效果与数据」仅采用可核查的公开信息，并明确标注来源类型。我们区分公开事实、媒体报道、企业宣传与编辑分析，不编造效果数字，不把相关性当作因果。
          </p>
        </div>
        <CaseBrowser cases={cases} />
      </div>
    </>
  );
}
