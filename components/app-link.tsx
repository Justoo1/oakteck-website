"use client";

import Link, { type LinkProps } from "next/link";
import { useState } from "react";

/**
 * <Link> that prefetches on intent (pointer enter, touch start or keyboard
 * focus) instead of whenever it scrolls into view. Many visitors are on
 * metered mobile data, and this also keeps the page's main thread free while
 * it loads. Pattern from the Next.js prefetching guide ("Hover-triggered
 * prefetch"); `null` restores the default prefetch once intent is shown.
 */
export default function AppLink<RouteType>({ onPointerEnter, onTouchStart, onFocus, ...props }: LinkProps<RouteType>) {
  const [intent, setIntent] = useState(false);
  return (
    <Link
      {...props}
      prefetch={intent ? null : false}
      onPointerEnter={(e) => {
        setIntent(true);
        onPointerEnter?.(e);
      }}
      onTouchStart={(e) => {
        setIntent(true);
        onTouchStart?.(e);
      }}
      onFocus={(e) => {
        setIntent(true);
        onFocus?.(e);
      }}
    />
  );
}
