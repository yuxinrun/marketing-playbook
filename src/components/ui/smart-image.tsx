"use client";

import * as React from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
}

export function SmartImage({
  src,
  alt,
  className,
  imageClassName,
  fill = true,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: SmartImageProps) {
  const [failed, setFailed] = React.useState(false);

  if (failed) {
    return (
      <div className={cn("relative flex items-center justify-center overflow-hidden bg-cream-200", className)}>
        <div className="paper-dots absolute inset-0 opacity-60" />
        <div className="relative flex flex-col items-center gap-2 px-4 text-center">
          <ImageOff className="h-7 w-7 text-ink-faint" />
          <span className="line-clamp-2 text-xs text-ink-muted">{alt}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        sizes={sizes}
        onError={() => setFailed(true)}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}
