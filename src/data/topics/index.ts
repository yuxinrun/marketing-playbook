import type { TopicCategory, Topic } from "@/types";
import { fundamentals } from "./fundamentals";
import { strategy } from "./strategy";
import { branding } from "./branding";
import { content } from "./content";
import { seo } from "./seo";
import { social } from "./social";
import { advertising } from "./advertising";
import { growth } from "./growth";
import { b2b } from "./b2b";
import { ecommerce } from "./ecommerce";
import { analytics } from "./analytics";

export const topicCategories: TopicCategory[] = [
  fundamentals,
  strategy,
  branding,
  content,
  seo,
  social,
  advertising,
  growth,
  b2b,
  ecommerce,
  analytics,
];

export const allTopics: Topic[] = topicCategories.flatMap((c) => c.topics);
export const topicBySlug = Object.fromEntries(allTopics.map((t) => [t.slug, t])) as Record<string, Topic>;
export const categoryById = Object.fromEntries(topicCategories.map((c) => [c.id, c])) as Record<string, TopicCategory>;

export function getCategory(id: string) {
  return categoryById[id];
}
