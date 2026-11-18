import { ViewTransition } from "react";

/** Short fade/slide between routes (View Transitions API; no-op where unsupported). */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-fade" exit="page-fade" default="none">
      {children}
    </ViewTransition>
  );
}
