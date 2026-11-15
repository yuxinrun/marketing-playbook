"use client";

import * as React from "react";
import type { EChartsCoreOption } from "echarts/core";
import { Plus, Trash2, AlertTriangle } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { EChart } from "@/components/charts/echart";
import { CHART_PALETTE } from "@/lib/chart-options";
import { Notice, Panel, ResetButton } from "./shared";

interface Stage {
  id: string;
  name: string;
  value: number;
}

const DEFAULT_STAGES: Stage[] = [
  { id: "s1", name: "曝光", value: 100000 },
  { id: "s2", name: "点击", value: 12000 },
  { id: "s3", name: "访问", value: 9600 },
  { id: "s4", name: "注册", value: 1920 },
  { id: "s5", name: "购买", value: 288 },
];

export function FunnelTool() {
  const { value: stages, setValue } = useLocalStorage<Stage[]>("lab:funnel", DEFAULT_STAGES);

  function update(id: string, key: keyof Omit<Stage, "id">, v: string) {
    setValue((prev) => prev.map((s) => (s.id === id ? { ...s, [key]: key === "value" ? Number(v) || 0 : v } : s)));
  }
  function add() {
    setValue((prev) => [...prev, { id: Math.random().toString(36).slice(2, 9), name: `阶段 ${prev.length + 1}`, value: 0 }]);
  }
  function remove(id: string) {
    setValue((prev) => prev.filter((s) => s.id !== id));
  }

  const steps = stages.slice(1).map((s, i) => {
    const prev = stages[i];
    const rate = prev.value > 0 ? (s.value / prev.value) * 100 : 0;
    return { from: prev.name || `阶段${i + 1}`, to: s.name || `阶段${i + 2}`, value: s.value, rate, lost: Math.max(prev.value - s.value, 0) };
  });
  const worst = steps.length ? steps.reduce((a, b) => (b.rate < a.rate ? b : a)) : null;

  const option: EChartsCoreOption = React.useMemo(
    () => ({
      color: CHART_PALETTE,
      tooltip: { backgroundColor: "#191C1E", borderWidth: 0, textStyle: { color: "#F7F4ED", fontSize: 12 }, trigger: "item", formatter: "{b}<br/>{c} 人" },
      series: [
        {
          type: "funnel",
          left: "6%",
          top: 16,
          bottom: 16,
          width: "88%",
          min: 0,
          minSize: "18%",
          maxSize: "100%",
          sort: "descending",
          gap: 3,
          label: { show: true, position: "inside", color: "#fff", fontWeight: 600, formatter: "{b} {c}" },
          itemStyle: { borderColor: "#fff", borderWidth: 2 },
          data: stages.filter((s) => s.value > 0).map((s) => ({ value: s.value, name: s.name || "未命名" })),
        },
      ],
    }),
    [stages]
  );

  return (
    <div className="space-y-6">
      <Notice tone="neutral">
        <strong className="text-ink">诊断口径：</strong>漏斗的每一步应以「同一批人、同一时间窗口」为口径，否则转化率会失真。找流失最大的环节时，既看绝对流失量，也看环节转化率——最该优先修的通常是转化率最低且体量不小的那一步。
      </Notice>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Panel title="漏斗阶段" desc="按从大到小的顺序填写各阶段人数。可增删阶段。">
          <div className="space-y-2">
            {stages.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2 rounded-lg border border-cream-300 bg-cream-50 p-2">
                <span className="w-5 shrink-0 text-center text-xs font-semibold text-ink-faint">{i + 1}</span>
                <input className="min-w-0 flex-1 bg-transparent px-1 text-sm text-ink outline-none" value={s.name} onChange={(e) => update(s.id, "name", e.target.value)} aria-label="阶段名称" />
                <input type="number" min={0} className="w-24 rounded-md border border-cream-300 bg-white px-2 py-1 text-right text-sm tabular-nums text-ink outline-none focus:border-brand-400" value={s.value} onChange={(e) => update(s.id, "value", e.target.value)} aria-label={`${s.name} 人数`} />
                <button type="button" onClick={() => remove(s.id)} className="rounded p-1 text-ink-faint transition-colors hover:text-brand-600" aria-label={`删除 ${s.name}`}>
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={add} className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-brand-300 bg-brand-50/50 px-3 py-2 text-xs font-medium text-brand-600 transition-colors hover:bg-brand-50">
            <Plus className="h-3.5 w-3.5" /> 添加阶段
          </button>
          <div className="mt-5 flex justify-end"><ResetButton onClick={() => setValue(DEFAULT_STAGES)} /></div>
        </Panel>

        <div className="space-y-6">
          <Panel title="漏斗可视化" desc="图表仅绘制人数大于 0 的阶段，按数值自动排序。">
            <EChart option={option} height={320} />
          </Panel>
          {worst && (
            <div className="flex items-start gap-3 rounded-xl border border-brand-100 bg-brand-50 px-5 py-4">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <p className="text-xs leading-6 text-brand-800">
                <strong className="font-semibold">最大流失环节：{worst.from} → {worst.to}</strong>
                <br />
                环节转化率仅 {worst.rate.toFixed(1)}%，流失 {worst.lost.toLocaleString("zh-CN")} 人。建议优先针对这一步设计实验，而不是平均用力优化全链路。
              </p>
            </div>
          )}
        </div>
      </div>

      <Panel title="逐环节转化率" desc="从上一阶段到本阶段的转化情况，用来定位瓶颈与优先级。">
        <div className="overflow-x-auto rounded-xl border border-cream-300">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead className="bg-cream-100 text-xs text-ink-muted">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">环节</th>
                <th className="px-4 py-3 text-right font-semibold">本阶段人数</th>
                <th className="px-4 py-3 text-right font-semibold">环节转化率</th>
                <th className="px-4 py-3 text-right font-semibold">流失人数</th>
              </tr>
            </thead>
            <tbody>
              {steps.map((s, i) => (
                <tr key={i} className="border-t border-cream-200">
                  <td className="px-4 py-3 text-ink-soft">{s.from} → {s.to}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-ink-soft">{s.value.toLocaleString("zh-CN")}</td>
                  <td className={`px-4 py-3 text-right font-semibold tabular-nums ${worst && i === steps.indexOf(worst) ? "text-[#B23C0D]" : "text-ink"}`}>{s.rate.toFixed(1)}%</td>
                  <td className="px-4 py-3 text-right tabular-nums text-ink-muted">{s.lost.toLocaleString("zh-CN")}</td>
                </tr>
              ))}
              {steps.length === 0 && <tr><td colSpan={4} className="px-4 py-6 text-center text-xs text-ink-faint">至少填写两个阶段才能计算转化率。</td></tr>}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
