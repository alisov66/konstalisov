"use client";

import type { CSSProperties, HTMLAttributes } from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import HeroActionGroup from "@/components/ui/HeroActionGroup";
import HeroButton from "@/components/ui/HeroButton";

type HeroNavigationState = "default" | "capabilities" | "about" | "contact" | "cv";
type HeroNavigationButtonSize = "L" | "M" | "S";

type Dot = readonly [x: number, y: number, size: number];

type HeroNavigationStyle = CSSProperties &
  Record<`--hero-navigation-${string}`, string | number>;
type HeroActionGroupOverrideStyle = CSSProperties &
  Record<"--hero-action-gap", string>;

const buttonRowMinWidth: Record<HeroNavigationButtonSize, number> = {
  L: 488,
  M: 416,
  S: 328,
};

const dotsByState: Record<HeroNavigationState, readonly Dot[]> = {
  default: [
    [209, 27, 12], [39, 187, 12], [493, 27, 12], [459, 187, 12], [73, 27, 12], [425, 219, 12], [561, 91, 12],
    [357, 219, 12], [39, 123, 12], [391, 187, 12], [425, 27, 12], [73, 155, 12], [141, 27, 12], [527, 59, 12],
    [391, 59, 12], [175, 187, 12], [141, 155, 12], [459, 59, 12], [249, 155, 12], [493, 91, 12], [283, 59, 12],
    [283, 187, 12], [317, 155, 12], [357, 27, 12], [493, 219, 12], [5, 91, 12], [527, 187, 12], [283, 123, 12],
    [107, 123, 12], [351, 123, 12], [527, 123, 12], [209, 219, 12], [215, 123, 12], [73, 91, 12], [317, 91, 12],
    [141, 91, 12], [107, 59, 12], [249, 91, 12], [73, 219, 12], [425, 155, 12], [493, 155, 12], [425, 91, 12],
    [175, 59, 12], [141, 219, 12], [5, 155, 12], [39, 59, 12], [459, 123, 12], [107, 187, 12], [561, 155, 12],
  ],
  capabilities: [
    [283, 136, 12], [283, 59.38, 12], [257.46, 59.38, 12], [270.23, 72.15, 12], [321.31, 72.15, 12], [308.54, 59.38, 12],
    [321.31, 97.69, 12], [206.38, 84.92, 12], [257.46, 136, 12], [270.23, 148.77, 12], [270.23, 97.69, 12],
    [295.77, 72.15, 12], [346.85, 72.15, 12], [346.85, 97.69, 12], [295.77, 148.77, 12], [321.31, 123.23, 12],
    [283, 110.46, 12], [244.69, 72.15, 12], [308.54, 84.92, 12], [308.54, 110.46, 12], [334.08, 84.92, 12],
    [244.69, 123.23, 12], [257.46, 110.46, 12], [295.77, 123.23, 12], [270.23, 123.23, 12], [257.46, 84.92, 12],
    [359.62, 84.92, 12], [295.77, 97.69, 12], [244.69, 97.69, 12], [283, 161.54, 12], [206.38, 110.46, 12],
    [283, 187.08, 12], [334.08, 136, 12], [359.62, 110.46, 12], [334.08, 59.38, 12], [308.54, 136, 12],
    [295.77, 174.31, 12], [231.92, 59.38, 12], [219.15, 97.69, 12], [231.92, 84.92, 12], [321.31, 148.77, 12],
    [244.69, 148.77, 12], [219.15, 72.15, 12], [257.46, 161.54, 12], [270.23, 174.31, 12], [219.15, 123.23, 12],
    [231.92, 136, 12], [308.54, 161.54, 12], [346.85, 123.23, 12],
  ],
  about: [
    [283.5, 136.65, 12], [322.96, 57.73, 12], [296.65, 162.96, 12], [362.42, 123.5, 12], [257.19, 44.58, 12],
    [244.04, 57.73, 12], [322.96, 110.35, 12], [362.42, 149.81, 12], [336.12, 176.12, 12], [204.58, 149.81, 12],
    [283.5, 97.19, 12], [283.5, 123.5, 12], [230.88, 176.12, 12], [362.42, 97.19, 12], [309.81, 162.96, 12],
    [257.19, 97.19, 12], [309.81, 44.58, 12], [283.5, 162.96, 12], [349.27, 84.04, 12], [217.73, 84.04, 12],
    [244.04, 110.35, 12], [244.04, 97.19, 12], [230.88, 97.19, 12], [349.27, 110.35, 12], [322.96, 97.19, 12],
    [336.12, 110.35, 12], [336.12, 97.19, 12], [230.88, 70.88, 12], [204.58, 97.19, 12], [296.65, 176.12, 12],
    [230.88, 110.35, 12], [257.19, 202.42, 12], [270.35, 136.65, 12], [217.73, 110.35, 12], [270.35, 162.96, 12],
    [257.19, 162.96, 12], [283.5, 110.35, 12], [322.96, 189.27, 12], [244.04, 189.27, 12], [309.81, 97.19, 12],
    [270.35, 176.12, 12], [283.5, 202.42, 12], [283.5, 44.58, 12], [204.58, 123.5, 12], [349.27, 162.96, 12],
    [283.5, 176.12, 12], [309.81, 202.42, 12], [217.73, 162.96, 12], [336.12, 70.88, 12],
  ],
  contact: [
    [275.46, 187.08, 12], [211.62, 123.23, 12], [326.54, 84.92, 12], [211.62, 110.46, 12], [249.92, 72.15, 12],
    [275.46, 59.38, 12], [224.38, 97.69, 12], [249.92, 174.31, 12], [237.15, 161.54, 12], [237.15, 84.92, 12],
    [288.23, 59.38, 12], [301, 72.15, 12], [339.31, 84.92, 12], [262.69, 72.15, 12], [288.23, 187.08, 12],
    [211.62, 136, 12], [275.46, 97.69, 12], [288.23, 97.69, 12], [313.77, 97.69, 12], [352.08, 97.69, 12],
    [352.08, 110.46, 12], [224.38, 148.77, 12], [262.69, 97.69, 12], [249.92, 123.23, 12], [275.46, 148.77, 12],
    [313.77, 110.46, 12], [326.54, 148.77, 12], [313.77, 72.15, 12], [262.69, 174.31, 12], [390.38, 136, 12],
    [262.69, 148.77, 12], [301, 136, 12], [313.77, 123.23, 12], [352.08, 161.54, 12], [352.08, 123.23, 12],
    [377.62, 148.77, 12], [364.85, 148.77, 12], [313.77, 174.31, 12], [339.31, 161.54, 12], [339.31, 136, 12],
    [301, 110.46, 12], [313.77, 148.77, 12], [301, 187.08, 12], [390.38, 123.23, 12], [249.92, 110.46, 12],
    [249.92, 136, 12], [288.23, 148.77, 12], [313.77, 136, 12], [326.54, 174.31, 12],
  ],
  cv: [
    [206.38, 46.38, 12], [231.92, 46.38, 12], [257.46, 46.38, 12], [283, 46.38, 12], [308.54, 46.38, 12],
    [334.08, 46.38, 12], [359.62, 46.38, 12], [206.38, 71.92, 12], [244.69, 97.46, 12], [231.92, 84.69, 12],
    [244.69, 71.92, 12], [257.46, 84.69, 12], [359.62, 71.92, 12], [206.38, 97.46, 12], [283, 71.92, 12],
    [295.77, 71.92, 12], [308.54, 71.92, 12], [321.31, 71.92, 12], [334.08, 71.92, 12], [359.62, 97.46, 12],
    [206.38, 123, 12], [283, 97.46, 12], [295.77, 97.46, 12], [308.54, 97.46, 12], [359.62, 123, 12],
    [206.38, 148.54, 12], [231.92, 148.54, 12], [244.69, 148.54, 12], [257.46, 148.54, 12], [270.23, 148.54, 12],
    [283, 148.54, 12], [295.77, 148.54, 12], [308.54, 148.54, 12], [321.31, 148.54, 12], [359.62, 148.54, 12],
    [206.38, 174.08, 12], [231.92, 174.08, 12], [244.69, 174.08, 12], [257.46, 174.08, 12], [270.23, 174.08, 12],
    [283, 174.08, 12], [359.62, 174.08, 12], [206.38, 199.62, 12], [231.92, 199.62, 12], [257.46, 199.62, 12],
    [283, 199.62, 12], [308.54, 199.62, 12], [334.08, 199.62, 12], [359.62, 199.62, 12],
  ],
};

