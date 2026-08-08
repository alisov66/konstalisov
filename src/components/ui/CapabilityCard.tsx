import Link from "next/link";
import type {
  CSSProperties,
  FocusEventHandler,
  MouseEventHandler,
} from "react";

import type { CapabilityId, capabilities } from "@/data/capabilities";
import { tokens } from "@/styles/tokens";

type CapabilityIconDot = {
  readonly x: number;
  readonly y: number;
  readonly size: 4 | 8;
  readonly tone: "accent" | "light" | "tertiary";
};

type CapabilityIconState = "default" | "hover";
type CapabilityIconKind =
  | "accent4"
  | "accent8"
  | "light4"
  | "light8"
  | "tertiary4";

const capabilityIconCenters = [20, 32, 44, 56, 68] as const;

function dotKindToDot(centerX: number, centerY: number, kind: CapabilityIconKind) {
  const size = kind.endsWith("8") ? 8 : 4;
  const tone = kind.startsWith("light")
    ? "light"
    : kind.startsWith("tertiary")
      ? "tertiary"
      : "accent";

  return {
    size,
    tone,
    x: centerX - size / 2,
    y: centerY - size / 2,
  } satisfies CapabilityIconDot;
}

function getCapabilityIconKind(
  id: CapabilityId,
  state: CapabilityIconState,
  index: number,
): CapabilityIconKind {
  const isHover = state === "hover";
  const isComplex = id === "complex-workflow-design";
  const isDesign = id === "design-systems";
  const isDocumentation = id === "documentation-collaboration";
  const isProduct = id === "product-design-at-scale";
  const isMobile = id === "mobile-experiences";
  const isDefaultDocOrProduct = !isHover && (isDocumentation || isProduct);
  const isDefaultDocProductOrDesign =
    !isHover && (isDocumentation || isProduct || isDesign);
  const isHoverComplexOrDesign = isHover && (isComplex || isDesign);
  const isHoverComplexOrDocumentation =
    isHover && (isComplex || isDocumentation);
  const isHoverComplexOrMobile = isHover && (isComplex || isMobile);
  const isHoverComplexMobileOrDesign =
    isHover && (isComplex || isMobile || isDesign);
  const isHoverDocumentationOrProduct =
    isHover && (isDocumentation || isProduct);
  const isHoverDocumentationProductOrDesign =
    isHover && (isDocumentation || isProduct || isDesign);
  const isHoverProductOrMobile = isHover && (isProduct || isMobile);
  const isProductMobileOrDesign = isProduct || isMobile || isDesign;

  switch (index) {
    case 0:
      if (!isHover && isMobile) return "tertiary4";
      if (isHover && (isProduct || isDesign)) return "light4";
      if (!isHover && (isProduct || isMobile || isDesign)) return "accent4";
      if (isHoverComplexOrDocumentation) return "light8";
      return "accent8";
    case 1:
      if (!isHover && (isDocumentation || isProduct || isMobile || isDesign)) {
        return "tertiary4";
      }
      if (isHover && isComplex) return "light4";
      return "accent4";
    case 2:
      if (!isHover && isMobile) return "tertiary4";
      if (isHoverDocumentationOrProduct) return "light8";
      if (isDefaultDocOrProduct) return "accent8";
      if (isHoverComplexOrDesign) return "light4";
      return "accent4";
    case 3:
      return isHover ? "accent4" : "tertiary4";
    case 4:
      if (isHoverDocumentationProductOrDesign) return "light4";
      if (isDefaultDocProductOrDesign) return "accent4";
      if (isHoverComplexOrMobile) return "light8";
      return "accent8";
    case 5:
      if (isHover && isMobile) return "light8";
      if (!isHover && isMobile) return "accent8";
      if (isHover && (isComplex || isDocumentation || isProduct || isDesign)) {
        return "accent4";
      }
      return "tertiary4";
    case 6:
      if (isHover && isDesign) return "light8";
      if (!isHover && isDesign) return "accent8";
      if (isHoverProductOrMobile) return "light4";
      if (
        (isHover && (isComplex || isDocumentation)) ||
        (!isHover && (isProduct || isMobile))
      ) {
        return "accent4";
      }
      return "tertiary4";
    case 7:
      if (isHover && isMobile) return "light8";
      if (!isHover && isMobile) return "accent8";
      if (isDefaultDocOrProduct) return "tertiary4";
      if (isHoverComplexOrDesign) return "light4";
      return "accent4";
    case 8:
      if (isHover && isDesign) return "light8";
      if (!isHover && isDesign) return "accent8";
      if (isHoverDocumentationOrProduct) return "light4";
      if (
        (isHover && (isComplex || isMobile)) ||
        (!isHover && (isDocumentation || isProduct))
      ) {
        return "accent4";
      }
      return "tertiary4";
    case 9:
      return isHover ? "accent4" : "tertiary4";
    case 10:
      if (isHover && (isMobile || isDesign)) return "light4";
      if (isHoverDocumentationOrProduct) return "light8";
      if (isDefaultDocOrProduct) return "accent8";
      if ((isHover && isComplex) || (!isHover && (isMobile || isDesign))) {
        return "accent4";
      }
      return "tertiary4";
    case 11:
      if (isHover && isDesign) return "light4";
      if (isHover && (isComplex || isDocumentation || isProduct || isMobile)) {
        return "accent4";
      }
      if (!isHover && isDesign) return "accent4";
      return "tertiary4";
    case 12:
      if (!isHover && isDesign) return "tertiary4";
      if (isHoverProductOrMobile) return "light4";
      if ((!isHover && (isProduct || isMobile)) || (isHover && isDesign)) {
        return "accent4";
      }
      if (isHoverComplexOrDocumentation) return "light8";
      return "accent8";
    case 13:
      if (isDefaultDocOrProduct) return "tertiary4";
      if (isHoverComplexMobileOrDesign) return "light4";
      return "accent4";
    case 14:
      if (!isHover && isMobile) return "tertiary4";
      if (isHoverDocumentationOrProduct) return "light8";
      if (isDefaultDocOrProduct) return "accent8";
      if (isHoverComplexOrDesign) return "light4";
      return "accent4";
    case 15:
      if (isDefaultDocProductOrDesign) return "tertiary4";
      if (isHoverComplexOrMobile) return "light4";
      return "accent4";
    case 16:
      if (isHover && isDesign) return "light8";
      if (!isHover && isDesign) return "accent8";
      if (!isHover && isMobile) return "tertiary4";
      if (isHover && (isComplex || isDocumentation || isProduct)) {
        return "light4";
      }
      return "accent4";
    case 17:
      if (isDefaultDocOrProduct) return "tertiary4";
      if (isHoverComplexMobileOrDesign) return "light4";
      return "accent4";
    case 18:
      if (isHover && isDesign) return "light8";
      if (!isHover && isDesign) return "accent8";
      if (isHoverProductOrMobile) return "light4";
      if (
        (isHover && (isComplex || isDocumentation)) ||
        (!isHover && (isProduct || isMobile))
      ) {
        return "accent4";
      }
      return "tertiary4";
    case 19:
      if (isDefaultDocProductOrDesign) return "tertiary4";
      if (isHoverComplexOrMobile) return "light4";
      return "accent4";
    case 20:
      if (isHoverDocumentationProductOrDesign) return "light4";
      if (isDefaultDocProductOrDesign) return "accent4";
      if (isHoverComplexOrMobile) return "light8";
      return "accent8";
    case 21:
      return isHover ? "accent4" : "tertiary4";
    case 22:
      if (isHover && isDesign) return "light4";
      if (isHover && (isDocumentation || isProduct || isMobile)) return "light8";
      if (!isHover && (isDocumentation || isProduct || isMobile)) {
        return "accent8";
      }
      if ((isHover && isComplex) || (!isHover && isDesign)) return "accent4";
      return "tertiary4";
    case 23:
      if (isHover && isMobile) return "light4";
      if (
        (isHover && (isComplex || isDocumentation || isProduct || isDesign)) ||
        (!isHover && isMobile)
      ) {
        return "accent4";
      }
      return "tertiary4";
    case 24:
      if (isHover && isProductMobileOrDesign) return "light4";
      if (!isHover && isProductMobileOrDesign) return "accent4";
      if (isHoverComplexOrDocumentation) return "light8";
      return "accent8";
    default:
      return "tertiary4";
  }
}

function getCapabilityIconDots(
  id: CapabilityId,
  state: CapabilityIconState,
): CapabilityIconDot[] {
  return capabilityIconCenters.flatMap((centerY, row) =>
    capabilityIconCenters.map((centerX, column) =>
      dotKindToDot(
        centerX,
        centerY,
        getCapabilityIconKind(id, state, row * 5 + column),
      ),
    ),
  );
}

function typeStyle(token: {
  fontSize: string | number;
  lineHeight: string | number;
  fontWeight: string | number;
}) {
  return {
    fontSize: token.fontSize,
    lineHeight: token.lineHeight,
    fontWeight: token.fontWeight,
  };
}

function DotPattern({
  dots,
  size,
  colorByTone,
}: {
  dots: readonly CapabilityIconDot[];
  size: number;
  colorByTone: Record<CapabilityIconDot["tone"], string>;
}) {
  return (
    <span
      aria-hidden
      className="relative block shrink-0 overflow-hidden"
      style={{ height: size, width: size }}
    >
      {dots.map((dot, index) => (
        <span
          className="absolute rounded-full"
          key={`${dot.x}-${dot.y}-${index}`}
          style={{
            backgroundColor: colorByTone[dot.tone],
            height: dot.size,
            left: dot.x,
            top: dot.y,
            width: dot.size,
          }}
        />
      ))}
    </span>
  );
}

