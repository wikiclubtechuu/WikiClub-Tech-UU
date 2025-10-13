import { ValidationFormData, ValidationResult } from '@/types/certificate';

/**
 * Formats error messages for display.
 */
export function formatErrorMessage(error: string): string {
  const errorMessages: Record<string, string> = {
    'Certificate not found': 'We couldn\'t find a certificate matching the provided details. Please check your Certificate ID and Email/Name.',
    'Failed to validate certificate': 'We\'re having trouble validating your certificate. Please try again later.',
    'Network error': 'Unable to connect to the verification service. Please check your internet connection and try again.',
    'Certificate ID and Email/Name are required': 'Please fill in both Certificate ID and Email/Name fields.',
  };

  return errorMessages[error] || error;
}

/**
 * Validates a certificate by calling the backend API.
 */
export async function validateCertificate(formData: ValidationFormData): Promise<ValidationResult> {
  try {
    const response = await fetch('/api/certificates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      // Use the formatted error message from the API response
      throw new Error(data.message || data.error || 'Failed to validate certificate');
    }

    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return {
      success: false,
      error: formatErrorMessage(errorMessage),
    };
  }
}

/**
 * Generates a QR code for the given data.
 */
export function generateQRCode(data: string): string {
  if (!data) return '';
  try {
    // Use a reliable QR code generation API
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data)}`;
  } catch (error) {
    console.error('QR code generation failed:', error);
    return '';
  }
}