const dotColorByState: Record<HeroNavigationState, string> = {
  default: "var(--text-tertiary)",
  capabilities: "#659d4d",
  about: "#82409a",
  contact: "#347694",
  cv: "#ab5138",
};

export interface HeroNavigationItem {
  href: string;
  id: string;
  label: string;
}

export interface HeroNavigationProps extends HTMLAttributes<HTMLElement> {
  items: HeroNavigationItem[];
  showPattern?: boolean;
}

function getNavigationState(id: string): HeroNavigationState | null {
  if (id === "cv") {
    return "cv";
  }

  if (id === "capabilities" || id === "about" || id === "contact") {
    return id;
  }

  return null;
}

function HeroPattern({ state }: { state: HeroNavigationState }) {
  return (
    <svg
      aria-hidden
      className="relative aspect-[577/259] w-full max-w-[577px] shrink-0 overflow-visible"
      viewBox="0 0 577 259"
    >
      {dotsByState[state].map(([x, y, size], index) => {
        const dotSize = 12;
        const inset = (size - dotSize) / 2;
        const dotStyle: CSSProperties = {
          fill: dotColorByState[state],
        };

        return (
          <circle
            className="[transition:var(--hero-navigation-dot-transition)]"
            cx={x + inset + dotSize / 2}
            cy={y + inset + dotSize / 2}
            key={`tile-${index + 1}`}
            r={dotSize / 2}
            style={dotStyle}
          />
        );
      })}
    </svg>
  );
}

