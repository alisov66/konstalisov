"use client";

import type { CSSProperties, HTMLAttributes, RefObject } from "react";
import { forwardRef, useEffect, useMemo, useRef } from "react";

import { spacing, typography } from "@/styles";

import CapabilityGroup from "./CapabilityGroup";
import TabGroup, { type TabGroupTab } from "./TabGroup";

function typeStyle(token: {
  fontSize: string | number;
  lineHeight: string | number;
  fontWeight: string | number;
}): CSSProperties {
  return {
    fontSize: token.fontSize,
    lineHeight: token.lineHeight,
    fontWeight: token.fontWeight,
  };
}

export interface ExploreMenuCapability extends TabGroupTab {
  articles: TabGroupTab[];
}

export interface ExploreMenuProps extends HTMLAttributes<HTMLDivElement> {
  articleValue: string;
  capabilities: ExploreMenuCapability[];
  capabilityValue: string;
  onArticleValueChange: (value: string) => void;
  onCapabilityValueChange: (value: string) => void;
}

function useSelectedTabScroll(
  scrollerRef: RefObject<HTMLDivElement | null>,
  value: string,
) {
  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      if (scroller.scrollWidth <= scroller.clientWidth) {
        scroller.scrollLeft = 0;
        return;
      }

      const selectedTab = scroller.querySelector<HTMLElement>(
        `[data-tab-id="${CSS.escape(value)}"]`,
      );

      if (!selectedTab) {
        return;
      }

      const centered =
        selectedTab.offsetLeft +
        selectedTab.offsetWidth / 2 -
        scroller.clientWidth / 2;
      const maximum = scroller.scrollWidth - scroller.clientWidth;

      scroller.scrollLeft = Math.max(0, Math.min(centered, maximum));
    });

    return () => cancelAnimationFrame(frame);
  }, [scrollerRef, value]);
}

const ExploreMenu = forwardRef<HTMLDivElement, ExploreMenuProps>(
  (
    {
      articleValue,
      capabilities,
      capabilityValue,
      className,
      onArticleValueChange,
      onCapabilityValueChange,
      ...props
    },
    ref,
  ) => {
    const capabilityScrollerRef = useRef<HTMLDivElement>(null);
    const articleScrollerRef = useRef<HTMLDivElement>(null);
    const activeCapability = useMemo(
      () =>
        capabilities.find(
          (capability) => capability.id === capabilityValue,
        ) ?? capabilities[0],
      [capabilities, capabilityValue],
    );
    const showArticleTabs = activeCapability?.articles.length > 1;

    useSelectedTabScroll(capabilityScrollerRef, capabilityValue);
    useSelectedTabScroll(articleScrollerRef, articleValue);

    return (
      <div
        {...props}
        className={[
          "sticky top-[52px] z-40 flex w-full shrink-0 flex-col items-start gap-[var(--base-5)] bg-[var(--bg-beige)] pb-[var(--base-5)] pt-[var(--base-10)] min-[1280px]:top-[128px] min-[1280px]:z-auto min-[1280px]:w-[var(--capabilities-menu-width)] min-[1280px]:pb-0",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        ref={ref}
      >
        <h2
          className="text-center text-[var(--text-accent)]"
          style={typeStyle(typography.heading.h4)}
        >
          Explore
        </h2>

        <div className="hidden w-full min-[1280px]:flex min-[1280px]:flex-col min-[1280px]:items-start">
          {capabilities.map((capability) => (
            <CapabilityGroup
              articleValue={articleValue}
              articles={capability.articles}
              capability={{
                ...capability,
                count: capability.articles.length,
              }}
              capabilityValue={capabilityValue}
              expanded={
                capability.id === capabilityValue &&
                capability.articles.length > 1
              }
              key={capability.id}
              onArticleValueChange={onArticleValueChange}
              onCapabilityValueChange={onCapabilityValueChange}
              style={{ marginBottom: spacing.base[2] }}
            />
          ))}
        </div>

        <div
          className="flex w-full flex-col items-start min-[1280px]:hidden"
          style={{ gap: showArticleTabs ? spacing.base[3] : 0 }}
        >
          <div
            className="no-scrollbar -mx-[var(--padding-side)] w-[calc(100%+var(--padding-side)*2)] overflow-x-auto px-[var(--padding-side)]"
            ref={capabilityScrollerRef}
          >
            <TabGroup
              className="w-max flex-nowrap"
              level="capability"
              onValueChange={onCapabilityValueChange}
              tabs={capabilities.map((capability) => ({
                ...capability,
                count: capability.articles.length,
              }))}
              value={capabilityValue}
            />
          </div>

          {showArticleTabs ? (
            <div
              className="no-scrollbar -mx-[var(--padding-side)] w-[calc(100%+var(--padding-side)*2)] overflow-x-auto px-[var(--padding-side)]"
              ref={articleScrollerRef}
            >
              <TabGroup
                className="w-max flex-nowrap"
                level="article"
                onValueChange={onArticleValueChange}
                tabs={activeCapability.articles}
                value={articleValue}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  },
);

ExploreMenu.displayName = "ExploreMenu";

export default ExploreMenu;
