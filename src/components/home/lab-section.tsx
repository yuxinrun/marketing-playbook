import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ChartGallery } from "@/components/charts/chart-gallery";
import { SectionHeading } from "@/components/layout/section-heading";
import { labTools } from "@/data/lab-tools";

export function LabSection() {
  return (
    <section className="border-t border-cream-300 bg-white py-16 lg:py-24">
      <div className="site-container">
        <SectionHeading
          eyebrow="Marketing Lab"
          title="营销实验室：把方法变成可操作的工具"
          description="交互式工具与真实 ECharts 图表，帮助你把策略变成测算、把数据变成判断。所有示例数据均明确标注为演示。"
          href="/lab"
          linkLabel="进入实验室"
        />

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {labTools.map((t) => (
            <Link key={t.href} href={t.href} className="group flex items-center gap-3 rounded-xl border border-cream-300 bg-cream-50 p-4 transition-all hover:border-brand-200 hover:bg-white hover:shadow-card">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <t.icon className="h-[18px] w-[18px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-ink group-hover:text-brand-600">{t.title}</span>
                <span className="mt-0.5 block truncate text-[11px] text-ink-muted">{t.desc}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-faint group-hover:text-brand-500" />
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <ChartGallery ids={["funnel", "cac-ltv"]} height={280} />
        </div>
      </div>
    </section>
  );
}
