import { colors } from "./colors";
import { radius } from "./radius";
import { spacing } from "./spacing";
import { typography } from "./typography";

export const tokens = {
  colors,
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
