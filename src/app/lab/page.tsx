import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FlaskConical, HardDriveDownload } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { labTools } from "@/data/lab-tools";
import { PageHeader } from "@/components/layout/page-header";
import { SectionHeading } from "@/components/layout/section-heading";
import { ChartGallery } from "@/components/charts/chart-gallery";

export const metadata: Metadata = createMetadata({
  title: "营销实验室",
  description: "用交互式工具把营销方法变成可操作的测算：用户画像、竞品分析、SWOT、预算分配、ROI/CAC/LTV、漏斗诊断与内容日历。",
  path: "/lab",
});

export default function LabPage() {
  return (
    <>
      <PageHeader
        eyebrow="Marketing Lab"
        title="营销实验室"
        description="把方法变成可操作的工具。填写你的数据，立即得到结构化的分析、测算与图表——所有工具都可以在浏览器本地使用。"
        crumbs={[{ label: "营销实验室" }]}
        aside={
          <div className="rounded-xl border border-cream-300 bg-white px-6 py-4 text-center shadow-card">
            <p className="stat-number">{labTools.length}</p>
            <p className="mt-1 text-xs text-ink-muted">个交互工具</p>
          </div>
        }
      />

      <div className="site-container py-12 lg:py-16">
        <div className="mb-10 flex items-start gap-3 rounded-xl border border-brand-100 bg-brand-50 px-5 py-4">
          <FlaskConical className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
          <p className="text-xs leading-6 text-brand-800">
            <strong className="font-semibold">关于数据与隐私：</strong>你在工具中输入的内容只保存在当前浏览器的本地存储中，不会上传到服务器。预填的示例数据仅用于演示，请替换为你自己的数据后再做判断。
          </p>
        </div>

        <SectionHeading
          eyebrow="Tools"
          title="选择一个工具开始"
          description="每个工具都给出明确的计算口径和使用说明，帮助你把直觉判断变成可复核的分析过程。"
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {labTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex flex-col rounded-2xl border border-cream-300 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <tool.icon className="h-5 w-5" />
                </span>
                <span className="tag-chip">{tool.category}</span>
              </div>
              <h3 className="mt-5 font-serif text-lg font-semibold text-ink group-hover:text-brand-600">{tool.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-ink-muted">{tool.detail}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600">
                打开工具 <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex items-start gap-3 rounded-xl border border-cream-300 bg-cream-100/60 p-5">
          <HardDriveDownload className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" />
          <p className="text-xs leading-6 text-ink-soft">
            <strong className="text-ink">关于演示图表：</strong>本页下方的图表与「内容营销日历」的导出结果均为演示数据，用于展示可视化方法与字段结构，不代表任何真实商业结果。
          </p>
        </div>

        <div className="mt-16 border-t border-cream-300 pt-12">
          <SectionHeading
            eyebrow="Visualization"
            title="用图表理解指标关系"
            description="这些是实验室内置的演示图表，帮助你在填写真实数据前，先理解各指标之间大致的关系形态。"
          />
          <div className="mt-8">
            <ChartGallery ids={["funnel", "cac-ltv"]} height={300} />
          </div>
        </div>
      </div>
    </>
  );
}
