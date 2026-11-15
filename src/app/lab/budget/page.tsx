import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { BudgetTool } from "@/components/lab/budget-tool";

export const metadata: Metadata = createMetadata({
  title: "营销预算计算器",
  description: "输入总预算与各渠道占比，自动计算投入金额并生成可视化分配结构，快速检查资源配置是否合理。",
  path: "/lab/budget",
});

export default function BudgetPage() {
  return (
    <>
      <PageHeader
        eyebrow="Marketing Lab · 预算规划"
        title="营销预算计算器"
        description="预算分配是策略的数字化表达。填入总预算与各渠道占比，工具会自动核算金额、校验比例并绘出分配结构，帮你检查资源是否投在了真正重要的地方。"
        crumbs={[{ label: "营销实验室", href: "/lab" }, { label: "营销预算计算器" }]}
      />
      <div className="site-container py-10 lg:py-14">
        <BudgetTool />
      </div>
    </>
  );
}
