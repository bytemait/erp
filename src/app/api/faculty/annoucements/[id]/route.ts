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
	req: NextRequest,
	{ params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<Announcement | null>>> {
	try {
		const { id } = await params;

		const token = await getServerToken(req);

		if (!token || !token.id) {
			return NextResponse.json(errorResponse(401, "Unauthorized"), {
				status: 401,
			});
		}

		const userId = token.id;

		if (!id) {
			return NextResponse.json(errorResponse(400, "Id is required"), {
				status: 400,
			});
		}
		const annoucement = await prisma.announcement.findUnique({
			where: {
				id: String(id),
			},
		});

		if (!annoucement) {
			return NextResponse.json(
				errorResponse(404, "Announcement not found"),
				{
					status: 404,
				}
			);
		}
		if (annoucement.issuer !== userId) {
			return NextResponse.json(errorResponse(401, "Access Denied"), {
				status: 401,
			});
		}

		return NextResponse.json(
			successResponse(
				200,
				annoucement,
				"Announcements fetched successfully"
			),
			{ status: 200 }
		);
	} catch (err) {
		const error = err instanceof Error ? err.message : String(err);
		return NextResponse.json(failureResponse(error), { status: 500 });
	}
}
