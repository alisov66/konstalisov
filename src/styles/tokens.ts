import { colors } from "./colors";
import { effects } from "./effects";
import { radius } from "./radius";
import { spacing } from "./spacing";
import { typography } from "./typography";

export const tokens = {
  colors,
  effects,
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
    tablet: 834,
    desktop: 1440,
    desktopXL: 1728,
  },
} as const;

export type Tokens = typeof tokens;
