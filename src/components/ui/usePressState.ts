"use client";

import { useEffect, useState, type HTMLAttributes } from "react";

type PressProps<T extends HTMLElement> = Pick<HTMLAttributes<T>,
  "onPointerDown" | "onPointerUp" | "onPointerCancel" | "onPointerLeave" | "onBlur"
> & { disabled?: boolean };

export default function usePressState<T extends HTMLElement>(props: PressProps<T> = {}) {
  const [press, setPress] = useState(false);

  useEffect(() => {
    if (!press) return;
    const clear = () => setPress(false);
    window.addEventListener("blur", clear);
    window.addEventListener("pointerup", clear);
    window.addEventListener("pointercancel", clear);
    return () => {
      window.removeEventListener("blur", clear);
      window.removeEventListener("pointerup", clear);
      window.removeEventListener("pointercancel", clear);
    };
  }, [press]);

  // Touch browsers do not consistently apply :active to every kind of link.
  return {
    "data-state": press && !props.disabled ? "press" : "default",
    onPointerDown: ((event) => {
      props.onPointerDown?.(event);
      if (!props.disabled && !event.defaultPrevented && event.button === 0) setPress(true);
    }) as HTMLAttributes<T>["onPointerDown"],
    onPointerUp: ((event) => { setPress(false); props.onPointerUp?.(event); }) as HTMLAttributes<T>["onPointerUp"],
    onPointerCancel: ((event) => { setPress(false); props.onPointerCancel?.(event); }) as HTMLAttributes<T>["onPointerCancel"],
    onPointerLeave: ((event) => { setPress(false); props.onPointerLeave?.(event); }) as HTMLAttributes<T>["onPointerLeave"],
    onBlur: ((event) => { setPress(false); props.onBlur?.(event); }) as HTMLAttributes<T>["onBlur"],
  };
}
