import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link from "next/link";
import SelectionFrame from "./SelectionFrame";

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; disabled?: never };
type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
export type ButtonProps = (AnchorProps | NativeButtonProps) & { selected?: boolean };

export default function Button({ variant, selected, className, children, ...props }: ButtonProps & {
  variant: "primary" | "secondary" | "navigation";
}) {
  const classes = [`button-${variant}`, variant === "navigation" ? "" : "design-button", className].filter(Boolean).join(" ");
  const content = <><span className="button-label">{children}</span>{variant !== "navigation" && <SelectionFrame />}</>;

  if (props.href !== undefined) {
    return <Link {...props} className={classes} data-selected={selected || undefined}>{content}</Link>;
  }
  return <button {...props} type={props.type ?? "button"} className={classes} data-selected={selected || undefined}>{content}</button>;
}
