import type { HTMLAttributes } from "react";

import { spacing } from "@/styles";

import TabGroup, { type TabGroupTab } from "./TabGroup";

export interface CapabilityGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  articleValue: string;
  articles: TabGroupTab[];
  capability: TabGroupTab;
  capabilityValue: string;
  expanded?: boolean;
  onArticleValueChange: (value: string) => void;
  onCapabilityValueChange: (value: string) => void;
}

export default function CapabilityGroup({
  articleValue,
  articles,
  capability,
  capabilityValue,
  className,
  expanded = false,
  onArticleValueChange,
  onCapabilityValueChange,
  style,
  ...props
}: CapabilityGroupProps) {
  return (
    <div
      {...props}
      className={["flex w-full flex-col items-start", className]
        .filter(Boolean)
        .join(" ")}
      data-expanded={expanded || undefined}
      style={{
        gap: spacing.base[1],
        paddingBottom: expanded ? spacing.base[2] : 0,
        ...style,
      }}
    >
      <TabGroup
        level="capability"
        onValueChange={onCapabilityValueChange}
        tabs={[capability]}
        value={capabilityValue}
      />

      {expanded ? (
        <div style={{ paddingLeft: spacing.base[4] }}>
          <TabGroup
            className="flex-col"
            level="article"
            onValueChange={onArticleValueChange}
            style={{ gap: 0 }}
            tabs={articles}
            value={articleValue}
          />
        </div>
      ) : null}
    </div>
  );
}
