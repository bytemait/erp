import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { ApiResponse } from "@/types/apiResponse";
import {
  errorResponse,
  successResponse,
  failureResponse,
} from "@/utils/response";
import { Announcement } from "@prisma/client";

export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse<Announcement[] | null >>> {
  try {
    const userProfile = await req.json(); // User's profile JSON from request body

    const announcements = await prisma.announcement.findMany();

    const filteredAnnouncements = announcements.filter((announcement) => {
      const filter = announcement.filter || {};
      return Object.entries(filter).every(
        ([key, value]) => userProfile[key] === value
      );
    });

    return NextResponse.json(
      successResponse(200, filteredAnnouncements, "Announcements fetched successfully"),
      { status: 200 }
    );
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse<Announcement | null>>> {
  try {
    const { title, message, filter, role } = await req.json();

    if (!title || !message || !role) {
      return NextResponse.json(errorResponse(400, "Missing required fields"), {
        status: 400,
      });
    }

    const announcement = await prisma.announcement.create({
      data: { title, message, filter, role },
    });

    return NextResponse.json(
      successResponse(201, announcement, "Announcement created successfully"),
      { status: 201 }
    );
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<Announcement | null>>> {
  try {
    const { id } = params;
    const data = await req.json();

    if (!id) {
      return NextResponse.json(errorResponse(400, "Id is required"), {
        status: 400,
      });
    }

    const updatedAnnouncement = await prisma.announcement.update({
      where: { id: String(id) },
      data,
    });

    return NextResponse.json(
      successResponse(200, updatedAnnouncement, "Announcement updated successfully"),
      { status: 200 }
    );
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<null>>> {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(errorResponse(400, "Id is required"), {
        status: 400,
      });
    }

    await prisma.announcement.delete({
      where: { id: String(id) },
    });

    return NextResponse.json(
      successResponse(200, null, "Announcement deleted successfully"),
      { status: 200 }
    );
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}
