import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { articles, articleBySlug } from "@/data/articles";
import type { ArticleMeta } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "articles");

export interface ArticleWithContent {
  meta: ArticleMeta;
  content: string;
}

export function getArticleContent(slug: string): string {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return "";
  const raw = fs.readFileSync(filePath, "utf-8");
  return matter(raw).content;
}

export function getArticle(slug: string): ArticleWithContent | null {
  const meta = articleBySlug[slug];
  if (!meta) return null;
  return { meta, content: getArticleContent(slug) };
}

export function getAllArticles(): ArticleMeta[] {
  return articles;
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  return articles.filter((a) => a.category === category);
}

export function getRelatedArticles(slug: string, limit = 3): ArticleMeta[] {
  const current = articleBySlug[slug];
  if (!current) return articles.slice(0, limit);
  return articles
    .filter((a) => a.slug !== slug)
    .sort((a, b) => {
      const scoreA = (a.category === current.category ? 2 : 0) + a.tags.filter((t) => current.tags.includes(t)).length;
      const scoreB = (b.category === current.category ? 2 : 0) + b.tags.filter((t) => current.tags.includes(t)).length;
      return scoreB - scoreA;
    })
    .slice(0, limit);
}
