"use client";
import { useEffect, useState } from "react";

function getCookieTheme(): "light" | "dark" {
  try {
    const m = document.cookie.match(/pmaxis-theme=(light|dark)/);
    return (m?.[1] as "light" | "dark") || "light";
  } catch { return "light"; }
}

function setThemeCookie(theme: string) {
  // .pmaxis.trade so both pmaxis.trade and api.pmaxis.trade can read it
  document.cookie = `pmaxis-theme=${theme}; domain=.pmaxis.trade; path=/; max-age=31536000; SameSite=Lax`;
  // fallback for local dev (localhost / raw IP)
  try { localStorage.setItem("pmaxis-theme", theme); } catch (e) {}
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const t = getCookieTheme();
    setIsDark(t === "dark");
    document.documentElement.setAttribute("data-theme", t);
  }, []);

  function toggle() {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    setIsDark(next === "dark");
    setThemeCookie(next);
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        color: "var(--muted)",
        borderRadius: "6px",
        width: "36px",
        height: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      {isDark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
}
