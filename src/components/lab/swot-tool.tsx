"use client";

import * as React from "react";
import { Plus, X } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Notice, ResetButton } from "./shared";

type Quadrant = "S" | "W" | "O" | "T";
type SwotData = Record<Quadrant, string[]>;

const DEFAULT_SWOT: SwotData = {
  S: ["产品体验设计能力强", "核心用户口碑好，复购稳定"],
  W: ["品牌知名度低", "内容生产能力有限"],
  O: ["细分人群需求尚未被满足", "新渠道流量成本下降"],
  T: ["头部品牌加速下沉", "用户注意力持续碎片化"],
};

const QUADRANTS: { key: Quadrant; title: string; subtitle: string; tone: string; dot: string }[] = [
  { key: "S", title: "优势 Strengths", subtitle: "内部 · 积极", tone: "border-forest/20 bg-forest/[0.04]", dot: "bg-forest" },
  { key: "W", title: "劣势 Weaknesses", subtitle: "内部 · 消极", tone: "border-brand-100 bg-brand-50/50", dot: "bg-brand-500" },
  { key: "O", title: "机会 Opportunities", subtitle: "外部 · 积极", tone: "border-navy/15 bg-navy/[0.03]", dot: "bg-navy" },
  { key: "T", title: "威胁 Threats", subtitle: "外部 · 消极", tone: "border-cream-300 bg-cream-100/60", dot: "bg-ink-muted" },
];

export function SwotTool() {
  const { value, setValue } = useLocalStorage<SwotData>("lab:swot", DEFAULT_SWOT);
  const [drafts, setDrafts] = React.useState<Record<Quadrant, string>>({ S: "", W: "", O: "", T: "" });

  function addItem(q: Quadrant) {
    const text = drafts[q].trim();
    if (!text) return;
    setValue((prev) => ({ ...prev, [q]: [...prev[q], text] }));
    setDrafts((prev) => ({ ...prev, [q]: "" }));
  }
  function removeItem(q: Quadrant, index: number) {
    setValue((prev) => ({ ...prev, [q]: prev[q].filter((_, i) => i !== index) }));
  }

  return (
    <div className="space-y-6">
      <Notice tone="neutral">
        <strong className="text-ink">使用口径：</strong>SWOT 只对「特定业务、特定时点」成立。优势/劣势是内部可控因素，机会/威胁是外部环境因素。四象限列出后，关键是交叉推导出策略（如用优势抓机会、把劣势补成不被威胁击中）。
      </Notice>

      <div className="flex justify-end">
        <ResetButton onClick={() => setValue(DEFAULT_SWOT)} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {QUADRANTS.map((q) => (
          <section key={q.key} className={`rounded-2xl border p-5 ${q.tone}`}>
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${q.dot}`} />
              <h2 className="font-serif text-lg font-semibold text-ink">{q.title}</h2>
              <span className="ml-auto tag-chip">{q.subtitle}</span>
            </div>
            <ul className="mt-5 space-y-2">
              {value[q.key].map((item, i) => (
                <li key={`${q.key}-${i}`} className="group flex items-start gap-2 rounded-lg border border-cream-300 bg-white px-3 py-2.5 text-sm leading-6 text-ink-soft">
                  <span className="flex-1">{item}</span>
                  <button
                    type="button"
                    onClick={() => removeItem(q.key, i)}
                    className="rounded p-0.5 text-ink-faint opacity-0 transition-all hover:text-brand-600 group-hover:opacity-100"
                    aria-label={`删除：${item}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
              {value[q.key].length === 0 && <li className="py-2 text-xs text-ink-faint">暂无条目，添加一条开始分析。</li>}
            </ul>
            <div className="mt-3 flex gap-2">
              <input
                className="field-input"
                placeholder="添加一条并回车"
                value={drafts[q.key]}
                onChange={(e) => setDrafts((prev) => ({ ...prev, [q.key]: e.target.value }))}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addItem(q.key);
                }}
              />
              <button type="button" onClick={() => addItem(q.key)} className="inline-flex h-[42px] shrink-0 items-center gap-1 rounded-lg bg-brand-500 px-3 text-xs font-semibold text-white transition-colors hover:bg-brand-600">
                <Plus className="h-3.5 w-3.5" /> 添加
              </button>
            </div>
          </section>
        ))}
      </div>

      <section className="rounded-2xl border border-cream-300 bg-white p-5 shadow-card sm:p-6">
        <h2 className="font-serif text-lg font-semibold text-ink">交叉策略 checklist</h2>
        <p className="mt-1 text-xs leading-5 text-ink-muted">SWOT 的价值在于交叉组合，而不是罗列清单。逐条回答下面的问题，把分析变成行动。</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            ["SO 进攻型", "如何用你的优势去抓住最有把握的机会？"],
            ["ST 防御型", "如何用优势降低外部威胁带来的冲击？"],
            ["WO 补强型", "要抓住关键机会，必须先补齐哪项劣势？"],
            ["WT 保守型", "哪些劣势在威胁下最危险，需要优先规避？"],
          ].map(([label, text]) => (
            <div key={label} className="rounded-xl border border-cream-300 bg-cream-50 p-4">
              <span className="tag-chip">{label}</span>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
