import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'papaparse';

const GOOGLE_SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/1KfxWeP21U06emmQjDGQVg9cUcJbxMT29vOz6ZDTfH4I/export?format=csv';

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
  if (now - lastFetchTime < CACHE_DURATION && cachedCertificates.length > 0) {
    return; // Cache is still valid
  }

  try {
    const response = await fetch(GOOGLE_SHEETS_CSV_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch certificate data');
    }
    const csvText = await response.text();
    const { data, errors } = parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    if (errors.length > 0) {
      throw new Error('Failed to parse certificate data');
    }

    cachedCertificates = data as CertificateRecord[];
    lastFetchTime = now;
  } catch (error) {
    console.error('Failed to refresh certificate cache:', error);
    // If fetching fails, we'll rely on the old cache if it exists
    if (cachedCertificates.length === 0) {
      throw error; // Rethrow if there's no cache at all
    }
  }
}

// Verify specific certificate - API call to validate certificate
export async function POST(req: NextRequest) {
  try {
    await fetchAndCacheCertificates();

    const { certificateId, emailOrName } = await req.json();

    if (!certificateId || !emailOrName) {
      return NextResponse.json(
        { error: 'Certificate ID and Email/Name are required' },
        { status: 400 }
      );
    }

    const normalizedId = certificateId.trim().toLowerCase();
    const normalizedEmailOrName = emailOrName.trim().toLowerCase();

    const matchingCertificate = cachedCertificates.find(cert => {
      const id = cert.ID.trim().toLowerCase();
      const name = cert.Name.trim().toLowerCase();
      const email = cert.Email.trim().toLowerCase();
      return id === normalizedId && (email === normalizedEmailOrName || name === normalizedEmailOrName);
    });

    if (!matchingCertificate) {
      return NextResponse.json(
        {
          success: false,
          message: 'Certificate not found. Please check your Certificate ID and Email/Name.'
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
        downloadUrl: matchingCertificate['Downlod Link']
      }
    });
  } catch (error) {
    console.error('Certificate verification error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to verify certificate'
      },
      { status: 500 }
    );
  }
}
