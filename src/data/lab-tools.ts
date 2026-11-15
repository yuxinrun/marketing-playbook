import type { LucideIcon } from "lucide-react";
import { Calculator, ChartNoAxesCombined, Users, Swords, LayoutGrid, PanelsTopLeft } from "lucide-react";

export interface LabTool {
  href: string;
  title: string;
  desc: string;
  detail: string;
  icon: LucideIcon;
  category: string;
}

export const labTools: LabTool[] = [
  {
    href: "/lab/persona",
    title: "用户画像生成器",
    icon: Users,
    desc: "结构化生成用户画像",
    detail: "从基本信息、核心目标、主要痛点到信息来源，把零散数据整理成一份可复用的用户画像。",
    category: "用户洞察",
  },
  {
    href: "/lab/competitor",
    title: "竞品分析工具",
    icon: Swords,
    desc: "多竞品并列对比",
    detail: "并排比较多个竞品的定位、价格、优势与劣势，快速找到差异化和空白机会。",
    category: "市场分析",
  },
  {
    href: "/lab/swot",
    title: "SWOT 分析",
    icon: LayoutGrid,
    desc: "四象限整理与可视化",
    detail: "把内部优势劣势与外部机会威胁放进四象限，形成结构化的战略判断。",
    category: "战略分析",
  },
  {
    href: "/lab/budget",
    title: "营销预算计算器",
    icon: Calculator,
    desc: "估算渠道投入与结果",
    detail: "按渠道分配总预算，自动计算各渠道投入金额并可视化分配结构。",
    category: "预算规划",
  },
  {
    href: "/lab/roi",
    title: "ROI / CAC / LTV",
    icon: ChartNoAxesCombined,
    desc: "回报与获客效率测算",
    detail: "输入投入、收入与获客数据，测算 ROI、CAC、LTV 及增长健康度。",
    category: "效果评估",
  },
  {
    href: "/lab/funnel",
    title: "营销漏斗分析器",
    icon: PanelsTopLeft,
    desc: "定位最大流失环节",
    detail: "录入各环节人数，自动计算转化率并定位流失最大的那个环节。",
    category: "转化优化",
  },
  {
    href: "/lab/content-calendar",
    title: "内容营销日历",
    icon: LayoutGrid,
    desc: "规划、编辑与导出计划",
    detail: "规划内容主题、渠道、负责人与发布日期，并导出为可执行的 CSV 排期表。",
    category: "内容运营",
  },
];
