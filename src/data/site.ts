export const site = {
  name: "营销实战指南",
  brand: "Marketing Playbook",
  sloganEn: "Learn Marketing. Build Brands. Drive Growth.",
  sloganZh: "从理解市场开始，到真正实现增长。",
  description:
    "系统学习营销战略、品牌建设、内容营销、用户增长与数据分析。一个专业、实操、可持续更新的中文市场营销知识库与实战平台。",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://yuxinrun.github.io/marketing-playbook",
  locale: "zh_CN",
};

export const siteStats = [
  { value: "8", label: "知识体系", unit: "大模块" },
  { value: "120+", label: "营销知识点", unit: "" },
  { value: "20", label: "经典好书", unit: "本" },
  { value: "10", label: "实战工具", unit: "个" },
];

export const categories = [
  { id: "fundamentals", label: "营销基础", href: "/marketing/fundamentals", number: "01" },
  { id: "strategy", label: "营销战略", href: "/marketing/strategy", number: "02" },
  { id: "branding", label: "品牌营销", href: "/marketing/branding", number: "03" },
  { id: "content", label: "内容营销", href: "/marketing/content", number: "04" },
  { id: "seo", label: "搜索营销", href: "/marketing/seo", number: "05" },
  { id: "social", label: "社交媒体营销", href: "/marketing/social", number: "06" },
  { id: "advertising", label: "广告营销", href: "/marketing/advertising", number: "07" },
  { id: "growth", label: "增长营销", href: "/marketing/growth", number: "08" },
  { id: "b2b", label: "B2B 营销", href: "/marketing/b2b", number: "09" },
  { id: "ecommerce", label: "电商营销", href: "/marketing/ecommerce", number: "10" },
  { id: "analytics", label: "营销数据", href: "/marketing#analytics", number: "11" },
];

export const learningPath = [
  { step: "01", title: "理解市场", desc: "市场调研、用户洞察、竞争分析", href: "/marketing/fundamentals" },
  { step: "02", title: "制定战略", desc: "STP、定位、差异化、营销组合", href: "/marketing/strategy" },
  { step: "03", title: "打造品牌", desc: "品牌识别、价值主张、产品上市", href: "/marketing/branding" },
  { step: "04", title: "建立触点", desc: "内容、SEO、社媒、广告投放", href: "/marketing/content" },
  { step: "05", title: "驱动增长", desc: "AARRR、转化优化、私域与留存", href: "/marketing/growth" },
  { step: "06", title: "用数据决策", desc: "指标体系、归因分析、持续优化", href: "/marketing#analytics" },
];

export const footerColumns = [
  {
    title: "内容导航",
    links: [
      { label: "营销知识中心", href: "/marketing" },
      { label: "深度文章", href: "/articles" },
      { label: "营销案例", href: "/cases" },
      { label: "关于我们", href: "/about" },
    ],
  },
  {
    title: "学习资源",
    links: [
      { label: "营销好书", href: "/books" },
      { label: "优质网站", href: "/websites" },
      { label: "营销实验室", href: "/lab" },
      { label: "学习路线", href: "/marketing#roadmap" },
    ],
  },
  {
    title: "热门栏目",
    links: [
      { label: "品牌营销", href: "/marketing/branding" },
      { label: "内容营销", href: "/marketing/content" },
      { label: "搜索营销", href: "/marketing/seo" },
      { label: "增长营销", href: "/marketing/growth" },
    ],
  },
];
