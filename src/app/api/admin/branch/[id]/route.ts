import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import {
	errorResponse,
	successResponse,
	failureResponse,
} from "@/utils/response";

// GET request 
export async function GET({ params }: { params: { branch: string } }) {
	try {
		const { branch } = params;

		if (!branch) {
			return NextResponse.json(errorResponse(400, "Branch name is required"), {
				status: 400,
			});
		}

		const branchData = await prisma.branch.findUnique({
			where: { branch },
			include: { students: true }, 
		});

		if (!branchData) {
			return NextResponse.json(errorResponse(404, "Branch not found"), {
				status: 404,
			});
		}

		return NextResponse.json(successResponse(200, branchData, "Branch found"), {
			status: 200,
		});
	} catch (err) {
		const error = err instanceof Error ? err.message : String(err);
		return NextResponse.json(failureResponse(error), { status: 500 });
	}
}

// PUT request 
export async function PUT(req: NextRequest, { params }: { params: { branch: string } }) {
	try {
		const { branch } = params;
		const body = await req.json();
		const { newBranchName } = body;

		if (!branch || !newBranchName) {
			return NextResponse.json(errorResponse(400, "Both old and new branch names are required"), {
				status: 400,
			});
		}

		const branchExists = await prisma.branch.findUnique({ where: { branch } });
		if (!branchExists) {
			return NextResponse.json(errorResponse(404, "Branch not found"), {
				status: 404,
			});
		}

		const updatedBranch = await prisma.branch.update({
			where: { branch },
			data: { branch: newBranchName },
		});

		return NextResponse.json(successResponse(200, updatedBranch, "Branch updated successfully"), {
			status: 200,
		});
	} catch (err) {
		console.error("PUT Error:", err);
		const error = err instanceof Error ? err.message : String(err);
		return NextResponse.json(failureResponse(error), { status: 500 });
	}
}

// DELETE request to delete a branch
export async function DELETE(req: NextRequest, { params }: { params: { branch: string } }) {
	try {
		const { branch } = params;

		if (!branch) {
			return NextResponse.json(errorResponse(400, "Branch name is required"), {
				status: 400,
			});
		}

		const branchExists = await prisma.branch.findUnique({ where: { branch } });
		if (!branchExists) {
			return NextResponse.json(errorResponse(404, "Branch not found"), {
				status: 404,
			});
		}

		await prisma.branch.delete({ where: { branch } });

		return NextResponse.json(successResponse(200, null, "Branch deleted successfully"), {
			status: 200,
		});
	} catch (err) {
		const error = err instanceof Error ? err.message : String(err);
		return NextResponse.json(failureResponse(error), { status: 500 });
	}
}
