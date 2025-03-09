import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import {
	errorResponse,
	successResponse,
	failureResponse,
} from "@/utils/response";

// Helper function for group validation
const isValidGroup = (group: string) => {
	return group.length <= 5;
};

// POST request to create a new group
export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { group } = body;

		if (!group) {
			return NextResponse.json(errorResponse(400, "Group name is required"), {
				status: 400,
			});
		}

		// Validate group format
		if (!isValidGroup(group)) {
			return NextResponse.json(
				errorResponse(400, "Group name must be at most 5 characters long"),
				{ status: 400 }
			);
		}

		// Check if the group already exists
		const groupExists = await prisma.group.findUnique({ where: { group } });
		if (groupExists) {
			return NextResponse.json(errorResponse(409, "Group already exists"), {
				status: 409,
			});
		}

		// Create a new group
		const newGroup = await prisma.group.create({
			data: { group },
		});

		return NextResponse.json(
			successResponse(201, newGroup, "Group created successfully"),
			{ status: 201 }
		);
	} catch (error) {
		console.error("POST Error:", error);
		const errorMessage = error instanceof Error ? error.message : "Unknown server error";
		return NextResponse.json(failureResponse(errorMessage), { status: 500 });
	}
}

// GET request to fetch all groups
export async function GET() {
	try {
		const groups = await prisma.group.findMany({
			select: {
				group: true,
				students: true,
			},
		});

		if (!groups || groups.length === 0) {
			return NextResponse.json(errorResponse(404, "No groups found"), {
				status: 404,
			});
		}

		return NextResponse.json(successResponse(200, groups, "Groups retrieved successfully"), {
			status: 200,
		});
	} catch (error) {
		console.error("GET Error:", error);
		const errorMessage = error instanceof Error ? error.message : "Unknown server error";
		return NextResponse.json(failureResponse(errorMessage), { status: 500 });
	}
}
