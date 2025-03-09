import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import {
	errorResponse,
	successResponse,
	failureResponse,
} from "@/utils/response";

export async function GET({ params }: { params: { id: string } }) {
	try {
		const { id: group } = params;

		if (!group) {
			return NextResponse.json(errorResponse(400, "Group name is required"), {
				status: 400,
			});
		}

		const groupData = await prisma.group.findUnique({
			where: { group },
			include: { students: true },
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

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		const { id: group } = params;
		const body = await req.json();
		const { group: newGroupName } = body;

		if (!group || !newGroupName) {
			return NextResponse.json(errorResponse(400, "Both old and new group names are required"), {
				status: 400,
			});
		}

		const groupExists = await prisma.group.findUnique({ where: { group } });
		if (!groupExists) {
			return NextResponse.json(errorResponse(404, "Group not found"), {
				status: 404,
			});
		}

		const newGroupExists = await prisma.group.findUnique({
			where: { group: newGroupName }
		});
		if (newGroupExists && newGroupName !== group) {
			return NextResponse.json(errorResponse(409, "Group already exists"), {
				status: 409,
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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		const { id: group } = params;

		if (!group) {
			return NextResponse.json(errorResponse(400, "Group name is required"), {
				status: 400,
			});
		}

		const groupExists = await prisma.group.findUnique({
			where: { group },
			include: { students: true }
		});

		if (!groupExists) {
			return NextResponse.json(errorResponse(404, "Group not found"), {
				status: 404,
			});
		}

		if (groupExists.students.length > 0) {
			return NextResponse.json(
				errorResponse(400, "Cannot delete group with associated students"),
				{ status: 400 }
			);
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