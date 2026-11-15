"use client";

import * as React from "react";
import { Plus, Trash2, Download } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Notice, Panel, ResetButton } from "./shared";

type Status = "构思中" | "撰写中" | "已排期" | "已发布";

interface CalendarItem {
  id: string;
  title: string;
  channel: string;
  owner: string;
  date: string;
  status: Status;
}

const STATUSES: Status[] = ["构思中", "撰写中", "已排期", "已发布"];
const STATUS_STYLE: Record<Status, string> = {
  "构思中": "bg-cream-200 text-ink-soft",
  "撰写中": "bg-brand-50 text-brand-700",
  "已排期": "bg-navy/10 text-navy",
  "已发布": "bg-forest/10 text-forest",
};

const DEFAULT_ITEMS: CalendarItem[] = [
  { id: "c1", title: "选题：高温奶瓶材质安全科普", channel: "小红书", owner: "内容组", date: "2026-11-18", status: "撰写中" },
  { id: "c2", title: "真实用户长期使用访谈视频", channel: "视频号", owner: "品牌组", date: "2026-11-22", status: "已排期" },
  { id: "c3", title: "双 11 复盘与选品指南", channel: "公众号", owner: "编辑部", date: "2026-11-25", status: "构思中" },
];

const EMPTY: CalendarItem = { id: "", title: "", channel: "", owner: "", date: "", status: "构思中" };

export function ContentCalendarTool() {
  const { value: items, setValue } = useLocalStorage<CalendarItem[]>("lab:calendar", DEFAULT_ITEMS);
  const [draft, setDraft] = React.useState<CalendarItem>(EMPTY);
  const [filter, setFilter] = React.useState<Status | "全部">("全部");

  function add() {
    if (!draft.title.trim()) return;
    setValue((prev) => [...prev, { ...draft, id: Math.random().toString(36).slice(2, 9) }]);
    setDraft(EMPTY);
  }
  function update(id: string, key: keyof Omit<CalendarItem, "id">, v: string) {
    setValue((prev) => prev.map((item) => (item.id === id ? { ...item, [key]: key === "status" ? (v as Status) : v } : item)));
  }
  function remove(id: string) {
    setValue((prev) => prev.filter((item) => item.id !== id));
  }

  const visible = filter === "全部" ? items : items.filter((i) => i.status === filter);

  function exportCsv() {
    const esc = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
    const header = ["标题", "渠道", "负责人", "发布日期", "状态"];
    const rows = items.map((i) => [i.title, i.channel, i.owner, i.date, i.status]);
    const csv = "\ufeff" + [header, ...rows].map((row) => row.map(esc).join(",")).join("\r\n");
    try {
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "内容营销日历.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // 浏览器不支持下载时静默处理
    }
  }

  return (
    <div className="space-y-6">
      <Notice tone="neutral">
        <strong className="text-ink">使用口径：</strong>内容日历的价值在于把「选题」变成「有负责人、有日期、有状态」的执行计划。示例数据仅用于演示字段结构，请替换成真实排期；导出为 CSV 后可导入表格工具继续协作。
      </Notice>

      <Panel title="新增内容" desc="填写一条内容计划，添加到底部日历中。">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <label className="lg:col-span-2">
            <span className="field-label">内容标题</span>
            <input className="field-input" placeholder="如：高温奶瓶材质安全科普" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          </label>
          <label>
            <span className="field-label">发布渠道</span>
            <input className="field-input" placeholder="如：小红书" value={draft.channel} onChange={(e) => setDraft({ ...draft, channel: e.target.value })} />
          </label>
          <label>
            <span className="field-label">负责人</span>
            <input className="field-input" placeholder="如：内容组" value={draft.owner} onChange={(e) => setDraft({ ...draft, owner: e.target.value })} />
          </label>
          <label>
            <span className="field-label">发布日期</span>
            <input type="date" className="field-input" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
          </label>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-ink-soft">
            状态
            <select className="field-input w-auto py-2" value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as Status })}>
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
          <button type="button" onClick={add} className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600">
            <Plus className="h-4 w-4" /> 添加计划
          </button>
          <div className="flex-1" />
          <ResetButton onClick={() => setValue(DEFAULT_ITEMS)} />
        </div>
      </Panel>

      <Panel title="排期总览" desc="按状态筛选，直接修改任意字段，状态变更会实时生效。">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {(["全部", ...STATUSES] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${filter === s ? "border-brand-500 bg-brand-500 text-white" : "border-cream-300 bg-white text-ink-soft hover:border-brand-300"}`}
            >
              {s}
            </button>
          ))}
          <div className="flex-1" />
          <button type="button" onClick={exportCsv} className="inline-flex items-center gap-1.5 rounded-lg border border-cream-300 bg-white px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-600">
            <Download className="h-3.5 w-3.5" /> 导出 CSV
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-cream-300">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead className="bg-cream-100 text-xs text-ink-muted">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">内容标题</th>
                <th className="w-28 px-4 py-3 text-left font-semibold">渠道</th>
                <th className="w-28 px-4 py-3 text-left font-semibold">负责人</th>
                <th className="w-36 px-4 py-3 text-left font-semibold">发布日期</th>
                <th className="w-28 px-4 py-3 text-left font-semibold">状态</th>
                <th className="w-12 px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {visible.map((item) => (
                <tr key={item.id} className="border-t border-cream-200">
                  <td className="px-3 py-2"><input className="w-full bg-transparent px-1 py-1 text-sm text-ink outline-none focus:bg-brand-50/40" value={item.title} onChange={(e) => update(item.id, "title", e.target.value)} /></td>
                  <td className="px-3 py-2"><input className="w-full bg-transparent px-1 py-1 text-xs text-ink-soft outline-none focus:bg-brand-50/40" value={item.channel} onChange={(e) => update(item.id, "channel", e.target.value)} /></td>
                  <td className="px-3 py-2"><input className="w-full bg-transparent px-1 py-1 text-xs text-ink-soft outline-none focus:bg-brand-50/40" value={item.owner} onChange={(e) => update(item.id, "owner", e.target.value)} /></td>
                  <td className="px-3 py-2"><input type="date" className="w-full bg-transparent px-1 py-1 text-xs text-ink-soft outline-none focus:bg-brand-50/40" value={item.date} onChange={(e) => update(item.id, "date", e.target.value)} /></td>
                  <td className="px-3 py-2">
                    <select className={`w-full rounded-md border-0 px-2 py-1 text-xs font-medium outline-none ${STATUS_STYLE[item.status]}`} value={item.status} onChange={(e) => update(item.id, "status", e.target.value)}>
                      {STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-3 py-2 text-center"><button type="button" onClick={() => remove(item.id)} className="rounded p-1 text-ink-faint transition-colors hover:text-brand-600" aria-label={`删除 ${item.title}`}><Trash2 className="h-3.5 w-3.5" /></button></td>
                </tr>
              ))}
              {visible.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-xs text-ink-faint">该状态下暂无内容计划。</td></tr>}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
