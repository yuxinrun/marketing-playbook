import { Breadcrumbs, type Crumb } from "./breadcrumbs";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  crumbs: Crumb[];
  aside?: React.ReactNode;
}

export function PageHeader({ eyebrow, title, description, crumbs, aside }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-cream-300 bg-cream-50">
      <div className="paper-dots pointer-events-none absolute inset-0 opacity-40" />
      <div className="site-container relative py-10 lg:py-14">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="eyebrow">{eyebrow}</span>
            <h1 className="mt-4 text-balance font-serif text-4xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-[15px] leading-8 text-ink-soft sm:text-base">{description}</p>
          </div>
          {aside && <div className="shrink-0">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
