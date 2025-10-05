'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Shield} from 'lucide-react';
import { validateCertificate } from '@/utils/certificateValidator';
import { ValidationFormData, ValidationResult } from '@/types/certificate';
import { VerificationResult } from './VerificationResult';

const ValidatorForm: React.FC = () => {
  const [formData, setFormData] = useState<ValidationFormData>({
    certificateId: '',
    emailOrName: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

  const handleInputChange = (field: keyof ValidationFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear previous results when user types
    if (validationResult) {
      setValidationResult(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.certificateId.trim() || !formData.emailOrName.trim()) {
      setValidationResult({
        success: false,
        error: "Please fill in both Certificate ID and Email/Name fields."
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await validateCertificate(formData);
      setValidationResult(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setValidationResult({
        success: false,
        error: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Main Validation Form */}
      <Card className="border-2 border-[#005B8E]/20 shadow-xl bg-white/95 backdrop-blur-sm relative overflow-hidden">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#8B0000] rounded-tl-lg opacity-30" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#2E8B57] rounded-tr-lg opacity-30" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#2E8B57] rounded-bl-lg opacity-30" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#8B0000] rounded-br-lg opacity-30" />
        
        <CardHeader className="text-center pb-6 relative">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#005B8E] via-[#2E8B57] to-[#8B0000] rounded-full flex items-center justify-center mb-4 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#005B8E]">
            WikiClub Certificate Validator
          </CardTitle>
          <CardDescription className="text-[#2E8B57] max-w-md mx-auto font-medium">
            Verify your event certificate instantly by entering your credentials below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="certificateId" className="text-sm font-medium text-[#005B8E]">
                  Certificate ID *
                </Label>
                <Input
                  id="certificateId"
                  type="text"
                  placeholder="e.g., WCTUUXXXX"
                  value={formData.certificateId}
                  onChange={(e) => handleInputChange('certificateId', e.target.value)}
                  disabled={isLoading}
                  className="h-12 text-base border-2 border-[#005B8E]/20 focus:border-[#005B8E]/50 focus:ring-2 focus:ring-[#005B8E]/20 transition-all duration-300"
                  aria-describedby="certificateId-hint"
                />
                <p id="certificateId-hint" className="text-xs text-[#8B0000]/80">
                  Enter the Credential ID shown on your certificate
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailOrName" className="text-sm font-medium text-[#005B8E]">
                  Email or Name *
                </Label>
                <Input
                  id="emailOrName"
                  type="text"
                  placeholder="Your email address or full name"
                  value={formData.emailOrName}
                  onChange={(e) => handleInputChange('emailOrName', e.target.value)}
                  disabled={isLoading}
                  className="h-12 text-base border-2 border-[#005B8E]/20 focus:border-[#005B8E]/50 focus:ring-2 focus:ring-[#005B8E]/20 transition-all duration-300"
                  aria-describedby="emailOrName-hint"
                />
                <p id="emailOrName-hint" className="text-xs text-[#8B0000]/80">
                  Use the email or name exactly as registered for the event
                </p>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#005B8E] via-[#2E8B57] to-[#8B0000] hover:from-[#004B7E] hover:via-[#1E7B47] hover:to-[#7B0000] text-white transform hover:scale-[1.02] transition-all duration-300 shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Validating Certificate...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Validate Certificate
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Validation Result */}
      {validationResult && (
        <VerificationResult result={validationResult} />
      )}

      {/* Help Section */}
      <Card className="border border-gray-100 bg-gray-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-3">
            <h3 className="font-semibold text-gray-900">Need Help?</h3>
            <p className="text-sm text-gray-600">
              If you&apos;re having trouble finding your certificate or the validation fails, please contact us at{' '}
              <a 
                href="mailto:wikiclub@united.edu.in" 
                className="text-blue-600 hover:underline font-medium"
              >
                wikiclub@united.edu.in
              </a>
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
              <span>✓ Free verification</span>
              <span>•</span>
              <span>✓ Instant results</span>
              <span>•</span>
              <span>✓ Secure validation</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValidatorForm;