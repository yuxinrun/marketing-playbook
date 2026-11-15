import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { websiteResources } from "@/data/websites";
import { PageHeader } from "@/components/layout/page-header";
import { WebsiteBrowser } from "@/components/websites/website-browser";

export const metadata: Metadata = createMetadata({
  title: "全球营销网站资源库",
  description: "精选营销研究、实战学习、数据案例与中国市场权威网站，包含官方网址、定位、核心功能、适用人群与推荐理由。",
  path: "/websites",
});

export default function WebsitesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Marketing Resources"
        title="全球营销网站资源库"
        description="从 AMA、Think with Google 到 Semrush、DataReportal，再到巨量引擎与 QuestMobile。每个网站都标明官方网址、定位、功能与适用人群。"
        crumbs={[{ label: "网站资源" }]}
        aside={<div className="rounded-xl border border-cream-300 bg-white px-5 py-4 text-center shadow-card"><p className="stat-number">{websiteResources.length}</p><p className="mt-1 text-xs text-ink-muted">个优质网站</p></div>}
      />
      <div className="site-container py-12 lg:py-16">
        <WebsiteBrowser sites={websiteResources} />
        <p className="mt-10 rounded-xl border border-cream-300 bg-cream-100/60 p-5 text-xs leading-6 text-ink-muted">
          <strong className="text-ink">链接与收费说明：</strong>本站仅收录可识别的官方网站地址，不编造网站。免费或付费信息仅作概览，可能随平台政策变化，请在实际使用前以官网最新说明为准。
        </p>
      </div>
    </>
  );
}
