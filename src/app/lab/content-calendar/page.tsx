import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { ContentCalendarTool } from "@/components/lab/content-calendar-tool";

export const metadata: Metadata = createMetadata({
  title: "内容营销日历",
  description: "规划内容主题、渠道、负责人与发布日期，按状态筛选与编辑，并导出为可协作的 CSV 排期表。",
  path: "/lab/content-calendar",
});

export default function ContentCalendarPage() {
  return (
    <>
      <PageHeader
        eyebrow="Marketing Lab · 内容运营"
        title="内容营销日历"
        description="内容策略落地的最后一步，是把它变成有负责人、有日期、有状态的执行计划。在这里规划你的内容排期，按状态跟踪进度，并一键导出为表格。"
        crumbs={[{ label: "营销实验室", href: "/lab" }, { label: "内容营销日历" }]}
      />
      <div className="site-container py-10 lg:py-14">
        <ContentCalendarTool />
      </div>
    </>
  );
}
