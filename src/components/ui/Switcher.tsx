"use client";

import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import "./Switcher.css";

export default function Switcher() {
  const { theme, toggleTheme } = useTheme();
  const [hovered, setHovered] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [toggling, setToggling] = useState(false);

  return (
    <button
      type="button"
      role="switch"
      aria-label="Dark theme"
      aria-checked={theme === "dark"}
      title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="switcher"
      data-hover={hovered}
      data-animated={animated}
      data-toggling={toggling}
      onPointerEnter={(event) => {
        if (event.pointerType === "touch") return;
        setAnimated(true);
        setToggling(false);
        setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onClick={() => {
        setAnimated(true);
        setHovered(false);
        setToggling(true);
        toggleTheme();
      }}
    >
      <span className="switcher__track" aria-hidden="true">
        <span className="switcher__handle" />
        <span className="switcher__icon switcher__sun" />
        <span className="switcher__icon switcher__moon" />
      </span>
    </button>
  );
}
