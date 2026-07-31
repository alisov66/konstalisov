const rawTypography = {
  font: {
    family: "var(--font-family)",
  },

  fontWeight: {
    regular: "var(--font-weight-regular)",
    medium: "var(--font-weight-medium)",
    semibold: "var(--font-weight-semibold)",
  },

  heading: {
    h1: {
      fontSize: "var(--h1-size)",
      lineHeight: "var(--h1-line)",
    },

    h2: {
      fontSize: "var(--h2-size)",
      lineHeight: "var(--h2-line)",
    },

    h3: {
      fontSize: "var(--h3-size)",
      lineHeight: "var(--h3-line)",
    },

    h4: {
      fontSize: "var(--h4-size)",
      lineHeight: "var(--h4-line)",
    },

    h5: {
      fontSize: "var(--h5-size)",
      lineHeight: "var(--h5-line)",
    },
  },

  article: {
    h1: {
      fontSize: "var(--article-h1-size)",
      lineHeight: "var(--article-h1-line)",
    },

    h2: {
      fontSize: "var(--article-h2-size)",
      lineHeight: "var(--article-h2-line)",
    },

    h3: {
      fontSize: "var(--article-h3-size)",
      lineHeight: "var(--article-h3-line)",
    },

    paragraph: {
      fontSize: "var(--article-paragraph-size)",
      lineHeight: "var(--article-paragraph-line)",
      paragraphSpacing: "var(--article-paragraph-spacing)",
    },
  },

  body: {
    medium: {
      fontSize: "var(--body-medium-size)",
      lineHeight: "var(--body-medium-line)",
    },

    small: {
      fontSize: "var(--body-small-size)",
      lineHeight: "var(--body-small-line)",
    },
  },

  button: {
    medium: {
      fontSize: "var(--button-medium-size)",
      lineHeight: "var(--button-medium-line)",
    },

    large: {
      fontSize: "var(--button-large-size)",
      lineHeight: "var(--button-large-line)",
    },
  },
} as const;

export const fontWeight = rawTypography.fontWeight;

export const typography = {
  raw: rawTypography,
  font: rawTypography.font,
  fontWeight,

  heading: {
    h1: {
      ...rawTypography.heading.h1,
      fontWeight: fontWeight.medium,
    },

    h2: {
      ...rawTypography.heading.h2,
      fontWeight: fontWeight.medium,
    },

    h3: {
      ...rawTypography.heading.h3,
      fontWeight: fontWeight.semibold,
      paragraphSpacing: rawTypography.article.paragraph.paragraphSpacing,
    },

    h4: {
      ...rawTypography.heading.h4,
      fontWeight: fontWeight.semibold,
      paragraphSpacing: rawTypography.article.paragraph.paragraphSpacing,
    },

    h5: {
      ...rawTypography.heading.h5,
      fontWeight: fontWeight.semibold,
      paragraphSpacing: rawTypography.article.paragraph.paragraphSpacing,
    },
  },

  article: {
    h1: {
      ...rawTypography.article.h1,
      fontWeight: fontWeight.semibold,
    },

    h2: {
      ...rawTypography.article.h2,
      fontWeight: fontWeight.semibold,
    },

    h3: {
      ...rawTypography.article.h3,
      fontWeight: fontWeight.semibold,
      paragraphSpacing: rawTypography.article.paragraph.paragraphSpacing,
    },

    paragraph: {
      ...rawTypography.article.paragraph,
      fontWeight: fontWeight.regular,
    },

    paragraphSemibold: {
      ...rawTypography.article.paragraph,
      fontWeight: fontWeight.semibold,
    },
  },

  body: {
    mediumBold: {
      ...rawTypography.body.medium,
      fontWeight: fontWeight.semibold,
      paragraphSpacing: rawTypography.article.paragraph.paragraphSpacing,
    },

    medium: {
      ...rawTypography.body.medium,
      fontWeight: fontWeight.regular,
      paragraphSpacing: 8,
    },

    small: {
      ...rawTypography.body.small,
      fontWeight: fontWeight.regular,
      paragraphSpacing: 4,
    },
  },

  button: {
    medium: {
      ...rawTypography.button.medium,
      fontWeight: fontWeight.medium,
      paragraphSpacing: rawTypography.article.paragraph.paragraphSpacing,
    },

    large: {
      ...rawTypography.button.large,
      fontWeight: fontWeight.semibold,
      paragraphSpacing: rawTypography.article.paragraph.paragraphSpacing,
    },
  },
} as const;

export type TypographyToken = typeof typography;
