// FILE: src/app/validator/page.tsx   (route: /validator, navbar label: "Certify")
// CHANGED: new look from certs.zip. The pastel gradient + grid that used to be the
// ".validator-page-background" class in globals.css is now written inline here,
// so globals.css does not need to change and no other page is affected.
import type { CSSProperties } from "react";
import ValidatorForm from "@/components/validator/ValidatorForm";
import Image from "next/image";

// Same pastel background as the Teams / Achievements pages
const pageBackground: CSSProperties = {
  background: `
    radial-gradient(circle at 15% 10%, rgba(210, 238, 250, 0.75) 0%, rgba(210, 238, 250, 0) 42%),
    radial-gradient(circle at 85% 10%, rgba(215, 250, 225, 0.8) 0%, rgba(215, 250, 225, 0) 45%),
    radial-gradient(circle at 80% 90%, rgba(255, 245, 235, 0.65) 0%, rgba(255, 245, 235, 0) 40%),
    #f8fcfa`,
};

// Faint grid that fades out towards the bottom
const gridOverlay: CSSProperties = {
  backgroundImage: `
    linear-gradient(rgba(100, 116, 139, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(100, 116, 139, 0.12) 1px, transparent 1px)`,
  backgroundSize: "52px 52px",
  backgroundPosition: "center center",
  WebkitMaskImage: "linear-gradient(to bottom, black 25%, transparent 100%)",
  maskImage: "linear-gradient(to bottom, black 25%, transparent 100%)",
};

const ValidatorPage = () => {
  return (
    <div
      className="relative isolate min-h-screen overflow-hidden"
      style={pageBackground}
    >
      {/* Grid lines (behind everything) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={gridOverlay}
      />

      {/* Soft coloured blobs + gold line at the bottom */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#005B8E]/10 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-40 h-40 bg-[#8B0000]/10 rounded-full blur-2xl" />

        <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#2E8B57]/10 rounded-full blur-2xl" />

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-50" />
      </div>

      {/* Main content (z-10 keeps it above the grid) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-12">

          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-8">
              <Image
                src="/logo.svg"
                alt="WikiClub Tech Logo"
                width={80}
                height={80}
              />
            </div>

            <h1 className="text-5xl font-bold text-[#0F172A] mb-4">
              Certificate Validator
            </h1>

            <div className="relative">
              <p className="text-lg text-[#475569] mb-4">
                Verify the authenticity of your WikiClub Tech UU event
                certificate quickly and securely.
              </p>
            </div>
          </div>

          <ValidatorForm />

        </div>
      </div>
    </div>
  );
};

export default ValidatorPage;