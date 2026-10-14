import type { ComponentProps } from "react";
import Link from "next/link";
import Image from "next/image";

type LogoHeaderProps = Pick<ComponentProps<typeof Link>, "onClick" | "className">;

export default function LogoHeader({ onClick, className }: LogoHeaderProps) {
  return (
    <Link href="/" className={["logo-header", className].filter(Boolean).join(" ")} aria-label="Konstantin Alisov, homepage" onClick={onClick}>
      <span className="logo-header__avatar" aria-hidden="true">
        <Image src="/case-studies/avatar.png" width={52} height={52} alt="" unoptimized preload />
        <span className="logo-header__hover">
          <Image src="/case-studies/logo-header-hover.svg" width={52} height={52} alt="" unoptimized />
        </span>
      </span>
      <span className="logo-header__text">
        <strong>Konstantin Alisov</strong>
        <span>Product designer</span>
      </span>
    </Link>
  );
}
