"use client";

import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import MenuButton from "@/components/ui/MenuButton";
import NaviButton from "@/components/ui/NaviButton";
import { scrollToElementById } from "@/lib/smoothScroll";
import { tokens } from "@/styles/tokens";

const avatarSrc = "/konstantin-avatar.png";

const navigationItems = [
  { label: "Main", href: "/#hero" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
  { label: "Download CV", href: "#cv" },
];

const headerClearance = 136;

function typeStyle(token: {
  fontSize: string | number;
  lineHeight: string | number;
  fontWeight: string | number;
}) {
  return {
    fontSize: token.fontSize,
    lineHeight: token.lineHeight,
    fontWeight: token.fontWeight,
  };
}

export interface NavigationHeaderProps {
  alwaysVisible?: boolean;
  heroId?: string;
}

export default function NavigationHeader({
  alwaysVisible = false,
  heroId = "hero",
}: NavigationHeaderProps) {
  const [animationState, setAnimationState] = useState<
    "hidden" | "visible" | "entering" | "exiting"
  >(alwaysVisible ? "visible" : "hidden");
  const [menuOpen, setMenuOpen] = useState(false);
  const isVisibleRef = useRef(alwaysVisible);
  const exitTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (alwaysVisible) {
      return;
    }

    let frame = 0;

    const clearExitTimeout = () => {
      if (exitTimeoutRef.current === null) {
        return;
      }

      window.clearTimeout(exitTimeoutRef.current);
      exitTimeoutRef.current = null;
    };

    const updateVisibility = () => {
      frame = 0;

      const hero = document.getElementById(heroId);

      if (!hero) {
        isVisibleRef.current = false;
        clearExitTimeout();
        setAnimationState("hidden");
        return;
      }

      const nextSection = document.getElementById("work");
      const revealOffset = nextSection
        ? nextSection.offsetTop - headerClearance
        : hero.offsetTop + hero.offsetHeight;
      const shouldBeVisible = window.scrollY >= revealOffset;

      if (shouldBeVisible === isVisibleRef.current) {
        return;
      }

      isVisibleRef.current = shouldBeVisible;
      clearExitTimeout();

      if (shouldBeVisible) {
        setAnimationState("entering");
        return;
      }

      setAnimationState("exiting");
      exitTimeoutRef.current = window.setTimeout(() => {
        exitTimeoutRef.current = null;
        setAnimationState("hidden");
      }, 150);
    };

    const scheduleUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      clearExitTimeout();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [alwaysVisible, heroId]);

  if (animationState === "hidden") {
    return null;
  }

  const handleNavigationClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    closeMenu = false,
  ) => {
    if (href === "/#hero" && document.getElementById("hero")) {
      event.preventDefault();
      scrollToElementById("hero");
    }

    if (href === "/capabilities") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    if (closeMenu) {
      setMenuOpen(false);
    }
  };

  return (
    <header
      className={[
        "fixed left-0 top-0 z-50 flex w-full flex-col items-center justify-center px-[var(--padding-side)] py-5",
        animationState === "visible"
          ? ""
          : animationState === "entering"
          ? "navigation-header-enter"
          : "navigation-header-exit pointer-events-none",
      ].join(" ")}
    >
      <nav
        aria-label="Primary"
        className={[
          "flex w-full max-w-[var(--container-max)] flex-col items-start justify-center rounded-[var(--lg)] bg-[var(--bg-beige-light)] px-[var(--base-3)] py-[var(--base-2)] md:flex-row md:items-center md:justify-between md:gap-[var(--base-6)]",
          menuOpen ? "gap-[var(--base-2)]" : "",
        ].join(" ")}
      >
        <div className="flex w-full items-center justify-between md:w-auto">
          <Link
            aria-label="Go to homepage"
            className="flex min-w-0 shrink-0 items-center gap-[var(--base-2)] text-[var(--text-primary)] no-underline transition-opacity duration-[150ms] ease-in hover:opacity-50 focus-visible:opacity-50 focus-visible:outline-none"
            data-name="logo"
            href="/#hero"
            onClick={(event) => handleNavigationClick(event, "/#hero", true)}
          >
            <span className="relative size-[44px] shrink-0 overflow-hidden md:size-[52px]">
              <img
                alt=""
                className="absolute left-[-6%] top-[-6%] size-[112%] max-w-none object-cover"
                src={avatarSrc}
              />
            </span>

            <span className="hidden w-[172px] min-w-0 flex-col gap-0 md:flex">
              <span
                className="truncate text-[var(--text-primary)]"
                style={typeStyle(tokens.typography.body.medium)}
              >
                Konstantin Alisov
              </span>
              <span
                className="truncate text-[var(--text-secondary)]"
                style={typeStyle(tokens.typography.body.small)}
              >
                Product designer
              </span>
            </span>
          </Link>

          <MenuButton
            aria-controls="navigation-header-mobile-actions"
            className="md:hidden"
            onOpenChange={setMenuOpen}
            open={menuOpen}
          />
        </div>

        <div className="hidden shrink-0 items-center md:flex">
          {navigationItems.map((item) => (
            <NaviButton
              href={item.href}
              key={item.label}
              onClick={(event) => handleNavigationClick(event, item.href)}
            >
              {item.label}
            </NaviButton>
          ))}
        </div>

        <div
          className="navigation-header-mobile-actions grid w-full overflow-hidden md:hidden"
          data-open={menuOpen}
          id="navigation-header-mobile-actions"
        >
          <div className="flex min-h-0 flex-col items-start justify-center overflow-hidden">
            {navigationItems.map((item) => (
              <NaviButton
                className="w-full"
                href={item.href}
                key={item.label}
                onClick={(event) =>
                  handleNavigationClick(event, item.href, true)
                }
              >
                {item.label}
              </NaviButton>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
