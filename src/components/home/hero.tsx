import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/ui/smart-image";
import { photos } from "@/data/images";
import { HeroSearch } from "./hero-search";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-cream-300 bg-cream-50">
      <div className="paper-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full border border-cream-300" />
      <div className="site-container relative grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
        <div className="animate-fade-up">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="eyebrow">The Marketing Playbook · 中文版</span>
            <span className="hidden h-px w-12 bg-cream-300 sm:block" />
            <span className="text-[11px] font-medium tracking-wider text-ink-muted">系统 · 专业 · 实战</span>
          </div>

          <h1 className="text-balance font-serif text-[2.6rem] font-semibold leading-[1.18] tracking-tight text-ink sm:text-5xl lg:text-[3.6rem]">
            营销不是推销产品，
            <br />
            而是创造
            <span className="relative whitespace-nowrap text-brand-600">
              被选择的理由
              <svg className="absolute -bottom-2 left-0 w-full" height="9" viewBox="0 0 300 9" fill="none" preserveAspectRatio="none">
                <path d="M2 6 C80 2 220 2 298 6" stroke="#EE6514" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
              </svg>
            </span>
            。
          </h1>

          <p className="mt-7 max-w-xl text-pretty text-[15px] leading-8 text-ink-soft sm:text-base">
            从理解市场开始，到真正实现增长。系统学习营销战略、品牌建设、内容营销、用户增长与数据分析。
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/marketing">开始学习营销 <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/marketing/content"><Play className="h-4 w-4" /> 探索营销实战</Link>
            </Button>
          </div>

          <div className="mt-8">
            <HeroSearch />
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink-muted">
              <span>热门搜索：</span>
              {["STP", "品牌定位", "SEO", "AARRR", "CAC/LTV"].map((tag) => (
                <Link key={tag} href="/marketing" className="rounded-full border border-cream-300 bg-white px-2.5 py-1 transition-colors hover:border-brand-300 hover:text-brand-600">
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="relative animate-fade-in lg:pl-4">
          <div className="relative">
            <SmartImage
              src={photos.heroStrategy}
              alt="营销团队围绕策略进行讨论的商业摄影"
              className="aspect-[4/3] rounded-2xl border border-cream-300 shadow-card-hover lg:aspect-[5/4.6]"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-ink/25 via-transparent to-transparent" />

            <div className="absolute -left-4 bottom-8 w-[210px] rounded-xl border border-cream-300 bg-white/95 p-4 shadow-card-hover backdrop-blur sm:-left-8">
              <div className="flex items-center gap-2 text-brand-600">
                <Sparkles className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-[0.16em]">Strategy 01</span>
              </div>
              <p className="mt-3 font-serif text-lg font-semibold leading-snug text-ink">先理解，再选择，最后行动。</p>
              <p className="mt-2 text-[11px] leading-5 text-ink-muted">一切营销决策，都从用户开始。</p>
            </div>

            <div className="absolute -right-3 top-8 hidden rounded-xl border border-cream-300 bg-white/95 p-3 shadow-card-hover backdrop-blur sm:block">
              <p className="data-label">Marketing Playbook</p>
              <p className="mt-1 font-serif text-xl font-semibold text-ink">Learn · Build · Grow</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-[11px] text-ink-muted">
            <span>图片：Unsplash · 商业协作主题</span>
            <span>Independent insight for better decisions</span>
          </div>
        </div>
      </div>
    </section>
  );
}
