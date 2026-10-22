import ValidatorForm from "@/components/validator/ValidatorForm";
import Image from "next/image";

const ValidatorPage = () => {
  return (
    <div className="validator-page-background min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#005B8E]/10 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-40 h-40 bg-[#8B0000]/10 rounded-full blur-2xl" />

        <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#2E8B57]/10 rounded-full blur-2xl" />

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
