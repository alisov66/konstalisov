export const colors = {
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
    focus: "var(--border-focus)",
    width: {
      thin: "var(--border-width-thin)",
      medium: "var(--border-width-medium)",
    },
  },
} as const;

export type ColorToken = typeof colors;
