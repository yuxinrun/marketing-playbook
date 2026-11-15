import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { footerColumns, site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-cream-300 bg-cream-100/70">
      <div className="site-container py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19V5l8 7 8-7v14" />
                </svg>
              </span>
              <span className="font-serif text-lg font-bold text-ink">{site.name}</span>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-ink-soft">
              一个系统、专业、实操的中文营销知识平台。整理国内外优秀的营销理论、方法、书籍、工具与案例，帮助读者从理解市场开始，真正实现增长。
            </p>
            <p className="mt-4 font-serif text-sm italic text-brand-700">{site.sloganEn}</p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-brand-600"
            >
              了解我们的编辑原则 <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 text-sm font-semibold text-ink">{col.title}</h3>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-ink-soft transition-colors hover:text-brand-600">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-cream-300 pt-6">
          <div className="flex flex-col gap-3 text-xs leading-6 text-ink-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {site.name} · {site.brand}. 内容仅供学习与研究参考。</p>
            <p className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              版权与信息来源声明：本站引用观点均标注来源，案例数据以官方与权威公开资料为准。
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
