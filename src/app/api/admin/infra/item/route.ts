import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { errorResponse, successResponse, failureResponse } from "@/utils/response";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(errorResponse(400, "Infrastructure ID is required"), { status: 400 });
    }

    const infraItem = await prisma.infraItem.findUnique({
      where: { id },
      include: {
        department: true,
        ItemType: true,
        RoomType: true,
      },
    });

    if (!infraItem) {
      return NextResponse.json(errorResponse(404, "Infrastructure item not found"), { status: 404 });
    }

    return NextResponse.json(successResponse(200, infraItem, "Infrastructure details fetched successfully"), { status: 200 });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data = await req.json();

    const { itemCode, ItemTypeId, RoomTypeId, departmentId, roomNumber, yearOfPurchase, status } = data;

    if (!itemCode) {
      return NextResponse.json(errorResponse(400, "Item code is required"), { status: 400 });
    }

    const existingItem = await prisma.infraItem.findUnique({
      where: { itemCode },
    });

    if (existingItem) {
      return NextResponse.json(errorResponse(400, "Item code already exists"), { status: 400 });
    }

    if (RoomTypeId) {
      const roomExists = await prisma.roomType.findUnique({
        where: { room: RoomTypeId },
      });
      if (!roomExists) {
        return NextResponse.json(errorResponse(400, "Invalid Room Type ID"), { status: 400 });
      }
    }

    if (ItemTypeId) {
      const itemTypeExists = await prisma.itemType.findUnique({
        where: { item: ItemTypeId },
      });
      if (!itemTypeExists) {
        return NextResponse.json(errorResponse(400, "Invalid Item Type ID"), { status: 400 });
      }
    }

    if (departmentId) {
      const departmentExists = await prisma.department.findUnique({
        where: { department: departmentId },
      });
      if (!departmentExists) {
        return NextResponse.json(errorResponse(400, "Invalid Department ID"), { status: 400 });
      }
    }

    const newInfraItem = await prisma.infraItem.create({
      data: {
        itemCode,
        ItemTypeId,
        RoomTypeId,
        departmentId,
        roomNumber,
        yearOfPurchase,
        status,
      },
    });

    return NextResponse.json(successResponse(201, newInfraItem, "Infrastructure item created successfully"), { status: 201 });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(errorResponse(400, "Infrastructure ID is required"), { status: 400 });
    }

    const infraItem = await prisma.infraItem.findUnique({
      where: { id },
    });

    if (!infraItem) {
      return NextResponse.json(errorResponse(404, "Infrastructure item not found"), { status: 404 });
    }

    await prisma.infraItem.delete({
      where: { id },
    });

    return NextResponse.json(successResponse(200, null, "Infrastructure item deleted successfully"), { status: 200 });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(errorResponse(400, "Infrastructure ID is required"), { status: 400 });
    }

    const data = await req.json();
    const { ItemTypeId, RoomTypeId, departmentId } = data;

    const infraItem = await prisma.infraItem.findUnique({
      where: { id },
    });

    if (!infraItem) {
      return NextResponse.json(errorResponse(404, "Infrastructure item not found"), { status: 404 });
    }

    if (RoomTypeId) {
      const roomExists = await prisma.roomType.findUnique({
        where: { room: RoomTypeId },
      });
      if (!roomExists) {
        return NextResponse.json(errorResponse(400, "Invalid Room Type ID"), { status: 400 });
      }
    }

    if (ItemTypeId) {
      const itemTypeExists = await prisma.itemType.findUnique({
        where: { item: ItemTypeId },
      });
      if (!itemTypeExists) {
        return NextResponse.json(errorResponse(400, "Invalid Item Type ID"), { status: 400 });
      }
    }

    if (departmentId) {
      const departmentExists = await prisma.department.findUnique({
        where: { department: departmentId },
      });
      if (!departmentExists) {
        return NextResponse.json(errorResponse(400, "Invalid Department ID"), { status: 400 });
      }
    }

    const updatedInfraItem = await prisma.infraItem.update({
      where: { id },
      data: {
        ...data,
      },
    });

    return NextResponse.json(successResponse(200, updatedInfraItem, "Infrastructure item updated successfully"), { status: 200 });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}
