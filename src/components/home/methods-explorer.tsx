"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { methods } from "@/data/methods";
import { MethodIllustration } from "@/components/illustrations/method-illustrations";
import { SectionHeading } from "@/components/layout/section-heading";
import { cn } from "@/lib/utils";

export function MethodsExplorer() {
  const [active, setActive] = React.useState(methods[0].slug);
  const method = methods.find((m) => m.slug === active) ?? methods[0];

  return (
    <section className="border-y border-cream-300 bg-white py-16 lg:py-24">
      <div className="site-container">
        <SectionHeading
          eyebrow="Core Frameworks"
          title="营销核心方法：把复杂问题结构化"
          description=" STP、4P、AIDA、AARRR……这些模型不是教条，而是让团队对同一问题形成共同语言的工具。"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[220px_1fr]">
          <div className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col">
            {methods.map((m) => (
              <button
                key={m.slug}
                type="button"
                onClick={() => setActive(m.slug)}
                className={cn(
                  "flex shrink-0 items-center justify-between gap-2 rounded-xl border px-4 py-3 text-left transition-all lg:w-full",
                  active === m.slug
                    ? "border-brand-200 bg-brand-50 text-brand-700 shadow-sm"
                    : "border-transparent bg-cream-50 text-ink-soft hover:border-cream-300 hover:bg-white"
                )}
              >
                <span className="text-sm font-semibold">{m.name}</span>
                <span className="hidden text-[10px] text-ink-muted lg:block">{m.category}</span>
              </button>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <MethodIllustration type={method.illustration} />
            <div>
              <span className="data-label">{method.fullName}</span>
              <h3 className="mt-2 font-serif text-3xl font-semibold text-ink">{method.name} · {method.category}</h3>
              <p className="mt-4 text-[15px] leading-8 text-ink-soft">{method.summary}</p>
              <ul className="mt-6 space-y-3">
                {method.elements.map((el) => (
                  <li key={el.label} className="flex gap-3 text-sm leading-6">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    <span><strong className="font-semibold text-ink">{el.label}</strong>：{el.desc}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 rounded-xl bg-cream-100 p-4 text-xs leading-6 text-ink-soft">
                <strong className="text-ink">什么时候用：</strong>{method.when}<br />
                <strong className="text-ink">注意：</strong>{method.caution}
              </div>
              <Link href={`/marketing/${method.slug === "stp" ? "strategy" : "fundamentals"}#${method.slug}`} className="link-underline mt-6 text-sm">
                查看相关知识点 <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
