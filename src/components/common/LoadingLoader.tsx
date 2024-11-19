import type { CSSProperties } from "react";

export function LoadingLoader({
  style = { minHeight: "100vh" },
}: {
  style?: CSSProperties;
}) {
  return (
    <main
      style={style}
      className="flex animate-spin items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </main>
  );
}
