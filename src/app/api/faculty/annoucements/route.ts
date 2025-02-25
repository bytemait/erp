import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { ApiResponse } from "@/types/apiResponse";
import {
  errorResponse,
  successResponse,
  failureResponse,
} from "@/utils/response";
import { Announcement } from "@prisma/client";
import { createAnnouncementNotifications } from "@/utils/annoucement-notif";
import { createNotification } from "@/utils/alerts";
import { getServerToken } from "@/utils/session";

export async function GET(
  req: NextRequest,
): Promise<NextResponse<ApiResponse<Announcement[] | null >>> {
  try {
    const token = await getServerToken(req);
    if (!token || !token.id) return NextResponse.json(errorResponse(401, "Unauthorized"), { status: 401 });

    const id = token.id;

    console.log(id);

    if (!id) {
      return NextResponse.json(errorResponse(400, "Id is required"), {
        status: 400,
      });
    }

    const userProfile = await prisma.faculty.findUnique({
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
        return announcement.role === "FACULTY" || announcement.issuer==id;
      }
      // role checking
      if (announcement.role !== "FACULTY") {
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

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse<Announcement | null>>> {
  try {
    const token = await getServerToken(req);
    if (!token || !token.id) return NextResponse.json(errorResponse(401, "Unauthorized"), { status: 401 });

    const issuer = token.id;

    const { title, message, filter, role } = await req.json();
    const data = { title, message, filter, role, issuer: String(issuer) };

    if (!title || !message || !role) {
      return NextResponse.json(errorResponse(400, "Missing required fields"), {
        status: 400,
      });
    }

    if (data.role!=="STUDENT" && data.role!=="FACULTY")
    {
      return NextResponse.json(errorResponse(400,"Missing permission"),{status:400});
    }

    const announcement = await prisma.announcement.create({
      data,
    });

    const announcementWithCorrectFilter = {
      ...announcement,
      filter: announcement.filter as Record<string, string | number | boolean | Date | null>,
    };
    createAnnouncementNotifications(announcementWithCorrectFilter);
    createNotification(String(token.id),"You created a new announcement",announcement.title);
    console.log("notification created");

    return NextResponse.json(
      successResponse(201, announcement, "Announcement created successfully"),
      { status: 201 }
    );
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json(failureResponse(error), { status: 500 });
  }
}

export async function PATCH(req: NextRequest): Promise<NextResponse<ApiResponse<Announcement | null>>> {
  try {

    const token = await getServerToken(req);
    if (!token || !token.id) return NextResponse.json(errorResponse(401, "Unauthorized"), { status: 401 });

    const { id, ...data } = await req.json();

    if (!id) {
      return NextResponse.json(errorResponse(400, "Id is required"), { status: 400 });
    }

    const findAnnoucement = await prisma.announcement.findUnique({
      where: {id : String(id)}
    })

    if (!findAnnoucement)
    {
      return NextResponse.json(errorResponse(400,"Announcement not found"),{status: 400});
    }

    if (findAnnoucement.issuer!==token.id)
    {
      return NextResponse.json(errorResponse(400,"This annoucement was not issued by you"),{status:400});
    }

    const updatedAnnouncement = await prisma.announcement.update({
      where: { id: String(id) },
      data,
    });

    return NextResponse.json(successResponse(200, updatedAnnouncement, "Announcement updated successfully"), { status: 200 });
  } catch (err) {
    return NextResponse.json(failureResponse(err instanceof Error ? err.message : String(err)), { status: 500 });
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse<ApiResponse<null>>> {
  try {
    const token = await getServerToken(req);
    if (!token || !token.id) return NextResponse.json(errorResponse(401, "Unauthorized"), { status: 401 });

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(errorResponse(400, "Id is required"), { status: 400 });
    }

    const findAnnoucement = await prisma.announcement.findUnique({
      where: {id : String(id)}
    })

    if (!findAnnoucement)
    {
      return NextResponse.json(errorResponse(400,"Announcement not found"),{status: 400});
    }

    if (findAnnoucement.issuer!==token.id)
    {
      return NextResponse.json(errorResponse(400,"This annoucement was not issued by you"),{status:400});
    }

    await prisma.announcement.delete({
      where: { id: String(id) },
    });

    return NextResponse.json(successResponse(200, null, "Announcement deleted successfully"), { status: 200 });
  } catch (err) {
    return NextResponse.json(failureResponse(err instanceof Error ? err.message : String(err)), { status: 500 });
  }
}