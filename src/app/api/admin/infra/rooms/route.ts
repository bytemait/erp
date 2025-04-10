import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { errorResponse, successResponse, failureResponse } from "@/utils/response";

export async function GET(): Promise<NextResponse> {
  try {
    const rooms = await prisma.roomType.findMany();

    if (!rooms || rooms.length === 0) {
      return NextResponse.json(errorResponse(404, "No rooms found"), { status: 404 });
    }

    return NextResponse.json(successResponse(200, rooms, "Rooms fetched successfully"), { status: 200 });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data = await req.json();
    const { room } = data;

    if (!room) {
      return NextResponse.json(errorResponse(400, "Room name is required"), { status: 400 });
    }

    const existingRoom = await prisma.roomType.findUnique({
      where: { room },
    });

    if (existingRoom) {
      return NextResponse.json(errorResponse(400, "Room already exists"), { status: 400 });
    }

    const newRoom = await prisma.roomType.create({
      data: { room },
    });

    return NextResponse.json(successResponse(201, newRoom, "Room created successfully"), { status: 201 });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("id");

    if (!roomId) {
      return NextResponse.json(errorResponse(400, "Room ID is required"), { status: 400 });
    }

    const data = await req.json();
    const { room } = data;

    if (!room) {
      return NextResponse.json(errorResponse(400, "Room name is required"), { status: 400 });
    }

    const existingRoom = await prisma.roomType.findUnique({
      where: { room },
    });

    if (existingRoom && existingRoom.room !== roomId) {
      return NextResponse.json(errorResponse(400, "Room name already exists"), { status: 400 });
    }

    const updatedRoom = await prisma.roomType.update({
      where: { room: roomId },
      data: { room },
    });

    return NextResponse.json(successResponse(200, updatedRoom, "Room updated successfully"), { status: 200 });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("id");

    if (!roomId) {
      return NextResponse.json(errorResponse(400, "Room ID is required"), { status: 400 });
    }

    const room = await prisma.roomType.findUnique({
      where: { room: roomId },
    });

    if (!room) {
      return NextResponse.json(errorResponse(404, "Room not found"), { status: 404 });
    }

    await prisma.roomType.delete({
      where: { room: roomId },
    });

    return NextResponse.json(successResponse(200, null, "Room deleted successfully"), { status: 200 });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}
