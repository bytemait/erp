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
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<Announcement[] | null >>> {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(errorResponse(400, "Id is required"), {
        status: 400,
      });
    }

    const userProfile = await prisma.student.findUnique({
      where: {
        id: String(id),
      },
    }) as unknown as { id: string; [key: string]: string | number | boolean | null };

    if (!userProfile) {
      return NextResponse.json(errorResponse(404, "User profile not found"), {
        status: 404,
      });
    }

    console.log("User Profile:", userProfile);

    const announcements = await prisma.announcement.findMany();

    const filteredAnnouncements = announcements.filter((announcement) => {
      const filter = announcement.filter || {};
      // if empty filter, return all announcements
      if (Object.keys(filter).length === 0) {
        return true;
      }
      // role checking
      if (announcement.role !== "STUDENT") {
        return false;
      }
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
