import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import {
	errorResponse,
	successResponse,
	failureResponse,
} from "@/utils/response";

// GET request to fetch a specific group by name
export async function GET({ params }: { params: { group: string } }) {
	try {
		const { group } = params;

		if (!group) {
			return NextResponse.json(errorResponse(400, "Group name is required"), {
				status: 400,
			});
		}

		const groupData = await prisma.group.findUnique({
			where: { group },
			include: { students: true }, // Include students in the response
		});

		if (!groupData) {
			return NextResponse.json(errorResponse(404, "Group not found"), {
				status: 404,
			});
		}

		return NextResponse.json(successResponse(200, groupData, "Group found"), {
			status: 200,
		});
	} catch (err) {
		const error = err instanceof Error ? err.message : String(err);
		return NextResponse.json(failureResponse(error), { status: 500 });
	}
}

// PUT request to update group details
export async function PUT(req: NextRequest, { params }: { params: { group: string } }) {
	try {
		const { group } = params;
		const body = await req.json();
		const { newGroupName } = body;

		if (!group || !newGroupName) {
			return NextResponse.json(errorResponse(400, "Both old and new group names are required"), {
				status: 400,
			});
		}

		// Validate new group format (max 5 characters)
		if (newGroupName.length > 5) {
			return NextResponse.json(errorResponse(400, "Group name must be at most 5 characters long"), {
				status: 400,
			});
		}

		const groupExists = await prisma.group.findUnique({ where: { group } });
		if (!groupExists) {
			return NextResponse.json(errorResponse(404, "Group not found"), {
				status: 404,
			});
		}

		const updatedGroup = await prisma.group.update({
			where: { group },
			data: { group: newGroupName },
		});

		return NextResponse.json(successResponse(200, updatedGroup, "Group updated successfully"), {
			status: 200,
		});
	} catch (err) {
		console.error("PUT Error:", err);
		const error = err instanceof Error ? err.message : String(err);
		return NextResponse.json(failureResponse(error), { status: 500 });
	}
}

// DELETE request to delete a group
export async function DELETE(req: NextRequest, { params }: { params: { group: string } }) {
	try {
		const { group } = params;

		if (!group) {
			return NextResponse.json(errorResponse(400, "Group name is required"), {
				status: 400,
			});
		}

		const groupExists = await prisma.group.findUnique({ where: { group } });
		if (!groupExists) {
			return NextResponse.json(errorResponse(404, "Group not found"), {
				status: 404,
			});
		}

		await prisma.group.delete({ where: { group } });

		return NextResponse.json(successResponse(200, null, "Group deleted successfully"), {
			status: 200,
		});
	} catch (err) {
		const error = err instanceof Error ? err.message : String(err);
		return NextResponse.json(failureResponse(error), { status: 500 });
	}
}
