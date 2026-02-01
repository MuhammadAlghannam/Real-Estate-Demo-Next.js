"use client";
import he from 'he'; // Add this import
import parse from 'html-react-parser';
import DOMPurify from 'isomorphic-dompurify';
import type { ReactElement } from 'react';

interface ParserHTMLRendererProps {
  htmlContent?: string | null;
  className?: string
}

export default function ParserHTMLRenderer({ htmlContent, className }: ParserHTMLRendererProps): ReactElement {
  // Decode HTML entities first to get actual HTML string
  const decodedHTML = he.decode(htmlContent ?? "");

  // Then sanitize the decoded HTML
  const sanitizedHTML = DOMPurify.sanitize(decodedHTML);

  return <div className={className}>{parse(sanitizedHTML)}</div>;
}