import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { SwotTool } from "@/components/lab/swot-tool";

export const metadata: Metadata = createMetadata({
  title: "SWOT 分析工具",
  description: "把内部优势劣势与外部机会威胁放进四象限，并通过交叉策略 checklist 把分析变成行动。",
  path: "/lab/swot",
});

export default function SwotPage() {
  return (
    <>
      <PageHeader
        eyebrow="Marketing Lab · 战略分析"
        title="SWOT 分析工具"
        description="SWOT 的价值不在于罗列清单，而在于交叉推导出策略。用四象限整理现状，再用 SO / ST / WO / WT 四组问题把判断变成下一步行动。"
        crumbs={[{ label: "营销实验室", href: "/lab" }, { label: "SWOT 分析" }]}
      />
      <div className="site-container py-10 lg:py-14">
        <SwotTool />
      </div>
    </>
  );
}
