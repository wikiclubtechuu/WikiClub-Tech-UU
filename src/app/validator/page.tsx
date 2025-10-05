import ValidatorForm from "@/components/validator/ValidatorForm";
import Image from "next/image";

const ValidatorPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#f8f9fa] to-white">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-left corner decoration */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#005B8E]/10 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-40 h-40 bg-[#8B0000]/10 rounded-full blur-2xl" />
        
        {/* Top-right corner decoration */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#2E8B57]/10 rounded-full blur-2xl" />
        
        {/* Wikimedia-style dots pattern */}
        <div className="absolute right-0 top-1/4 w-32 h-96 opacity-20">
          <div className="grid grid-cols-3 gap-4">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-[#8B0000] rounded-full" />
            ))}
          </div>
        </div>
        
        {/* Left side decoration */}
        <div className="absolute left-6 top-1/3 w-32 h-96 opacity-20">
          <div className="grid grid-cols-3 gap-4">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-[#005B8E] rounded-full" />
            ))}
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-50" />
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-12">
          {/* Header with WikiClub Logo */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-8">
              <Image
                src="/logo.svg"
                alt="WikiClub Tech Logo"
                width={80}
                height={80}
              />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#005B8E] via-[#2E8B57] to-[#8B0000] bg-clip-text text-transparent mb-4">
              Certificate Validator
            </h1>
            <div className="relative">
              <p className="text-lg text-gray-600 mb-4">
                Verify the authenticity of your WikiClub Tech UU event certificate quickly and securely.
              </p>
            </div>
          </div>

          {/* Validator Form */}
          <ValidatorForm />

          {/* Bottom Wiki Globe Icon */}
          <div className="flex justify-center mt-12 opacity-50">
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
              <path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20z" stroke="#005B8E" strokeWidth="2"/>
              <path d="M24 44c5.523 0 10-8.954 10-20S29.523 4 24 4s-10 8.954-10 20 4.477 20 10 20z" stroke="#2E8B57" strokeWidth="2"/>
              <path d="M4 24h40M8 16h32M8 32h32" stroke="#8B0000" strokeWidth="2"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidatorPage;
