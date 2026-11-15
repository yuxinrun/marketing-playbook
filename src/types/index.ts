export type Level = "入门" | "进阶" | "高级";

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; desc?: string }[];
}

export interface ArticleMeta {
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  category: string;
  categoryLabel: string;
  tags: string[];
  author: string;
  date: string;
  readMinutes: number;
  cover?: string;
  coverCredit?: string;
  featured?: boolean;
  level: Level;
  keyTakeaways: string[];
}

export interface Book {
  slug: string;
  titleZh: string;
  titleEn: string;
  author: string;
  year?: string;
  publisher?: string;
  category: string;
  tags: string[];
  cover: { from: string; to: string; mark: string };
  oneLine: string;
  coreIdea: string;
  theories: { name: string; desc: string }[];
  keyChapters: string[];
  bestIdeas: string[];
  practice: string[];
  audience: string[];
  relatedCases: string[];
  furtherReading: string[];
  officialLink?: { label: string; url: string };
  quote?: { text: string; source: string };
}

export interface WebsiteResource {
  slug: string;
  name: string;
  url: string;
  region: string;
  category: string;
  positioning: string;
  content: string;
  features: string[];
  value: string;
  audience: string[];
  reason: string;
  pricing?: string;
  free?: string;
}

export interface SourceRef {
  label: string;
  url: string;
  type: "公开事实" | "媒体报道" | "企业宣传" | "编辑分析";
}

export interface CaseStudy {
  slug: string;
  brand: string;
  title: string;
  industry: string;
  region: string;
  year: string;
  tags: string[];
  cover: string;
  coverCredit: string;
  summary: string;
  background: string;
  problem: string;
  audience: string;
  goal: string;
  strategy: string;
  channels: { name: string; role: string }[];
  creative: string;
  execution: string;
  results: string;
  successFactors: string[];
  limitations: string;
  replicable: string[];
  notToCopy: string[];
  sources: SourceRef[];
}

export interface Topic {
  slug: string;
  title: string;
  category: string;
  summary: string;
  why: string;
  concepts: { term: string; desc: string }[];
  steps: string[];
  tools: string[];
  metrics: string[];
  mistakes: string[];
  bookSlugs?: string[];
  articleSlugs?: string[];
  relatedSlugs?: string[];
}

export interface TopicCategory {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  desc: string;
  topics: Topic[];
}

export interface Method {
  slug: string;
  name: string;
  fullName: string;
  category: string;
  summary: string;
  elements: { label: string; desc: string }[];
  when: string;
  caution: string;
  illustration: "stp" | "4p" | "aida" | "aarrr" | "race" | "flywheel" | "positioning" | "funnel";
}

export interface Inspiration {
  type: "观点" | "经典" | "行动";
  text: string;
  source: string;
  verified: boolean;
  action?: string;
}
