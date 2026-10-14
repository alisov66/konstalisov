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
    beigeLight50: "var(--bg-beige-light-50)",
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
    secondary: "var(--border-secondary)",
    tertiary: "var(--border-tertiary)",
    focus: "var(--border-focus)",
    focusSoft: "var(--border-focus-soft)",
    width: {
      thin: "var(--border-width-thin)",
      medium: "var(--border-width-medium)",
    },
  },
} as const;

export type ColorToken = typeof colors;
