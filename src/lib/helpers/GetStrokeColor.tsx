"use client";

import { usePathname } from "next/navigation";

export function GetStrokeColor(link: string) {
  const pathname = usePathname();
  return pathname === link ? "#3aafae" : "#71717a";
}
