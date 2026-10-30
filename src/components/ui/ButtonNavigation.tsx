import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import Button, { type ButtonProps } from "./Button";

export type ButtonNavigationProps = ButtonProps & {
  showRightIcon?: boolean;
  rightIcon?: ReactNode;
};

export default function ButtonNavigation({ showRightIcon = false, rightIcon, ...props }: ButtonNavigationProps) {
  const icon = rightIcon ?? <ArrowUpRight className="button-navigation__arrow" size={16} strokeLinecap="square" focusable="false" />;
  return <Button {...props} variant="navigation" rightIcon={showRightIcon ? icon : undefined} />;
}
