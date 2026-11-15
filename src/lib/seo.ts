import type { Metadata } from "next";
import { site } from "@/data/site";

interface SeoOptions {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
  image?: string;
}

export function createMetadata({
  title,
  description,
  path = "/",
  type = "website",
  publishedTime,
  image,
}: SeoOptions): Metadata {
  const url = `${site.url}${path}`;
  const fullTitle = title === site.name ? title : `${title} | ${site.name}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      title: fullTitle,
      description,
      url,
      siteName: site.brand,
      locale: site.locale,
      ...(publishedTime ? { publishedTime } : {}),
      images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
