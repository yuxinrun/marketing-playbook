import type { NavItem } from "@/types";

export const mainNav: NavItem[] = [
  { label: "首页", href: "/" },
  {
    label: "营销战略",
    href: "/marketing/strategy",
    children: [
      { label: "营销知识中心", href: "/marketing", desc: "完整知识体系总览" },
      { label: "营销基础", href: "/marketing/fundamentals", desc: "市场、用户与竞争" },
      { label: "营销战略", href: "/marketing/strategy", desc: "STP、定位与组合" },
    ],
  },
  {
    label: "营销实战",
    href: "/marketing/content",
    children: [
      { label: "内容营销", href: "/marketing/content", desc: "从选题到转化" },
      { label: "搜索营销", href: "/marketing/seo", desc: "SEO 与搜索广告" },
      { label: "社交媒体营销", href: "/marketing/social", desc: "社媒与影响者" },
      { label: "广告营销", href: "/marketing/advertising", desc: "投放与创意" },
    ],
  },
  { label: "品牌营销", href: "/marketing/branding" },
  {
    label: "增长营销",
    href: "/marketing/growth",
    children: [
      { label: "增长营销", href: "/marketing/growth", desc: "AARRR 与增长飞轮" },
      { label: "B2B 营销", href: "/marketing/b2b", desc: "线索与销售漏斗" },
      { label: "电商营销", href: "/marketing/ecommerce", desc: "电商与跨境" },
    ],
  },
  { label: "好书推荐", href: "/books" },
  { label: "网站资源", href: "/websites" },
  { label: "营销实验室", href: "/lab" },
  { label: "关于", href: "/about" },
];
