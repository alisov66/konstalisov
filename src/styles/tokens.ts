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
      beigeLight: "var(--bg-beige-light)",
      gray: "var(--bg-gray)",
      violet: "var(--bg-violet)",
      mintGreen: "var(--bg-mint-green)",
    },

    button: {
      primary: {
        default: "var(--button-primary)",
        hover: "var(--button-primary-hover)",
        text: "var(--button-primary-text)",
      },

      secondary: {
        default: "var(--button-secondary)",
        hover: "var(--button-secondary-hover)",
        selected: "var(--button-secondary-selected)",
        text: "var(--button-secondary-text)",
        selectedText: "var(--button-secondary-selected-text)",
      },

      hero: {
        default: "var(--button-hero)",
        hover: "var(--button-hero-hover)",
        text: "var(--button-hero-text)",
      },
    },

    border: {
      primary: "var(--border-primary)",
      secondary: "var(--border-secondary)",
      tertiary: "var(--border-tertiary)",
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
