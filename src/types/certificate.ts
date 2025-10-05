export interface ValidationFormData {
  certificateId: string;
  emailOrName: string;
}

export interface Certificate {
  id: string;
  name: string;
  email: string;
  downloadUrl: string;
}

export interface ValidationResult {
  success: boolean;
  certificate?: Certificate;
  error?: string;
}

export interface CertificatePermalink {
  url: string;
  qrCode?: string;
}