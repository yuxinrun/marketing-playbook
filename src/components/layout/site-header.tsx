"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search, ArrowUpRight } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SearchDialog } from "./search-dialog";

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="group flex items-center gap-2.5" aria-label="营销实战指南首页">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-white shadow-sm transition-transform group-hover:-rotate-3">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19V5l8 7 8-7v14" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[17px] font-bold tracking-tight text-ink">营销实战指南</span>
        <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-ink-muted">Marketing Playbook</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);

  React.useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-cream-300/80 bg-cream-50/90 backdrop-blur-xl">
      <div className="site-container flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="主导航">
          {mainNav.map((item) => {
            const active = isActive(item.href);
            if (!item.children) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-[13px] font-medium text-ink-soft transition-colors hover:text-ink",
                    active && "text-brand-600"
                  )}
                >
                  {item.label}
                  {active && <span className="absolute -bottom-[13px] left-3 right-3 h-0.5 rounded-full bg-brand-500" />}
                </Link>
              );
            }
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  type="button"
                  onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                  className={cn(
                    "flex items-center gap-1 rounded-md px-3 py-2 text-[13px] font-medium text-ink-soft transition-colors hover:text-ink",
                    active && "text-brand-600"
                  )}
                  aria-expanded={openMenu === item.label}
                >
                  {item.label}
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", openMenu === item.label && "rotate-180")} />
                </button>
                {openMenu === item.label && (
                  <div className="absolute left-0 top-full w-64 pt-2">
                    <div className="overflow-hidden rounded-xl border border-cream-300 bg-white p-2 shadow-card-hover">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-cream-100"
                        >
                          <span className="block text-sm font-medium text-ink">{child.label}</span>
                          {child.desc && <span className="mt-0.5 block text-xs text-ink-muted">{child.desc}</span>}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex h-10 items-center gap-2 rounded-lg border border-cream-300 bg-white px-3 text-sm text-ink-muted transition-colors hover:border-brand-300 hover:text-brand-600"
            aria-label="搜索"
          >
            <Search className="h-4 w-4" />
            <span className="hidden lg:inline">搜索</span>
          </button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/marketing">开始学习</Link>
          </Button>
          <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-cream-300 bg-white text-ink xl:hidden"
                aria-label="打开导航菜单"
              >
                <Menu className="h-5 w-5" />
              </button>
            </DialogTrigger>
            <DialogContent className="bottom-0 right-0 top-0 h-full w-[min(88vw,360px)] rounded-l-2xl p-0">
              <DialogTitle className="sr-only">导航菜单</DialogTitle>
              <div className="flex h-full flex-col">
                <div className="border-b border-cream-300 px-6 py-5">
                  <Logo onClick={() => setMobileOpen(false)} />
                </div>
                <nav className="flex-1 overflow-y-auto px-4 py-5" aria-label="移动端导航">
                  {mainNav.map((item) => (
                    <div key={item.label} className="mb-1">
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-3 py-3 text-[15px] font-medium transition-colors",
                          isActive(item.href) ? "bg-brand-50 text-brand-700" : "text-ink hover:bg-cream-100"
                        )}
                      >
                        {item.label}
                        <ArrowUpRight className="h-4 w-4 opacity-50" />
                      </Link>
                      {item.children && (
                        <div className="ml-3 border-l border-cream-300 pl-3">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="block rounded-md px-3 py-2 text-sm text-ink-soft hover:text-brand-600"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
                <div className="border-t border-cream-300 p-4">
                  <Button asChild className="w-full">
                    <Link href="/lab" onClick={() => setMobileOpen(false)}>进入营销实验室</Link>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
