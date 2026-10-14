"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { sendGAEvent } from "@next/third-parties/google";
import { emailHref, linkedInHref } from "@/data/contact";
import ButtonNavigation from "./ButtonNavigation";
import MenuButton from "./MenuButton";
import LogoHeader from "./LogoHeader";

export interface NavigationHeaderProps {
  alwaysVisible?: boolean;
  className?: string;
}

const links = [
  { label: "Case studies", href: "/case-studies" },
  { label: "CV", href: "/cv" },
  { label: "Email", href: emailHref, event: "contact_click" },
  { label: "LinkedIn", href: linkedInHref, event: "linkedin_click" },
];

export default function NavigationHeader({ className }: NavigationHeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function dismiss(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        headerRef.current?.querySelector<HTMLButtonElement>(".menu-button")?.focus();
      }
    }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <header ref={headerRef} className={["site-header", className].filter(Boolean).join(" ")} data-open={open}>
      <div className="site-header__inner">
        <div className="site-header__row">
          <LogoHeader onClick={() => setOpen(false)} />
          <MenuButton className="site-header__toggle" open={open} onOpenChange={setOpen} aria-controls="site-navigation" />
        </div>
        <nav id="site-navigation" aria-label="Main navigation" className="site-header__links">
          {links.map((link) => (
            <ButtonNavigation key={link.href} href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              target={link.href === linkedInHref ? "_blank" : undefined}
              rel={link.href === linkedInHref ? "noopener noreferrer" : undefined}
              onClick={() => { setOpen(false); if (link.event) sendGAEvent("event", link.event); }}>
              {link.label}
            </ButtonNavigation>
          ))}
        </nav>
      </div>
    </header>
  );
}
