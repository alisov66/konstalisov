import type { CSSProperties } from "react";

export function typeStyle(token: {
  fontSize: string | number;
  lineHeight: string | number;
  fontWeight: string | number;
}): CSSProperties {
  return { fontSize: token.fontSize, lineHeight: token.lineHeight, fontWeight: token.fontWeight };
}
