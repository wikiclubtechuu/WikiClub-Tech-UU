import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, XCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ValidationResult } from '@/types/certificate';
import { generateQRCode } from '@/utils/certificateValidator';

interface VerificationResultProps {
  result: ValidationResult;
}

export const VerificationResult: React.FC<VerificationResultProps> = ({ result }) => {
  if (!result) return null;

  if (!result.success || !result.certificate) {
    return (
      <Alert variant="destructive">
        <XCircle className="h-5 w-5" />
        <AlertDescription>
          {result.error || 'Certificate validation failed. Please check your inputs and try again.'}
        </AlertDescription>
      </Alert>
    );
  }

  const { certificate } = result;
  // Generate QR code from the direct download URL
  const qrCodeUrl = generateQRCode(certificate.downloadUrl || '');


  return (
    <Card className="border-2 border-[#2E8B57]/30 bg-gradient-to-br from-[#2E8B57]/10 to-white relative overflow-hidden">
      
      <CardContent className="pt-6 relative">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#2E8B57] to-[#005B8E] shadow-lg transform hover:scale-105 transition-transform duration-300">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#005B8E] to-[#2E8B57] bg-clip-text text-transparent mb-2">
              Certificate Verified Successfully!
            </h3>
            <p className="text-sm text-[#2E8B57]">
              This certificate has been validated against our official records.
            </p>
          </div>

          <div className="w-full max-w-md space-y-4 mt-4">
            <div className="flex flex-col space-y-4">
              {/* Certificate ID */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 py-2 bg-[#005B8E]/5 rounded-lg">
                <div className="font-medium text-[#005B8E] mb-1 sm:mb-0">Certificate ID:</div>
                <div className="text-gray-800 break-all">{certificate.id}</div>
              </div>
              
              {/* Name */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 py-2 bg-[#2E8B57]/5 rounded-lg">
                <div className="font-medium text-[#2E8B57] mb-1 sm:mb-0">Name:</div>
                <div className="text-gray-800 break-all">{certificate.name}</div>
              </div>
              
              {/* Email */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 py-2 bg-[#8B0000]/5 rounded-lg">
                <div className="font-medium text-[#8B0000] mb-1 sm:mb-0">Email:</div>
                <div className="text-gray-800 break-all">{certificate.email}</div>
              </div>
            </div>

            {qrCodeUrl && (
              <div className="flex justify-center">
                <Image
                  src={qrCodeUrl}
                  alt="Certificate QR Code"
                  width={150}
                  height={150}
                  className="rounded-lg shadow-md"
                  priority 
                />
              </div>
            )}

            <div className="flex justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(certificate.downloadUrl, '_blank')}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                View / Download Certificate
              </Button>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            Verified by WikiClub Tech UU at {new Date().toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};