import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'papaparse';

const GOOGLE_SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/1KfxWeP21U06emmQjDGQVg9cUcJbxMT29vOz6ZDTfH4I/export?format=csv';

type CertificateRecord = {
  ID: string;
  Name: string;
  Email: string;
  'Downlod Link': string;  // Note: Kept the misspelling as per requirements
};

//Below is the old GET method which will fetch all certificates, can be enabled if needed in future
// admin use

/*
export async function GET(req: NextRequest) {
  try {
    // Fetch CSV data from Google Sheets
    const response = await fetch(GOOGLE_SHEETS_CSV_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch certificate data');
    }

    const csvText = await response.text();

    // Parsing csv data
    const { data, errors } = parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    if (errors.length > 0) {
      console.error('CSV parsing errors:', errors);
      throw new Error('Failed to parse certificate data');
    }

    // Type assertion and validation
    const certificates = data as CertificateRecord[];

    // cleaning the data
    const normalizedCertificates = certificates.map(cert => ({
      id: cert.ID.trim().toLowerCase(),
      name: cert.Name.trim().toLowerCase(),
      email: cert.Email.trim().toLowerCase(),
      downloadUrl: cert['Downlod Link'].trim()
    }));

    // Cache control headers
    const headers = {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30' // 1 minute cache, 30 seconds stale
    };

    return NextResponse.json(
      { certificates: normalizedCertificates },
      { headers }
    );

  } catch (error) {
    console.error('Certificate API error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve certificate data' },
      { status: 500 }
    );
  }
}
*/

// Verify specific certificate - API call to validate certificate
// POST endpoint
export async function POST(req: NextRequest) {
  try {
    const { certificateId, emailOrName } = await req.json();

    if (!certificateId || !emailOrName) {
      return NextResponse.json(
        { error: 'Certificate ID and Email/Name are required' },
        { status: 400 }
      );
    }

    // Normalize input
    const normalizedId = certificateId.trim().toLowerCase();
    const normalizedEmailOrName = emailOrName.trim().toLowerCase();

    // fetching
    const response = await fetch(GOOGLE_SHEETS_CSV_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch certificate data');
    }

    //parsing
    const csvText = await response.text();
    const { data, errors } = parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    if (errors.length > 0) {
      throw new Error('Failed to parse certificate data');
    }

    const certificates = data as CertificateRecord[];

    // Find matching certificate
    const matchingCertificate = certificates.find(cert => {
      const id = cert.ID.trim().toLowerCase();
      const name = cert.Name.trim().toLowerCase();
      const email = cert.Email.trim().toLowerCase();

      return id === normalizedId && 
             (email === normalizedEmailOrName || name === normalizedEmailOrName);
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

    // Return certificate details
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
