// FILE: src/app/api/certificates/route.ts   (route: POST /api/certificates)
// CHANGED: now supports TWO ways to verify:
//   1. Manual:  { certificateId, emailOrName }   (same as before)
//   2. QR code: { qrData }  - the QR can hold the raw ID or a verification URL
// The manual flow and its responses are unchanged, so the existing form keeps working.
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'papaparse';

const GOOGLE_SHEETS_CSV_URL = process.env.CERTIFICATE_DATA;

type CertificateRecord = {
  ID: string;
  Name: string;
  Email: string;
  'Downlod Link': string;
};

// In-memory cache for certificate data
let cachedCertificates: CertificateRecord[] = [];
let lastFetchTime = 0;

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchAndCacheCertificates() {
  const now = Date.now();

  if (
    now - lastFetchTime < CACHE_DURATION &&
    cachedCertificates.length > 0
  ) {
    return; // Cache is still valid
  }

  try {
    if (!GOOGLE_SHEETS_CSV_URL) {
      throw new Error(
        'CERTIFICATE_DATA environment variable is not set'
      );
    }

    const response = await fetch(GOOGLE_SHEETS_CSV_URL);

    if (!response.ok) {
      throw new Error('Failed to fetch certificate data');
    }

    const csvText = await response.text();

    const { data, errors } = parse<CertificateRecord>(
      csvText,
      {
        header: true,
        skipEmptyLines: true,
      }
    );

    if (errors.length > 0) {
      console.error('CSV parsing errors:', errors);

      throw new Error(
        'Failed to parse certificate data'
      );
    }

    cachedCertificates = data;
    lastFetchTime = now;
  } catch (error) {
    console.error(
      'Failed to refresh certificate cache:',
      error
    );

    /*
     * If old cached data exists, continue using it.
     */
    if (cachedCertificates.length === 0) {
      throw error;
    }
  }
}

/*
 * Extract Certificate ID from QR data.
 *
 * Supported QR formats:
 *
 * 1. WCTUU12345
 *
 * 2. https://wiki-club-tech-uu.vercel.app/validator?id=WCTUU12345
 *
 * 3. https://wiki-club-tech-uu.vercel.app/validator?certificateId=WCTUU12345
 *
 * 4. Any URL containing ?id=...
 */
function extractCertificateId(qrData: string): string {
  const value = qrData.trim();

  if (!value) {
    return '';
  }

  /*
   * If QR directly contains the Certificate ID
   */
  if (
    !value.startsWith('http://') &&
    !value.startsWith('https://')
  ) {
    return value;
  }

  /*
   * If QR contains a verification URL
   */
  try {
    const url = new URL(value);

    const id =
      url.searchParams.get('id') ||
      url.searchParams.get('certificateId') ||
      url.searchParams.get('certificate_id');

    if (id) {
      return id.trim();
    }

    /*
     * Optional support for URLs like:
     *
     * /validator/WCTUU12345
     */
    const pathParts = url.pathname
      .split('/')
      .filter(Boolean);

    const lastPart =
      pathParts[pathParts.length - 1];

    if (
      lastPart &&
      lastPart.toLowerCase() !== 'validator'
    ) {
      return decodeURIComponent(lastPart).trim();
    }
  } catch {
    /*
     * Not a valid URL.
     */
  }

  return '';
}

// Verify a certificate - called by the validator page
export async function POST(req: NextRequest) {
  try {
    await fetchAndCacheCertificates();

    const body = await req.json();

    const certificateId =
      typeof body.certificateId === 'string'
        ? body.certificateId.trim()
        : '';

    const emailOrName =
      typeof body.emailOrName === 'string'
        ? body.emailOrName.trim()
        : '';

    const qrData =
      typeof body.qrData === 'string'
        ? body.qrData.trim()
        : '';

    /*
     * -----------------------------------------
     * QR VERIFICATION
     * -----------------------------------------
     */

    if (qrData) {
      const extractedId =
        extractCertificateId(qrData);

      if (!extractedId) {
        return NextResponse.json(
          {
            success: false,
            message:
              'The QR code does not contain a valid Certificate ID.',
          },
          { status: 400 }
        );
      }

      const normalizedId =
        extractedId.toLowerCase();

      const matchingCertificate =
        cachedCertificates.find((cert) => {
          const id =
            cert.ID?.trim().toLowerCase();

          return id === normalizedId;
        });

      if (!matchingCertificate) {
        return NextResponse.json(
          {
            success: false,
            message:
              'No certificate was found for this QR code.',
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,

        certificate: {
          id: matchingCertificate.ID,
          name: matchingCertificate.Name,
          email: matchingCertificate.Email,
          downloadUrl:
            matchingCertificate['Downlod Link'],
        },
      });
    }

    /*
     * -----------------------------------------
     * MANUAL VERIFICATION
     * -----------------------------------------
     */

    if (!certificateId || !emailOrName) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Certificate ID and Email/Name are required',
        },
        { status: 400 }
      );
    }

    const normalizedId =
      certificateId.toLowerCase();

    const normalizedEmailOrName =
      emailOrName.toLowerCase();

    const matchingCertificate =
      cachedCertificates.find((cert) => {
        const id =
          cert.ID?.trim().toLowerCase();

        const name =
          cert.Name?.trim().toLowerCase();

        const email =
          cert.Email?.trim().toLowerCase();

        return (
          id === normalizedId &&
          (
            email === normalizedEmailOrName ||
            name === normalizedEmailOrName
          )
        );
      });

    if (!matchingCertificate) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Certificate not found. Please check your Certificate ID and Email/Name.',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,

      certificate: {
        id: matchingCertificate.ID,
        name: matchingCertificate.Name,
        email: matchingCertificate.Email,
        downloadUrl:
          matchingCertificate['Downlod Link'],
      },
    });
  } catch (error) {
    console.error(
      'Certificate verification error:',
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to verify certificate',
      },
      { status: 500 }
    );
  }
}