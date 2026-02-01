"use client";

import { htmlToPlainText } from "@/lib/utils/helper";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ParserHTMLRenderer from "./ParserHTMLRenderer";

interface TruncateHTMLProps {
  htmlContent: string;
  maxWords?: number;
  className?: string;
  readMoreText?: string;
  readLessText?: string;
}

export default function TruncateHTML({
  htmlContent,
  maxWords = 30,
  className = "",
  readMoreText,
  readLessText,
}: TruncateHTMLProps) {
  const t = useTranslations("Shared.truncate-html");
  const defaultReadMore = readMoreText ?? t("read-more");
  const defaultReadLess = readLessText ?? t("read-less");
  const [isExpanded, setIsExpanded] = useState(false);

  // Convert HTML to plain text for word counting
  const plainText = htmlToPlainText(htmlContent);
  const words = plainText.trim().split(/\s+/);

  // Check if we should show read more button
  // Count paragraph tags to detect multiple paragraphs
  const paragraphCount = (htmlContent.match(/<p>/g) || []).length;
  const shouldTruncate = words.length > maxWords || paragraphCount >= 2;

  if (!shouldTruncate) {
    // If content is short, just show it without truncation
    return <ParserHTMLRenderer htmlContent={htmlContent} className={className} />;
  }

  return (
    <div>
      {!isExpanded ? (
        <div>
          <p className={className}>
            {words.slice(0, maxWords).join(" ")}...
          </p>
          <button
            onClick={() => setIsExpanded(true)}
            className="text-primary cursor-pointer hover:text-primary/80 text-h8-semibold mt-1 transition-colors"
          >
            {defaultReadMore}
          </button>
        </div>
      ) : (
        <div>
          <ParserHTMLRenderer htmlContent={htmlContent} className={className} />
          <button
            onClick={() => setIsExpanded(false)}
            className="text-primary cursor-pointer hover:text-primary/80 text-h8-semibold mt-1 transition-colors"
          >
            {defaultReadLess}
          </button>
        </div>
      )}
    </div>
  );
}

