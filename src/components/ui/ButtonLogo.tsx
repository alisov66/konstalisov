"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import Image from "next/image";
import usePressState from "./usePressState";

type ButtonLogoProps = Pick<ComponentProps<typeof Link>, "onClick" | "className">;

export default function ButtonLogo({ onClick, className }: ButtonLogoProps) {
  const pressProps = usePressState<HTMLAnchorElement>();
  return (
    <Link {...pressProps} href="/" className={["button-logo", className].filter(Boolean).join(" ")} aria-label="Konstantin Alisov, homepage" onClick={onClick}>
      <span className="button-logo__avatar" aria-hidden="true">
        <Image className="button-logo__image--default" src="/case-studies/avatar.png" width={52} height={52} alt="" unoptimized preload />
        <Image className="button-logo__image--hover" src="/case-studies/button-logo-hover.png" width={52} height={52} alt="" unoptimized loading="eager" />
        <Image className="button-logo__image--press" src="/case-studies/button-logo-press.png" width={52} height={52} alt="" unoptimized loading="eager" />
      </span>
      <span className="button-logo__text">
        <strong>Konstantin Alisov</strong>
        <span>Product designer</span>
      </span>
    </Link>
  );
}
