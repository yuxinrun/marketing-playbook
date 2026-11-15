import Link from "next/link";
import { Quote, Lightbulb, CheckCircle2, ArrowRight } from "lucide-react";
import { inspirationOfDay } from "@/data/inspiration";
import { Badge } from "@/components/ui/badge";

export function InspirationCard() {
  const item = inspirationOfDay();
  const Icon = item.type === "经典" ? Quote : item.type === "行动" ? CheckCircle2 : Lightbulb;

  return (
    <section className="site-container py-16 lg:py-20">
      <div className="relative overflow-hidden rounded-3xl border border-cream-300 bg-navy px-8 py-10 text-white sm:px-12 lg:px-16 lg:py-14">
        <div className="paper-dots pointer-events-none absolute inset-0 opacity-10" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-24 right-32 h-72 w-72 rounded-full border border-white/10" />

        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-brand-300" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">今日营销灵感 · {item.type}</span>
              {!item.verified && <Badge className="border-white/20 bg-white/10 text-white/80">编辑原创</Badge>}
            </div>
            <blockquote className="mt-6 font-serif text-2xl font-medium leading-relaxed text-white sm:text-3xl lg:text-[2rem]">
              “{item.text}”
            </blockquote>
            <p className="mt-5 text-sm text-white/60">—— {item.source}</p>
            {item.action && (
              <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/80">
                今日任务：{item.action}
              </p>
            )}
          </div>
          <Link
            href="/lab"
            className="inline-flex items-center gap-2 self-start rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600 lg:self-center"
          >
            去实验室实践 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
