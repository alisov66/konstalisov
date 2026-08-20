import type { HTMLAttributes } from "react";
import Link from "next/link";

import { spacing } from "@/styles";

import TabButton, {
  getTabButtonClassName,
  getTabButtonStyle,
  type TabButtonLevel,
} from "./TabButton";

export interface TabGroupTab {
  id: string;
  label: string;
  href?: string;
}

export interface TabGroupProps extends HTMLAttributes<HTMLDivElement> {
  level?: TabButtonLevel;
  tabs: TabGroupTab[];
  value: string;
  onValueChange: (value: string) => void;
}

export default function TabGroup({
  level = "capability",
  tabs,
  value,
  onValueChange,
  className,
  style,
  ...props
}: TabGroupProps) {
  return (
    <div
      {...props}
      className={[
        "flex flex-wrap items-start",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="tablist"
      style={{ gap: spacing.base[1], ...style }}
    >
      {tabs.map((tab) => {
        const selected = tab.id === value;

        if (tab.href) {
          return (
            <Link
              aria-current={selected ? "page" : undefined}
              aria-selected={selected}
              className={getTabButtonClassName("no-underline")}
              data-level={level}
              data-selected={selected || undefined}
              data-tab-id={tab.id}
              href={tab.href}
              key={tab.id}
              onClick={() => onValueChange(tab.id)}
              role="tab"
              scroll={false}
              style={getTabButtonStyle(selected, level)}
            >
              {tab.label}
            </Link>
          );
        }

        return (
          <TabButton
            data-tab-id={tab.id}
            key={tab.id}
            level={level}
            selected={selected}
            onClick={() => onValueChange(tab.id)}
          >
            {tab.label}
          </TabButton>
        );
      })}
    </div>
  );
}
