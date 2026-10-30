"use client";

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import SelectionFrame from "./SelectionFrame";
import usePressState from "./usePressState";

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; disabled?: never };
type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
export type ButtonProps = (AnchorProps | NativeButtonProps) & { selected?: boolean };

export default function Button({ variant, selected, className, children, rightIcon, ...props }: ButtonProps & {
  variant: "primary" | "secondary" | "navigation";
  rightIcon?: ReactNode;
}) {
  const pressProps = usePressState<HTMLAnchorElement | HTMLButtonElement>(props);
  const classes = [`button-${variant}`, variant === "navigation" ? "" : "design-button", className].filter(Boolean).join(" ");
  const content = <><span className="button-label">{children}</span>{rightIcon && <span className="button-icon" aria-hidden="true">{rightIcon}</span>}{variant !== "navigation" && <SelectionFrame />}</>;

  if (props.href !== undefined) {
    return <Link {...props} {...pressProps} className={classes} data-selected={selected || undefined}>{content}</Link>;
  }
  return <button {...props} {...pressProps} type={props.type ?? "button"} className={classes} data-selected={selected || undefined}>{content}</button>;
}
