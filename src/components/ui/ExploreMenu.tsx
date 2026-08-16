"use client";

import type { CSSProperties, HTMLAttributes, Ref } from "react";
import { forwardRef } from "react";

import { typography } from "@/styles";

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

export interface ExploreMenuProps extends HTMLAttributes<HTMLDivElement> {
  scrollerRef?: Ref<HTMLDivElement>;
  tabs: TabGroupTab[];
  value: string;
  onValueChange: (value: string) => void;
}

const ExploreMenu = forwardRef<HTMLDivElement, ExploreMenuProps>(
  (
    {
      className,
      scrollerRef,
      tabs,
      value,
      onValueChange,
      ...props
    },
    ref,
  ) => (
    <div
      {...props}
      className={[
        "sticky top-[72px] z-40 flex w-full shrink-0 flex-col items-start gap-[var(--base-5)] bg-[var(--bg-beige)] pb-[var(--base-5)] pt-[var(--base-10)] min-[1280px]:top-[128px] min-[1280px]:z-auto min-[1280px]:w-[var(--capabilities-menu-width)] min-[1280px]:pb-0",
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
      <div
        className="no-scrollbar -mx-[var(--padding-side)] w-[calc(100%+var(--padding-side)*2)] overflow-x-auto px-[var(--padding-side)] min-[1280px]:mx-0 min-[1280px]:w-full min-[1280px]:overflow-visible min-[1280px]:px-0"
        ref={scrollerRef}
      >
        <TabGroup
          className="w-max flex-nowrap items-start min-[1280px]:w-full min-[1280px]:flex-wrap"
          onValueChange={onValueChange}
          tabs={tabs}
          value={value}
        />
      </div>
    </div>
  ),
);

ExploreMenu.displayName = "ExploreMenu";

export default ExploreMenu;
