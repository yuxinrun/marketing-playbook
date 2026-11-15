import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, ExternalLink, Globe2, Compass, Layers3, Sparkles, Users, CircleDollarSign } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { websiteResources, websiteBySlug } from "@/data/websites";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return websiteResources.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const site = websiteBySlug[slug];
  if (!site) return {};
  return createMetadata({ title: site.name, description: site.positioning, path: `/websites/${slug}` });
}

export default async function WebsiteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = websiteBySlug[slug];
  if (!site) notFound();

  return (
    <>
      <PageHeader
        eyebrow={`${site.category} · ${site.region}`}
        title={site.name}
        description={site.positioning}
        crumbs={[{ label: "网站资源", href: "/websites" }, { label: site.name }]}
        aside={
          <a href={site.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600">
            访问官方网站 <ExternalLink className="h-4 w-4" />
          </a>
        }
      />

      <div className="site-container grid gap-8 py-12 lg:grid-cols-[1fr_300px] lg:gap-14 lg:py-16">
        <article className="min-w-0 space-y-10">
          <section>
            <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold text-ink"><Globe2 className="h-5 w-5 text-brand-500" />网站定位</h2>
            <p className="mt-4 text-[15px] leading-8 text-ink-soft">{site.positioning}</p>
          </section>
          <section>
            <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold text-ink"><Compass className="h-5 w-5 text-brand-500" />主要内容</h2>
            <p className="mt-4 text-[15px] leading-8 text-ink-soft">{site.content}</p>
          </section>
          <section>
            <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold text-ink"><Layers3 className="h-5 w-5 text-brand-500" />核心功能</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {site.features.map((f) => <div key={f} className="flex items-center gap-3 rounded-xl border border-cream-300 bg-white p-4 text-sm text-ink-soft"><span className="h-1.5 w-1.5 rounded-full bg-brand-500" />{f}</div>)}
            </div>
          </section>
          <section>
            <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold text-ink"><Sparkles className="h-5 w-5 text-brand-500" />实用价值</h2>
            <p className="mt-4 text-[15px] leading-8 text-ink-soft">{site.value}</p>
          </section>
          <section className="rounded-2xl border border-brand-100 bg-brand-50/50 p-6">
            <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-ink"><Sparkles className="h-4 w-4 text-brand-600" />推荐理由</h2>
            <p className="mt-3 text-sm leading-7 text-ink-soft">{site.reason}</p>
          </section>
          <div className="flex items-center justify-between border-t border-cream-300 pt-6">
            <Link href="/websites" className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-brand-600"><ArrowLeft className="h-4 w-4" />返回资源库</Link>
            <Link href="/marketing" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600">结合知识库学习 <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </article>

        <aside>
          <div className="sticky top-24 space-y-4">
            <div className="rounded-xl border border-cream-300 bg-white p-5">
              <p className="data-label">官方网站</p>
              <a href={site.url} target="_blank" rel="noopener noreferrer" className="mt-2 block break-all font-mono text-xs text-brand-600 hover:underline">{site.url}</a>
              <div className="mt-4 flex flex-wrap gap-2"><Badge variant="brand">{site.region}</Badge><Badge variant="navy">{site.category}</Badge></div>
            </div>
            <div className="rounded-xl border border-cream-300 bg-white p-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-ink"><Users className="h-4 w-4 text-brand-500" />适用人群</h3>
              <div className="mt-3 flex flex-wrap gap-2">{site.audience.map((a) => <Badge key={a} variant="outline">{a}</Badge>)}</div>
            </div>
            <div className="rounded-xl border border-cream-300 bg-white p-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-ink"><CircleDollarSign className="h-4 w-4 text-brand-500" />免费或付费</h3>
              <p className="mt-3 text-xs leading-6 text-ink-soft">{site.free ?? "收费信息请以官网说明为准。"}</p>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
