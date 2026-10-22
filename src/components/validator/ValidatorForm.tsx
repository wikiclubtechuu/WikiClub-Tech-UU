'use client';

import React, { useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Loader2,
  Shield,
  Search,
  UserRound,
  Mail,
  LockKeyhole,
} from 'lucide-react';

import {
  validateCertificate,
  formatErrorMessage,
} from '@/utils/certificateValidator';

import {
  ValidationFormData,
  ValidationResult,
} from '@/types/certificate';

import { VerificationResult } from './VerificationResult';

const ValidatorForm: React.FC = () => {
  const [formData, setFormData] =
    useState<ValidationFormData>({
      certificateId: '',
      emailOrName: '',
    });

  const [isLoading, setIsLoading] = useState(false);

  const [validationResult, setValidationResult] =
    useState<ValidationResult | null>(null);
  const handleInputChange = (
    field: keyof ValidationFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (validationResult) {
      setValidationResult(null);
    }
  };
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !formData.certificateId.trim() ||
      !formData.emailOrName.trim()
    ) {
      setValidationResult({
        success: false,
        error: formatErrorMessage(
          'Certificate ID and Email/Name are required'
        ),
      });

      return;
    }

    setIsLoading(true);

    try {
      const result = await validateCertificate(
        formData
      );

      setValidationResult(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred';

      setValidationResult({
        success: false,
        error: formatErrorMessage(errorMessage),
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleGoBack = () => {
    setValidationResult(null);

    setFormData({
      certificateId: '',
      emailOrName: '',
    });
  };
  if (validationResult?.success) {
    return (
      <VerificationResult
        result={validationResult}
        onGoBack={handleGoBack}
      />
    );
  }

  return (
    <div className="validator-page-background mx-auto w-full max-w-2xl">
      <Card className="relative m-0 overflow-hidden rounded-2xl border-0 bg-white p-0 shadow-xl">
        <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#005B8E] via-[#0077A8] to-[#008DA8] px-6 py-8 text-center text-white sm:px-10">
          <div className="pointer-events-none absolute -right-8 -top-12 -z-10 h-40 w-40 rounded-full bg-white/10" />

          <div className="pointer-events-none absolute -bottom-16 -left-8 -z-10 h-36 w-36 rounded-full bg-cyan-300/10" />
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/15 shadow-lg backdrop-blur-sm">
            <Shield className="h-8 w-8 text-white" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Certificate Verification
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/90 sm:text-base">
            Enter your certificate details below to verify
            its authenticity against WikiClub Tech UU records.
          </p>
        </div>
        <CardContent className="px-5 pb-6 pt-7 sm:px-8 sm:pb-7">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-2">

              <Label
                htmlFor="certificateId"
                className="flex items-center gap-2 text-sm font-semibold text-slate-800"
              >
                <Search className="h-4 w-4 text-[#334155]" />

                Certificate ID

                <span className="text-red-500">
                  *
                </span>
              </Label>

              <Input
                id="certificateId"
                type="text"
                placeholder="e.g. WCTUU12345"
                value={formData.certificateId}
                onChange={(e) =>
                  handleInputChange(
                    'certificateId',
                    e.target.value
                  )
                }
                disabled={isLoading}
                className="h-12 border-2 border-slate-200 text-base text-[#0F172A] transition-all duration-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />

              <p className="text-xs leading-5 text-slate-500">
                Enter the Certificate ID exactly as shown on your certificate.
              </p>
            </div>
            <div className="flex items-center gap-3">

              <div className="h-px flex-1 bg-slate-200" />

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                Certificate details
              </span>

              <div className="h-px flex-1 bg-slate-200" />

            </div>
            <div className="space-y-2">

              <Label
                htmlFor="emailOrName"
                className="flex items-center gap-2 text-sm font-semibold text-slate-800"
              >
                <UserRound className="h-4 w-4 text-[#334155]" />

                Email or Full Name

                <span className="text-red-500">
                  *
                </span>
              </Label>

              <div className="relative">

                <Input
                  id="emailOrName"
                  type="text"
                  placeholder="Enter your email or full name"
                  value={formData.emailOrName}
                  onChange={(e) =>
                    handleInputChange(
                      'emailOrName',
                      e.target.value
                    )
                  }
                  disabled={isLoading}
                  className="h-12 border-2 border-slate-200 text-base text-[#0F172A] transition-all duration-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />

                <Mail className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              </div>

              <p className="text-xs leading-5 text-slate-500">
                Use the name or email address associated with the certificate.
              </p>

            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full rounded-xl bg-gradient-to-r from-[#005B8E] to-[#008DA8] text-base font-semibold text-white shadow-lg shadow-cyan-900/10 transition-all duration-200 hover:from-[#004B75] hover:to-[#007A94] disabled:opacity-60"
            >

              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                  Validating Certificate...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />

                  Verify Certificate
                </>
              )}

            </Button>

          </form>
          <div className="mt-6 flex items-center justify-center gap-2 border-t border-slate-100 pt-5 text-center">

            <LockKeyhole className="h-4 w-4 shrink-0 text-[#2E8B57]" />

            <p className="text-xs leading-5 text-slate-500">
              Verification is performed against official WikiClub Tech UU records.
            </p>

          </div>

        </CardContent>

      </Card>
      {validationResult &&
        !validationResult.success && (
          <VerificationResult
            result={validationResult}
            onGoBack={handleGoBack}
          />
        )}
      <Card className="mt-6 rounded-xl border border-slate-200 bg-slate-50 shadow-sm">

        <CardContent className="px-5 py-6">

          <div className="space-y-3 text-center">

            <h3 className="font-semibold text-slate-800">
              Having trouble verifying your certificate?
            </h3>

            <p className="text-sm text-slate-600">
              Contact WikiClub Tech UU for assistance.
            </p>

            <a
              href="mailto:wikiclub@united.edu.in"
              className="inline-flex items-center justify-center font-semibold text-[#005B8E] transition hover:text-[#008DA8] hover:underline"
            >
              Contact WikiClub Tech UU
            </a>

          </div>

        </CardContent>

      </Card>

    </div>
  );
};

export default ValidatorForm;