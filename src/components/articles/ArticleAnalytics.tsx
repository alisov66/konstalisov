"use client";

import { useEffect, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { track } from "@vercel/analytics";

export default function ArticleAnalytics({ id, title }: { id: string; title: string }) {
  const tracked = useRef<string | null>(null);
  useEffect(() => {
    if (tracked.current !== id) {
      tracked.current = id;
      track("case_study_view", { project: title, article: id });
    }
    if (!process.env.NEXT_PUBLIC_GA_ID) return;

    // Direct article loads can mount before the shared GA script initializes.
    let attempts = 0;
    const timer = window.setInterval(() => {
      if ("dataLayer" in window) {
        sendGAEvent("event", "case_study_view", { article: id, title });
        window.clearInterval(timer);
      } else if (++attempts >= 50) {
        window.clearInterval(timer);
      }
    }, 100);
    return () => window.clearInterval(timer);
  }, [id, title]);
  return null;
}
