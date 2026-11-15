import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { learningPath } from "@/data/site";
import { SectionHeading } from "@/components/layout/section-heading";

export function KnowledgeMap() {
  return (
    <section id="roadmap" className="site-container scroll-mt-24 py-16 lg:py-24">
      <SectionHeading
        eyebrow="Knowledge Map"
        title="营销知识地图：从基础到增长的学习路线"
        description="六个阶段构成一条清晰路径。你可以按顺序学习，也可以根据当前问题直接跳到需要的模块。"
        href="/marketing"
        linkLabel="进入知识中心"
      />

      <div className="relative mt-12">
        <div className="absolute left-6 top-6 hidden h-[calc(100%-3rem)] w-px bg-cream-300 lg:block" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {learningPath.map((step, i) => (
            <Link
              key={step.step}
              href={step.href}
              className="group relative rounded-2xl border border-cream-300 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cream-100 font-serif text-sm font-semibold text-navy transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  {step.step}
                </span>
                <ArrowUpRight className="h-4 w-4 text-ink-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500" />
              </div>
              <h3 className="mt-5 font-serif text-xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{step.desc}</p>
              <div className="mt-5 h-1 w-10 rounded-full bg-brand-200 transition-all group-hover:w-16 group-hover:bg-brand-500" />
              <span className="absolute right-5 top-[70px] hidden font-serif text-5xl font-bold text-cream-200 lg:block">{i + 1}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
