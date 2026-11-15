import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { FunnelTool } from "@/components/lab/funnel-tool";

export const metadata: Metadata = createMetadata({
  title: "营销漏斗分析器",
  description: "录入各阶段人数，自动计算逐环节转化率、定位流失最大的瓶颈，并用漏斗图直观呈现。",
  path: "/lab/funnel",
});

export default function FunnelPage() {
  return (
    <>
      <PageHeader
        eyebrow="Marketing Lab · 转化优化"
        title="营销漏斗分析器"
        description="从曝光到购买，每一步都在漏人。填入各阶段人数，工具会自动算出环节转化率，指出最该优先修复的那个瓶颈，而不是让你凭感觉平均用力。"
        crumbs={[{ label: "营销实验室", href: "/lab" }, { label: "营销漏斗分析器" }]}
      />
      <div className="site-container py-10 lg:py-14">
        <FunnelTool />
      </div>
    </>
  );
}
