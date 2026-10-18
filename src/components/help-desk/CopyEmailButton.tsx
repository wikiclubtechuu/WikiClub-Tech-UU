// FILE: src/components/help-desk/CopyEmailButton.tsx
// PURPOSE: "Copy email" button on the Contact page (client component: uses the browser clipboard).
// Used by: src/app/help-desk/contact/page.tsx
"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

// Copies the email address to the clipboard and shows "Copied" for two seconds.
export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked by the browser; the address is still shown on the page.
    }
  };

  return (
    <button type="button" onClick={copy} className="hd-ghost" aria-live="polite">
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}