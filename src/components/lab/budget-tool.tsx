"use client";

import * as React from "react";
import type { EChartsCoreOption } from "echarts/core";
import { Plus, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { EChart } from "@/components/charts/echart";
import { CHART_PALETTE } from "@/lib/chart-options";
import { Notice, Panel, ResetButton, StatCard } from "./shared";

interface Channel {
  id: string;
  name: string;
  percent: number;
}

const DEFAULT_CHANNELS: Channel[] = [
  { id: "a", name: "内容营销", percent: 35 },
  { id: "b", name: "搜索广告", percent: 25 },
  { id: "c", name: "社交媒体", percent: 18 },
  { id: "d", name: "达人合作", percent: 12 },
  { id: "e", name: "邮件与私域", percent: 10 },
];
const DEFAULT_TOTAL = 100000;

export function BudgetTool() {
  const { value: channels, setValue: setChannels } = useLocalStorage<Channel[]>("lab:budget:channels", DEFAULT_CHANNELS);
  const { value: total, setValue: setTotal } = useLocalStorage<number>("lab:budget:total", DEFAULT_TOTAL);

  const sum = channels.reduce((acc, c) => acc + (Number(c.percent) || 0), 0);
  const valid = Math.abs(sum - 100) < 0.01;

  function update(id: string, key: keyof Omit<Channel, "id">, v: string) {
    setChannels((prev) => prev.map((c) => (c.id === id ? { ...c, [key]: key === "percent" ? Number(v) || 0 : v } : c)));
  }
  function add() {
    setChannels((prev) => [...prev, { id: Math.random().toString(36).slice(2, 9), name: `新渠道 ${prev.length + 1}`, percent: 0 }]);
  }
  function remove(id: string) {
    setChannels((prev) => prev.filter((c) => c.id !== id));
  }

  const option: EChartsCoreOption = React.useMemo(
    () => ({
      color: CHART_PALETTE,
      tooltip: {
        backgroundColor: "#191C1E",
        borderWidth: 0,
        textStyle: { color: "#F7F4ED", fontSize: 12 },
        trigger: "item",
        formatter: (p: { name: string; value: number; percent: number }) => `${p.name}<br/>${p.value}% · ¥${(((p.value || 0) / 100) * total).toLocaleString("zh-CN")}`,
      },
      legend: { icon: "roundRect", itemWidth: 12, itemHeight: 8, orient: "vertical", right: 8, top: "center", textStyle: { color: "#4E565B", fontSize: 12 } },
      series: [
        {
          type: "pie",
          radius: ["46%", "70%"],
          center: ["35%", "50%"],
          avoidLabelOverlap: true,
          itemStyle: { borderColor: "#fff", borderWidth: 3 },
          label: { show: false },
          emphasis: { label: { show: true, fontSize: 14, fontWeight: "bold" } },
          data: channels.map((c) => ({ value: Number(c.percent) || 0, name: c.name || "未命名" })),
        },
      ],
    }),
    [channels, total]
  );

  return (
    <div className="space-y-6">
      <Notice tone="neutral">
        <strong className="text-ink">计算口径：</strong>各渠道占比之和应等于 100%。预算分配没有标准答案，应按「目标 → 渠道效率 → 边际回报」推导，并保留 10%–20% 的机动预算应对测试与波动。
      </Notice>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Panel title="预算设置" desc="输入总预算与各渠道占比，下方自动计算金额并绘图。">
          <label className="block">
            <span className="field-label">营销总预算（元）</span>
            <input type="number" min={0} className="field-input" value={total} onChange={(e) => setTotal(Number(e.target.value) || 0)} />
          </label>

          <div className="mt-5 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-ink">渠道分配</h3>
            <button type="button" onClick={add} className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:underline">
              <Plus className="h-3.5 w-3.5" /> 添加渠道
            </button>
          </div>

          <div className="mt-3 space-y-2">
            {channels.map((c) => (
              <div key={c.id} className="flex items-center gap-2 rounded-lg border border-cream-300 bg-cream-50 p-2">
                <input
                  className="min-w-0 flex-1 bg-transparent px-1 text-sm text-ink outline-none"
                  value={c.name}
                  onChange={(e) => update(c.id, "name", e.target.value)}
                  aria-label="渠道名称"
                />
                <input
                  type="number"
                  min={0}
                  max={100}
                  className="w-16 rounded-md border border-cream-300 bg-white px-2 py-1 text-right text-sm tabular-nums text-ink outline-none focus:border-brand-400"
                  value={c.percent}
                  onChange={(e) => update(c.id, "percent", e.target.value)}
                  aria-label={`${c.name} 占比`}
                />
                <span className="w-4 text-xs text-ink-muted">%</span>
                <span className="w-24 shrink-0 text-right text-xs font-medium tabular-nums text-ink-soft">
                  ¥{((Number(c.percent) || 0) / 100 * total).toLocaleString("zh-CN", { maximumFractionDigits: 0 })}
                </span>
                <button type="button" onClick={() => remove(c.id)} className="rounded p-1 text-ink-faint transition-colors hover:text-brand-600" aria-label={`删除 ${c.name}`}>
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className={`mt-4 flex items-center justify-between rounded-lg px-4 py-3 text-sm ${valid ? "bg-forest/10 text-forest" : "bg-[#B23C0D]/10 text-[#B23C0D]"}`}>
            <span className="font-medium">占比合计</span>
            <span className="font-semibold tabular-nums">{sum.toFixed(0)}% {valid ? "✓ 分配有效" : `（需为 100%，还差 ${(100 - sum).toFixed(0)}%）`}</span>
          </div>
          <div className="mt-4 flex justify-end"><ResetButton onClick={() => { setChannels(DEFAULT_CHANNELS); setTotal(DEFAULT_TOTAL); }} /></div>
        </Panel>

        <div className="space-y-6">
          <Panel title="分配结构" desc="图表随输入实时更新，用于直观检查资源是否过度集中。">
            <EChart option={option} height={300} />
          </Panel>
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="总预算" value={`¥${total.toLocaleString("zh-CN")}`} hint="所有渠道金额之和" />
            <StatCard label="渠道数量" value={String(channels.length)} hint="建议控制在 3–6 个" tone={channels.length > 8 ? "warn" : "ink"} />
          </div>
        </div>
      </div>
    </div>
  );
}
