// FILE: src/app/help-desk/template.tsx
// PURPOSE: A "template" (unlike a layout) is re-created on every navigation between help-desk
// pages, so the content gently fades in each time the student opens another tool.
// The .animate-fade-in class is defined in help-desk.css (scoped to .hd-theme), so this works
// without editing the client's globals.css.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-fade-in">{children}</div>;
}