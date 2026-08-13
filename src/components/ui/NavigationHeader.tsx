"use client";

import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import ButtonSecondary from "@/components/ui/ButtonSecondary";
import MenuButton from "@/components/ui/MenuButton";
import { tokens } from "@/styles/tokens";

const avatarSrc = "/konstantin-avatar.png";

const navigationItems = [
  { label: "Main", href: "/" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "CV", href: "/cv" },
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
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobileLayoutRef = useRef(false);
  const navRef = useRef<HTMLElement>(null);
  const measuringActionsRef = useRef<HTMLDivElement>(null);
  const measuringLogoRef = useRef<HTMLAnchorElement>(null);
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

  useEffect(() => {
    const updateLayoutMode = () => {
      const nav = navRef.current;
      const logo = measuringLogoRef.current;
      const actions = measuringActionsRef.current;

      if (!nav || !logo || !actions) {
        return;
      }

      const navStyles = window.getComputedStyle(nav);
      const contentWidth =
        nav.clientWidth -
        parseFloat(navStyles.paddingLeft) -
        parseFloat(navStyles.paddingRight);
      const availableGap =
        contentWidth - logo.offsetWidth - actions.scrollWidth;
      const nextIsMobileLayout = availableGap < 20;

      if (nextIsMobileLayout === isMobileLayoutRef.current) {
        return;
      }

      isMobileLayoutRef.current = nextIsMobileLayout;
      setIsMobileLayout(nextIsMobileLayout);

      if (!nextIsMobileLayout) {
        window.setTimeout(() => setMenuOpen(false), 0);
      }
    };

    updateLayoutMode();

    const observer = new ResizeObserver(updateLayoutMode);

    if (navRef.current) {
      observer.observe(navRef.current);
    }

    window.addEventListener("resize", updateLayoutMode);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateLayoutMode);
    };
  }, []);

  if (animationState === "hidden") {
    return null;
  }

  const handleNavigationClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    closeMenu = false,
  ) => {
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
      data-navigation-header
    >
      {isMobileLayout ? (
        <button
          aria-label="Close navigation menu"
          className="navigation-header-backdrop fixed inset-0"
          data-open={menuOpen}
          onClick={() => setMenuOpen(false)}
          type="button"
        />
      ) : null}

      <nav
        aria-label="Primary"
        className={[
          "relative z-10 flex w-full max-w-[var(--container-max)] items-center rounded-[var(--lg)] bg-[var(--bg-beige-light)]",
          isMobileLayout
            ? "flex-col items-start justify-center px-[var(--base-2)] py-[var(--base-1)]"
            : "flex-row justify-between px-[var(--base-3)] py-[var(--base-2)]",
          menuOpen ? "gap-[var(--base-2)]" : "",
        ].join(" ")}
        ref={navRef}
      >
        <div
          aria-hidden
          className="pointer-events-none invisible absolute left-0 top-0 flex h-0 items-center overflow-hidden"
        >
          <Link
            className="flex shrink-0 items-center gap-[var(--base-2)]"
            href="/"
            ref={measuringLogoRef}
            tabIndex={-1}
          >
            <span className="relative size-[52px] shrink-0" />
            <span className="flex w-[172px] flex-col gap-0">
              <span
                style={{
                  ...typeStyle(tokens.typography.body.s),
                  fontWeight: tokens.typography.fontWeight.semibold,
                }}
              >
                Konstantin Alisov
              </span>
              <span style={typeStyle(tokens.typography.body.s)}>
                Product designer
              </span>
            </span>
          </Link>
          <div
            className="flex shrink-0 items-center"
            ref={measuringActionsRef}
          >
            {navigationItems.map((item) => (
              <ButtonSecondary href={item.href} key={item.label} tabIndex={-1}>
                {item.label}
              </ButtonSecondary>
            ))}
          </div>
        </div>

        <div
          className={[
            "flex items-center justify-between",
            isMobileLayout ? "w-full" : "shrink-0",
          ].join(" ")}
        >
          <Link
            aria-label="Go to homepage"
            className="flex min-w-0 shrink-0 items-center gap-[var(--base-2)] text-[var(--text-primary)] no-underline transition-opacity duration-[150ms] ease-in hover:opacity-50 focus-visible:opacity-50 focus-visible:outline-none"
            data-name="logo"
            href="/"
            onClick={(event) => handleNavigationClick(event, "/", true)}
          >
            <span
              className={[
                "relative shrink-0 overflow-hidden",
                isMobileLayout ? "size-[36px]" : "size-[52px]",
              ].join(" ")}
            >
              <Image
                alt=""
                className="absolute left-[-6%] top-[-6%] size-[112%] max-w-none object-cover"
                fill
                sizes="(max-width: 767px) 40px, 58px"
                src={avatarSrc}
              />
            </span>

            <span
              className={[
                "w-[172px] min-w-0 flex-col gap-0",
                isMobileLayout ? "hidden" : "flex",
              ].join(" ")}
            >
              <span
                className="truncate text-[var(--text-primary)]"
                style={{
                  ...typeStyle(tokens.typography.body.s),
                  fontWeight: tokens.typography.fontWeight.semibold,
                }}
              >
                Konstantin Alisov
              </span>
              <span
                className="truncate text-[var(--text-primary)]"
                style={typeStyle(tokens.typography.body.s)}
              >
                Product designer
              </span>
            </span>
          </Link>

          {isMobileLayout ? (
            <MenuButton
              aria-controls="navigation-header-mobile-actions"
              onOpenChange={setMenuOpen}
              open={menuOpen}
            />
          ) : null}
        </div>

        {!isMobileLayout ? (
          <div className="flex shrink-0 items-center">
            {navigationItems.map((item) => (
              <ButtonSecondary
                href={item.href}
                key={item.label}
                onClick={(event) => handleNavigationClick(event, item.href)}
              >
                {item.label}
              </ButtonSecondary>
            ))}
          </div>
        ) : null}

        {isMobileLayout ? (
          <div
            className="navigation-header-mobile-actions grid w-full overflow-hidden bg-[var(--bg-beige-light)]"
            data-open={menuOpen}
            id="navigation-header-mobile-actions"
          >
            <div className="flex min-h-0 flex-col items-start justify-center overflow-hidden">
              {navigationItems.map((item) => (
                <ButtonSecondary
                  className="w-full"
                  href={item.href}
                  key={item.label}
                  onClick={(event) =>
                    handleNavigationClick(event, item.href, true)
                  }
                >
                  {item.label}
                </ButtonSecondary>
              ))}
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
