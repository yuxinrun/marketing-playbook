import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="面包屑导航" className="flex flex-wrap items-center gap-1.5 text-xs text-ink-muted">
      <Link href="/" className="flex items-center gap-1 transition-colors hover:text-brand-600">
        <Home className="h-3.5 w-3.5" />
        <span>首页</span>
      </Link>
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} className="flex items-center gap-1.5">
          <ChevronRight className="h-3 w-3 text-ink-faint" />
          {item.href ? (
            <Link href={item.href} className="transition-colors hover:text-brand-600">{item.label}</Link>
          ) : (
            <span className="text-ink-soft">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
