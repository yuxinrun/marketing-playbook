import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/data/site";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.brand}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "营销", "市场营销", "营销实战", "品牌营销", "内容营销", "SEO", "增长营销",
    "用户增长", "数据分析", "营销书籍", "营销案例", "Marketing Playbook",
  ],
  authors: [{ name: "营销实战指南编辑部" }],
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.brand,
    title: `${site.name} · ${site.brand}`,
    description: site.description,
    url: site.url,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Serif+SC:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