export default function HeroNavigation({
  className,
  items,
  showPattern = true,
  style,
  ...props
}: HeroNavigationProps) {
  const router = useRouter();
  const navigationRef = useRef<HTMLElement | null>(null);
  const [hoveredItem, setHoveredItem] = useState<HeroNavigationState | null>(null);
  const [buttonSize, setButtonSize] = useState<HeroNavigationButtonSize>("L");
  const [isTabletLayout, setIsTabletLayout] = useState(false);
  const state = hoveredItem ?? "default";
  const renderedButtonSize = isTabletLayout ? "L" : buttonSize;
  const heroNavigationStyle = {
    "--hero-navigation-dot-transition":
      "cx var(--motion-gentle-duration) var(--motion-gentle-easing), cy var(--motion-gentle-duration) var(--motion-gentle-easing), fill var(--motion-gentle-duration) var(--motion-gentle-easing), r var(--motion-gentle-duration) var(--motion-gentle-easing)",
    "--hero-navigation-shell-transition":
      "all var(--motion-gentle-duration) var(--motion-gentle-easing)",
    "--hero-navigation-width": "577px",
  } satisfies HeroNavigationStyle;
  const heroActionGroupStyle = isTabletLayout
    ? ({
        "--hero-action-gap": "var(--base-5)",
      } satisfies HeroActionGroupOverrideStyle)
    : undefined;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateTabletLayout = () => {
      setIsTabletLayout(mediaQuery.matches);
    };

    updateTabletLayout();
    mediaQuery.addEventListener("change", updateTabletLayout);

    return () => {
      mediaQuery.removeEventListener("change", updateTabletLayout);
    };
  }, []);

  useEffect(() => {
    if (isTabletLayout) {
      return;
    }

    const updateButtonSize = () => {
      const navigation = navigationRef.current;

      if (!navigation) {
        return;
      }

      const parentWidth = navigation.parentElement?.clientWidth;
      const availableWidth = parentWidth || navigation.clientWidth;
      const nextButtonSize =
        availableWidth >= buttonRowMinWidth.L
          ? "L"
          : availableWidth >= buttonRowMinWidth.M
            ? "M"
            : "S";

      setButtonSize((currentButtonSize) =>
        currentButtonSize === nextButtonSize
          ? currentButtonSize
          : nextButtonSize,
      );
    };

    updateButtonSize();

    const observer = new ResizeObserver(updateButtonSize);
    const navigation = navigationRef.current;

    if (navigation) {
      observer.observe(navigation);
    }

    window.addEventListener("resize", updateButtonSize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateButtonSize);
    };
  }, [isTabletLayout]);

  return (
    <section
      {...props}
      className={[
        "flex w-full max-w-full flex-col items-center [transition:var(--hero-navigation-shell-transition)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onMouseLeave={(event) => {
        setHoveredItem(null);
        props.onMouseLeave?.(event);
      }}
      ref={navigationRef}
      style={{ ...heroNavigationStyle, ...style }}
    >
      <HeroActionGroup
        className={
          isTabletLayout
            ? "!grid w-max max-w-full grid-cols-[max-content_max-content] justify-items-center gap-x-[var(--base-5)] gap-y-[var(--base-3)] overflow-visible"
            : "max-w-full overflow-visible"
        }
        style={heroActionGroupStyle}
      >
        {items.map((item) => {
          const itemState = getNavigationState(item.id);

          return (
            <HeroButton
              key={item.id}
              onBlur={() => {
                setHoveredItem(null);
              }}
              onFocus={() => {
                setHoveredItem(itemState);
              }}
              onMouseEnter={() => {
                setHoveredItem(itemState);
              }}
              onClick={() => {
                router.push(item.href);
              }}
              selected={itemState !== null && itemState === hoveredItem}
              size={renderedButtonSize}
              type="button"
            >
              {item.label}
            </HeroButton>
          );
        })}
      </HeroActionGroup>

      {showPattern && !isTabletLayout ? <HeroPattern state={state} /> : null}
    </section>
  );
}
