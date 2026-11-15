import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { PersonaTool } from "@/components/lab/persona-tool";

export const metadata: Metadata = createMetadata({
  title: "用户画像生成器",
  description: "把访谈、问卷与行为数据整理成结构化的用户画像：基本信息、核心目标、主要痛点、购买触发点与信息渠道。",
  path: "/lab/persona",
});

export default function PersonaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Marketing Lab · 用户洞察"
        title="用户画像生成器"
        description="一个好画像不是人口统计的堆砌，而是对「用户想完成什么、被什么阻碍、在哪里做决定」的清晰描述。填写右侧信息，即时生成可复制的画像卡片。"
        crumbs={[{ label: "营销实验室", href: "/lab" }, { label: "用户画像生成器" }]}
      />
      <div className="site-container py-10 lg:py-14">
        <PersonaTool />
      </div>
    </>
  );
}
