import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, href, linkLabel = "查看全部", className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="section-title mt-3 text-balance">{title}</h2>
        {description && <p className="section-desc text-pretty">{description}</p>}
      </div>
      {href && (
        <Link href={href} className="link-underline shrink-0 text-sm">
          {linkLabel} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
