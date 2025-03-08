import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { ApiResponse } from "@/types/apiResponse";
import {
  errorResponse,
  successResponse,
  failureResponse,
} from "@/utils/response";
import { Announcement } from "@prisma/client";
import { getServerToken } from "@/utils/session";

export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse<Announcement[] | null>>> {
  try {
    const token = await getServerToken(req);
    if (!token || !token.id)
      return NextResponse.json(errorResponse(401, "Unauthorized"), { status: 401 });

    const id = token.id;
    if (!id) {
      return NextResponse.json(errorResponse(400, "Id is required"), {
        status: 400,
      });
    }

    const userProfile = await prisma.student.findUnique({
      where: { id: String(id) },
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

      // If empty filter, return announcements for STUDENT or the issuer
      if (Object.keys(filter).length === 0) {
        return announcement.role === "STUDENT" || announcement.issuer === id;
      }

      // Ensure announcements are included if user matches at least one value in filter
      const matchesFilter = Object.entries(filter).some(([key, values]) => {
        if (!Array.isArray(values)) return false; // Ensure values are an array
        return values.includes(userProfile[key]); // Check if any value matches
      });

      return matchesFilter && announcement.role === "STUDENT" || announcement.issuer === id;
    });

    return NextResponse.json(
      successResponse(200, filteredAnnouncements, "Announcements fetched successfully"),
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(failureResponse(err instanceof Error ? err.message : String(err)), { status: 500 });
  }
}