function CapabilityIcon({ id }: { id: CapabilityId }) {
  const colorByTone: Record<CapabilityIconDot["tone"], string> = {
    accent: "var(--text-accent)",
    light: "var(--bg-beige-light)",
    tertiary: "var(--bg-beige)",
  };

  return (
    <span className="relative block size-[88px] shrink-0">
      <span className="absolute inset-0 transition-opacity duration-300 ease-out group-hover:opacity-0 group-focus-visible:opacity-0">
        <DotPattern
          colorByTone={colorByTone}
          dots={getCapabilityIconDots(id, "default")}
          size={88}
        />
      </span>
      <span className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100">
        <DotPattern
          colorByTone={colorByTone}
          dots={getCapabilityIconDots(id, "hover")}
          size={88}
        />
      </span>
    </span>
  );
}

export interface CapabilityCardProps {
  capability: (typeof capabilities)[number];
  className?: string;
  onBlur?: FocusEventHandler<HTMLAnchorElement>;
  onFocus?: FocusEventHandler<HTMLAnchorElement>;
  onMouseEnter?: MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave?: MouseEventHandler<HTMLAnchorElement>;
  onMouseMove?: MouseEventHandler<HTMLAnchorElement>;
  style?: CSSProperties;
}

export default function CapabilityCard({
  capability,
  className,
  onBlur,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  style,
}: CapabilityCardProps) {
  return (
    <Link
      className={[
        "capability-card group flex min-h-[280px] w-[312px] flex-col items-start gap-[var(--base-3)] rounded-[var(--xl)] bg-[var(--bg-beige-light)] p-[var(--base-6)] text-[var(--text-primary)] no-underline",
        "transition-[background-color,transform] duration-300 ease-out hover:bg-[var(--button-fill-accent)] focus-visible:bg-[var(--button-fill-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--text-primary)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-name="capability card"
      href={`/capabilities/${capability.id}`}
      onBlur={onBlur}
      onClick={(event) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.altKey ||
          event.ctrlKey ||
          event.shiftKey
        ) {
          return;
        }

        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }}
      onFocus={onFocus}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      scroll={false}
      style={style}
    >
      <CapabilityIcon id={capability.id} />

      <span className="flex w-full flex-1 flex-col items-start">
        <span
          className="w-full text-[var(--text-primary)]"
          style={typeStyle(tokens.typography.heading.h5)}
        >
          {capability.label}
        </span>
        <span
          className="mt-auto w-full pt-[var(--base-3)] text-[var(--text-primary)]"
          style={typeStyle(tokens.typography.body.small)}
        >
          {capability.summary}
        </span>
      </span>
    </Link>
  );
}
