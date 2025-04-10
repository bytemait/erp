import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { errorResponse, successResponse, failureResponse } from "@/utils/response";

export async function GET(): Promise<NextResponse> {
  try {
    const itemTypes = await prisma.itemType.findMany();

    if (!itemTypes || itemTypes.length === 0) {
      return NextResponse.json(errorResponse(404, "No item types found"), { status: 404 });
    }

    return NextResponse.json(successResponse(200, itemTypes, "Item types fetched successfully"), { status: 200 });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data = await req.json();
    const { item } = data;

    if (!item) {
      return NextResponse.json(errorResponse(400, "Item type is required"), { status: 400 });
    }

    const existingItemType = await prisma.itemType.findUnique({
      where: { item },
    });

    if (existingItemType) {
      return NextResponse.json(errorResponse(400, "Item type already exists"), { status: 400 });
    }

    const newItemType = await prisma.itemType.create({
      data: { item },
    });

    return NextResponse.json(successResponse(201, newItemType, "Item type created successfully"), { status: 201 });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get("id");

    if (!itemId) {
      return NextResponse.json(errorResponse(400, "Item type ID is required"), { status: 400 });
    }

    const data = await req.json();
    const { item } = data;

    if (!item) {
      return NextResponse.json(errorResponse(400, "Item type is required"), { status: 400 });
    }

    const existingItemType = await prisma.itemType.findUnique({
      where: { item },
    });

    if (existingItemType && existingItemType.item !== itemId) {
      return NextResponse.json(errorResponse(400, "Item type already exists"), { status: 400 });
    }

    const updatedItemType = await prisma.itemType.update({
      where: { item: itemId },
      data: { item },
    });

    return NextResponse.json(successResponse(200, updatedItemType, "Item type updated successfully"), { status: 200 });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get("id");

    if (!itemId) {
      return NextResponse.json(errorResponse(400, "Item type ID is required"), { status: 400 });
    }

    const itemType = await prisma.itemType.findUnique({
      where: { item: itemId },
    });

    if (!itemType) {
      return NextResponse.json(errorResponse(404, "Item type not found"), { status: 404 });
    }

    await prisma.itemType.delete({
      where: { item: itemId },
    });

    return NextResponse.json(successResponse(200, null, "Item type deleted successfully"), { status: 200 });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}
