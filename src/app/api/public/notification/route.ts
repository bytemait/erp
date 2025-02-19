import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { errorResponse, successResponse, failureResponse } from "@/utils/response";
import { getUserFromToken } from "@/utils/session";
import { ApiResponse } from "@/types/apiResponse";
import { Notification } from "@prisma/client";

export async function GET(req: NextRequest): Promise<NextResponse<ApiResponse<Notification[] | null>>> {
    try {
        const user = await getUserFromToken(req);
        if (!user) return NextResponse.json(errorResponse(401, "Unauthorized"), { status: 401 });

        const notifications = await prisma.notification.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(successResponse(200, notifications, "Notifications fetched"), { status: 200 });
    } catch (err) {
        return NextResponse.json(failureResponse(err instanceof Error ? err.message : String(err)), { status: 500 });
    }
}

export async function PATCH(req: NextRequest): Promise<NextResponse<ApiResponse<null>>> {
    try {
        const user = await getUserFromToken(req);
        if (!user) return NextResponse.json(errorResponse(401, "Unauthorized"), { status: 401 });

        await prisma.notification.updateMany({
            where: { userId: user.id, read: false },
            data: { read: true },
        });

        return NextResponse.json(successResponse(200, null, "Notification marked as read"), { status: 200 });
    } catch (err) {
        return NextResponse.json(failureResponse(err instanceof Error ? err.message : String(err)), { status: 500 });
    }
}