import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { errorResponse, successResponse, failureResponse } from "@/utils/response";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const roomNumber = searchParams.get("roomNumber");
    const itemType = searchParams.get("itemType");

    if (!roomNumber || !itemType) {
      return NextResponse.json(errorResponse(400, "Room number and item type are required"), { status: 400 });
    }

    const items = await prisma.infraItem.findMany({
      where: {
        roomNumber,
        ItemTypeId: itemType,
      },
    });

    if (!items || items.length === 0) {
      return NextResponse.json(errorResponse(404, "No items found"), { status: 404 });
    }

    return NextResponse.json(successResponse(200, items, "Items fetched successfully"), { status: 200 });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data = await req.json();
    const { roomNumber, itemType, yearOfPurchase, status } = data;

    if (!roomNumber || !itemType) {
      return NextResponse.json(errorResponse(400, "Room number and item type are required"), { status: 400 });
    }

    const newItems = await prisma.infraItem.createMany({
      data: data.itemCodes.map((itemCode: string) => ({
        itemCode,
        roomNumber,
        ItemTypeId: itemType,
        yearOfPurchase,
        status,
      })),
    });

    return NextResponse.json(successResponse(201, newItems, "Items created successfully"), { status: 201 });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {
    const data = await req.json();
    const { roomNumber, itemType, updates } = data;

    if (!roomNumber || !itemType || !updates) {
      return NextResponse.json(errorResponse(400, "Room number, item type, and updates are required"), { status: 400 });
    }

    const updatedItems = await prisma.infraItem.updateMany({
      where: {
        roomNumber,
        ItemTypeId: itemType,
      },
      data: updates,
    });

    return NextResponse.json(successResponse(200, updatedItems, "Items updated successfully"), { status: 200 });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const roomNumber = searchParams.get("roomNumber");
    const itemType = searchParams.get("itemType");

    if (!roomNumber || !itemType) {
      return NextResponse.json(errorResponse(400, "Room number and item type are required"), { status: 400 });
    }

    const deletedItems = await prisma.infraItem.deleteMany({
      where: {
        roomNumber,
        ItemTypeId: itemType,
      },
    });

    if (deletedItems.count === 0) {
      return NextResponse.json(errorResponse(404, "No items found to delete"), { status: 404 });
    }

    return NextResponse.json(successResponse(200, deletedItems, "Items deleted successfully"), { status: 200 });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}
