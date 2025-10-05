import { ValidationFormData, ValidationResult } from '@/types/certificate';

/**
 * Validates a certificate based on the provided data
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
      throw new Error(data.error || 'Failed to validate certificate');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

/**
 * Checks if a download URL is valid
 */
export function isValidDownloadUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Generates a QR code for the certificate download link
 */
export function generateQRCode(downloadUrl: string): string {
  // Ensure the download URL is properly formatted
  try {
    // Validate if it's a proper URL
    new URL(downloadUrl);
    // Generate QR code with the validated URL
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(downloadUrl)}`;
  } catch (error) {
    console.error('Invalid download URL:', error);
    return ''; // Return empty string if URL is invalid
  }
}

/**
 * Generates a shareable permalink for a certificate
 */
export function generateCertificatePermalink(certificateId: string): string {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  return `${baseUrl}/validator?id=${encodeURIComponent(certificateId)}`;
}

/**
 * Normalizes input string by trimming whitespace and converting to lowercase
 */
export function normalizeInput(input: string): string {
  return input.trim().toLowerCase();
}

/**
 * Format error messages for display
 */
export function formatErrorMessage(error: string): string {
  // Common error messages can be mapped to user-friendly messages
  const errorMessages: Record<string, string> = {
    'Certificate not found': 'We couldn\'t find a certificate matching the provided details. Please check your Certificate ID and Email/Name.',
    'Failed to validate certificate': 'We\'re having trouble validating your certificate. Please try again later.',
    'Network error': 'Unable to connect to the verification service. Please check your internet connection and try again.',
  };

  return errorMessages[error] || error;
}