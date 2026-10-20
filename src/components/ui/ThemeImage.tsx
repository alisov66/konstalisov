"use client";

import type { ImgHTMLAttributes } from "react";
import { useTheme } from "./ThemeProvider";

export type ImageSource = {
  src: string;
  srcSet?: string;
  width?: number;
  height?: number;
};

type ThemeImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  alt: string;
  dark?: ImageSource;
};

export default function ThemeImage({ dark, sizes, alt, ...props }: ThemeImageProps) {
  const { theme } = useTheme();
  return (
    <picture className="block">
      {dark && (
        <source
          media={theme === null ? "(prefers-color-scheme: dark)" : theme === "dark" ? "all" : "not all"}
          srcSet={dark.srcSet ?? dark.src}
          sizes={sizes}
          width={dark.width}
          height={dark.height}
        />
      )}
      <img {...props} alt={alt} sizes={sizes} />
    </picture>
  );
}
