import type { ImgHTMLAttributes } from "react";

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
  return (
    <picture className="block">
      {dark && (
        <source
          media="(prefers-color-scheme: dark)"
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
