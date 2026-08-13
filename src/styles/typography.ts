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
    m: {
      fontSize: "var(--body-medium-size)",
      lineHeight: "var(--body-medium-line)",
    },

    s: {
      fontSize: "var(--body-small-size)",
      lineHeight: "var(--body-small-line)",
    },

    xs: {
      fontSize: "var(--body-xsmall-size)",
      lineHeight: "var(--body-xsmall-line)",
    },
  },

  button: {
    m: {
      fontSize: "var(--button-medium-size)",
      lineHeight: "var(--button-medium-line)",
    },

    mStrong: {
      fontSize: "var(--button-medium-size)",
      lineHeight: "var(--button-medium-line)",
    },
  },
} as const;

export const fontWeight = rawTypography.fontWeight;

export const typography = {
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

    body: {
      ...rawTypography.article.paragraph,
      fontWeight: fontWeight.regular,
    },

    bodyStrong: {
      ...rawTypography.article.paragraph,
      fontWeight: fontWeight.semibold,
    },
  },

  body: {
    m: {
      ...rawTypography.body.m,
      fontWeight: fontWeight.regular,
      paragraphSpacing: 8,
    },

    s: {
      ...rawTypography.body.s,
      fontWeight: fontWeight.regular,
      paragraphSpacing: 4,
    },

    xs: {
      ...rawTypography.body.xs,
      fontWeight: fontWeight.regular,
      paragraphSpacing: 4,
    },
  },

  button: {
    m: {
      ...rawTypography.button.m,
      fontWeight: fontWeight.medium,
      paragraphSpacing: rawTypography.article.paragraph.paragraphSpacing,
    },

    mStrong: {
      ...rawTypography.button.mStrong,
      fontWeight: fontWeight.semibold,
      paragraphSpacing: rawTypography.article.paragraph.paragraphSpacing,
    },
  },
} as const;

export type TypographyToken = typeof typography;
