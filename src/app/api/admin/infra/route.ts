import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { successResponse, failureResponse } from "@/utils/response";

export async function GET(): Promise<NextResponse> {
  try {
    const items = await prisma.infraItem.findMany();
    return NextResponse.json(successResponse(200, items, "All infra items fetched successfully"), { status: 200 });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}
