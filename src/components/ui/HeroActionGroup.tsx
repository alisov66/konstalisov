import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

type HeroActionGroupStyle = CSSProperties &
  Record<`--hero-action-${string}`, string | number>;

export interface HeroActionGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
  children: ReactNode;
  style?: HeroActionGroupStyle;
}

export default function HeroActionGroup({
  children,
  className,
  style,
  ...props
}: HeroActionGroupProps) {
  const heroActionGroupStyle = {
    "--hero-action-gap": 0,
  } satisfies HeroActionGroupStyle;

  return (
    <div
      {...props}
      className={[
        "flex items-center justify-center gap-[var(--hero-action-gap)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ ...heroActionGroupStyle, ...style }}
    >
      {children}
    </div>
  );
}
