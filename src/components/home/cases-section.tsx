import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cases } from "@/data/cases";
import { SmartImage } from "@/components/ui/smart-image";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/layout/section-heading";

const picked = ["apple-brand", "airbnb-growth", "duolingo-social", "wechat-red-packet"];

export function CasesSection() {
  const selected = picked.map((slug) => cases.find((c) => c.slug === slug)).filter(Boolean);
  return (
    <section className="border-y border-cream-300 bg-white py-16 lg:py-24">
      <div className="site-container">
        <SectionHeading
          eyebrow="Case Studies"
          title="全球营销案例：从真实商业中学习"
          description="每个案例严格区分公开事实、媒体报道、企业宣传与编辑分析，不编造效果数据，也不把相关性当作因果。"
          href="/cases"
          linkLabel="查看全部案例"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {selected.map((c) => c && (
            <Link key={c.slug} href={`/cases/${c.slug}`} className="group overflow-hidden rounded-2xl border border-cream-300 bg-cream-50 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
              <SmartImage
                src={c.cover}
                alt={`${c.brand} 案例配图：${c.title}`}
                className="aspect-[4/3]"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
              <div className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-serif text-lg font-bold text-ink">{c.brand}</span>
                  <Badge variant="brand">{c.industry}</Badge>
                </div>
                <h3 className="mt-3 line-clamp-2 font-serif text-base font-semibold leading-snug text-ink group-hover:text-brand-600">
                  {c.title.split("：")[1] || c.title}
                </h3>
                <p className="mt-3 line-clamp-2 text-xs leading-5 text-ink-muted">{c.summary}</p>
                <span className="mt-4 flex items-center gap-1 text-xs font-medium text-brand-600">
                  阅读案例 <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
