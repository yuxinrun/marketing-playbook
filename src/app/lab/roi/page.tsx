import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { RoiTool } from "@/components/lab/roi-tool";

export const metadata: Metadata = createMetadata({
  title: "ROI / CAC / LTV 测算工具",
  description: "输入投入、收入、毛利率与获客数据，即时测算 ROI、ROAS、CAC、LTV 及其比值，判断增长是否健康。",
  path: "/lab/roi",
});

export default function RoiPage() {
  return (
    <>
      <PageHeader
        eyebrow="Marketing Lab · 效果评估"
        title="ROI / CAC / LTV 测算工具"
        description="增长是否健康，不能只看收入涨没涨。输入同一周期的投入与产出数据，工具会算出回报率、获客成本与客户终身价值，帮你判断该加码还是该先修补漏桶。"
        crumbs={[{ label: "营销实验室", href: "/lab" }, { label: "ROI / CAC / LTV" }]}
      />
      <div className="site-container py-10 lg:py-14">
        <RoiTool />
      </div>
    </>
  );
}
