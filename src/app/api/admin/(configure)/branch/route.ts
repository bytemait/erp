import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import {
	errorResponse,
	successResponse,
	failureResponse,
} from "@/utils/response";

// POST 
export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { branch } = body;

		if (!branch) {
			return NextResponse.json(errorResponse(400, "Branch name is required"), {
				status: 400,
			});
		}

		const branchExists = await prisma.branch.findUnique({ where: { branch } });
		if (branchExists) {
			return NextResponse.json(errorResponse(409, "Branch already exists"), {
				status: 409,
			});
		}

		const newBranch = await prisma.branch.create({
			data: { branch },
		});

		return NextResponse.json(
			successResponse(201, newBranch, "Branch created successfully"),
			{ status: 201 }
		);
	} catch (error) {
		console.error("POST Error:", error);
		const errorMessage = error instanceof Error ? error.message : "Unknown server error";
		return NextResponse.json(failureResponse(errorMessage), { status: 500 });
	}
}

// GET 
export async function GET() {
	try {
		const branches = await prisma.branch.findMany({
			select: {
				branch: true,
				students: true,
			},
		});

		if (!branches || branches.length === 0) {
			return NextResponse.json(errorResponse(404, "No branches found"), {
				status: 404,
			});
		}

		return NextResponse.json(successResponse(200, branches, "Branches retrieved successfully"), {
			status: 200,
		});
	} catch (error) {
		console.error("GET Error:", error);
		const errorMessage = error instanceof Error ? error.message : "Unknown server error";
		return NextResponse.json(failureResponse(errorMessage), { status: 500 });
	}
}
