import Link from "next/link";
import { ArrowUpRight, Search, Target, Megaphone, Video, Mail, Radar, PenLine } from "lucide-react";
import { SectionHeading } from "@/components/layout/section-heading";
import { topicBySlug } from "@/data/topics";

const practices = [
  { slug: "market-research", icon: Search, label: "市场调研" },
  { slug: "competitor-analysis", icon: Radar, label: "竞品分析" },
  { slug: "brand-positioning", icon: Target, label: "品牌定位" },
  { slug: "content-strategy", icon: PenLine, label: "内容营销" },
  { slug: "keyword-research", icon: Search, label: "关键词研究" },
  { slug: "short-video", icon: Video, label: "短视频营销" },
  { slug: "ad-creative", icon: Megaphone, label: "广告创意" },
  { slug: "email-marketing", icon: Mail, label: "邮件营销" },
  { slug: "private-domain", icon: Target, label: "私域运营" },
  { slug: "cro", icon: Radar, label: "转化优化" },
];

export function PracticeSection() {
  return (
    <section className="site-container py-16 lg:py-24">
      <SectionHeading
        eyebrow="In Practice"
        title="营销实战：从方法到动作"
        description="每个实战主题都包含为什么重要、具体步骤、常用工具、衡量指标与常见错误，可以直接用于工作。"
        href="/marketing"
        linkLabel="浏览全部知识点"
      />
      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {practices.map(({ slug, icon: Icon, label }) => {
          const topic = topicBySlug[slug];
          return (
            <Link
              key={slug}
              href={topic ? `/marketing/${topic.category}#${slug}` : "/marketing"}
              className="group flex flex-col rounded-xl border border-cream-300 bg-white p-5 shadow-card transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cream-100 text-navy transition-colors group-hover:bg-brand-500 group-hover:text-white">
                <Icon className="h-[18px] w-[18px]" />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold text-ink">{topic?.title ?? label}</h3>
              <p className="mt-2 line-clamp-2 text-xs leading-5 text-ink-muted">{topic?.summary ?? "系统学习这一营销实战主题。"}</p>
              <span className="mt-auto flex items-center gap-1 pt-4 text-xs font-medium text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
                查看方法 <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
