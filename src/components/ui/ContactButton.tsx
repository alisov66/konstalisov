"use client";

import type { AnchorHTMLAttributes } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import SelectionFrame from "./SelectionFrame";

export type ContactButtonProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export default function ContactButton({ children, className, onClick, ...props }: ContactButtonProps) {
  return (
    <a {...props} className={["button-contact", className].filter(Boolean).join(" ")}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          if (props.href?.startsWith("mailto:")) sendGAEvent("event", "contact_click");
          if (props.href?.includes("linkedin.com")) sendGAEvent("event", "linkedin_click");
        }
      }}>
      <span className="button-contact__label">{children}<SelectionFrame /></span>
    </a>
  );
}
