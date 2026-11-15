import type { ArticleMeta } from "@/types";
import { photos } from "./images";

export const articles: ArticleMeta[] = [
  {
    slug: "why-marketing-matters", title: "营销不是推销：重新理解「被选择的理由」",
    subtitle: "为什么最好的营销看起来不像营销",
    excerpt: "营销的起点不是产品，而是用户为什么要在众多选择里选你。本文从需求、价值与心智三个层面，重建对营销的基本理解。",
    category: "fundamentals", categoryLabel: "营销基础", tags: ["营销本质", "用户价值", "定位"],
    author: "营销实战指南编辑部", date: "2026-10-18", readMinutes: 9, cover: photos.heroStrategy,
    coverCredit: "Unsplash（团队协作摄影，仅作配图）", featured: true, level: "入门",
    keyTakeaways: ["营销是创造被选择的理由，而不是把产品推给用户", "用户购买的始终是价值与改变，而非功能本身", "所有营销战略都可以还原为选择谁、为何选你、如何兑现"],
  },
  {
    slug: "stp-in-practice", title: "STP 实战：如何找到值得投入的市场",
    subtitle: "从细分到定位的完整推演",
    excerpt: "STP 不只是教科书上的三个字母。本文用可执行的步骤，讲清如何切分市场、评估战场、建立定位，并避开最常见的战略错误。",
    category: "strategy", categoryLabel: "营销战略", tags: ["STP", "市场细分", "定位"],
    author: "营销实战指南编辑部", date: "2026-10-25", readMinutes: 11, cover: photos.strategyDesk,
    coverCredit: "Unsplash（商业分析摄影，仅作配图）", featured: true, level: "进阶",
    keyTakeaways: ["细分必须可衡量、可触达、有规模", "目标市场选择要同时看吸引力与匹配度", "定位需要对参照系、差异点与可信理由三者保持一致"],
  },
  {
    slug: "brand-positioning-playbook", title: "品牌定位实战手册：从心智空位到一致表达",
    subtitle: "让品牌在用户头脑中占据一个词",
    excerpt: "定位理论被误读最多的地方，是把它当成一句广告语。本文拆解定位的完整链条：参照系、差异点、可信证据与长期一致。",
    category: "branding", categoryLabel: "品牌营销", tags: ["品牌定位", "心智", "差异化"],
    author: "营销实战指南编辑部", date: "2026-11-02", readMinutes: 12, cover: photos.brand,
    coverCredit: "Unsplash（设计创意摄影，仅作配图）", featured: true, level: "进阶",
    keyTakeaways: ["定位发生在用户心智，而非公司内部", "没有参照系的差异点通常无效", "定位需要产品、渠道与传播共同兑现"],
  },
  {
    slug: "content-marketing-system", title: "内容营销系统：从选题到转化的完整闭环",
    subtitle: "让内容从成本变成资产",
    excerpt: "内容营销失败往往不是写得不好，而是缺少系统。本文给出从用户问题、主题支柱到分发与衡量的完整工作流。",
    category: "content", categoryLabel: "内容营销", tags: ["内容营销", "选题", "转化"],
    author: "营销实战指南编辑部", date: "2026-11-06", readMinutes: 10, cover: photos.content,
    coverCredit: "Unsplash（写作场景摄影，仅作配图）", featured: true, level: "进阶",
    keyTakeaways: ["内容的起点是用户的真实问题", "主题支柱让内容形成复利", "必须同时设计过程指标与结果指标"],
  },
  {
    slug: "seo-in-ai-era", title: "AI 时代的搜索营销：从排名到被引用",
    subtitle: "SEO 不会消失，但它正在改变",
    excerpt: "当用户开始向 AI 提问，品牌需要被理解、被引用、被推荐。本文梳理 SEO 的底层逻辑变化与可执行的 GEO 方法。",
    category: "seo", categoryLabel: "搜索营销", tags: ["SEO", "GEO", "AI 搜索"],
    author: "营销实战指南编辑部", date: "2026-11-09", readMinutes: 11, cover: photos.search,
    coverCredit: "Unsplash（数字设备摄影，仅作配图）", level: "高级",
    keyTakeaways: ["搜索意图仍然是内容设计的起点", "结构化、可验证的内容更容易被引用", "品牌实体信息的一致性变得更重要"],
  },
  {
    slug: "growth-funnel-diagnosis", title: "增长漏斗诊断：找到真正卡住你的那一环",
    subtitle: "别再用更多流量掩盖转化问题",
    excerpt: "增长停滞时，多数团队的第一反应是加大投放。本文用 AARRR 与漏斗分解，讲清如何定位瓶颈、提出假设并验证。",
    category: "growth", categoryLabel: "增长营销", tags: ["增长", "漏斗", "AARRR"],
    author: "营销实战指南编辑部", date: "2026-11-11", readMinutes: 10, cover: photos.growth,
    coverCredit: "Unsplash（数据图表摄影，仅作配图）", featured: true, level: "进阶",
    keyTakeaways: ["增长问题要先定位到具体阶段", "没有留存的增长是漏水的桶", "每次实验只验证一个变量"],
  },
  {
    slug: "marketing-metrics-guide", title: "营销指标体系：如何拒绝虚荣指标",
    subtitle: "从 CAC 到 LTV，建立可决策的数据语言",
    excerpt: "指标不是越多越好。本文建立一套分层指标框架，并讲清 CAC、LTV、ROI、ROAS 等核心指标的正确用法与常见误读。",
    category: "analytics", categoryLabel: "营销数据", tags: ["指标体系", "CAC", "LTV", "ROI"],
    author: "营销实战指南编辑部", date: "2026-11-13", readMinutes: 12, cover: photos.analytics,
    coverCredit: "Unsplash（数据分析摄影，仅作配图）", level: "进阶",
    keyTakeaways: ["北极星指标应反映核心价值", "收入回报不等于利润回报", "LTV/CAC 必须结合回收期解读"],
  },
  {
    slug: "b2b-content-marketing", title: "B2B 内容获客：长周期决策中的信任建设",
    subtitle: "当客户在联系你之前已经研究了 70%",
    excerpt: "B2B 购买是组织决策。本文讲解如何用内容覆盖决策单元、培育线索并与销售协同，把专业度转化为可衡量的管道。",
    category: "b2b", categoryLabel: "B2B 营销", tags: ["B2B", "内容获客", "线索"],
    author: "营销实战指南编辑部", date: "2026-11-14", readMinutes: 10, cover: photos.b2b,
    coverCredit: "Unsplash（商务会议摄影，仅作配图）", level: "进阶",
    keyTakeaways: ["B2B 内容应映射购买阶段", "线索质量比数量更重要", "营销与销售需要共享指标与反馈"],
  },
];

export const articleBySlug = Object.fromEntries(articles.map((a) => [a.slug, a])) as Record<string, ArticleMeta>;
export const featuredArticles = articles.filter((a) => a.featured);
