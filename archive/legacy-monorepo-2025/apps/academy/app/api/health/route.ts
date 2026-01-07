import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    app: "arcanea-academy",
    time: new Date().toISOString(),
  });
}
