"use client";

import * as React from "react";
import type { EChartsCoreOption } from "echarts/core";
import { EChart } from "@/components/charts/echart";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Notice, Panel, ResetButton, StatCard } from "./shared";

interface RoiInput {
  investment: number;
  revenue: number;
  margin: number;
  customers: number;
  aov: number;
  repeat: number;
}

const DEFAULT_INPUT: RoiInput = {
  investment: 120000,
  revenue: 480000,
  margin: 60,
  customers: 800,
  aov: 600,
  repeat: 2.5,
};

function NumberField({ label, value, onChange, suffix, hint }: { label: string; value: number; onChange: (v: number) => void; suffix?: string; hint?: string }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <div className="relative">
        <input type="number" min={0} className="field-input pr-12" value={value} onChange={(e) => onChange(Number(e.target.value) || 0)} />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint">{suffix}</span>}
      </div>
      {hint && <span className="mt-1 block text-[11px] leading-4 text-ink-faint">{hint}</span>}
    </label>
  );
}

export function RoiTool() {
  const { value: input, setValue } = useLocalStorage<RoiInput>("lab:roi", DEFAULT_INPUT);
  const set = (key: keyof RoiInput) => (v: number) => setValue((prev) => ({ ...prev, [key]: v }));

  const grossProfit = input.revenue * (input.margin / 100);
  const roi = input.investment > 0 ? ((grossProfit - input.investment) / input.investment) * 100 : 0;
  const roas = input.investment > 0 ? input.revenue / input.investment : 0;
  const cac = input.customers > 0 ? input.investment / input.customers : 0;
  const ltv = input.aov * (input.margin / 100) * input.repeat;
  const ratio = cac > 0 ? ltv / cac : 0;
  const healthy = ratio >= 3 && roi > 0;

  const option: EChartsCoreOption = React.useMemo(
    () => ({
      color: ["#D9500B", "#1E4D42"],
      tooltip: { backgroundColor: "#191C1E", borderWidth: 0, textStyle: { color: "#F7F4ED", fontSize: 12 }, trigger: "axis", axisPointer: { type: "shadow" }, valueFormatter: (v: number) => `¥${Math.round(v).toLocaleString("zh-CN")}` },
      legend: { icon: "roundRect", itemWidth: 12, itemHeight: 8, top: 0, textStyle: { color: "#4E565B", fontSize: 12 } },
      grid: { left: 56, right: 16, top: 40, bottom: 28 },
      xAxis: { type: "category", data: ["获客成本 CAC", "生命周期价值 LTV"], axisLabel: { color: "#4E565B", fontSize: 12 } },
      yAxis: { type: "value", name: "元", axisLabel: { color: "#4E565B", fontSize: 12 }, splitLine: { lineStyle: { color: "#EFE9DD" } } },
      series: [{ name: "金额", type: "bar", barMaxWidth: 60, data: [Math.round(cac), Math.round(ltv)], itemStyle: { borderRadius: [6, 6, 0, 0] } }],
    }),
    [cac, ltv]
  );

  return (
    <div className="space-y-6">
      <Notice tone="neutral">
        <strong className="text-ink">计算口径：</strong>
        ROI =（毛利 − 投入）/ 投入；ROAS = 收入 / 投入；CAC = 投入 / 新增客户数；LTV = 客单价 × 毛利率 × 累计购买次数。经验上 LTV/CAC ≥ 3 通常被视为健康，但不同行业差异很大，请结合回本周期一起看。
      </Notice>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Panel title="输入经营数据" desc="请填入同一统计周期内的数据，口径一致才有可比性。">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField label="营销投入" value={input.investment} onChange={set("investment")} suffix="元" />
            <NumberField label="销售收入" value={input.revenue} onChange={set("revenue")} suffix="元" />
            <NumberField label="毛利率" value={input.margin} onChange={set("margin")} suffix="%" />
            <NumberField label="新增客户数" value={input.customers} onChange={set("customers")} suffix="人" />
            <NumberField label="平均客单价" value={input.aov} onChange={set("aov")} suffix="元" />
            <NumberField label="生命周期购买次数" value={input.repeat} onChange={set("repeat")} suffix="次" hint="平均一个客户累计购买多少次" />
          </div>
          <div className="mt-5 flex justify-end"><ResetButton onClick={() => setValue(DEFAULT_INPUT)} /></div>
        </Panel>

        <div className="space-y-6">
          <Panel title="效率对比" desc="CAC 与 LTV 的差距越大，增长越健康。">
            <EChart option={option} height={260} />
          </Panel>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <StatCard label="ROI" value={`${roi.toFixed(1)}%`} tone={roi > 0 ? "good" : "bad"} hint="每元投入的净回报" />
            <StatCard label="ROAS" value={`${roas.toFixed(2)}x`} hint="每元投入带来的收入" />
            <StatCard label="毛利" value={`¥${(grossProfit / 10000).toFixed(1)}万`} hint="收入 × 毛利率" />
            <StatCard label="CAC" value={`¥${cac.toFixed(0)}`} hint="平均获客成本" />
            <StatCard label="LTV" value={`¥${ltv.toFixed(0)}`} hint="客户生命周期价值" />
            <StatCard label="LTV / CAC" value={`${ratio.toFixed(2)}x`} tone={ratio >= 3 ? "good" : ratio >= 1 ? "warn" : "bad"} hint="健康线通常 ≥ 3" />
          </div>
          <div className={`rounded-xl border px-5 py-4 text-sm leading-7 ${healthy ? "border-forest/20 bg-forest/[0.06] text-forest" : "border-[#B23C0D]/20 bg-[#B23C0D]/[0.06] text-[#8E3012]"}`}>
            <strong className="font-semibold">{healthy ? "当前结构健康" : "当前结构需要警惕"}</strong>
            <span className="ml-2">
              {healthy
                ? "LTV/CAC 达到经验健康线且 ROI 为正，可考虑在可控范围内加大投入。"
                : "LTV/CAC 偏低或 ROI 为负，建议先优化转化与留存，再扩大投放规模。"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
