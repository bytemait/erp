import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log(request);
  return NextResponse.json({ name: "ishu" });
}
