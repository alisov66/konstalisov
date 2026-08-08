import { radius } from "./radius";
import { spacing } from "./spacing";
import { typography } from "./typography";

export const tokens = {
  colors: {
    text: {
      primary: "var(--text-primary)",
      secondary: "var(--text-secondary)",
      tertiary: "var(--text-tertiary)",
      inverted: "var(--text-inverted)",
      accent: "var(--text-accent)",
    },

    background: {
      beige: "var(--bg-beige)",
      beigeSoft: "var(--bg-beige-soft)",
      beigeLight: "var(--bg-beige-light)",
      gray: "var(--bg-gray)",
    },

    button: {
      fillAccent: "var(--button-fill-accent)",
      fillAccentMuted: "var(--button-fill-accent-muted)",
      fillLight: "var(--button-fill-light)",
      text: "var(--button-text)",
    },

    border: {
      primary: "var(--border-primary)",
      width: {
        thin: "var(--border-width-thin)",
        medium: "var(--border-width-medium)",
      },
    },
  },

  spacing,
  radius,
  typography,

  grid: {
    columns: 12,
    gutter: 20,
    margin: 120,
  },

  breakpoints: {
    mobile: 390,
    tablet: 768,
    laptop: 1280,
    desktop: 1440,
    desktopXL: 1728,
  },
} as const;

export type Tokens = typeof tokens;
