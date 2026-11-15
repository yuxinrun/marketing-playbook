"use client";

import { EChart } from "./echart";
import { chartDefinitions, chartById } from "@/lib/chart-options";
import { cn } from "@/lib/utils";

interface ChartGalleryProps {
  ids?: string[];
  columns?: 1 | 2;
  height?: number;
  showNote?: boolean;
  className?: string;
}

export function ChartGallery({ ids, columns = 2, height = 300, showNote = true, className }: ChartGalleryProps) {
  const charts = ids ? ids.map((id) => chartById[id]).filter(Boolean) : chartDefinitions;

  return (
    <div className={cn("space-y-5", className)}>
      {showNote && (
        <div className="flex items-center gap-2 rounded-lg border border-brand-100 bg-brand-50 px-4 py-2.5 text-xs text-brand-700">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white">i</span>
          以下图表均为演示数据，仅用于展示指标关系与可视化方法，不代表任何真实商业结果。
        </div>
      )}
      <div className={cn("grid gap-5", columns === 2 ? "lg:grid-cols-2" : "grid-cols-1")}>
        {charts.map((chart) => (
          <div key={chart.id} className="rounded-2xl border border-cream-300 bg-white p-5 shadow-card">
            <div className="mb-1 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-serif text-lg font-semibold text-ink">{chart.title}</h3>
                <p className="mt-1 text-xs leading-5 text-ink-muted">{chart.desc}</p>
              </div>
              <span className="tag-chip shrink-0">单位：{chart.unit}</span>
            </div>
            <EChart option={chart.option} height={height} />
          </div>
        ))}
      </div>
    </div>
  );
}
