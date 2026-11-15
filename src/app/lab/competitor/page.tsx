import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { CompetitorTool } from "@/components/lab/competitor-tool";

export const metadata: Metadata = createMetadata({
  title: "竞品分析工具",
  description: "并排比较多个竞品的市场定位、价格带、目标用户、优势与劣势，快速找到差异化空间。",
  path: "/lab/competitor",
});

export default function CompetitorPage() {
  return (
    <>
      <PageHeader
        eyebrow="Marketing Lab · 市场分析"
        title="竞品分析工具"
        description="竞品分析的目的不是复刻对手，而是看清自己在市场中的位置。把关键维度并排放在一起，差异化和空白机会会自然浮现。"
        crumbs={[{ label: "营销实验室", href: "/lab" }, { label: "竞品分析工具" }]}
      />
      <div className="site-container py-10 lg:py-14">
        <CompetitorTool />
      </div>
    </>
  );
}
