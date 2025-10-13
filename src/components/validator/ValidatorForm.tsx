'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Shield } from 'lucide-react';
import { validateCertificate, formatErrorMessage } from '@/utils/certificateValidator';
import { ValidationFormData, ValidationResult } from '@/types/certificate';
import { VerificationResult } from './VerificationResult';

const ValidatorForm: React.FC = () => {
  const [formData, setFormData] = useState<ValidationFormData>({ certificateId: '', emailOrName: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

  const handleInputChange = (field: keyof ValidationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (validationResult) {
      setValidationResult(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.certificateId.trim() || !formData.emailOrName.trim()) {
      setValidationResult({ success: false, error: formatErrorMessage('Certificate ID and Email/Name are required') });
      return;
    }
    setIsLoading(true);
    try {
      const result = await validateCertificate(formData);
      setValidationResult(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setValidationResult({ success: false, error: formatErrorMessage(errorMessage) });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    setValidationResult(null);
    setFormData({ certificateId: '', emailOrName: '' });
  };

  if (validationResult?.success) {
    return <VerificationResult result={validationResult} onGoBack={handleGoBack} />;
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="border-2 border-[#005B8E]/20 shadow-xl bg-white/95 backdrop-blur-sm relative overflow-hidden">
        <CardContent className="pt-6">
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
                  onChange={e => handleInputChange('certificateId', e.target.value)}
                  disabled={isLoading}
                  className="h-12 text-base border-2 border-[#005B8E]/20 focus:border-[#005B8E]/50 focus:ring-2 focus:ring-[#005B8E]/20 transition-all duration-300"
                  aria-describedby="certificateId-hint"
                />
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
                  onChange={e => handleInputChange('emailOrName', e.target.value)}
                  disabled={isLoading}
                  className="h-12 text-base border-2 border-[#005B8E]/20 focus:border-[#005B8E]/50 focus:ring-2 focus:ring-[#005B8E]/20 transition-all duration-300"
                  aria-describedby="emailOrName-hint"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white transform hover:scale-[1.02] transition-all duration-300 shadow-lg"
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Validating Certificate...</>
              ) : (
                <><Shield className="w-4 h-4 mr-2" /> Validate Certificate</>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {validationResult && !validationResult.success && (
        <VerificationResult result={validationResult} onGoBack={handleGoBack} />
      )}

      <Card className="border border-gray-100 bg-gray-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-3">
            <h3 className="font-semibold text-gray-900">Need Help?</h3>
            <p className="text-sm text-gray-600">
              If you&apos;re having trouble finding your certificate or the validation fails, please contact us at{' '}
              <a href="mailto:wikiclub@united.edu.in" className="text-blue-600 hover:underline font-medium">
                wikiclub@united.edu.in
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValidatorForm;