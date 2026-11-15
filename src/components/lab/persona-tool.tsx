"use client";

import * as React from "react";
import { Check, ClipboardCopy, Users } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Notice, Panel, ResetButton } from "./shared";

interface Persona {
  name: string;
  role: string;
  age: string;
  city: string;
  income: string;
  goals: string;
  pains: string;
  triggers: string;
  channels: string;
  quote: string;
}

const DEFAULT_PERSONA: Persona = {
  name: "林晓",
  role: "二线城市职场妈妈",
  age: "32 岁",
  city: "杭州",
  income: "家庭月收入 2.5 万元",
  goals: "给孩子选安全又省心的高温奶瓶，减少反复比较的时间成本。",
  pains: "信息太多且口径不一，担心材质安全；没时间研究成分与测评。",
  triggers: "朋友推荐、儿科医生背书、看到真实用户长期使用反馈时更容易下单。",
  channels: "小红书搜索、妈妈群口碑、电商平台详情页。",
  quote: "我不想成为专家，我只想快速确认这个东西是安全的、适合我孩子的。",
};

function TextField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <input className="field-input" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function AreaField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <textarea className="field-input min-h-[88px] resize-y leading-6" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

export function PersonaTool() {
  const { value, setValue } = useLocalStorage<Persona>("lab:persona", DEFAULT_PERSONA);
  const [copied, setCopied] = React.useState(false);

  const set = (key: keyof Persona) => (v: string) => setValue((prev) => ({ ...prev, [key]: v }));

  const summary = [
    `【用户画像】${value.name || "未命名"}`,
    `角色：${value.role}`,
    `基本信息：${value.age} · ${value.city} · ${value.income}`,
    `核心目标：${value.goals}`,
    `主要痛点：${value.pains}`,
    `购买触发点：${value.triggers}`,
    `信息渠道：${value.channels}`,
    `用户原话：「${value.quote}」`,
  ].join("\n");

  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <Panel title="填写画像信息" desc="从可观察的事实出发，尽量避免用刻板印象代替真实用户。">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="画像名称" value={value.name} onChange={set("name")} placeholder="如：林晓" />
          <TextField label="角色 / 身份" value={value.role} onChange={set("role")} placeholder="如：二线城市职场妈妈" />
          <TextField label="年龄段" value={value.age} onChange={set("age")} />
          <TextField label="城市" value={value.city} onChange={set("city")} />
          <div className="sm:col-span-2">
            <TextField label="收入 / 预算水平" value={value.income} onChange={set("income")} />
          </div>
        </div>
        <div className="mt-5 space-y-4">
          <AreaField label="核心目标（用户想完成什么）" value={value.goals} onChange={set("goals")} />
          <AreaField label="主要痛点与障碍" value={value.pains} onChange={set("pains")} />
          <AreaField label="购买触发点" value={value.triggers} onChange={set("triggers")} />
          <AreaField label="常用信息渠道" value={value.channels} onChange={set("channels")} />
          <AreaField label="用户原话（尽量引用真实表达）" value={value.quote} onChange={set("quote")} />
        </div>
        <div className="mt-5 flex justify-end">
          <ResetButton onClick={() => setValue(DEFAULT_PERSONA)} />
        </div>
      </Panel>

      <div className="space-y-6">
        <Notice tone="neutral">
          <strong className="text-ink">使用建议：</strong>画像应来自访谈、问卷与真实行为数据。上面预填的是示例，用来展示结构；把它替换成你的调研结论才有参考价值。
        </Notice>
        <Panel title="画像卡片预览" desc="随左侧输入实时更新，可复制为纯文本用于团队讨论。">
          <div className="rounded-xl border border-cream-300 bg-cream-50 p-6">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <Users className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-serif text-xl font-semibold text-ink">{value.name || "未命名画像"}</h3>
                <p className="mt-0.5 text-xs text-ink-muted">{value.role || "待填写角色"}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {[value.age, value.city, value.income].filter(Boolean).map((tag) => (
                <span key={tag} className="tag-chip">{tag}</span>
              ))}
            </div>
            <dl className="mt-5 space-y-4 text-sm">
              {[
                ["核心目标", value.goals],
                ["主要痛点", value.pains],
                ["购买触发点", value.triggers],
                ["信息渠道", value.channels],
              ].map(([label, text]) => (
                <div key={label}>
                  <dt className="data-label">{label}</dt>
                  <dd className="mt-1 leading-7 text-ink-soft">{text || "—"}</dd>
                </div>
              ))}
            </dl>
            {value.quote && <blockquote className="mt-5 border-l-[3px] border-brand-500 bg-white py-3 pl-4 pr-3 font-serif text-base italic leading-7 text-ink">「{value.quote}」</blockquote>}
          </div>
          <button
            type="button"
            onClick={copy}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            {copied ? <Check className="h-4 w-4" /> : <ClipboardCopy className="h-4 w-4" />}
            {copied ? "已复制" : "复制为文本"}
          </button>
        </Panel>
      </div>
    </div>
  );
}
