const rawRadius = {
  sm: "var(--sm)",
  md: "var(--md)",
  lg: "var(--lg)",
  xl: "var(--xl)",
  pill: "var(--pill)",
} as const;

export const radius = {
  raw: rawRadius,
  card: { xl: "var(--card-xl)" },

  sm: rawRadius.sm,
  md: rawRadius.md,
  lg: rawRadius.lg,
  xl: rawRadius.xl,
  pill: rawRadius.pill,
} as const;

export type RadiusToken = typeof radius;
