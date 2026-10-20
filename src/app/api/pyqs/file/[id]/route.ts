// FILE: src/app/api/pyqs/file/[id]/route.ts   (route: GET /api/pyqs/file/<imageKitFileId>)
// PURPOSE: Streams one paper (PDF or image) through our own domain, so the ImageKit address and
// private key are never exposed to the browser. The viewer page points its <iframe>/<img> here.
// Only files inside the PYQ folder (IMAGEKIT_PYQ_FOLDER) are served, never anything else in the account.
// Next.js 15+/16: `params` is a Promise and must be awaited (already handled below).

import { NextResponse } from "next/server";
import { AUTH, ROOT } from "@/lib/imagekit-papers";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // ImageKit file IDs are letters and digits only. Reject anything else.
  if (!/^[a-zA-Z0-9]+$/.test(id)) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const meta = await fetch(`https://api.imagekit.io/v1/files/${id}/details`, {
      headers: { Authorization: AUTH },
      cache: "no-store",
    });
    if (!meta.ok) return new NextResponse("Not found", { status: 404 });
    const file = await meta.json();

    // Refuse files that are not inside the PYQ folder.
    if (!String(file.filePath || "").startsWith(ROOT + "/")) {
      return new NextResponse("Not found", { status: 404 });
    }

    const upstream = await fetch(file.url, { cache: "no-store" });
    if (!upstream.ok || !upstream.body) {
      return new NextResponse("Could not load paper", { status: 502 });
    }

    const safeName = String(file.name).replace(/"/g, "");
    return new NextResponse(upstream.body, {
      headers: {
        "Content-Type": upstream.headers.get("content-type") || "application/pdf",
        "Content-Disposition": `inline; filename="${safeName}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new NextResponse("Could not load paper", { status: 500 });
  }
}