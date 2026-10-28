import Link from "next/link";
import type { ComponentProps } from "react";
import { typography, typeStyle } from "@/styles";

export default function TextLink({ className, style, ...props }: ComponentProps<typeof Link>) {
  return <Link {...props} className={["text-link", className].filter(Boolean).join(" ")} style={{ ...typeStyle(typography.link.s), ...style }} />;
}
