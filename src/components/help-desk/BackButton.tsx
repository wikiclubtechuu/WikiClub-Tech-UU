// FILE: src/components/help-desk/BackButton.tsx
// PURPOSE: "Back to papers" button on the paper viewer page (client component: needs the router).
// Used by: src/app/help-desk/pyqs/view/[id]/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

// Goes back to where the student came from (keeps their place in the list).
// If the page was opened directly, e.g. in a new tab, there is nothing to go back to,
// so it goes to the PYQ list instead.
export default function BackButton({
  fallback = "/help-desk/pyqs",
  label = "Back to papers",
}: {
  fallback?: string;
  label?: string;
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => (window.history.length > 1 ? router.back() : router.push(fallback))}
      className="hd-ghost"
    >
      <ArrowLeft className="h-4 w-4" /> {label}
    </button>
  );
}