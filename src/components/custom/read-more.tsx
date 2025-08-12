"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  maxLines?: number;
  lineHeightPx?: number;
};

export default function ReadMore({ text, className, maxLines = 3, lineHeightPx = 24 }: Props) {
  const [expanded, setExpanded] = useState(false);
  const approxCharsPerLine = 60;
  const isLong = (text || "").length > approxCharsPerLine * maxLines;
  const collapsedMax = `calc(${lineHeightPx}px * ${maxLines})`;

  return (
    <div className="flex flex-col gap-1">
      <div
        className={cn(
          "overflow-hidden transition-[max-height] duration-300 ease-in-out leading-6",
          className
        )}
        style={{ maxHeight: expanded ? "9999px" : collapsedMax }}
        aria-expanded={expanded}
      >
        {text}
      </div>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="self-start text-white hover:underline cursor-pointer transition-colors text-sm font-bold"
          aria-label={expanded ? "Show less" : "Read more"}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}

