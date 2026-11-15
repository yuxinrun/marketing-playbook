"use client";

import * as React from "react";
import { Plus, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Notice, Panel, ResetButton } from "./shared";

interface Competitor {
  id: string;
  name: string;
  positioning: string;
  price: string;
  audience: string;
  strength: string;
  weakness: string;
}

const DEFAULT_COMPETITORS: Competitor[] = [
  { id: "a", name: "品牌 A", positioning: "高端专业，强调配方与研发", price: "高", audience: "资深用户", strength: "品牌信任度高，复购稳定", weakness: "价格门槛高，新客获取慢" },
  { id: "b", name: "品牌 B", positioning: "大众性价比，主打渠道覆盖", price: "低", audience: "价格敏感用户", strength: "铺货广，促销频繁", weakness: "利润薄，品牌溢价弱" },
  { id: "c", name: "你的产品", positioning: "面向年轻家庭的省心之选", price: "中", audience: "首次尝试的家庭", strength: "体验设计好，内容沟通清晰", weakness: "品牌认知尚在建立" },
];

const ROWS: { key: keyof Omit<Competitor, "id">; label: string }[] = [
  { key: "positioning", label: "市场定位" },
  { key: "price", label: "价格带" },
  { key: "audience", label: "目标用户" },
  { key: "strength", label: "主要优势" },
  { key: "weakness", label: "主要劣势" },
];

export function CompetitorTool() {
  const { value: competitors, setValue } = useLocalStorage<Competitor[]>("lab:competitor", DEFAULT_COMPETITORS);

  function update(id: string, key: keyof Omit<Competitor, "id">, v: string) {
    setValue((prev) => prev.map((c) => (c.id === id ? { ...c, [key]: v } : c)));
  }
  function add() {
    setValue((prev) => [
      ...prev,
      { id: Math.random().toString(36).slice(2, 9), name: `竞品 ${prev.length + 1}`, positioning: "", price: "", audience: "", strength: "", weakness: "" },
    ]);
  }
  function remove(id: string) {
    setValue((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div className="space-y-6">
      <Notice tone="neutral">
        <strong className="text-ink">分析口径：</strong>竞品分析应基于可核查的公开信息（官网、产品页、财报、公开评测），而不是猜测。下表的判断需要你亲自验证；把「他们认为的」和「数据证实的」分开记录。
      </Notice>

      <Panel title="竞品编辑器" desc="可添加或删除竞品，横向对比关键维度。建议覆盖 3–5 个直接竞品与 1 个替代品。">
        <div className="flex flex-wrap gap-2">
          {competitors.map((c) => (
            <div key={c.id} className="flex items-center gap-1.5 rounded-lg border border-cream-300 bg-cream-50 py-1.5 pl-3 pr-1.5">
              <input
                className="w-28 bg-transparent text-sm font-medium text-ink outline-none"
                value={c.name}
                onChange={(e) => update(c.id, "name", e.target.value)}
                aria-label="竞品名称"
              />
              <button type="button" onClick={() => remove(c.id)} className="rounded p-1 text-ink-faint transition-colors hover:bg-brand-50 hover:text-brand-600" aria-label={`删除 ${c.name}`}>
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <button type="button" onClick={add} className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-brand-300 bg-brand-50/50 px-3 py-1.5 text-xs font-medium text-brand-600 transition-colors hover:bg-brand-50">
            <Plus className="h-3.5 w-3.5" /> 添加竞品
          </button>
          <div className="flex-1" />
          <ResetButton onClick={() => setValue(DEFAULT_COMPETITORS)} />
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border border-cream-300">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="bg-cream-100">
                <th className="w-28 whitespace-nowrap px-4 py-3 text-left text-xs font-semibold text-ink-muted">对比维度</th>
                {competitors.map((c) => (
                  <th key={c.id} className="min-w-[150px] border-l border-cream-200 px-4 py-3 text-left font-semibold text-ink">{c.name || "未命名"}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.key} className="border-t border-cream-200 align-top">
                  <th className="whitespace-nowrap bg-cream-50 px-4 py-3 text-left text-xs font-medium text-ink-muted">{row.label}</th>
                  {competitors.map((c) => (
                    <td key={c.id} className="border-l border-cream-200 px-2 py-2">
                      <textarea
                        className="min-h-[64px] w-full resize-y rounded-md px-2 py-1.5 text-xs leading-5 text-ink-soft outline-none transition-colors focus:bg-brand-50/40"
                        value={c[row.key]}
                        onChange={(e) => update(c.id, row.key, e.target.value)}
                        aria-label={`${c.name} ${row.label}`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="空白机会提示" desc="根据上面填写的定位与优劣势，快速自查你的差异化是否清晰。">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { q: "你的定位是否与至少一个竞品明显不同？", hint: "如果高度雷同，需要在用户、场景或价格带上重新切分。" },
            { q: "你填写的「主要优势」是否可被用户感知？", hint: "内部强项不等于用户价值，要能翻译成用户听得懂的好处。" },
            { q: "竞品的「主要劣势」里是否有你的机会？", hint: "把对手的结构性弱点变成你的明确选择，而不是简单模仿。" },
          ].map((item, i) => (
            <div key={i} className="rounded-xl border border-cream-300 bg-cream-50 p-4">
              <p className="text-sm font-medium leading-6 text-ink">{item.q}</p>
              <p className="mt-2 text-xs leading-5 text-ink-muted">{item.hint}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
