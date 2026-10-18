// FILE: src/components/help-desk/HelpDeskBackground.tsx
// The same background as the home page hero: a soft blue / green / cream glow with a faint
// grid, fading out towards the bottom. The look itself is in src/app/help-desk/help-desk.css
// (.hd-hero-bg and .hd-hero-grid). Purely decorative: sits behind the content, ignores clicks.

export default function HelpDeskBackground() {
  return (
    <div aria-hidden="true" className="hd-hero-bg pointer-events-none absolute inset-x-0 top-0 -z-10">
      <div className="hd-hero-grid" />
    </div>
  );
}